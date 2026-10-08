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

  await page.goto(`${baseUrl}/resources?category=video`, { waitUntil: "networkidle" });
  check((await page.locator("main").getByText(/resources shown/).first().textContent())?.trim() === "3 resources shown", "Video filter did not show three resources.");
  check((await page.getByRole("button", { name: "Video", exact: true }).getAttribute("class"))?.includes("filter-chip-active"), "Video filter is not active.");
  const pictureWritingCard = page.locator('a[href*="picture-writing-task-video-bring-the-pictures-to-life"]').first();
  check((await pictureWritingCard.getAttribute("href"))?.endsWith("?category=video"), "Picture-writing video link does not retain the Video filter.");
  await pictureWritingCard.click();
  await page.waitForLoadState("networkidle");
  check((await page.locator("h1").textContent())?.includes("Picture Writing-Task Video"), "Picture-writing video detail page did not load.");
  check(await page.locator(".prompt-code pre").textContent().then(text => text?.includes("STAGE 1 – PLAN FIRST") ?? false), "Picture-writing video guide prompt did not load.");
  const pictureWritingVideoUrl = await page.getByRole("link", { name: "Watch video", exact: true }).getAttribute("href");
  check(pictureWritingVideoUrl === "https://www.youtube.com/watch?v=extBbAIXkZ4", "Picture-writing video action does not open the supplied YouTube video.");
  check(await page.getByRole("link", { name: "Watch video", exact: true }).getAttribute("target").then(value => value === "_blank"), "Picture-writing video action does not open in a new tab.");
  await audit(page);

  await page.goto(`${baseUrl}/resources/plot-mountain-explainer-video?category=video`, { waitUntil: "networkidle" });
  check((await page.locator("h1").textContent())?.includes("Plot Mountain Explainer Video"), "Plot mountain video detail page did not load.");
  check(await page.locator(".prompt-code pre").textContent().then(text => text?.includes("exposition, rising action, climax, resolution") ?? false), "Plot mountain video guide prompt did not load.");
  const plotMountainVideoUrl = await page.getByRole("link", { name: "Watch video", exact: true }).getAttribute("href");
  check(plotMountainVideoUrl === "https://www.youtube.com/watch?v=j8PG6B4tPuQ", "Plot mountain video action does not open the supplied YouTube video.");
  await audit(page);

  await page.goto(`${baseUrl}/resources/dse-english-vocabulary-glossary-from-a-reading-passage`, { waitUntil: "networkidle" });
  const downloadUrl = await page.getByRole("link", { name: "PDF sample", exact: true }).getAttribute("href");
  check(downloadUrl?.includes("/ai-showcase/assets/") && downloadUrl.endsWith(".pdf"), "Download action does not use the local static asset.");
  check((await page.locator(".prompt-code pre").evaluate(element => getComputedStyle(element).whiteSpace)) === "pre-wrap", "Prompt text is not line-wrapped.");
  await audit(page);

  const mobile = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(`${baseUrl}/resources/picture-writing-task-video-bring-the-pictures-to-life?category=video`, { waitUntil: "networkidle" });
  check((await mobilePage.locator("h1").textContent())?.includes("Picture Writing-Task Video"), "Mobile picture-writing video detail page did not load.");
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
console.log("Two new Video resources and YouTube actions: PASS");
console.log("Desktop and mobile WCAG audit: PASS");
