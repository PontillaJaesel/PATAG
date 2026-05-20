import { createFileRoute, Link, redirect, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { db } from "@/db/index"; // Assumes your db is exported from here!
import { AppNav } from "@/components/AppNav";
import { ArrowLeft, Building2, Calendar, ShieldCheck, FileText, Landmark, MapPin, ThumbsDown, ThumbsUp } from "lucide-react";
import { getUser } from "@/lib/auth";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useOfficialReactions } from "@/lib/official-reactions";
import { getAgencySecretaryPhotoPath, getOfficialPhotoPath } from "@/lib/public-images";
import { z } from "zod";

// 1. Fetch the data directly from SQLite
const getOfficialById = createServerFn({ method: "POST" })
  .inputValidator(z.string())
  .handler(async ({ data: id }) => {
    const officialId = Number(id);
    if (Number.isNaN(officialId)) return null;

    if (officialId < 0) {
      const agencyId = Math.abs(officialId);
      const agencyResult = await db.execute({
        sql: "SELECT * FROM agencies WHERE id = ?",
        args: [agencyId],
      });
      const agencyRow: any = agencyResult.rows[0];
      if (!agencyRow) return null;

      const detailsResult = await db.execute({
        sql: "SELECT * FROM agency_details WHERE agency_id = ?",
        args: [agencyId],
      });
      const detailsRow: any = detailsResult.rows[0] ?? {};

      const programs = JSON.parse(String(agencyRow.programs ?? "[]")) as string[];
      const overviewPoints = JSON.parse(String(agencyRow.overview_points ?? "[]")) as string[];

      return {
        id: officialId,
        name: agencyRow.secretary_name ?? "Unknown Secretary",
        photo: getAgencySecretaryPhotoPath(String(agencyRow.secretary_name ?? "")) || agencyRow.secretary_photo || "",
        title: agencyRow.secretary_title ?? "Secretary",
        department: "Manila",
        branch: "Executive",
        location: "Manila",
        bio: agencyRow.secretary_bio ?? "",
        date_assumed: detailsRow.secretary_assumed_date ?? "N/A",
        status: "Active",
        appointed_by: "Office of the President",
        policies: overviewPoints,
        careerHistory: [
          {
            period: detailsRow.secretary_assumed_date ?? "Current",
            role: agencyRow.secretary_title ?? "Secretary",
          },
        ],
        publicRecords: [
          { title: "Agency Mandate", value: agencyRow.mandate ?? "" },
          { title: "Service Scope", value: agencyRow.kind ?? "Executive" },
        ],
        news: agencyRow.description ?? "",
        sources: agencyRow.website ?? "",
        promises: programs.map((program: string) => ({
          title: program,
          status: "In Progress",
          link: program,
        })),
      };
    }

    const result = await db.execute({
      sql: "SELECT * FROM officials WHERE id = ?",
      args: [officialId]
    });

    const row: any = result.rows[0];
    if (!row) return null;

    // Parse the JSON stringified arrays back into real React arrays
    return {
      ...row,
      policies: JSON.parse(row.policies),
      careerHistory: JSON.parse(row.career_history),
      publicRecords: JSON.parse(row.public_records),
      promises: JSON.parse(row.promises)
    };
  });

