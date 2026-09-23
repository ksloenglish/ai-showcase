import { BackToTop } from "@/components/BackToTop";
import { SiteLayout } from "@/components/SiteLayout";
import { categoryDefinitions, resourceCatalogue, staticAsset } from "@/resourceCatalogue";
import { ArrowDown, ArrowRight, ClipboardCopy, Eye, FolderOpen } from "lucide-react";
import { Link } from "wouter";

const HERO_IMAGE = staticAsset("kslo-hero-editorial_15d4a6d8.jpg");
const PROCESS_IMAGE = staticAsset("kslo-process-editorial_0640bf4b.jpg");
const TEXTURE_IMAGE = staticAsset("kslo-signal-texture_487954d6.jpg");

export default function Home() {
  const resources = resourceCatalogue;

  return (
    <SiteLayout>
      <main id="main-content">
        <section className="hero-section">
          <img src={HERO_IMAGE} alt="" className="hero-art" aria-hidden="true" />
          <div className="hero-overlay" />
          <div className="container relative z-10 grid min-h-[calc(100vh-76px)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div className="max-w-3xl hero-enter">
              <p className="section-kicker text-cyan">K S Lo English · Teacher-made AI resources</p>
              <h1 className="mt-7 font-display text-[clamp(3.5rem,8vw,7.8rem)] font-bold leading-[0.86] tracking-[-0.075em] text-white">
                AI Resource<br /><span className="text-cyan">Showcase.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-white/68 sm:text-xl">
                See the result. Study the method. Make it your own. Explore classroom-ready materials and copy the prompts behind them.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/resources" className="signal-button signal-button-large">
                  Browse {resources.length} resources <ArrowRight size={18} />
                </Link>
                <a href="#how-it-works" className="ghost-button">
                  How it works <ArrowDown size={17} />
                </a>
              </div>
              <div className="mt-12 flex flex-wrap gap-y-3 text-xs font-semibold uppercase tracking-[0.13em] text-white/45">
                <span className="whitespace-nowrap after:mx-3 after:text-white/30 after:content-['·']">{categoryDefinitions.length} categories</span>
                <span className="whitespace-nowrap after:mx-3 after:text-white/30 after:content-['·']">Prompts included</span>
                <span className="whitespace-nowrap">Sample downloads</span>
              </div>
            </div>
            <div className="hidden min-h-[520px] lg:block" aria-hidden="true" />
          </div>
        </section>

        <section className="bg-paper py-20 sm:py-28">
          <div className="container">
            <div className="editorial-heading">
              <div>
                <p className="section-kicker text-slate">The archive</p>
                <h2 className="mt-4 font-display text-4xl font-bold tracking-[-0.05em] sm:text-6xl">Four ways in.</h2>
              </div>
              <p className="max-w-md text-base leading-7 text-slate">
                Browse by the form of the final learning experience—from printable handouts to responsive practice websites.
              </p>
            </div>
            <div className="mt-12 grid border-l border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
              {categoryDefinitions.map(category => {
                const count = resources.filter(resource => resource.category === category.id).length;
                return (
                  <Link key={category.id} href={`/resources?category=${category.id}`} className="category-index group">
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-display text-sm font-bold text-signal-dark">{category.number}</span>
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">{count} resources</span>
                    </div>
                    <h3 className="mt-14 font-display text-2xl font-bold tracking-[-0.03em]">{category.shortTitle}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate">{category.description}</p>
                    <ArrowRight className="mt-8 transition-transform duration-200 group-hover:translate-x-1" size={20} />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-paper pb-20 pt-0 sm:pb-28">
          <div className="container grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="order-2 lg:order-1">
              <p className="section-kicker text-slate">A reusable method</p>
              <h2 className="mt-4 max-w-xl font-display text-4xl font-bold leading-[0.95] tracking-[-0.055em] sm:text-6xl">
                Don’t just download it. Understand it.
              </h2>
              <div className="mt-10 grid gap-7">
                {[
                  [Eye, "01", "Preview the result", "See the finished classroom material before reading the instructions behind it."],
                  [FolderOpen, "02", "Inspect the process", "Review what you need, how the prompt works and what must be checked."],
                  [ClipboardCopy, "03", "Copy and adapt", "Copy the complete tested prompt, then change the clearly marked variables."],
                ].map(([Icon, number, title, copy]) => {
                  const StepIcon = Icon as typeof Eye;
                  return (
                    <div key={String(number)} className="process-step">
                      <span className="grid size-11 place-items-center bg-ink text-cyan"><StepIcon size={19} /></span>
                      <div>
                        <p className="folio-label text-slate">{String(number)}</p>
                        <h3 className="mt-1 font-display text-xl font-bold">{String(title)}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate">{String(copy)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="order-1 overflow-hidden bg-ink p-3 shadow-[0_24px_70px_rgba(7,19,31,0.18)] lg:order-2">
              <img src={PROCESS_IMAGE} alt="An output, prompt and adapted classroom material connected by a cyan signal line." className="aspect-[3/2] w-full object-cover" />
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
          <img src={TEXTURE_IMAGE} alt="" className="absolute inset-0 size-full object-cover opacity-70" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <p className="section-kicker text-cyan">For teachers, by teachers</p>
              <h2 className="mt-5 font-display text-5xl font-bold leading-[0.94] tracking-[-0.06em] sm:text-7xl">
                Take the prompt.<br />Make the next resource yours.
              </h2>
              <Link href="/resources" className="signal-button signal-button-large mt-9">
                Open the archive <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <BackToTop />
    </SiteLayout>
  );
}
