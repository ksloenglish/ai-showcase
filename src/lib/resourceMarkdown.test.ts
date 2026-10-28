import { describe, expect, it } from "vitest";
import { parseResourceMarkdown } from "./resourceMarkdown";

describe("resource Markdown import notes", () => {
  it("omits the showcase import note but retains classroom guidance and the exact prompt", () => {
    const guide = parseResourceMarkdown([
      "# A resource",
      "## Copy-and-paste prompt",
      "```text",
      "Keep the whole teaching prompt, including its final instruction.",
      "```",
      "## Teacher extension notes",
      "Keep this classroom guidance visible.",
      "## Note for adding this to the AI Resource Showcase",
      "Use this metadata only when adding the catalogue entry.",
    ].join("\n"));

    expect(guide.prompt).toBe("Keep the whole teaching prompt, including its final instruction.");
    expect(guide.extraSections).toEqual([
      { heading: "Teacher extension notes", body: "Keep this classroom guidance visible." },
    ]);
  });
});
