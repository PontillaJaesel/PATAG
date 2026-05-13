import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/Footer";
import shield from "@/assets/patag-shield.png";
import { ArrowRight, Search, Scale, Users, Shield } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "P.A.T.A.G. — Truth is a public utility" },
      { name: "description", content: "Public Access for Truth, Alliances, and Governance. The open Filipino civic platform tracking every peso, every bill, every politician." },
      { property: "og:title", content: "P.A.T.A.G. — Truth is a public utility" },
      { property: "og:description", content: "Track every bill, every peso, and every politician across the four branches of government." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-cream">
      <PublicNav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-cream">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay [background:radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-20 text-center md:flex-row md:py-28 md:text-left">
          <img src={shield} alt="P.A.T.A.G. shield" width={180} height={180} className="h-36 w-36 md:h-44 md:w-44 drop-shadow-2xl" />
          <div className="md:ml-6">
            <h1 className="font-display text-5xl md:text-7xl tracking-tight">P.A.T.A.G.</h1>
            <p className="mt-3 font-serif-display text-2xl md:text-3xl text-cream/95">
              <span className="text-copper font-semibold">Truth</span> is a <span className="underline decoration-2 underline-offset-4">public utility.</span>
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link to="/login" className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-onyx hover:bg-white">
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-5 py-2.5 text-sm font-semibold text-cream hover:bg-white/10">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured strip */}
      <section className="border-y border-tan/60 bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-6 py-6 md:grid-cols-4">
          {["VP Sara","Sen. Hontiveros","VP Leni Robredo","Sen. Pangilinan"].map((n, i) => (
            <div key={n} className="flex items-center gap-3">
              <img src={`https://i.pravatar.cc/120?u=${encodeURIComponent(n)}`} alt={n} loading="lazy" width={56} height={56} className="h-14 w-14 rounded-md object-cover" />
              <div>
                <div className="text-xs uppercase tracking-wide text-mocha">Featured</div>
                <div className="font-semibold text-cocoa">{n}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About copy */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="font-serif-display text-xl leading-relaxed text-cocoa text-balance">
          <strong className="font-semibold">PATAG</strong> — Public Access for Truth, Alliances, and Governance — is the open Filipino civic platform that follows every peso, every bill, and every politician across the four branches of government.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Step n="01" t="Search anything below" />
          <Step n="02" t="Scan today's front page" />
          <Step n="03" t="Take action in your district" />
        </div>
        <div className="mt-6 text-sm text-mocha">
          Global Search · Politicians · Bills · Agencies · Issues
        </div>
      </section>

      {/* Branches */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <p className="font-display text-sm uppercase tracking-[0.2em] text-mocha">The Front Page</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl text-rust">Today across the four branches.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <BranchCard title="Executive" icon={<Shield className="h-5 w-5" />} className="bg-gradient-to-br from-rust to-cocoa" />
          <BranchCard title="Legislative" icon={<Scale className="h-5 w-5" />} className="bg-gradient-to-br from-coffee to-onyx" />
          <BranchCard title="Judicial" icon={<Users className="h-5 w-5" />} className="bg-gradient-to-br from-mocha to-tan" />
          <BranchCard title="Civic" icon={<Search className="h-5 w-5" />} className="bg-gradient-to-br from-tan to-mocha" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Step({ n, t }: { n: string; t: string }) {
  return (
    <div className="rounded-xl border border-tan bg-white/60 p-4">
      <div className="font-display text-2xl text-copper">{n}</div>
      <div className="mt-1 text-sm text-cocoa">{t}</div>
    </div>
  );
}

function BranchCard({ title, icon, className = "" }: { title: string; icon: React.ReactNode; className?: string }) {
  return (
    <div className={"flex h-32 items-center justify-center rounded-2xl text-cream shadow-card " + className}>
      <div className="flex flex-col items-center gap-2">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur">{icon}</div>
        <div className="font-display text-lg">{title}</div>
      </div>
    </div>
  );
}
