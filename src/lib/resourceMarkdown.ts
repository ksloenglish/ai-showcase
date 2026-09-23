export type ParsedGuide = {
  title: string;
  whatThisMakes: string;
  whatYouNeed: string;
  howToUse: string;
  prompt: string;
  beforeClassroomUse: string;
  fallback: string;
  whatYouCanChange: string;
  extraSections: Array<{ heading: string; body: string }>;
};

const sectionAliases: Record<string, keyof Omit<ParsedGuide, "title" | "prompt" | "extraSections">> = {
  "What this makes": "whatThisMakes",
  "What you need": "whatYouNeed",
  "How to use it": "howToUse",
  "Before you use the result with students": "beforeClassroomUse",
  "If your AI assistant cannot make the file you want": "fallback",
  "If your AI assistant cannot build or publish the website": "fallback",
  "What you can change": "whatYouCanChange",
};

function extractPrompt(body: string) {
  const fenced = body.match(/```(?:text)?\s*\n([\s\S]*?)\n```/i);
  return (fenced?.[1] ?? body).trim();
}

export function parseResourceMarkdown(markdown: string): ParsedGuide {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const title = lines.find(line => line.startsWith("# "))?.slice(2).trim() ?? "Resource guide";
  const sections: Array<{ heading: string; body: string }> = [];
  let currentHeading = "";
  let buffer: string[] = [];

  const commit = () => {
    if (currentHeading) {
      sections.push({ heading: currentHeading, body: buffer.join("\n").trim() });
    }
    buffer = [];
  };

  for (const line of lines) {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      commit();
      currentHeading = match[1].trim();
      continue;
    }
    if (currentHeading) buffer.push(line);
  }
  commit();

  const guide: ParsedGuide = {
    title,
    whatThisMakes: "",
    whatYouNeed: "",
    howToUse: "",
    prompt: "",
    beforeClassroomUse: "",
    fallback: "",
    whatYouCanChange: "",
    extraSections: [],
  };

  for (const section of sections) {
    if (section.heading === "Copy-and-paste prompt") {
      guide.prompt = extractPrompt(section.body);
      continue;
    }
    const key = sectionAliases[section.heading];
    if (key) {
      guide[key] = section.body;
    } else if (section.body) {
      guide.extraSections.push(section);
    }
  }

  return guide;
}
