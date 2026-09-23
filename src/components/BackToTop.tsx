import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      className="back-to-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp size={17} />
    </button>
  );
}
