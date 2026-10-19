import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { parseResourceMarkdown } from "./lib/resourceMarkdown";
import { categoryDefinitions, formatResourceCode, resourceCatalogue } from "./resourceCatalogue";

const suppliedRevisionVideos = [
  {
    order: 19,
    slug: "illustrated-vocabulary-revision-video",
    videoUrl: "https://www.youtube.com/watch?v=QbvH6yuWpz0",
    guideFile: "illustrated-vocabulary-revision-video.md",
    sourceHash: "732b9f65704a7fb7b9a518a931690ed216812897f6af966cea25905b0baf0872",
    firstLine: "You are helping me create an illustrated English vocabulary revision video for [YEAR GROUP] students.",
    lastLine: "Ask one focused clarification question only if an essential input is missing. Otherwise, proceed with the first planning and approval stage. The required approval pauses are separate from clarification questions: do not skip them or run ahead to the final video.",
    requiredText: "Every picture must contain a clearly readable human participant",
  },
  {
    order: 20,
    slug: "essential-dse-paper-3-tips-revision-video",
    videoUrl: "https://www.youtube.com/watch?v=nFwHOH04VM0",
    guideFile: "essential-dse-paper-3-tips-revision-video.md",
    sourceHash: "79530c5b8cf4947c4536a69fded16446c3a9f4281c8027d1b1b8f98a311aa755",
    firstLine: "You are helping me create a short narrated revision video for senior secondary students in Hong Kong who are preparing for the HKDSE English Language Paper 3 (Writing) exam.",
    lastLine: "Ask one focused question only if an essential input is missing. Otherwise, proceed.",
    requiredText: "Match the closing to the greeting",
  },
];

describe("static resource catalogue", () => {
  it("contains the complete twenty-resource archive with unique slugs and continuous labels", () => {
    expect(resourceCatalogue).toHaveLength(20);
    expect(new Set(resourceCatalogue.map(resource => resource.slug)).size).toBe(20);
    expect(new Set(resourceCatalogue.map(resource => resource.category))).toEqual(new Set(categoryDefinitions.map(category => category.id)));
    expect([...resourceCatalogue.map(resource => resource.order)].sort((left, right) => left - right)).toEqual(Array.from({ length: 20 }, (_, index) => index + 1));
    expect(formatResourceCode(19)).toBe("S19");
    expect(formatResourceCode(20)).toBe("S20");
  });

  it("includes all five classroom videos in the Video category without replacing existing entries", () => {
    const videos = resourceCatalogue.filter(resource => resource.category === "video");
    expect(videos).toHaveLength(5);
    expect(videos.map(resource => resource.slug)).toEqual([
      "ai-short-film-production",
      "picture-writing-task-video-bring-the-pictures-to-life",
      "plot-mountain-explainer-video",
      "illustrated-vocabulary-revision-video",
      "essential-dse-paper-3-tips-revision-video",
    ]);
    expect(videos.slice(1, 3).map(resource => resource.sampleUrl)).toEqual([
      "https://www.youtube.com/watch?v=extBbAIXkZ4",
      "https://www.youtube.com/watch?v=j8PG6B4tPuQ",
    ]);
    expect(videos.slice(1).map(resource => resource.order)).toEqual([17, 18, 19, 20]);
  });

  it.each(suppliedRevisionVideos)("matches $slug to its supplied video, guide and preview", ({ order, slug, videoUrl, guideFile }) => {
    const resource = resourceCatalogue.find(item => item.slug === slug);
    expect(resource).toMatchObject({ order, category: "video", sampleType: "video", sampleUrl: videoUrl, outputLabel: "Watch video", previewAspectRatio: "16 / 9" });
    expect(resource?.guideUrl).toBe(`/assets/${guideFile}`);
    expect(resource?.previewUrl).toBe(`/assets/${slug}-preview.jpg`);
    expect(resource?.previewAlt.length).toBeGreaterThan(20);
  });

  it.each(suppliedRevisionVideos)("preserves the supplied $slug guide and extracts the complete copyable prompt", ({ guideFile, sourceHash, firstLine, lastLine, requiredText }) => {
    const source = readFileSync(resolve("public/assets", guideFile), "utf8");
    expect(createHash("sha256").update(source).digest("hex")).toBe(sourceHash);
    const guide = parseResourceMarkdown(source);
    const expectedPrompt = source.match(/## Copy-and-paste prompt\s*\n\s*```text\n([\s\S]*?)\n```/)?.[1];
    expect(expectedPrompt).toBeTruthy();
    expect(guide.prompt).toBe(expectedPrompt?.trim());
    expect(guide.prompt.startsWith(firstLine)).toBe(true);
    expect(guide.prompt.endsWith(lastLine)).toBe(true);
    expect(guide.prompt).toContain(requiredText);
    for (const section of [guide.whatThisMakes, guide.whatYouNeed, guide.howToUse, guide.beforeClassroomUse, guide.fallback, guide.whatYouCanChange]) {
      expect(section.length).toBeGreaterThan(20);
    }
    expect(guide.extraSections).toHaveLength(0);
  });

  it("uses local static assets for every guide, preview and downloadable sample", () => {
    for (const resource of resourceCatalogue) {
      expect(resource.guideUrl).toMatch(/^\/assets\/.*\.md$/);
      expect(resource.previewUrl).toMatch(/^\/assets\/.*\.(jpg|png|webp)$/);
      if (resource.sampleType === "download") expect(resource.sampleUrl).toMatch(/^\/assets\/.*\.pdf$/);
      else expect(resource.sampleUrl).toMatch(/^https:\/\//);
    }
  });
});
