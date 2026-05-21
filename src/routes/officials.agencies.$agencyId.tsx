import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { AppNav } from "@/components/AppNav";
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  Calendar,
  Globe,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  UserRound,
  FileText,
} from "lucide-react";
import { db } from "@/db/index";
import { getUser } from "@/lib/auth";
import type { ReactNode } from "react";
import { getAgencyLogoPath, getAgencySecretaryPhotoPath } from "@/lib/public-images";
import { z } from "zod";

type AgencyDetail = {
  id: number;
  name: string;
  acronym: string;
  kind: string;
  description: string;
  mandate: string;
  headquarters: string;
  website: string;
  hotline: string;
  secretary_name: string;
  secretary_title: string;
  secretary_photo: string;
  secretary_bio: string;
  secretary_official_id: number | null;
  secretary_assumed_date: string;
  secretary_tenure_years: number;
  top_accomplishments: string[];
  core_contributions: string[];
  total_budget: number;
  utilized_funds: number;
  unutilized_surplus: number;
  coa_report: {
    audit_opinion: string;
    exception_percent: number;
    resolved_percent: number;
    recommendations_total: number;
    notes: string;
    as_of_date: string;
  } | null;
  programs: {
    id: number;
    name: string;
    phase_label: string;
    completion_percent: number;
    sort_order: number;
  }[];
  news: {
    id: number;
    title: string;
    source: string;
    category: string;
    published_at: string;
    summary: string;
    url: string;
    is_fact_check: number;
    sort_order: number;
  }[];
  procurements: {
    id: number;
    project_name: string;
    contractor_name: string;
    approved_budget: number;
    expected_completion_date: string;
    status: string;
    sort_order: number;
  }[];
};

function safeParseArray(dataString: unknown): string[] {
  if (!dataString) return [];
  const str = String(dataString).trim();
  if (!str) return [];
  if (str.startsWith("[") && str.endsWith("]")) {
    try {
      return JSON.parse(str) as string[];
    } catch {
      // JSON format error fallback handled below
    }
  }
  return str.split(",").map(item => item.trim()).filter(Boolean);
}

// Extraction utility to gracefully navigate varying ORM array shapes
function extractRows(result: any): any[] {
  if (!result) return [];
  if (Array.isArray(result)) return result;
  if (result.rows && Array.isArray(result.rows)) return result.rows;
  if (result.results && Array.isArray(result.results)) return result.results;
  return [];
}

