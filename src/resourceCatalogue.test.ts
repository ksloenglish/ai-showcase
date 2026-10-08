import { describe, expect, it } from "vitest";
import { categoryDefinitions, formatResourceCode, resourceCatalogue } from "./resourceCatalogue";

describe("static resource catalogue", () => {
  it("contains the complete eighteen-resource archive with unique slugs", () => {
    expect(resourceCatalogue).toHaveLength(18);
    expect(new Set(resourceCatalogue.map(resource => resource.slug)).size).toBe(18);
    expect(new Set(resourceCatalogue.map(resource => resource.category))).toEqual(new Set(categoryDefinitions.map(category => category.id)));
  });

  it("includes the two supplied classroom videos in the Video category", () => {
    const videos = resourceCatalogue.filter(resource => resource.category === "video");
    expect(videos).toHaveLength(3);
    expect(videos.map(resource => resource.slug)).toEqual([
      "ai-short-film-production",
      "picture-writing-task-video-bring-the-pictures-to-life",
      "plot-mountain-explainer-video",
    ]);
    expect(videos.slice(1).map(resource => resource.sampleUrl)).toEqual([
      "https://www.youtube.com/watch?v=extBbAIXkZ4",
      "https://www.youtube.com/watch?v=j8PG6B4tPuQ",
    ]);
    expect(videos.slice(1).map(resource => resource.order)).toEqual([17, 18]);
    expect([...resourceCatalogue.map(resource => resource.order)].sort((left, right) => left - right)).toEqual(Array.from({ length: 18 }, (_, index) => index + 1));
    expect(formatResourceCode(18)).toBe("S18");
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
