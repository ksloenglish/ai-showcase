import { BackToTop } from "@/components/BackToTop";
import { PromptPanel } from "@/components/PromptPanel";
import { ResourceCard } from "@/components/ResourceCard";
import { SiteLayout } from "@/components/SiteLayout";
import { parseResourceMarkdown, type ParsedGuide } from "@/lib/resourceMarkdown";
import { resourceBySlug, resourceCatalogue } from "@/resourceCatalogue";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Download, ExternalLink, LoaderCircle, Play, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Streamdown } from "streamdown";
import { Link, useParams, useSearch } from "wouter";
import { getResourceArchiveSearch } from "@/lib/resourceFilters";

const actionIcon = {
  download: Download,
  "live-site": ExternalLink,
  video: Play,
  "ai-tool": ExternalLink,
};

function GuideSection({ eyebrow, title, body, tone = "paper" }: { eyebrow: string; title: string; body: string; tone?: "paper" | "mist" | "warning" }) {
  if (!body) return null;
  return (
    <section className={`guide-section guide-section-${tone}`}>
      <p className="folio-label text-slate">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.04em] sm:text-4xl">{title}</h2>
      <div className="guide-copy mt-6"><Streamdown>{body}</Streamdown></div>
    </section>
  );
}

export default function ResourceDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const search = useSearch();
  const archiveSearch = getResourceArchiveSearch(search);
  const resource = resourceBySlug[slug];
  const [guide, setGuide] = useState<ParsedGuide | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!resource) return;
    let active = true;
    setGuide(null);
    setError(false);
    fetch(resource.guideUrl)
      .then(response => {
        if (!response.ok) throw new Error("Guide unavailable");
        return response.text();
      })
      .then(markdown => {
        if (active) setGuide(parseResourceMarkdown(markdown));
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, [resource]);

  if (!resource) {
    return (
      <SiteLayout>
        <main id="main-content" className="container py-28 text-center">
          <p className="section-kicker text-slate">Resource not found</p>
          <h1 className="mt-4 font-display text-5xl font-bold">This archive entry does not exist.</h1>
          <Link href={`/resources${archiveSearch}`} className="signal-button mx-auto mt-8 w-fit">Return to resources</Link>
        </main>
      </SiteLayout>
    );
  }

  const Icon = actionIcon[resource.sampleType];
  const related = resourceCatalogue.filter(item => item.category === resource.category && item.slug !== resource.slug).slice(0, 3);
  const external = resource.sampleType !== "download";

  return (
    <SiteLayout>
      <main id="main-content">
        <section className="resource-detail-hero">
          <div className="container py-10 sm:py-14">
            <Link href={`/resources${archiveSearch}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-white/58 hover:text-cyan">
              <ArrowLeft size={15} /> Back to the archive
            </Link>
            <div className="mt-9 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="resource-preview-stage">
                <img src={resource.previewUrl} alt={resource.previewAlt} />
                <span className="resource-detail-code">R{String(resource.order).padStart(2, "0")}</span>
              </div>
              <div>
                <p className="section-kicker text-cyan">{resource.category.replace("-", " ")} · {resource.outputLabel}</p>
                <h1 className="mt-5 font-display text-4xl font-bold leading-[0.94] tracking-[-0.055em] text-white sm:text-6xl">
                  {resource.title}
                </h1>
                <p className="mt-6 text-base leading-8 text-white/64">{resource.summary}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {resource.tags.map(tag => <span key={tag} className="dark-tag">{tag}</span>)}
                </div>
                <a
                  href={resource.sampleUrl}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  download={resource.sampleType === "download" ? true : undefined}
                  className="signal-button signal-button-large mt-9 w-fit"
                >
                  <Icon size={18} /> {resource.outputLabel} {external ? <ArrowUpRight size={17} /> : null}
                </a>
                {resource.sampleType === "ai-tool" ? (
                  <p className="mt-4 max-w-md text-xs leading-5 text-white/45">This external Gemini experience may ask the visitor to sign in.</p>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-paper py-14 sm:py-20">
          <div className="container">
            {error ? (
              <div className="border border-red-900/20 bg-red-50 p-6 text-red-950">The guide could not be loaded. Please try refreshing this page.</div>
            ) : !guide ? (
              <div className="grid min-h-48 place-items-center text-slate"><LoaderCircle className="animate-spin" /></div>
            ) : (
              <div className="mx-auto max-w-5xl">
                <GuideSection eyebrow="Overview" title="What this makes" body={guide.whatThisMakes} />
                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <GuideSection eyebrow="Preparation" title="What you need" body={guide.whatYouNeed} tone="mist" />
                  <GuideSection eyebrow="Workflow" title="How to use it" body={guide.howToUse} tone="mist" />
                </div>
                <div className="mt-8"><PromptPanel prompt={guide.prompt} /></div>
                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                  <section className="guide-callout">
                    <ShieldCheck className="text-cyan" size={24} />
                    <p className="folio-label mt-5 text-slate">Quality check</p>
                    <h2 className="mt-2 font-display text-2xl font-bold">Before classroom use</h2>
                    <div className="guide-copy mt-5"><Streamdown>{guide.beforeClassroomUse}</Streamdown></div>
                  </section>
                  <section className="guide-callout bg-mist">
                    <CheckCircle2 className="text-cyan" size={24} />
                    <p className="folio-label mt-5 text-slate">Adaptation</p>
                    <h2 className="mt-2 font-display text-2xl font-bold">What you can change</h2>
                    <div className="guide-copy mt-5"><Streamdown>{guide.whatYouCanChange}</Streamdown></div>
                  </section>
                </div>
                <GuideSection eyebrow="Fallback" title="If your assistant cannot make the file" body={guide.fallback} tone="warning" />
                {guide.extraSections.map(section => (
                  <GuideSection key={section.heading} eyebrow="Additional guidance" title={section.heading} body={section.body} />
                ))}
              </div>
            )}
          </div>
        </section>

        {related.length ? (
          <section className="bg-mist py-16 sm:py-24">
            <div className="container">
              <div className="editorial-heading">
                <div>
                  <p className="section-kicker text-slate">Continue exploring</p>
                  <h2 className="mt-4 font-display text-4xl font-bold tracking-[-0.05em] sm:text-5xl">Related resources.</h2>
                </div>
                <Link href={`/resources?category=${resource.category}`} className="text-link">View the category <ArrowUpRight size={17} /></Link>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map(item => <ResourceCard key={item.slug} resource={item} archiveSearch={`?category=${resource.category}`} headingLevel="h3" />)}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <BackToTop />
    </SiteLayout>
  );
}
