import asyncio
from playwright.async_api import async_playwright
import http.server
import socketserver
import threading
import os

PORT = 8081
DIRECTORY = "."

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
        
def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()

async def main():
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    
    pages_to_test = [
        "index.html",
        "chat-deck-landing.html",
        "workbench.html",
        "control-plane.html",
        "docs/index.html" # if exists
    ]
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for page_name in pages_to_test:
            if not os.path.exists(page_name):
                continue
            print(f"Testing {page_name}...")
            page = await browser.new_page()
            
            errors = []
            page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
            page.on("pageerror", lambda err: errors.append(err.message))
            
            await page.goto(f"http://localhost:{PORT}/{page_name}")
            
            # test responsive
            await page.set_viewport_size({"width": 375, "height": 667})
            await page.screenshot(path=f"{page_name.replace('/', '_')}_375.png")
            
            await page.set_viewport_size({"width": 980, "height": 1024})
            await page.screenshot(path=f"{page_name.replace('/', '_')}_980.png")
            
            if errors:
                print(f"Errors on {page_name}:", errors)
            else:
                print(f"No errors on {page_name}")
                
            await page.close()
            
        await browser.close()

asyncio.run(main())
