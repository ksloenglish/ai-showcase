import { Home } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-paper px-5 text-center text-ink">
      <div className="max-w-lg border-t-4 border-cyan bg-white p-10 shadow-[0_24px_60px_rgba(7,19,31,0.12)]">
        <p className="section-kicker text-slate">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-[-0.05em]">Page not found.</h1>
        <p className="mt-4 leading-7 text-slate">The page may have moved, or its address may be incomplete.</p>
        <Link href="/" className="signal-button mt-8"><Home size={17} /> Return home</Link>
      </div>
    </main>
  );
}
