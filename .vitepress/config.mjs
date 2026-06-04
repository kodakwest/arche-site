import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Arche',
  description: 'Build secure agent workflows.',
  lang: 'en-US',
  cleanUrls: true,
  outDir: 'dist',
  srcExclude: ['AGENTS.md', 'public/**/*.md'],
  appearance: 'dark',
  ignoreDeadLinks: true,
  head: [
    ['meta', { name: 'theme-color', content: '#08080a' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Arche' }],
    ['meta', { property: 'og:title', content: 'Arche — Build secure agent workflows' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Design, run, and govern secure agent workflows with Arche.'
      }
    ],
    ['meta', { property: 'og:url', content: 'https://agentarche.com/' }],
    ['link', { rel: 'icon', href: '/assets/branding/arche-favicon.svg', type: 'image/svg+xml' }]
  ],
  transformHead() {
    return [
      ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
      ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
      [
        'link',
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap'
        }
      ],
      [
        'script',
        {
          type: 'application/ld+json'
        },
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Arche',
          url: 'https://agentarche.com/',
          description: 'Build secure agent workflows.'
        })
      ]
    ];
  },
  themeConfig: {
    logo: '/assets/branding/arche-icon.svg',
    siteTitle: 'Arche Docs',
    nav: [
      { text: 'Docs', link: '/docs/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Home', link: '/' }
    ],
    sidebar: {
      '/docs/': [
        {
          text: 'Docs',
          items: [
            { text: 'Overview', link: '/docs/' },
            { text: 'Operating Model', link: '/docs/operating-model' }
          ]
        }
      ],
      '/blog/': [
        {
          text: 'Blog',
          items: [
            { text: 'Index', link: '/blog/' },
            {
              text: 'Getting Started with Agent Governance',
              link: '/blog/getting-started-with-agent-governance'
            }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kodakwest/arche-site' }
    ],
    search: {
      provider: 'local'
    },
    footer: {
      message: 'Build secure agent workflows.',
      copyright: 'Copyright © 2026 Arche'
    }
  }
});
