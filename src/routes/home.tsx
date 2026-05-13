import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { AppNav } from "@/components/AppNav";
import { Footer } from "@/components/Footer";
import { Search, Scale, ShieldCheck, Users, ArrowRight } from "lucide-react";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/home")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" });
  },
  head: () => ({ meta: [{ title: "Home — P.A.T.A.G." }] }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <AppNav />
      <section className="relative overflow-hidden bg-gradient-hero text-cream">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h1 className="font-display text-5xl md:text-6xl">P.A.T.A.G.</h1>
          <p className="mt-2 font-serif-display text-xl text-cream/90">Search and explore the four branches of government.</p>
          <form className="mx-auto mt-6 flex max-w-2xl items-center gap-2 rounded-2xl bg-white p-2 shadow-card">
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-cream/60 px-3">
              <Search className="h-4 w-4 text-coffee" />
              <input className="w-full bg-transparent py-2 text-sm text-onyx outline-none placeholder:text-coffee/60" placeholder="Search government official, bill, or keyword" />
            </div>
            <button className="rounded-xl bg-forest px-5 py-2 text-sm font-semibold text-cream hover:opacity-90">Search</button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="font-display text-2xl text-cocoa">Quick access</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Tile to="/officials/" icon={<Users className="h-5 w-5" />} title="Officials" desc="Search verified profiles for every elected and appointed official." />
          <Tile to="/bills/" icon={<Scale className="h-5 w-5" />} title="Legislative Tracker" desc="Every bill, every stage, every author." />
          <Tile to="/truth-hub" icon={<ShieldCheck className="h-5 w-5" />} title="Truth Media Hub" desc="Detect deepfakes and verify articles in seconds." />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <h2 className="font-display text-2xl text-cocoa">Today across the four branches</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {["Executive","Legislative","Judicial","Civic"].map((b) => (
            <div key={b} className="rounded-2xl bg-gradient-brand p-5 text-cream shadow-card">
              <div className="text-xs uppercase tracking-widest text-cream/70">Branch</div>
              <div className="mt-1 font-display text-xl">{b}</div>
              <p className="mt-2 text-sm text-cream/80">3 new updates today</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Tile({ to, icon, title, desc }: { to: "/officials/" | "/bills/" | "/truth-hub"; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Link to={to} className="group rounded-2xl border border-tan bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-center justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-forest text-cream">{icon}</div>
        <ArrowRight className="h-5 w-5 text-mocha transition group-hover:translate-x-1 group-hover:text-copper" />
      </div>
      <h3 className="mt-4 font-display text-xl text-cocoa">{title}</h3>
      <p className="mt-1 text-sm text-coffee">{desc}</p>
    </Link>
  );
}
