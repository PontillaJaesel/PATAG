import { createFileRoute, Link, redirect, notFound } from "@tanstack/react-router";
import { AppNav } from "@/components/AppNav";
import {
  ArrowLeft,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  CheckCircle2,
  FileText,
  Newspaper,
  Users,
  BarChart3,
  Megaphone,
} from "lucide-react";
import { bills, stages } from "@/lib/mock-data";
import { Stepper } from "./bills.index";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/bills/$billId")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" });
  },
  head: ({ params }) => {
    const b = bills.find((x) => x.id === params.billId);
    return {
      meta: [
        { title: `${b?.title ?? "Bill"} — P.A.T.A.G.` },
        { name: "description", content: b?.description ?? "" },
      ],
    };
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

      {/* Hero */}
      <section className="bg-[#34251D] text-cream">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <Link
            to="/bills"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cream/70 transition-colors hover:text-cream"
          >
            <ArrowLeft className="h-4 w-4" /> All Bills
          </Link>

          <div className="mt-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-wider">
              <span className="rounded-full bg-copper px-4 py-2 text-cream shadow-sm">{b.number}</span>
              <span className="rounded-full bg-cream px-4 py-2 text-[#34251D] shadow-sm">{b.category}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-wider">
              <span className="rounded-full bg-cream px-4 py-2 text-[#34251D] shadow-sm">Filed {b.filed}</span>
              <button className="inline-flex items-center gap-1.5 rounded-full bg-cream px-4 py-2 text-[#34251D] shadow-sm transition-colors hover:bg-white">
                <Share2 className="h-3.5 w-3.5" /> Share
              </button>
            </div>
          </div>

          <div className="mt-12 max-w-4xl pb-4">
            <h1 className="font-display text-5xl font-bold uppercase leading-[1.1] tracking-wide text-cream md:text-[64px]">
              {b.title}
            </h1>
            <p className="mt-6 font-sans text-xl font-light text-cream/90">{b.description}</p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Pill icon={<ThumbsUp className="h-4 w-4" />}>Approve</Pill>
              <Pill icon={<ThumbsDown className="h-4 w-4" />}>Disapprove</Pill>
              <Pill icon={<Bookmark className="h-4 w-4" />}>Bookmark</Pill>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          {/* Legislative Process */}
          <div className="rounded-[32px] bg-white p-8 shadow-card">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-rust">
              <CheckCircle2 className="h-4 w-4" /> Legislative Process
            </div>
            
            <div className="mt-8">
              <Stepper stage={b.stage} />
            </div>

            <ul className="mt-10 space-y-5">
              {stages.map((s, i) => {
                const idx = i + 1;
                const done = idx < b.stage;
                const current = idx === b.stage;
                const status = done
                  ? idx === 1
                    ? `Filed ${b.filed}`
                    : "Cleared"
                  : current
                  ? "Currently Here"
                  : "Pending";
                return (
                  <li key={s} className="flex items-center justify-between">
                    <span className="flex items-center gap-3 text-[13px] font-bold uppercase tracking-wider text-cocoa">
                      {done ? (
                        <CheckCircle2 className="h-5 w-5 text-forest" />
                      ) : current ? (
                        <span className="h-5 w-5 rounded-full border-2 border-forest bg-forest" />
                      ) : (
                        <span className="h-5 w-5 rounded-full border-2 border-cocoa/30 bg-transparent" />
                      )}
                      {s}
                    </span>
                    <span className="text-xs font-medium text-cocoa/80">{status}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Summary */}
          <div className="rounded-[32px] bg-white p-8 shadow-card">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-rust">
              <FileText className="h-4 w-4" /> Summary
            </div>
            <h3 className="mt-6 font-display text-3xl font-semibold text-cocoa">What this bill does</h3>
            <div className="mt-6 rounded-2xl border border-dotted border-cocoa/40 bg-transparent p-6 text-[15px] leading-relaxed text-cocoa/90">
              {b.summary}
            </div>
          </div>

          {/* In the News */}
          <div className="rounded-[32px] bg-white p-8 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-rust">
                <Newspaper className="h-4 w-4" /> In the News
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cream">
                <CheckCircle2 className="h-3.5 w-3.5" /> Verified
              </span>
            </div>
            <ul className="mt-8 space-y-4">
              {b.news.length === 0 && (
                <li className="text-sm font-medium text-cocoa/70">No coverage yet.</li>
              )}
              {b.news.map((n) => (
                <li key={n.title} className="rounded-2xl border border-dotted border-cocoa/40 bg-transparent p-5">
                  <div className="text-[11px] uppercase tracking-wider text-mocha">{n.source}</div>
                  <div className="mt-1 text-base font-semibold uppercase tracking-wide text-cocoa">
                    {n.title}
                  </div>
                  <div className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-coffee">
                    {n.timestamp}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="rounded-[32px] bg-white p-8 shadow-card">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-rust">
              <Users className="h-4 w-4" /> Direct Attribution
            </div>
            <div className="mt-6 space-y-3">
              {b.authors.map((a) => (
                <div
                  key={a}
                  className="rounded-full bg-[#E5D7CE] px-5 py-3 text-center text-[13px] font-bold uppercase tracking-wider text-cocoa shadow-sm"
                >
                  {a}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] bg-white p-8 shadow-card">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-rust">
              <BarChart3 className="h-4 w-4" /> Public Pulse
            </div>
            <div className="mt-6 space-y-6">
              <Bar label="Approved" value={b.pulse.approve} total={total} color="bg-forest" />
              <Bar label="Disapproved" value={b.pulse.disapprove} total={total} color="bg-rust" />
            </div>
          </div>

          <div className="rounded-[32px] bg-[#E3D6CD] p-8 shadow-card">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-cocoa/60">
              <Megaphone className="h-4 w-4" /> Take Action
            </div>
            <div className="mt-6 font-display text-2xl font-bold text-cocoa">Tell where you stand</div>
            <p className="mt-2 text-[15px] leading-relaxed text-cocoa/80">
              Send a templated message to the lawmakers handling this bill.
            </p>
            <button className="mt-8 w-full rounded-full bg-copper py-3.5 text-[15px] font-bold text-cream shadow-sm transition-opacity hover:opacity-90">
              Open Pressure Hub
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
}

function Pill({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[#34251D] shadow-sm transition-colors hover:bg-white">
      {icon} {children}
    </button>
  );
}

function Bar({
  label,
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
}) {
  const pct = Math.round((value / Math.max(total, 1)) * 100);
  return (
    <div>
      <div className="flex justify-between text-[13px] font-bold uppercase tracking-wider text-cocoa">
        <span>{label}</span>
        {/* Leaving the percentage text out to match the exact visual style in the SVG */}
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-cocoa/10">
        <div className={`h-full rounded-full ${color}`} style={{ width: pct + "%" }} />
      </div>
    </div>
  );
}