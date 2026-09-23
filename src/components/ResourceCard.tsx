import type { CatalogueResource } from "@/resourceCatalogue";
import { ArrowUpRight, Download, ExternalLink, Play } from "lucide-react";
import { Link } from "wouter";

const actionIcon = {
  download: Download,
  "live-site": ExternalLink,
  video: Play,
  "ai-tool": ExternalLink,
};

export function ResourceCard({
  resource,
  featured = false,
  archiveSearch = "",
  headingLevel = "h2",
}: {
  resource: CatalogueResource;
  featured?: boolean;
  archiveSearch?: string;
  headingLevel?: "h2" | "h3";
}) {
  const Icon = actionIcon[resource.sampleType];
  const Heading = headingLevel;

  return (
    <article className={`resource-card ${featured ? "resource-card-featured" : ""}`}>
      <Link href={`/resources/${resource.slug}${archiveSearch}`} className="block">
        <div className="resource-card-media">
          <img src={resource.previewUrl} alt={resource.previewAlt} loading="lazy" />
          <span className="resource-code">R{String(resource.order).padStart(2, "0")}</span>
          <span className="resource-output"><Icon size={13} /> {resource.outputLabel}</span>
        </div>
        <div className="p-5 sm:p-6">
          <p className="folio-label text-slate">{resource.category.replace("-", " ")}</p>
          <Heading className="mt-3 font-display text-xl font-bold leading-tight tracking-[-0.025em] text-ink sm:text-2xl">
            {resource.shortTitle}
          </Heading>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate">{resource.summary}</p>
          <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4">
            <span className="text-xs font-bold uppercase tracking-[0.12em]">View resource</span>
            <ArrowUpRight className="resource-arrow" size={18} />
          </div>
        </div>
      </Link>
    </article>
  );
}