const getAgencyById = createServerFn({ method: "POST" })
  .inputValidator(z.string())
  .handler(async ({ data: id }) => {
  try {
    const agencyIdNum = Number(id);
    if (Number.isNaN(agencyIdNum)) return null;

    // 1. Fetch only the core agency profile first
    const agencyResult = await db.execute({
      sql: "SELECT * FROM agencies WHERE id = ?",
      args: [agencyIdNum],
    });

    const agencyRows = extractRows(agencyResult);
    const agencyRow = agencyRows[0];
    
    if (!agencyRow) {
      console.error(`[PATAG DB DEBUG] No core agency found for ID: ${agencyIdNum}`);
      return null;
    }

    // 2. Fetch extra details separately so an empty sub-table won't break the parent page load
    const detailsResult = await db.execute({
      sql: "SELECT * FROM agency_details WHERE agency_id = ?",
      args: [agencyIdNum],
    });
    
    const detailsRows = extractRows(detailsResult);
    const detailsRow = detailsRows[0] ?? {}; // Use an empty fallback object if row doesn't exist yet

    // 3. Fetch peripheral logs
    const programsResult = await db.execute({
      sql: "SELECT * FROM programs WHERE agency_id = ? ORDER BY sort_order ASC, completion_percent DESC",
      args: [agencyIdNum],
    });

    const newsResult = await db.execute({
      sql: "SELECT * FROM agency_news WHERE agency_id = ? ORDER BY sort_order ASC, published_at DESC",
      args: [agencyIdNum],
    });

    const coaResult = await db.execute({
      sql: "SELECT * FROM coa_reports WHERE agency_id = ? LIMIT 1",
      args: [agencyIdNum],
    });

    const procurementsResult = await db.execute({
      sql: "SELECT * FROM procurements WHERE agency_id = ? ORDER BY sort_order ASC, expected_completion_date ASC",
      args: [agencyIdNum],
    });

    const coaRows = extractRows(coaResult);
    const coaRow = coaRows[0];

    return {
      id: Number(agencyRow.id ?? agencyIdNum),
      name: agencyRow.name ?? "Unknown Agency",
      acronym: agencyRow.acronym ?? "N/A",
      kind: agencyRow.kind ?? "N/A",
      description: agencyRow.description ?? "",
      mandate: agencyRow.mandate ?? "No institutional mandate defined.",
      headquarters: agencyRow.headquarters ?? "N/A",
      website: agencyRow.website ?? "#",
      hotline: agencyRow.hotline ?? "N/A",
      secretary_name: agencyRow.secretary_name ?? "Unassigned / Vacant",
      secretary_title: agencyRow.secretary_title ?? "Acting Secretary",
      secretary_photo: agencyRow.secretary_photo ?? "",
      secretary_bio: agencyRow.secretary_bio ?? "",
      secretary_official_id:
        detailsRow.secretary_official_id ? Number(detailsRow.secretary_official_id) : null,
      secretary_assumed_date: detailsRow.secretary_assumed_date ?? "",
      secretary_tenure_years: Number(detailsRow.secretary_tenure_years ?? 0),
      top_accomplishments: safeParseArray(detailsRow.top_accomplishments),
      core_contributions: safeParseArray(detailsRow.core_contributions),
      total_budget: Number(detailsRow.total_budget ?? 0),
      utilized_funds: Number(detailsRow.utilized_funds ?? 0),
      unutilized_surplus: Number(detailsRow.unutilized_surplus ?? 0),
      coa_report: coaRow
        ? {
            audit_opinion: coaRow.audit_opinion ?? "No Audit Record",
            exception_percent: Number(coaRow.exception_percent ?? 0),
            resolved_percent: Number(coaRow.resolved_percent ?? 0),
            recommendations_total: Number(coaRow.recommendations_total ?? 0),
            notes: coaRow.notes ?? "",
            as_of_date: coaRow.as_of_date ?? "N/A",
          }
        : null,
      programs: extractRows(programsResult).map((p: any) => ({
        id: Number(p.id),
        name: p.name ?? "Unnamed Initiative",
        phase_label: p.phase_label ?? "Planning",
        completion_percent: Number(p.completion_percent ?? 0),
        sort_order: Number(p.sort_order ?? 0),
      })),
      news: extractRows(newsResult).map((n: any) => ({
        id: Number(n.id),
        title: n.title ?? "Public Announcement Log",
        source: n.source ?? "Official Bulletin",
        category: n.category ?? "Notice",
        published_at: n.published_at ?? "N/A",
        summary: n.summary ?? "",
        url: n.url ?? "#",
        is_fact_check: Number(n.is_fact_check ?? 0),
        sort_order: Number(n.sort_order ?? 0),
      })),
      procurements: extractRows(procurementsResult).map((pr: any) => ({
        id: Number(pr.id),
        project_name: pr.project_name ?? "Unspecified Contract",
        contractor_name: pr.contractor_name ?? "Undetermined Winner",
        approved_budget: Number(pr.approved_budget ?? 0),
        expected_completion_date: pr.expected_completion_date ?? "N/A",
        status: pr.status ?? "Pending",
        sort_order: Number(pr.sort_order ?? 0),
      })),
    };
  } catch (error) {
    console.error("Database tracking fault caught inside loader stream:", error);
    return null;
  }
});

