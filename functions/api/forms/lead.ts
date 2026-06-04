/// <reference types="@cloudflare/workers-types" />

interface Env {
  arche_leads: D1Database;
  CONTACT_EMAIL_TO?: string;
  TURNSTILE_SECRET_KEY?: string;
  ENVIRONMENT?: string;
}

interface LeadSubmission {
  email: string;
  name?: string;
  source: 'hero' | 'contact';
  message?: string;
  'cf-turnstile-response'?: string;
}

export async function onRequestPost({ request, env, waitUntil }: EventContext<Env, string, Record<string, unknown>>): Promise<Response> {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers, status: 204 });
  }

  try {
    const body: LeadSubmission = await request.json();

    // Validate required fields
    if (!body.email || !body.source) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Email and source are required.',
      }), { status: 400, headers });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid email format.',
      }), { status: 400, headers });
    }

    // Validate source
    if (!['hero', 'contact'].includes(body.source)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid source. Must be "hero" or "contact".',
      }), { status: 400, headers });
    }

    // Turnstile verification (if configured)
    if (body['cf-turnstile-response'] && env.TURNSTILE_SECRET_KEY) {
      const turnstileResult = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            secret: env.TURNSTILE_SECRET_KEY,
            response: body['cf-turnstile-response'],
          }),
        }
      );
      const turnstileData = await turnstileResult.json() as { success: boolean };
      if (!turnstileData.success) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Captcha verification failed. Please try again.',
        }), { status: 403, headers });
      }
    }

    // Hash IP for privacy (store hash instead of raw IP)
    const cfIp = request.headers.get('CF-Connecting-IP') || '';
    const ipHash = cfIp
      ? await crypto.subtle.digest('SHA-256', new TextEncoder().encode(cfIp))
          .then(hash => Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join(''))
      : null;

    // Insert into D1
    const stmt = env.arche_leads.prepare(
      `INSERT INTO leads (email, name, source, message, ip_hash, turnstile_token)
       VALUES (?, ?, ?, ?, ?, ?)`
    );
    await stmt.bind(
      body.email.toLowerCase().trim(),
      body.name?.trim() || null,
      body.source,
      body.message?.trim() || null,
      ipHash,
      body['cf-turnstile-response'] || null
    ).run();

    // If source is 'contact' and we have a message, send notification
    if (body.source === 'contact' && body.message && env.CONTACT_EMAIL_TO) {
      // Fire-and-forget notification — uses MailChannels free transactional email
      waitUntil(sendNotification(body, env));
    }

    return new Response(JSON.stringify({
      success: true,
      message: body.source === 'hero'
        ? "You're on the list! We'll be in touch."
        : 'Message received. We\'ll get back to you soon.',
    }), { status: 200, headers });

  } catch (err) {
    console.error('Form submission error:', err);
    return new Response(JSON.stringify({
      success: false,
      error: 'Something went wrong. Please try again.',
    }), { status: 500, headers });
  }
}

async function sendNotification(body: LeadSubmission, env: Env): Promise<void> {
  try {
    await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: env.CONTACT_EMAIL_TO }],
            subject: `New Contact: ${body.name || body.email}`,
          },
        ],
        from: { email: 'no-reply@agentarche.com', name: 'Arche Contact' },
        content: [
          {
            type: 'text/plain',
            value: [
              `New contact form submission from agentarche.com`,
              ``,
              `Name: ${body.name || '(not provided)'}`,
              `Email: ${body.email}`,
              `Message: ${body.message || '(not provided)'}`,
              `---`,
              `Source: contact form`,
            ].join('\n'),
          },
        ],
      }),
    });
  } catch (err) {
    console.error('Notification send failed:', err);
  }
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