// 2. Pass the data through the Route loader
export const Route = createFileRoute("/officials/$officialId")({
  beforeLoad: () => { if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" }); },
  loader: async ({ params }) => {
    const official = await getOfficialById({ data: params.officialId });
    if (!official) throw notFound();
    return official;
  },
  head: ({ loaderData }) => {
    return { 
      meta: [
        { title: `${loaderData?.name ?? "Official"} — P.A.T.A.G.` }, 
        { name: "description", content: loaderData?.bio ?? "" }
      ] 
    };
  },
  component: OfficialProfile,
  notFoundComponent: () => <div className="p-10 text-center text-cocoa font-display text-2xl">Official not found</div>,
});

function OfficialProfile() {
  // 3. Grab the loaded database data
  const o = Route.useLoaderData();
  const { likes, dislikes } = useOfficialReactions(String(o.id));

  // Fallback for photo if one isn't in the DB yet
  const localPhotoPath = getOfficialPhotoPath(o.name);
  const photoUrl =
    localPhotoPath ||
    o.photo ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(o.name)}&size=400&background=F3F0EA&color=34251D`;

  return (
    <div className="min-h-screen bg-muted">
      <AppNav />
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
        <Link to="/officials" className="inline-flex items-center gap-2 text-sm font-semibold text-cocoa hover:text-rust">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        {/* 4. Updated Grid for 3 Columns on Extra Large Screens (matching your screenshot) */}
        <div className="mt-4 grid gap-5 xl:grid-cols-[300px_1fr_360px] lg:grid-cols-[300px_1fr]">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="space-y-5">
            <div className="overflow-hidden rounded-3xl bg-white p-3 shadow-card">
              <img
                src={photoUrl}
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
              <div className="font-display text-lg font-bold text-cocoa">Policies and Laws</div>
              <ul className="mt-3 space-y-2 text-sm font-medium">
                {o.policies.map((p: string) => (
                  <li key={p}>
                    <a className="text-rust underline-offset-4 hover:underline cursor-pointer">{p}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ================= MIDDLE COLUMN ================= */}
          <div className="space-y-5">
            {/* Header card */}
            <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
              <h1 className="font-display text-3xl font-bold text-onyx sm:text-5xl">{o.name}</h1>
              <p className="mt-2 text-base font-medium text-cocoa sm:text-lg">{o.title}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">
                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${likes > 0 ? "bg-forest/15 text-forest" : "bg-muted text-cocoa"}`}>
                  <ThumbsUp className="h-3.5 w-3.5" /> Likes {likes}
                </span>
                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${dislikes > 0 ? "bg-rust/15 text-rust" : "bg-muted text-cocoa"}`}>
                  <ThumbsDown className="h-3.5 w-3.5" /> Dislikes {dislikes}
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <InfoTile icon={<Building2 className="h-4 w-4" />} label="DEPARTMENT" value={o.department} />
                <InfoTile icon={<Calendar className="h-4 w-4" />} label="DATE ASSUMED" value={o.date_assumed} />
                <InfoTile icon={<ShieldCheck className="h-4 w-4" />} label="STATUS" value={o.status} />
                <InfoTile icon={<FileText className="h-4 w-4" />} label="APPOINTED BY" value={o.appointed_by ?? "—"} />
              </div>

              <p className="mt-5 text-xs italic text-coffee/60">Official Seal: [Government Insignia]</p>
            </div>

            {/* Career History */}
            <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
              <h2 className="font-display text-2xl font-bold text-onyx">Career History</h2>
              <ul className="mt-5 space-y-4">
                {o.careerHistory.map((c: any) => (
                  <li key={c.period} className="flex gap-3 text-sm text-cocoa">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-forest" />
                    <span><b>{c.period}</b> — {c.role}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Accordions */}
            <Accordion type="multiple" className="space-y-3">
              <AccordionShell value="position-history" title="Position History">
                <ul className="space-y-2 text-sm text-cocoa/85">
                  {o.careerHistory.map((c: any) => (
                    <li key={c.period}><b>{c.period}</b> — {c.role}</li>
                  ))}
                </ul>
              </AccordionShell>

              <AccordionShell value="public-records" title="Public Records">
                <ul className="space-y-3 text-sm text-cocoa/85">
                  {o.publicRecords.map((r: any) => (
                    <li key={r.title}><b>{r.title}:</b> {r.value}</li>
                  ))}
                </ul>
              </AccordionShell>

              <AccordionShell value="news" title="News and Controversies">
                <p className="text-sm text-cocoa/80">{o.news}</p>
              </AccordionShell>

              <AccordionShell value="sources" title="Sources and References">
                <p className="text-sm text-cocoa/80">{o.sources}</p>
              </AccordionShell>
            </Accordion>
          </div>

          {/* ================= RIGHT COLUMN (Campaign Promises) ================= */}
          <div className="space-y-5 lg:col-span-2 xl:col-span-1">
            <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
              <h2 className="font-display text-2xl font-bold text-onyx">Campaign Promise Tracker</h2>
              <p className="mt-1.5 text-sm text-cocoa/70">Pre-election commitments and current delivery status.</p>
              
              <div className="mt-8 space-y-6">
                {o.promises.map((p: any, idx: number) => (
                  <div key={idx} className="border-b border-muted/60 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm font-medium leading-relaxed text-cocoa">{p.title}</p>
                      
                      {/* Dynamic Status Pill Color */}
                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        p.status === 'Fulfilled' ? 'bg-forest/15 text-forest' :
                        p.status === 'In Progress' ? 'bg-copper/15 text-copper' :
                        'bg-rust/15 text-rust'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                    
                    <a className="mt-3 flex items-center gap-1 text-[11px] font-bold tracking-wider text-rust hover:underline underline-offset-4 cursor-pointer">
                      {p.link} ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ---------------- Helper Components ----------------

function InfoTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-muted/50 px-4 py-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-cocoa shadow-sm">{icon}</div>
      <div className="min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-wider text-coffee/70">{label}</div>
        <div className="truncate text-sm font-bold text-onyx">{value}</div>
      </div>
    </div>
  );
}

function AccordionShell({ value, title, children }: { value: string; title: string; children: React.ReactNode }) {
  return (
    <AccordionItem value={value} className="overflow-hidden rounded-2xl border-0 bg-white shadow-card">
      <AccordionTrigger className="px-6 py-5 font-display text-lg font-bold text-onyx hover:no-underline sm:text-xl">
        {title}
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 pt-0">{children}</AccordionContent>
    </AccordionItem>
  );
}