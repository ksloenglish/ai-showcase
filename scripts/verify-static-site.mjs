import { chromium } from "playwright-core";
import { mkdir, readFile } from "node:fs/promises";
import { join, relative, resolve, sep } from "node:path";

const baseUrl = (process.env.STATIC_BASE_URL ?? "http://localhost:4173/ai-showcase").replace(/\/$/, "");
const projectRoot = resolve();
const screenshotDirInput = process.env.STATIC_SCREENSHOT_DIR?.trim();
let screenshotDir = null;

if (screenshotDirInput) {
  screenshotDir = resolve(screenshotDirInput);
  const relativeToProject = relative(projectRoot, screenshotDir);
  const isInsideProject = !relativeToProject || (!relativeToProject.startsWith(`..${sep}`) && relativeToProject !== "..");
  if (isInsideProject) {
    throw new Error("STATIC_SCREENSHOT_DIR must point outside the repository.");
  }
  await mkdir(screenshotDir, { recursive: true });
}

const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const expectedVideos = [
  {
    order: 19,
    slug: "illustrated-vocabulary-revision-video",
    title: "Illustrated Vocabulary Revision Video",
    shortTitle: "Illustrated Vocabulary Revision",
    guide: "illustrated-vocabulary-revision-video.md",
    videoUrl: "https://www.youtube.com/watch?v=QbvH6yuWpz0",
    promptNeedle: "Every picture must contain a clearly readable human participant",
    minimumPromptLength: 16_001,
  },
  {
    order: 20,
    slug: "essential-dse-paper-3-tips-revision-video",
    title: "Essential DSE Paper 3 Tips: Revision Video",
    shortTitle: "DSE Paper 3 Revision Tips",
    guide: "essential-dse-paper-3-tips-revision-video.md",
    videoUrl: "https://www.youtube.com/watch?v=nFwHOH04VM0",
    promptNeedle: "Match the closing to the greeting",
  },
  {
    order: 21,
    slug: "grammar-explainer-video-script-scene-plan-and-captions",
    title: "Grammar Explainer Video: Script, Scene Plan and Captions",
    shortTitle: "Grammar Explainer Video",
    guide: "grammar-explainer-video-script-scene-plan-and-captions.md",
    videoUrl: "https://www.youtube.com/watch?v=i1YILiniGcw",
    promptNeedle: "Both must have identical timings.",
  },
];

const archiveUrl = category => `${baseUrl}/resources${category ? `?category=${category}` : ""}`;
const detailUrl = (slug, category = "") => `${baseUrl}/resources/${slug}${category ? `?category=${category}` : ""}`;
const expectedGuideUrl = filename => new URL(`assets/${filename}`, `${baseUrl}/`).href;
const resourceCard = (page, slug) => page.locator(`article.resource-card:has(a[href*="${slug}"])`);
const resourceCode = order => `S${String(order).padStart(2, "0")}`;

function extractPromptFromGuide(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const promptHeading = lines.findIndex(line => /^##\s+Copy-and-paste prompt\s*$/.test(line));
  if (promptHeading < 0) return "";

  const body = [];
  for (const line of lines.slice(promptHeading + 1)) {
    if (/^##\s+.+$/.test(line)) break;
    body.push(line);
  }

  const sectionBody = body.join("\n").trim();
  const fenced = sectionBody.match(/```(?:text)?\s*\n([\s\S]*?)\n```/i);
  return (fenced?.[1] ?? sectionBody).trim();
}

function isTopCenter(objectPosition) {
  return /^(?:50%|center)\s+(?:0%|top)$/.test(objectPosition.trim());
}

async function audit(page) {
  const axeIsAvailable = await page.evaluate(() => Boolean(window.axe));
  if (!axeIsAvailable) {
    await page.addScriptTag({ path: resolve("node_modules/axe-core/axe.min.js") });
  }
  const results = await page.evaluate(async () => window.axe.run());
  check(results.violations.length === 0, `WCAG violations on ${page.url()}: ${results.violations.map(item => item.id).join(", ")}`);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  check(!overflow, `Horizontal overflow on ${page.url()}`);
}

async function saveScreenshot(page, filename) {
  if (!screenshotDir) return;
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForFunction(() => window.scrollY <= 1);
  await page.screenshot({ path: join(screenshotDir, filename), fullPage: true });
}

async function installClipboardCapture(page) {
  await page.addInitScript(() => {
    Object.defineProperty(window, "__staticSiteCopiedPrompt", {
      configurable: true,
      writable: true,
      value: null,
    });
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async text => {
          window.__staticSiteCopiedPrompt = String(text);
        },
      },
    });
  });
}

