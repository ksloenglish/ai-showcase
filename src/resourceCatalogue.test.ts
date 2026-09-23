import { describe, expect, it } from "vitest";
import { categoryDefinitions, resourceCatalogue } from "./resourceCatalogue";

describe("static resource catalogue", () => {
  it("contains the complete sixteen-resource archive with unique slugs", () => {
    expect(resourceCatalogue).toHaveLength(16);
    expect(new Set(resourceCatalogue.map(resource => resource.slug)).size).toBe(16);
    expect(new Set(resourceCatalogue.map(resource => resource.category))).toEqual(new Set(categoryDefinitions.map(category => category.id)));
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
