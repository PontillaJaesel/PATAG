import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { AppNav } from "@/components/AppNav";
import { ThumbsUp, ThumbsDown, Bookmark } from "lucide-react";
import heroImg from "@/assets/legislative-hero.jpg";
import { bills, stages } from "@/lib/mock-data";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/bills/")({
  beforeLoad: () => { if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" }); },
  head: () => ({ meta: [{ title: "Legislative Progress Tracker — P.A.T.A.G." }, { name: "description", content: "Every bill. Every stage. Every author." }] }),
  component: BillsList,
});

function BillsList() {
  return (
    <div className="min-h-screen bg-cream">
      <AppNav />
      <section className="relative overflow-hidden border-b border-tan bg-onyx">
        <img src={heroImg} alt="" width={1536} height={640} className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-onyx/90 via-onyx/40 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <h1 className="font-display text-4xl md:text-6xl text-cream tracking-wider">LEGISLATIVE PROGRESS TRACKER</h1>
          <p className="mt-2 font-serif-display italic text-cream/80">every bill. every stage. every author.</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-4 px-6 py-10">
        {bills.map((b) => (
          <Link key={b.id} to="/bills/$billId" params={{ billId: b.id }} className="block rounded-2xl border border-tan bg-white p-5 shadow-card transition hover:-translate-y-0.5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-copper px-2 py-0.5 font-semibold text-cream">{b.number}</span>
                  <span className="rounded-full bg-tan/60 px-2 py-0.5 font-semibold text-cocoa">{b.category}</span>
                </div>
                <h3 className="mt-2 font-display text-2xl text-cocoa">{b.title}</h3>
                <p className="text-sm text-coffee">{b.description}</p>
              </div>
              <div className="text-right text-xs text-mocha shrink-0">Filed {b.filed}</div>
            </div>

            <Stepper stage={b.stage} />

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-coffee">
                <span className="uppercase tracking-wider">Authored by</span>{" "}
                {b.authors.map((a) => (
                  <span key={a} className="ml-1 inline-block rounded-full bg-tan/60 px-2 py-0.5 text-cocoa">{a}</span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <IconBtn className="bg-forest/15 text-forest"><ThumbsUp className="h-4 w-4" /></IconBtn>
                <IconBtn className="bg-rust/15 text-rust"><ThumbsDown className="h-4 w-4" /></IconBtn>
                <IconBtn className="bg-cocoa/15 text-cocoa"><Bookmark className="h-4 w-4" /></IconBtn>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}

export function Stepper({ stage }: { stage: number }) {
  return (
    <div className="mt-4">
      <div className="text-[10px] uppercase tracking-[0.2em] text-mocha">Legislative Process</div>
      <div className="relative mt-2 flex items-center justify-between">
        <div className="absolute left-3 right-3 top-1/2 h-px -translate-y-1/2 bg-tan" />
        {stages.map((s, i) => {
          const idx = i + 1;
          const done = idx < stage;
          const active = idx === stage;
          return (
            <div key={s} className="relative z-10 flex flex-col items-center text-[10px]">
              <div className={
                "grid h-7 w-7 place-items-center rounded-full text-xs font-bold ring-4 ring-white " +
                (done ? "bg-forest text-cream" : active ? "bg-copper text-cream" : "bg-cream text-coffee border border-tan")
              }>{done ? "✓" : idx}</div>
              <div className="mt-1 uppercase tracking-wide text-coffee">{s}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function IconBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <button onClick={(e) => e.preventDefault()} className={"grid h-9 w-9 place-items-center rounded-full hover:opacity-80 " + className}>{children}</button>;
}
