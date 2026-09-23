import { chromium } from "playwright-core";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const baseUrl = (process.env.STATIC_BASE_URL ?? "http://localhost:4173/ai-showcase").replace(/\/$/, "");
const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

async function audit(page) {
  await page.addScriptTag({ path: resolve("node_modules/axe-core/axe.min.js") });
  const results = await page.evaluate(async () => window.axe.run());
  check(results.violations.length === 0, `WCAG violations on ${page.url()}: ${results.violations.map(item => item.id).join(", ")}`);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  check(!overflow, `Horizontal overflow on ${page.url()}`);
}

try {
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await desktop.newPage();
  await page.goto(`${baseUrl}/resources?category=visual`, { waitUntil: "networkidle" });
  check((await page.locator("main").getByText(/resources shown/).first().textContent())?.trim() === "3 resources shown", "Visual filter did not show three resources.");
  check((await page.getByRole("button", { name: "Visual", exact: true }).getAttribute("class"))?.includes("filter-chip-active"), "Visual filter is not active.");
  check((await page.getByText("Manage resources", { exact: true }).count()) === 0, "Removed administration link remains visible.");
  check((await page.locator('a[href*="/admin"]').count()) === 0, "Removed administration route remains linked.");

  const firstCard = page.locator("article.resource-card a").first();
  check((await firstCard.getAttribute("href"))?.includes("/resources/") && (await firstCard.getAttribute("href"))?.endsWith("?category=visual"), "Filtered resource link does not retain the selected category.");
  await firstCard.click();
  await page.waitForLoadState("networkidle");
  check(new URL(page.url()).searchParams.get("category") === "visual", "Selected format was not retained on the detail page.");
  check((await page.locator(".resource-preview-stage img").getAttribute("src"))?.includes("/ai-showcase/assets/"), "Resource preview does not resolve from a static local asset.");
  await page.getByRole("link", { name: /Back to the archive/i }).click();
  await page.waitForLoadState("networkidle");
  check(new URL(page.url()).searchParams.get("category") === "visual", "Return to archive did not restore the selected format.");
  check((await page.locator("main").getByText(/resources shown/).first().textContent())?.trim() === "3 resources shown", "Return to archive did not restore the Visual filter.");
  await audit(page);

  await page.goto(`${baseUrl}/resources/dse-english-vocabulary-glossary-from-a-reading-passage`, { waitUntil: "networkidle" });
  const downloadUrl = await page.getByRole("link", { name: "PDF sample", exact: true }).getAttribute("href");
  check(downloadUrl?.includes("/ai-showcase/assets/") && downloadUrl.endsWith(".pdf"), "Download action does not use the local static asset.");
  check((await page.locator(".prompt-code pre").evaluate(element => getComputedStyle(element).whiteSpace)) === "pre-wrap", "Prompt text is not line-wrapped.");
  await audit(page);

  const mobile = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(`${baseUrl}/resources?category=interactive`, { waitUntil: "networkidle" });
  check((await mobilePage.locator("main").getByText(/resources shown/).first().textContent())?.trim() === "5 resources shown", "Mobile Interactive filter did not show five resources.");
  await audit(mobilePage);
  await mobile.close();
  await desktop.close();

  const fallback = await readFile("dist/404.html", "utf8");
  const index = await readFile("dist/index.html", "utf8");
  check(fallback.includes('var base = "/ai-showcase"'), "GitHub Pages route fallback does not target the ai-showcase project path.");
  check(index.includes('replace(/\\/$/, "") + requestedPath'), "GitHub Pages fallback does not normalise the project base path.");
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(failures.map(failure => `FAIL: ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Static route fallback: PASS");
console.log("No administration workflow links: PASS");
console.log("Static local assets: PASS");
console.log("Archive filter persistence: PASS");
console.log("Desktop and mobile WCAG audit: PASS");