export const Route = createFileRoute("/officials/agencies/$agencyId")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" });
  },
  loader: async ({ params }) => {
    const agency = await getAgencyById({ data: params.agencyId });
    if (!agency) throw notFound();
    return agency;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Agency"} — P.A.T.A.G.` },
      { name: "description", content: loaderData?.description ?? "" },
    ],
  }),
  component: AgencyDetailsPage,
  notFoundComponent: () => (
    <div className="p-10 text-center font-display text-2xl text-cocoa">Agency not found</div>
  ),
});

function AgencyDetailsPage() {
  const agency: AgencyDetail = Route.useLoaderData();
  const agencyLogo = getAgencyLogoPath(agency.acronym);
  const secretaryPhoto =
    getAgencySecretaryPhotoPath(agency.secretary_name) ||
    agency.secretary_photo ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(agency.secretary_name)}&size=320&background=F3F0EA&color=34251D`;
  const secretaryLink = agency.secretary_official_id
    ? `/officials/${agency.secretary_official_id}`
    : `/officials/-${agency.id}`;
  const auditReport = agency.coa_report;
  const auditResolvedPercent = auditReport?.resolved_percent ?? 0;
  const auditExceptionPercent = auditReport?.exception_percent ?? 0;

  return (
    <div className="min-h-screen bg-[#FDFBF7] antialiased">
      <AppNav />

      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#1E2E22] via-[#2D221C] to-[#141414] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            to="/officials"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to directory
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em]">
            <span className="rounded-full bg-white px-4 py-1.5 text-[#2D221C] shadow-sm">
              {agency.kind}
            </span>
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-white shadow-sm backdrop-blur-sm">
              {agency.acronym}
            </span>
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-white shadow-sm backdrop-blur-sm">
              {agency.headquarters}
            </span>
          </div>

          <div className="mt-8 max-w-4xl">
            <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-white">
              {agency.name}
            </h1>
            <p className="mt-4 max-w-3xl font-serif text-base sm:text-lg text-white/80 leading-relaxed">
              {agency.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Dashboard */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        
        {/* TIER 1: Layout flex columns */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Left Column: Mandate Info */}
          <section className="w-full lg:w-[28%] bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between self-stretch">
            <div>
              <div className="mb-4 overflow-hidden rounded-2xl border border-stone-100 bg-stone-50 p-4 shadow-2xs">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm">
                    {agencyLogo ? (
                      <img
                        src={agencyLogo}
                        alt={`${agency.name} logo`}
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      <span className="font-display text-lg text-stone-500">{agency.acronym}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Official Directory Image
                    </div>
                    <div className="truncate font-display text-base font-bold text-stone-900">
                      {agency.name}
                    </div>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-[#2D221C]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2D221C]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#2D221C]" /> Mandate Card
              </div>
              <h2 className="mt-4 font-display text-xl font-bold text-stone-900">
                Institutional mandate and core scope
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-600 font-normal">
                {agency.mandate}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-stone-100 space-y-3">
              <InfoTile icon={<MapPin className="h-4 w-4" />} label="Headquarters" value={agency.headquarters} />
              <InfoTile icon={<Globe className="h-4 w-4" />} label="Website" value={agency.website} />
              <InfoTile icon={<Phone className="h-4 w-4" />} label="Hotline" value={agency.hotline} />
              <InfoTile icon={<Building2 className="h-4 w-4" />} label="Service Scope" value={agency.kind} />
              
              <div className="mt-4 rounded-xl bg-stone-50 p-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  Operational Scope
                </div>
                <ul className="mt-2.5 space-y-2 text-xs text-stone-600">
                  {agency.core_contributions?.map((point: string) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E2E22]" />
                      <span className="leading-normal">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Middle Column: Programs & Hub log lines */}
          <div className="w-full lg:w-[46%] space-y-6">
            
            {/* Current Programs */}
            <section className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1E2E22]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1E2E22]">
                <Star className="h-3.5 w-3.5" /> Performance & Activity Hub
              </div>
              <h2 className="mt-3 font-display text-lg font-bold text-stone-900">Current Programs</h2>
              
              <div className="mt-4 space-y-3">
                {agency.programs?.map((program: any) => (
                  <div key={program.id} className="rounded-xl border border-stone-100 bg-stone-50/50 p-4">
                    <div className="flex items-center justify-between gap-3 text-xs font-bold text-stone-800">
                      <span className="truncate">{program.name}</span>
                      <span className="shrink-0 rounded-md bg-white border border-stone-200 px-2 py-0.5 text-[10px] tracking-wide uppercase text-stone-500">
                        {program.phase_label}
                      </span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone-200/70">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#1E2E22] to-[#7D3705] transition-all duration-500"
                        style={{ width: `${program.completion_percent}%` }}
                      />
                    </div>
                    <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      {program.completion_percent}% complete
                    </div>
                  </div>
                ))}
                {(!agency.programs || agency.programs.length === 0) && (
                  <p className="text-xs text-stone-400 italic py-2">No flagship programs currently tracked.</p>
                )}
              </div>
            </section>

            {/* Live News */}
            <section className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
              <h2 className="font-display text-lg font-bold text-stone-900">Live News & Truth Media Hub</h2>
              <div className="mt-4 space-y-3">
                {agency.news?.map((item: any) => (
                  <div key={item.id} className="rounded-xl border border-stone-100 bg-white p-4 hover:border-stone-200 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                          <span className={`rounded-md px-2 py-0.5 ${item.is_fact_check ? "bg-red-50 text-red-700 border border-red-100" : "bg-emerald-50 text-emerald-700 border border-emerald-100"}`}>
                            {item.category}
                          </span>
                          <span className="text-stone-400">{item.source}</span>
                        </div>
                        <h3 className="mt-2 text-sm font-bold text-stone-800 leading-snug">{item.title}</h3>
                      </div>
                      <span className="shrink-0 text-[10px] font-semibold text-stone-400">
                        {item.published_at}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-stone-500">{item.summary}</p>
                  </div>
                ))}
                {(!agency.news || agency.news.length === 0) && (
                  <p className="text-xs text-stone-400 italic py-2">No news logs or public fact checks available.</p>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Secretary Details Preview profile card */}
          <section className="w-full lg:w-[26%] bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden flex flex-col self-stretch">
            <div className="bg-gradient-to-br from-[#1E2E22] to-[#2D221C] p-5 text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                <UserRound className="h-3.5 w-3.5" /> Executive Branch Preview
              </div>
              <p className="mt-2 text-xs text-white/70 uppercase tracking-widest font-bold">Secretary</p>
            </div>
            
            <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
              <div className="flex items-start gap-4">
                <img
                  src={secretaryPhoto}
                  alt={agency.secretary_name}
                  className="h-16 w-16 rounded-xl border border-stone-200 object-cover shadow-sm bg-stone-50 shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-bold text-stone-900 leading-tight truncate">
                    {agency.secretary_name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-[#7D3705] leading-normal">
                    {agency.secretary_title}
                  </p>
                </div>
              </div>

              <div className="space-y-2 bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                <InfoTile icon={<Calendar className="h-4 w-4" />} label="Date Assumed" value={formatDate(agency.secretary_assumed_date)} />
                <InfoTile icon={<ShieldCheck className="h-4 w-4" />} label="Tenure Length" value={formatTenure(agency.secretary_assumed_date)} />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Top Accomplishments
                  </div>
                  <ul className="mt-2 space-y-1.5 text-xs text-stone-600">
                    {agency.top_accomplishments?.map((item: string) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7D3705]" />
                        <span className="leading-normal">{item}</span>
                      </li>
                    ))}
                    {(!agency.top_accomplishments || agency.top_accomplishments.length === 0) && (
                      <p className="text-xs text-stone-400 italic">No historical summary rows loaded.</p>
                    )}
                  </ul>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Core Contributions
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {agency.core_contributions?.map((item: string) => (
                      <span
                        key={item}
                        className="rounded-md border border-stone-200 bg-white px-2 py-0.5 text-[10px] font-medium text-stone-600 shadow-2xs"
                      >
                        {item}
                      </span>
                    ))}
                    {(!agency.core_contributions || agency.core_contributions.length === 0) && (
                      <p className="text-xs text-stone-400 italic">No assigned tag parameters defined.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <Link
                  to={secretaryLink}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#7D3705] px-4 py-2.5 text-xs font-bold text-white transition hover:opacity-90 shadow-2xs"
                >
                  View Full Profile <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* TIER 2: COA Status & Financial Tracking layouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* COA Section */}
          <section className="lg:col-span-4 bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-600">
                <ShieldCheck className="h-3.5 w-3.5" /> Live COA Audit Status
              </div>
              
              <div className="mt-5 flex items-center gap-5">
                <div className="shrink-0 scale-90 origin-left">
                  <DonutGauge resolved={auditResolvedPercent} exception={auditExceptionPercent} />
                </div>
                <div className="min-w-0">
                  <AuditOpinionBadge opinion={auditReport?.audit_opinion ?? "Unknown"} />
                  <div className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    As of {auditReport?.as_of_date ?? "N/A"}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-stone-500 border-t border-stone-100 pt-4">
                {auditReport?.notes ?? "No active audit observations are logged for this entity."}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <InfoTile icon={<Star className="h-4 w-4" />} label="Recommendations" value={String(auditReport?.recommendations_total ?? 0)} />
              <InfoTile icon={<ShieldCheck className="h-4 w-4" />} label="Resolved" value={`${auditResolvedPercent}%`} />
            </div>
          </section>

          {/* Budget Data & Procurements */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Financial tracking allocations row */}
            <section className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-600">
                <Building2 className="h-3.5 w-3.5" /> Budget Allocations
              </div>
              
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Total Fiscal Budget</div>
                  <div className="text-xl font-extrabold text-stone-900 tracking-tight mt-0.5">
                    {formatCurrency(agency.total_budget)}
                  </div>
                </div>
                <div className="sm:text-right">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Utilized / Surplus</div>
                  <div className="text-sm font-bold text-stone-800 mt-0.5">
                    {formatCurrency(agency.utilized_funds)} <span className="text-stone-300 font-normal">/</span> {formatCurrency(agency.unutilized_surplus)}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <BudgetBar total={agency.total_budget} utilized={agency.utilized_funds} surplus={agency.unutilized_surplus} />
              </div>
            </section>

            {/* Procurements */}
            <section className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-600">
                <FileText className="h-3.5 w-3.5" /> Key Procurement & Major Contract Tracker
              </div>

              <div className="mt-4 overflow-hidden rounded-xl border border-stone-200/60">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-stone-200 text-left text-xs">
                    <thead className="bg-stone-50 text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      <tr>
                        <th className="px-4 py-3">Project Name</th>
                        <th className="px-4 py-3">Winning Contractor</th>
                        <th className="px-4 py-3">ABC</th>
                        <th className="px-4 py-3">Expected Completion</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 bg-white">
                      {agency.procurements?.map((procurement: any) => (
                        <tr key={procurement.id} className="hover:bg-stone-50/50 transition-colors text-stone-600">
                          <td className="px-4 py-3.5 font-bold text-stone-800">{procurement.project_name}</td>
                          <td className="px-4 py-3.5">{procurement.contractor_name}</td>
                          <td className="px-4 py-3.5 font-bold text-emerald-700">
                            {formatCurrency(procurement.approved_budget)}
                          </td>
                          <td className="px-4 py-3.5 font-medium">
                            {formatDate(procurement.expected_completion_date)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {(!agency.procurements || agency.procurements.length === 0) && (
                    <div className="p-4 text-center text-xs text-stone-400 italic bg-white">
                      No active PhilGEPS procurement logs recorded.
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function InfoTile({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-stone-50 border border-stone-100 px-3.5 py-2.5 w-full min-w-0">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-stone-700 border border-stone-200/60 shadow-2xs">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[9px] font-bold uppercase tracking-wider text-stone-400">{label}</div>
        <div className="truncate text-xs font-bold text-stone-800 mt-0.5">{value || "N/A"}</div>
      </div>
    </div>
  );
}

function AuditOpinionBadge({ opinion }: { opinion: string }) {
  const normalizedOpinion = String(opinion).toLowerCase();
  const toneClass = normalizedOpinion.includes("unmodified")
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : normalizedOpinion.includes("qualified")
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : normalizedOpinion.includes("adverse")
        ? "bg-red-50 text-red-700 border-red-200"
        : "bg-stone-50 text-stone-600 border-stone-200";

  return (
    <span className={`inline-flex rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${toneClass}`}>
      {opinion}
    </span>
  );
}

function DonutGauge({ resolved, exception }: { resolved: number; exception: number }) {
  const total = Math.max(1, resolved + exception);
  const resolvedPercent = Math.round((resolved / total) * 100);
  const exceptionPercent = 100 - resolvedPercent;

  return (
    <div className="relative grid h-28 w-28 place-items-center shrink-0">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(#1E2E22 0 ${resolvedPercent}%, #7D3705 ${resolvedPercent}% 100%)`,
        }}
      />
      <div className="absolute inset-3 rounded-full bg-white" />
      <div className="relative z-10 text-center">
        <div className="font-display text-2xl font-black text-stone-900">{resolvedPercent}%</div>
        <div className="text-[8px] font-bold uppercase tracking-wider text-stone-400">Resolved</div>
        <div className="text-[8px] font-bold uppercase tracking-wider text-[#7D3705] mt-0.5">
          {exceptionPercent}% error
        </div>
      </div>
    </div>
  );
}

