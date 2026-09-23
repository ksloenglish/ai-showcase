import { BrandMark } from "@/components/BrandMark";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="container flex h-[76px] items-center justify-between gap-6">
        <Link href="/" className="group flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <BrandMark className="shrink-0" />
          <span className="min-w-0 leading-none">
            <span className="block truncate font-display text-[0.98rem] font-bold tracking-[-0.02em] text-white">
              K S Lo English
            </span>
            <span className="mt-2 block truncate text-[0.63rem] font-semibold uppercase tracking-[0.18em] text-white/55">
              HKMA K S Lo College
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map(item => {
            const active = item.href === "/" ? location === "/" : location.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${active ? "nav-link-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="grid size-11 place-items-center border border-white/20 text-white md:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen(value => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <nav className="mobile-nav md:hidden" aria-label="Mobile navigation">
          <div className="container grid gap-2 py-4">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-white/10 px-2 py-3 font-display text-lg text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