async function checkAtPageTop(page, label) {
  const scrollY = await page.evaluate(() => window.scrollY);
  check(scrollY <= 1, `${label} did not restore the page to the top.`);
}

async function checkVideoCard(page, video, viewportLabel) {
  const card = resourceCard(page, video.slug);
  const cardCount = await card.count();
  check(cardCount === 1, `${viewportLabel} archive does not show exactly one ${resourceCode(video.order)} card.`);
  if (cardCount !== 1) return;

  check((await card.locator(".resource-code").textContent())?.trim() === resourceCode(video.order), `${viewportLabel} ${video.title} card does not show ${resourceCode(video.order)}.`);
  check((await card.getByRole("heading").textContent())?.trim() === video.shortTitle, `${viewportLabel} ${video.title} card title is incorrect.`);
  check((await card.locator("a").getAttribute("href"))?.endsWith(`/${video.slug}?category=video`), `${viewportLabel} ${video.title} card does not retain the Video filter.`);
  check((await card.locator(".resource-card-media img").getAttribute("alt"))?.trim().length > 0, `${viewportLabel} ${video.title} card preview has no useful alt text.`);
  const objectPosition = await card.locator(".resource-card-media img").evaluate(image => getComputedStyle(image).objectPosition);
  check(isTopCenter(objectPosition), `${viewportLabel} ${video.title} card preview is not object-positioned at top center.`);
  const cardRatio = await card.locator(".resource-card-media").evaluate(element => element.clientWidth / element.clientHeight);
  check(Math.abs(cardRatio - 16 / 9) < 0.02, `${viewportLabel} ${video.title} card crops its 16:9 thumbnail.`);
}

async function waitForVideoGuideResponse(page, video) {
  const guideUrl = expectedGuideUrl(video.guide);
  const response = await page.waitForResponse(
    candidate => candidate.url() === guideUrl && candidate.request().resourceType() === "fetch",
    { timeout: 15_000 },
  );
  check(response.ok(), `${video.title} guide did not load from ${guideUrl}.`);
  // Match the application's native UTF-8 decoding; some CDP response-text
  // transports return non-ASCII Markdown as a binary/Latin-1 string.
  const markdown = await page.evaluate(async url => {
    const guide = await fetch(url);
    if (!guide.ok) throw new Error(`Guide unavailable: ${url}`);
    return guide.text();
  }, guideUrl);
  return { guideUrl, markdown };
}

