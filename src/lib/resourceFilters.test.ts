import { describe, expect, it } from "vitest";
import { getResourceArchiveSearch, getSelectedResourceCategory } from "./resourceFilters";

describe("resource category query parsing", () => {
  it("accepts each supported category with or without a leading question mark", () => {
    expect(getSelectedResourceCategory("?category=text-based")).toBe("text-based");
    expect(getSelectedResourceCategory("category=visual")).toBe("visual");
    expect(getSelectedResourceCategory("?category=video")).toBe("video");
    expect(getSelectedResourceCategory("?category=interactive")).toBe("interactive");
  });

  it("returns the all-resources state for absent or unsupported values", () => {
    expect(getSelectedResourceCategory("")).toBeNull();
    expect(getSelectedResourceCategory("?category=unknown")).toBeNull();
  });

  it("retains only a validated category query for archive return links", () => {
    expect(getResourceArchiveSearch("?category=visual")).toBe("?category=visual");
    expect(getResourceArchiveSearch("category=video&query=animation")).toBe("?category=video");
    expect(getResourceArchiveSearch("?category=unknown")).toBe("");
  });
});
