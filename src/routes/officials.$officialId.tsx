import { createFileRoute, Link, redirect, notFound } from "@tanstack/react-router";
import { AppNav } from "@/components/AppNav";
import { ArrowLeft, Building2, Calendar, ShieldCheck, FileText, Landmark, MapPin } from "lucide-react";
import { officials } from "@/lib/mock-data";
import { getUser } from "@/lib/auth";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const Route = createFileRoute("/officials/$officialId")({
  beforeLoad: () => { if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" }); },
  head: ({ params }) => {
    const o = officials.find((x) => x.id === params.officialId);
    return { meta: [{ title: `${o?.name ?? "Official"} — P.A.T.A.G.` }, { name: "description", content: o?.bio ?? "" }] };
  },
  component: OfficialProfile,
  notFoundComponent: () => <div className="p-10 text-center">Official not found</div>,
});

function OfficialProfile() {
  const { officialId } = Route.useParams();
  const o = officials.find((x) => x.id === officialId);
  if (!o) throw notFound();

  return (
    <div className="min-h-screen bg-muted">
      <AppNav />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link to="/officials/" className="inline-flex items-center gap-2 text-sm font-semibold text-cocoa hover:text-rust">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(260px,360px)_1fr]">
          {/* LEFT COLUMN */}
          <div className="space-y-5">
            <div className="overflow-hidden rounded-3xl bg-white p-3 shadow-card">
              <img
                src={o.photo}
                alt={o.name}
                className="aspect-square w-full rounded-2xl object-cover"
              />
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-card">
              <div className="mb-3 flex flex-wrap gap-2 text-[11px]">
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 font-semibold text-cocoa">
                  <Landmark className="h-3.5 w-3.5" /> {o.branch.toUpperCase()}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 font-semibold text-copper">
                  <MapPin className="h-3.5 w-3.5" /> {o.location.toUpperCase()}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-cocoa/85">{o.bio}</p>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-card">
              <div className="font-display text-lg text-cocoa">Policies and Laws</div>
              <ul className="mt-2 space-y-1.5 text-sm">
                {o.policies.map((p) => (
                  <li key={p}>
                    <Link
                      to="/bills/"
                      search={{ q: p }}
                      className="text-rust underline-offset-2 hover:underline"
                    >
                      {p}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-5">
            {/* Header card */}
            <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
              <h1 className="font-display text-3xl font-bold text-onyx sm:text-5xl">{o.name}</h1>
              <p className="mt-2 text-base font-medium text-cocoa sm:text-lg">{o.position}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <InfoTile icon={<Building2 className="h-4 w-4" />} label="DEPARTMENT" value={o.branch} />
                <InfoTile icon={<Calendar className="h-4 w-4" />} label="DATE ASSUMED" value={o.dateAssumed} />
                <InfoTile icon={<ShieldCheck className="h-4 w-4" />} label="STATUS" value={o.status} />
                <InfoTile icon={<FileText className="h-4 w-4" />} label="APPOINTED BY" value={o.appointedBy ?? "—"} />
              </div>

              <p className="mt-4 text-sm italic text-coffee/80">Official Seal: [Government Insignia]</p>
            </div>

            {/* Career History */}
            <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
              <h2 className="font-display text-2xl font-bold text-onyx">Career History</h2>
              <ul className="mt-4 space-y-3">
                {o.career.map((c) => (
                  <li key={c.period} className="flex gap-3 text-sm text-cocoa">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-forest" />
                    <span><b>{c.period}:</b> {c.role}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Accordions */}
            <Accordion type="multiple" className="space-y-3">
              <AccordionShell value="position-history" title="Position History">
                <ul className="space-y-2 text-sm text-cocoa/85">
                  {o.career.map((c) => (
                    <li key={c.period}><b>{c.period}</b> — {c.role}</li>
                  ))}
                </ul>
              </AccordionShell>

              <AccordionShell value="public-records" title="Public Records">
                <ul className="space-y-2 text-sm text-cocoa/85">
                  {o.records.map((r) => (
                    <li key={r.label}><b>{r.label}:</b> {r.value}</li>
                  ))}
                </ul>
              </AccordionShell>

              <AccordionShell value="news" title="News and Controversies">
                <p className="text-sm text-cocoa/80">No additional records available at this time.</p>
              </AccordionShell>

              <AccordionShell value="sources" title="Sources and References">
                <p className="text-sm text-cocoa/80">Government Gazette, COA Reports, Official Department Releases.</p>
              </AccordionShell>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-muted px-4 py-3">
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-white text-cocoa">{icon}</div>
      <div className="min-w-0">
        <div className="text-[10px] font-bold tracking-wider text-coffee">{label}</div>
        <div className="truncate text-sm font-semibold text-onyx">{value}</div>
      </div>
    </div>
  );
}

function AccordionShell({ value, title, children }: { value: string; title: string; children: React.ReactNode }) {
  return (
    <AccordionItem value={value} className="overflow-hidden rounded-2xl border-0 bg-white shadow-card">
      <AccordionTrigger className="px-6 py-4 font-display text-lg font-bold text-onyx hover:no-underline sm:text-xl">
        {title}
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-5">{children}</AccordionContent>
    </AccordionItem>
  );
}