async function checkPromptPanel(page, video, expectedPrompt, viewportLabel) {
  const promptCode = page.locator(".prompt-code");
  const promptPre = promptCode.locator("pre");
  await promptPre.waitFor({ state: "visible" });
  await page.waitForFunction(() => Boolean(document.querySelector(".prompt-code pre")?.textContent));

  const renderedPrompt = await promptPre.textContent();
  const lastLines = expectedPrompt.trimEnd().split("\n").slice(-2).join("\n");
  check(renderedPrompt === expectedPrompt, `${viewportLabel} ${video.title} does not render the complete guide prompt exactly.`);
  check(renderedPrompt?.trimEnd().endsWith(lastLines), `${viewportLabel} ${video.title} prompt omits or changes its final lines.`);
  check(renderedPrompt?.includes(video.promptNeedle), `${viewportLabel} ${video.title} prompt does not contain its distinctive instruction.`);
  if (video.minimumPromptLength) {
    check(expectedPrompt.length >= video.minimumPromptLength, `${video.title} prompt should be longer than 16,000 characters.`);
  }

  const promptStyle = await promptPre.evaluate(element => ({
    whiteSpace: getComputedStyle(element).whiteSpace,
    wordBreak: getComputedStyle(element).wordBreak,
  }));
  check(promptStyle.whiteSpace === "pre-wrap" && promptStyle.wordBreak === "break-word", `${viewportLabel} ${video.title} prompt does not wrap long lines.`);
  const promptDoesNotOverflow = await promptCode.evaluate(element => element.scrollWidth <= element.clientWidth + 1);
  check(promptDoesNotOverflow, `${viewportLabel} ${video.title} prompt panel has horizontal overflow.`);
  check((await promptCode.getAttribute("tabindex")) === "0", `${viewportLabel} ${video.title} prompt panel is not keyboard focusable.`);

  const copyButton = page.getByRole("button", { name: "Copy prompt", exact: true });
  await copyButton.click();
  const copiedButton = page.getByRole("button", { name: "Copied", exact: true });
  await copiedButton.waitFor({ state: "visible" });
  const copiedPrompt = await page.evaluate(() => window.__staticSiteCopiedPrompt);
  check(copiedPrompt === expectedPrompt, `${viewportLabel} ${video.title} copied prompt is not the complete exact guide prompt.`);

  await copiedButton.focus();
  await page.keyboard.press("Tab");
  const promptHasKeyboardFocus = await promptCode.evaluate(element => document.activeElement === element);
  check(promptHasKeyboardFocus, `${viewportLabel} ${video.title} prompt panel is skipped by keyboard focus.`);
}

async function checkVideoDetail(page, video, guideResponse, viewportLabel, { mobile = false } = {}) {
  const { guideUrl, markdown } = await guideResponse;
  const expectedPrompt = extractPromptFromGuide(markdown);
  check(markdown.includes("## Copy-and-paste prompt"), `${video.title} guide at ${guideUrl} has no Copy-and-paste prompt section.`);
  check(expectedPrompt.length > 0, `${video.title} guide at ${guideUrl} has no extractable prompt.`);
  check(expectedPrompt.includes(video.promptNeedle), `${video.title} guide at ${guideUrl} does not contain its distinctive instruction.`);
  check(new URL(page.url()).pathname.endsWith(`/resources/${video.slug}`), `${viewportLabel} ${video.title} did not remain on its rendered detail page while checking the guide.`);

  const title = page.locator(".resource-detail-hero h1");
  check((await title.textContent())?.trim() === video.title, `${viewportLabel} ${video.title} detail page did not load.`);
  check((await page.locator(".resource-detail-code").textContent())?.trim() === resourceCode(video.order), `${viewportLabel} ${video.title} detail page does not show ${resourceCode(video.order)}.`);

  const preview = page.locator(".resource-preview-stage");
  const previewImage = preview.locator("img");
  await previewImage.waitFor({ state: "visible" });
  check((await previewImage.getAttribute("src"))?.includes("/assets/"), `${viewportLabel} ${video.title} preview does not resolve from a static local asset.`);
  const previewPosition = await previewImage.evaluate(image => getComputedStyle(image).objectPosition);
  check(isTopCenter(previewPosition), `${viewportLabel} ${video.title} detail preview is not object-positioned at top center.`);
  const detailRatio = await previewImage.evaluate(image => image.clientWidth / image.clientHeight);
  check(Math.abs(detailRatio - 16 / 9) < 0.02, `${viewportLabel} ${video.title} detail crops its 16:9 thumbnail.`);
  const previewPrecedesExplanation = await preview.evaluate(element => {
    const heading = document.querySelector(".resource-detail-hero h1");
    return Boolean(heading && (element.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING));
  });
  check(previewPrecedesExplanation, `${viewportLabel} ${video.title} preview is not before its explanation in the detail structure.`);
  if (mobile) {
    const [previewBox, titleBox] = await Promise.all([preview.boundingBox(), title.boundingBox()]);
    check(Boolean(previewBox && titleBox && previewBox.y + previewBox.height <= titleBox.y), `${viewportLabel} ${video.title} preview is not above its explanation.`);
  } else {
    const [previewBox, titleBox] = await Promise.all([preview.boundingBox(), title.boundingBox()]);
    check(Boolean(previewBox && titleBox && previewBox.y <= titleBox.y), `${viewportLabel} ${video.title} preview is not top-aligned before its explanation.`);
  }

  const action = page.getByRole("link", { name: "Watch video", exact: true });
  check((await action.getAttribute("href")) === video.videoUrl, `${viewportLabel} ${video.title} action does not use its canonical YouTube URL.`);
  check((await action.getAttribute("target")) === "_blank", `${viewportLabel} ${video.title} video action does not open in a new tab.`);
  check((await action.getAttribute("rel")) === "noreferrer", `${viewportLabel} ${video.title} video action does not use safe external-link rel attributes.`);

  await checkPromptPanel(page, video, expectedPrompt, viewportLabel);
}

