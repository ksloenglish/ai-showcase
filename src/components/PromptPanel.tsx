import { Check, ChevronsUpDown, Clipboard } from "lucide-react";
import { useState } from "react";

export function PromptPanel({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="prompt-panel" aria-labelledby="copy-prompt-heading">
      <div className="prompt-toolbar">
        <div>
          <p className="folio-label text-cyan">Ready to reuse</p>
          <h2 id="copy-prompt-heading" className="mt-1 font-display text-xl font-bold text-white">Copy the tested prompt</h2>
        </div>
        <button type="button" className="signal-button min-h-9 bg-cyan text-ink hover:bg-cyan/90" onClick={copyPrompt}>
          {copied ? <Check size={15} /> : <Clipboard size={15} />}
          {copied ? "Copied" : "Copy prompt"}
        </button>
      </div>
      <div className={`prompt-code ${expanded ? "prompt-code-expanded" : ""}`} tabIndex={0} aria-label="Full copyable prompt">
        <pre className="whitespace-pre-wrap"><code>{prompt}</code></pre>
        {!expanded ? <div className="prompt-fade" aria-hidden="true" /> : null}
      </div>
      <button type="button" className="prompt-expand" onClick={() => setExpanded(value => !value)}>
        <ChevronsUpDown size={16} /> {expanded ? "Collapse prompt" : "Expand full prompt"}
      </button>
      <span className="sr-only" aria-live="polite">{copied ? "The full prompt has been copied." : ""}</span>
    </section>
  );
}
