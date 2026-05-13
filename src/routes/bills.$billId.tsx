import { createFileRoute, Link, redirect, notFound } from "@tanstack/react-router";
import { AppNav } from "@/components/AppNav";
import { ArrowLeft, Share2, ThumbsUp, ThumbsDown, Bookmark, CheckCircle2 } from "lucide-react";
import { bills, stages } from "@/lib/mock-data";
import { Stepper } from "./bills.index";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/bills/$billId")({
  beforeLoad: () => { if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" }); },
  head: ({ params }) => {
    const b = bills.find((x) => x.id === params.billId);
    return { meta: [{ title: `${b?.title ?? "Bill"} — P.A.T.A.G.` }, { name: "description", content: b?.description ?? "" }] };
  },
  component: BillPage,
});

function BillPage() {
  const { billId } = Route.useParams();
  const b = bills.find((x) => x.id === billId);
  if (!b) throw notFound();
  const total = b.pulse.approve + b.pulse.disapprove;

  return (
    <div className="min-h-screen bg-cream">
      <AppNav />
      <section className="bg-gradient-to-br from-coffee via-cocoa to-onyx text-cream">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <Link to="/bills/" className="inline-flex items-center gap-2 text-sm text-cream/80 hover:text-cream">
            <ArrowLeft className="h-4 w-4" /> ALL BILLS
          </Link>
          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-copper px-2 py-0.5 font-semibold">{b.number}</span>
                <span className="rounded-full bg-cream/15 px-2 py-0.5 font-semibold">{b.category}</span>
              </div>
              <h1 className="mt-2 font-display text-4xl uppercase tracking-wider">{b.title}</h1>
              <p className="mt-1 text-cream/80">{b.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <Pill icon={<ThumbsUp className="h-3 w-3" />}>APPROVE</Pill>
                <Pill icon={<ThumbsDown className="h-3 w-3" />}>DISAPPROVE</Pill>
                <Pill icon={<Bookmark className="h-3 w-3" />}>BOOKMARK</Pill>
              </div>
            </div>
            <div className="text-right text-xs">
              <div className="text-cream/70">Filed {b.filed}</div>
              <button className="mt-2 inline-flex items-center gap-1 rounded-full bg-cream/15 px-3 py-1 hover:bg-cream/25"><Share2 className="h-3 w-3" /> SHARE</button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-6 py-10 lg:grid-cols-[1fr,300px]">
        <div className="space-y-5">
          <div className="rounded-2xl border border-tan bg-white p-5 shadow-card">
            <Stepper stage={b.stage} />
            <ul className="mt-4 space-y-1 text-sm text-cocoa">
              {stages.map((s, i) => {
                const idx = i + 1;
                const done = idx <= b.stage;
                return <li key={s} className="flex items-center gap-2">{done ? <CheckCircle2 className="h-4 w-4 text-forest" /> : <span className="grid h-4 w-4 place-items-center rounded-full border border-tan text-[10px]">○</span>}{s}</li>;
              })}
            </ul>
          </div>
          <div className="rounded-2xl border border-tan bg-white p-5 shadow-card">
            <div className="text-xs uppercase tracking-wider text-mocha">📋 Summary</div>
            <h3 className="mt-1 font-display text-xl text-cocoa">What this bill does</h3>
            <p className="mt-2 text-sm text-cocoa/85">{b.summary}</p>
          </div>
          <div className="rounded-2xl border border-tan bg-white p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-rust">📰 In the News</div>
              <span className="rounded-full bg-forest px-2 py-0.5 text-[10px] font-semibold text-cream">✓ VERIFIED: TRUE</span>
            </div>
            <ul className="mt-3 space-y-3">
              {b.news.length === 0 && <li className="text-sm text-coffee">No coverage yet.</li>}
              {b.news.map((n) => (
                <li key={n.title} className="rounded-lg border border-tan/70 bg-cream/40 p-3">
                  <div className="text-[11px] uppercase tracking-wider text-mocha">{n.source}</div>
                  <div className="text-sm font-semibold text-cocoa">{n.title}</div>
                  <div className="text-[11px] text-coffee">{n.timestamp}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-tan bg-white p-5 shadow-card">
            <div className="text-xs uppercase tracking-wider text-mocha">👤 Direct Attribution</div>
            <div className="mt-3 space-y-2">
              {b.authors.map((a) => (
                <div key={a} className="rounded-md border border-tan bg-cream/60 px-3 py-1.5 text-center text-sm font-semibold text-cocoa">{a}</div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-tan bg-white p-5 shadow-card">
            <div className="text-xs uppercase tracking-wider text-mocha">📊 Public Pulse</div>
            <Bar label="APPROVED" value={b.pulse.approve} total={total} color="bg-forest" />
            <Bar label="DISAPPROVED" value={b.pulse.disapprove} total={total} color="bg-rust" />
          </div>
          <div className="rounded-2xl bg-tan/40 p-5 ring-1 ring-tan">
            <div className="text-xs uppercase tracking-wider text-coffee">📣 Take Action</div>
            <div className="mt-1 font-display text-lg text-cocoa">Tell where you stand</div>
            <p className="mt-1 text-xs text-coffee">Send a templated message to the lawmakers handling this bill.</p>
            <button className="mt-3 w-full rounded-full bg-copper py-2 text-sm font-semibold text-cream hover:opacity-90">Open Pressure Hub</button>
          </div>
        </aside>
      </section>
    </div>
  );
}

function Pill({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-1 rounded-full bg-cream/15 px-3 py-1">{icon} {children}</span>;
}
function Bar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const pct = Math.round((value / Math.max(total, 1)) * 100);
  return (
    <div className="mt-3">
      <div className="flex justify-between text-[11px] text-coffee"><span>{label}</span><span>{pct}%</span></div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-tan/50"><div className={"h-full " + color} style={{ width: pct + "%" }} /></div>
    </div>
  );
}
