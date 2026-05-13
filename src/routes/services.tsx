import { createFileRoute } from "@tanstack/react-router";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/Footer";
import { Scale, Search, Newspaper, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — P.A.T.A.G." },
      { name: "description", content: "Tools PATAG offers: officials directory, bill tracker, truth media hub." },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-cream">
      <PublicNav />
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="font-display text-5xl text-cocoa">Service</h1>
        <p className="mt-3 font-serif-display text-xl text-coffee">A toolkit for everyday accountability.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            { i: <Search className="h-5 w-5" />, t: "Officials Directory", d: "Verified profiles for every elected and appointed official." },
            { i: <Scale className="h-5 w-5" />, t: "Legislative Tracker", d: "Every bill, every stage, every author." },
            { i: <ShieldCheck className="h-5 w-5" />, t: "Truth Media Hub", d: "Detect deepfakes and verify articles." },
            { i: <Newspaper className="h-5 w-5" />, t: "Public Pulse", d: "Civic sentiment grounded in evidence." },
          ].map((s) => (
            <div key={s.t} className="rounded-2xl border border-tan bg-white p-6 shadow-card">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-forest text-cream">{s.i}</div>
              <h3 className="mt-4 font-display text-xl text-cocoa">{s.t}</h3>
              <p className="mt-1 text-sm text-coffee">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  ),
});
