import { BrandMark } from "@/components/BrandMark";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <div className="container grid gap-12 py-14 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-md">
          <div className="flex items-center gap-3">
            <BrandMark />
            <div>
              <p className="font-display font-bold">K S Lo English</p>
              <p className="text-xs uppercase tracking-[0.16em] text-white/50">HKMA K S Lo College</p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-7 text-white/60">
            Teacher-built AI resources, documented so educators can inspect the result, study the method and adapt the prompt.
          </p>
        </div>
        <div>
          <p className="folio-label text-white/45">Explore</p>
          <div className="mt-5 grid gap-3 text-sm">
            <Link href="/resources" className="footer-link">All resources</Link>
            <Link href="/resources?category=text-based" className="footer-link">Text-based</Link>
            <Link href="/resources?category=visual" className="footer-link">Visual</Link>
            <Link href="/resources?category=interactive" className="footer-link">Interactive</Link>
          </div>
        </div>
        <div>
          <p className="folio-label text-white/45">Department</p>
          <div className="mt-5 grid gap-3 text-sm">
            <Link href="/about" className="footer-link">About the showcase</Link>
            <a href="https://english.kslo.hk/" target="_blank" rel="noreferrer" className="footer-link inline-flex items-center gap-1.5">
              K S Lo English Blog <ArrowUpRight size={14} />
            </a>
            <a href="https://www.hkmakslo.edu.hk/" target="_blank" rel="noreferrer" className="footer-link inline-flex items-center gap-1.5">
              School website <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © {year} K S Lo English</p>
          <p>AI Resource Showcase · Built for teachers</p>
        </div>
      </div>
    </footer>
  );
}