async function openVideoDetail(page, video, viewportLabel, options = {}) {
  const guideResponse = waitForVideoGuideResponse(page, video);
  await page.goto(detailUrl(video.slug, "video"), { waitUntil: "networkidle" });
  await checkAtPageTop(page, `${viewportLabel} ${video.title} detail navigation`);
  await checkVideoDetail(page, video, guideResponse, viewportLabel, options);
}

async function checkHomeAboutAndAnchor(page, viewportLabel, { mobile = false, reducedMotion = false } = {}) {
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await checkAtPageTop(page, `${viewportLabel} homepage navigation`);
  check((await page.locator("main h1").textContent())?.includes("AI Resource") && (await page.locator("main h1").textContent())?.includes("Showcase"), `${viewportLabel} homepage heading did not load.`);
  check((await page.getByRole("link", { name: /Browse 21 resources/i }).count()) === 1, `${viewportLabel} homepage does not report the 21-resource archive.`);
  const videoCategory = page.locator('a[href*="/resources?category=video"]');
  check((await videoCategory.count()) === 1 && (await videoCategory.textContent())?.includes("6 resources"), `${viewportLabel} homepage does not report six Video resources.`);

  await page.keyboard.press("Tab");
  const skipLinkFocused = await page.locator(".skip-link").evaluate(element => document.activeElement === element);
  check(skipLinkFocused, `${viewportLabel} skip link is not the first keyboard focus target.`);
  if (reducedMotion) {
    const animationName = await page.locator(".hero-enter").evaluate(element => getComputedStyle(element).animationName);
    check(animationName === "none", "Homepage hero animation runs despite reduced-motion preference.");
  }

  const howItWorks = page.getByRole("link", { name: "How it works", exact: true });
  check((await howItWorks.getAttribute("href")) === "#how-it-works", `${viewportLabel} homepage anchor link is incorrect.`);
  await howItWorks.click();
  await page.waitForFunction(() => window.location.hash === "#how-it-works" && (document.querySelector("#how-it-works")?.getBoundingClientRect().top ?? Infinity) < 150);
  check(new URL(page.url()).hash === "#how-it-works", `${viewportLabel} homepage anchor did not update the URL.`);
  const anchorGeometry = await page.evaluate(() => {
    const heading = document.querySelector("#how-it-works h2")?.getBoundingClientRect();
    const header = document.querySelector("header")?.getBoundingClientRect();
    return { headingTop: heading?.top, headingBottom: heading?.bottom, headerBottom: header?.bottom, viewportHeight: window.innerHeight };
  });
  check(anchorGeometry.headingTop !== undefined && anchorGeometry.headerBottom !== undefined && anchorGeometry.headingTop >= anchorGeometry.headerBottom && anchorGeometry.headingBottom <= anchorGeometry.viewportHeight, `${viewportLabel} sticky header obscures the anchor heading.`);
  await audit(page);

  let aboutLink;
  if (mobile) {
    await page.getByRole("button", { name: "Open navigation", exact: true }).click();
    const mobileNavigation = page.getByRole("navigation", { name: "Mobile navigation", exact: true });
    check((await mobileNavigation.count()) === 1, `${viewportLabel} mobile navigation did not open.`);
    aboutLink = mobileNavigation.getByRole("link", { name: "About", exact: true });
  } else {
    aboutLink = page.getByRole("navigation", { name: "Primary navigation", exact: true }).getByRole("link", { name: "About", exact: true });
  }
  await aboutLink.click();
  await page.waitForFunction(() => window.location.pathname.endsWith("/about"));
  await checkAtPageTop(page, `${viewportLabel} About navigation`);
  check((await page.locator("main h1").textContent())?.includes("Built in school."), `${viewportLabel} About page did not load.`);
  check((await page.getByRole("navigation", { name: "Primary navigation", exact: true, includeHidden: true }).getByRole("link", { name: "About", exact: true, includeHidden: true }).getAttribute("aria-current")) === "page", `${viewportLabel} About navigation item is not marked current.`);
  await audit(page);
}

