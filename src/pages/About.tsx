import { BackToTop } from "@/components/BackToTop";
import { SiteLayout } from "@/components/SiteLayout";
import { staticAsset } from "@/resourceCatalogue";
import { ArrowRight, CheckCircle2, Compass, HeartHandshake, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

const PROCESS_IMAGE = staticAsset("kslo-process-editorial_0640bf4b.jpg");

export default function About() {
  return (
    <SiteLayout>
      <main id="main-content">
        <section className="archive-hero">
          <div className="container grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="section-kicker text-cyan">About the showcase</p>
              <h1 className="mt-5 font-display text-5xl font-bold leading-[0.9] tracking-[-0.065em] text-white sm:text-7xl lg:text-8xl">
                Built in school.<br />Shared with teachers.
              </h1>
            </div>
            <p className="max-w-lg text-base leading-8 text-white/62 lg:justify-self-end">
              K S Lo English documents both the classroom outcome and the method behind it, so useful AI practice can travel beyond one lesson or one teacher.
            </p>
          </div>
        </section>

        <section className="bg-paper py-20 sm:py-28">
          <div className="container grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="section-kicker text-slate">Our purpose</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[0.96] tracking-[-0.05em] sm:text-6xl">Useful results. Visible thinking.</h2>
            </div>
            <div className="max-w-2xl text-lg leading-9 text-slate">
              <p>
                This archive presents AI-assisted English learning materials produced by the English Department of HKMA K S Lo College. It is designed for teachers who want to see what was made and understand how to create a related resource themselves.
              </p>
              <p className="mt-6">
                Each entry therefore pairs an authentic sample with a carefully structured guide, a complete copyable prompt and the checks that protect classroom accuracy.
              </p>
              <figure className="mt-10 bg-ink p-2 shadow-[0_22px_60px_rgba(7,19,31,0.18)]">
                <img src={PROCESS_IMAGE} alt="A classroom output, reusable prompt and adapted material connected as a three-stage process." className="aspect-[3/2] w-full object-cover" />
                <figcaption className="px-3 py-3 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/50">
                  Outcome → method → adapted resource
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="bg-mist py-20 sm:py-28">
          <div className="container">
            <p className="section-kicker text-slate">Principles</p>
            <div className="mt-10 grid border-l border-t border-ink/15 md:grid-cols-3">
              {[
                [Compass, "01", "Practical first", "Resources begin with a clear classroom purpose and a visible finished outcome."],
                [ShieldCheck, "02", "Accuracy matters", "Prompts include source checks, constraints and teacher review before student use."],
                [HeartHandshake, "03", "Share the method", "Teachers receive the process and prompt, not only a downloadable end product."],
              ].map(([Icon, number, title, copy]) => {
                const PrincipleIcon = Icon as typeof Compass;
                return (
                  <article key={String(number)} className="category-index">
                    <PrincipleIcon className="text-cyan" size={24} />
                    <p className="folio-label mt-12 text-slate">{String(number)}</p>
                    <h3 className="mt-3 font-display text-2xl font-bold">{String(title)}</h3>
                    <p className="mt-4 text-sm leading-7 text-slate">{String(copy)}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-ink py-20 text-white sm:py-28">
          <div className="container grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="section-kicker text-cyan">A responsible starting point</p>
              <h2 className="mt-5 font-display text-4xl font-bold tracking-[-0.05em] sm:text-6xl">Review before you reuse.</h2>
            </div>
            <div className="space-y-5 text-sm leading-7 text-white/64">
              {[
                "Check factual content and source-based claims against the original material.",
                "Confirm language level, British English usage and student suitability.",
                "Open every generated file and inspect layout, tables and page breaks.",
              ].map(item => (
                <p key={item} className="flex gap-3"><CheckCircle2 className="mt-1 shrink-0 text-cyan" size={17} /> {item}</p>
              ))}
              <Link href="/resources" className="signal-button mt-7 w-fit">Explore the resources <ArrowRight size={17} /></Link>
            </div>
          </div>
        </section>
      </main>
      <BackToTop />
    </SiteLayout>
  );
}
