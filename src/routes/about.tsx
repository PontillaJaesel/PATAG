import { createFileRoute } from "@tanstack/react-router";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — P.A.T.A.G." },
      { name: "description", content: "Why PATAG exists: a civic infrastructure for accountability." },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-cream">
      <PublicNav />
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="font-display text-5xl text-cocoa">About P.A.T.A.G.</h1>
        <p className="mt-6 font-serif-display text-xl text-coffee leading-relaxed">
          PATAG is built on a simple premise: every Filipino deserves a clear, free, and verifiable view of how power is exercised in their name.
        </p>
        <div className="prose prose-stone mt-8 max-w-none text-cocoa/90">
          <p>We aggregate primary sources — legislative dockets, COA reports, Gazette issuances, and verified press coverage — into a single searchable surface. Nothing is paywalled. Nothing is editorialized.</p>
          <p>Our mission is to lower the cost of civic literacy from hours to seconds.</p>
        </div>
      </section>
      <Footer />
    </div>
  ),
});