try {
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await desktop.newPage();
  await installClipboardCapture(page);

  await checkHomeAboutAndAnchor(page, "Desktop", { reducedMotion: true });

  await page.goto(archiveUrl("visual"), { waitUntil: "networkidle" });
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

  await page.goto(archiveUrl("video"), { waitUntil: "networkidle" });
  check((await page.locator("main").getByText(/resources shown/).first().textContent())?.trim() === "6 resources shown", "Video filter did not show six resources.");
  check((await page.getByRole("button", { name: "Video", exact: true }).getAttribute("class"))?.includes("filter-chip-active"), "Video filter is not active.");
  const pictureWritingCard = page.locator('a[href*="picture-writing-task-video-bring-the-pictures-to-life"]').first();
  check((await pictureWritingCard.getAttribute("href"))?.endsWith("?category=video"), "Picture-writing video link does not retain the Video filter.");
  check((await pictureWritingCard.locator(".resource-code").textContent())?.trim() === "S17", "Picture-writing video card does not show label S17.");
  const plotMountainCard = page.locator('a[href*="plot-mountain-explainer-video"]').first();
  check((await plotMountainCard.locator(".resource-code").textContent())?.trim() === "S18", "Plot mountain video card does not show label S18.");
  for (const video of expectedVideos) {
    await checkVideoCard(page, video, "Desktop");
  }
  await saveScreenshot(page, "desktop-video-archive.png");
  await audit(page);

  await pictureWritingCard.click();
  await page.waitForLoadState("networkidle");
  check((await page.locator("h1").textContent())?.includes("Picture Writing-Task Video"), "Picture-writing video detail page did not load.");
  check(await page.locator(".prompt-code pre").textContent().then(text => text?.includes("STAGE 1 – PLAN FIRST") ?? false), "Picture-writing video guide prompt did not load.");
  const pictureWritingVideoUrl = await page.getByRole("link", { name: "Watch video", exact: true }).getAttribute("href");
  check(pictureWritingVideoUrl === "https://www.youtube.com/watch?v=extBbAIXkZ4", "Picture-writing video action does not open the supplied YouTube video.");
  check(await page.getByRole("link", { name: "Watch video", exact: true }).getAttribute("target").then(value => value === "_blank"), "Picture-writing video action does not open in a new tab.");
  await audit(page);

  await page.goto(detailUrl("plot-mountain-explainer-video", "video"), { waitUntil: "networkidle" });
  check((await page.locator("h1").textContent())?.includes("Plot Mountain Explainer Video"), "Plot mountain video detail page did not load.");
  check(await page.locator(".prompt-code pre").textContent().then(text => text?.includes("exposition, rising action, climax, resolution") ?? false), "Plot mountain video guide prompt did not load.");
  const plotMountainVideoUrl = await page.getByRole("link", { name: "Watch video", exact: true }).getAttribute("href");
  check(plotMountainVideoUrl === "https://www.youtube.com/watch?v=j8PG6B4tPuQ", "Plot mountain video action does not open the supplied YouTube video.");
  await audit(page);

  const s19 = expectedVideos[0];
  const s19Card = resourceCard(page, s19.slug).locator("a");
  await page.goto(archiveUrl("video"), { waitUntil: "networkidle" });
  await s19Card.scrollIntoViewIfNeeded();
  const s19GuideResponse = waitForVideoGuideResponse(page, s19);
  await s19Card.click();
  await page.waitForLoadState("networkidle");
  await checkAtPageTop(page, `Desktop ${s19.title} card navigation`);
  await checkVideoDetail(page, s19, s19GuideResponse, "Desktop");
  await saveScreenshot(page, "desktop-s19-illustrated-vocabulary-revision-video.png");
  await audit(page);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.getByRole("link", { name: /Back to the archive/i }).evaluate(link => link.click());
  await page.waitForFunction(() => window.location.pathname.endsWith("/resources") && new URLSearchParams(window.location.search).get("category") === "video");
  await checkAtPageTop(page, "Desktop Back to the archive navigation");
  check((await page.locator("main").getByText(/resources shown/).first().textContent())?.trim() === "6 resources shown", "Back to the archive did not restore the six-resource Video filter.");
  check((await page.getByRole("button", { name: "Video", exact: true }).getAttribute("class"))?.includes("filter-chip-active"), "Back to the archive did not restore the active Video filter.");

  for (const video of expectedVideos.slice(1)) {
    await openVideoDetail(page, video, "Desktop");
    await saveScreenshot(page, `desktop-${resourceCode(video.order).toLowerCase()}-${video.slug}.png`);
    await audit(page);
  }

  await page.goto(`${baseUrl}/resources/dse-english-vocabulary-glossary-from-a-reading-passage`, { waitUntil: "networkidle" });
  const downloadUrl = await page.getByRole("link", { name: "PDF sample", exact: true }).getAttribute("href");
  check(downloadUrl?.includes("/ai-showcase/assets/") && downloadUrl.endsWith(".pdf"), "Download action does not use the local static asset.");
  check((await page.locator(".prompt-code pre").evaluate(element => getComputedStyle(element).whiteSpace)) === "pre-wrap", "Prompt text is not line-wrapped.");
  await audit(page);
  await desktop.close();

  const tablet = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const tabletPage = await tablet.newPage();
  await installClipboardCapture(tabletPage);
  await checkHomeAboutAndAnchor(tabletPage, "Tablet");
  await tablet.close();

  const mobile = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobile.newPage();
  await installClipboardCapture(mobilePage);
  await checkHomeAboutAndAnchor(mobilePage, "Mobile", { mobile: true });

  await mobilePage.goto(archiveUrl("video"), { waitUntil: "networkidle" });
  check((await mobilePage.locator("main").getByText(/resources shown/).first().textContent())?.trim() === "6 resources shown", "Mobile Video filter did not show six resources.");
  for (const video of expectedVideos) {
    await checkVideoCard(mobilePage, video, "Mobile");
  }
  await saveScreenshot(mobilePage, "mobile-video-archive.png");
  await audit(mobilePage);

  for (const video of expectedVideos) {
    await openVideoDetail(mobilePage, video, "Mobile", { mobile: true });
    await saveScreenshot(mobilePage, `mobile-${resourceCode(video.order).toLowerCase()}-${video.slug}.png`);
    await audit(mobilePage);
  }

  await mobilePage.goto(detailUrl("plot-mountain-explainer-video", "video"), { waitUntil: "networkidle" });
  check((await mobilePage.locator("h1").textContent())?.includes("Plot Mountain Explainer Video"), "Mobile plot mountain video detail page did not load.");
  check((await mobilePage.locator(".resource-detail-code").textContent())?.trim() === "S18", "Mobile plot mountain video does not show label S18.");
  await audit(mobilePage);
  await mobile.close();

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
console.log("Archive filter persistence and page-top restoration: PASS");
console.log("Six Video resources with S17–S21 labels and canonical YouTube actions: PASS");
console.log("Exact guide prompts, copy actions, wrapping and static previews: PASS");
console.log("Desktop, tablet and mobile WCAG audit: PASS");
