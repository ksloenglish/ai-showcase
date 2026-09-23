import { chromium } from "playwright-core";

const baseUrl = (process.env.STATIC_BASE_URL ?? "http://localhost:4173/ai-showcase").replace(/\/$/, "");
const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });

const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await desktop.goto(`${baseUrl}/resources?category=visual`, { waitUntil: "networkidle" });
await desktop.screenshot({ path: "/home/ubuntu/ai-showcase/review-desktop-visual-filter.png", fullPage: false });

const mobile = await browser.newPage({ viewport: { width: 375, height: 812 } });
await mobile.goto(`${baseUrl}/resources/dse-english-vocabulary-glossary-from-a-reading-passage?category=text-based`, { waitUntil: "networkidle" });
await mobile.screenshot({ path: "/home/ubuntu/ai-showcase/review-mobile-resource.png", fullPage: false });

await browser.close();
console.log("Captured desktop archive and mobile resource review screenshots.");