function BudgetBar({
  total,
  utilized,
  surplus,
}: {
  total: number;
  utilized: number;
  surplus: number;
}) {
  const utilizedPercent = total > 0 ? (utilized / total) * 100 : 0;
  const surplusPercent = total > 0 ? (surplus / total) * 100 : 0;
  const remainingPercent = Math.max(0, 100 - utilizedPercent - surplusPercent);

  return (
    <div className="space-y-3">
      <div className="flex h-3 overflow-hidden rounded-full bg-stone-100 border border-stone-200/40">
        <div className="bg-[#1E2E22]" style={{ width: `${utilizedPercent}%` }} />
        <div className="bg-[#7D3705]" style={{ width: `${surplusPercent}%` }} />
        <div className="bg-stone-200" style={{ width: `${remainingPercent}%` }} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] font-bold uppercase tracking-wider">
        <span className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-stone-200/60 bg-stone-50/50 px-2.5 py-1.5 text-stone-700">
          <span className="h-2 w-2 rounded-sm bg-[#1E2E22]" /> Utilized {Math.round(utilizedPercent)}%
        </span>
        <span className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-stone-200/60 bg-stone-50/50 px-2.5 py-1.5 text-[#7D3705]">
          <span className="h-2 w-2 rounded-sm bg-[#7D3705]" /> Surplus {Math.round(surplusPercent)}%
        </span>
        <span className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-stone-200/60 bg-stone-50/50 px-2.5 py-1.5 text-stone-400">
          <span className="h-2 w-2 rounded-sm bg-stone-300" /> Left {Math.round(remainingPercent)}%
        </span>
      </div>
    </div>
  );
}

function formatCurrency(amount: number) {
  if (!amount || Number.isNaN(amount)) return "₱0";
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(value: string | null | undefined) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatTenure(value: string | null | undefined) {
  if (!value) return "N/A";
  const startDate = new Date(value);
  if (Number.isNaN(startDate.getTime())) return "N/A";

  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts = [
    years > 0 ? `${years} yr${years === 1 ? "" : "s"}` : "",
    months > 0 ? `${months} mo${months === 1 ? "" : "s"}` : "",
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(" ") : "Less than 1 month";
}