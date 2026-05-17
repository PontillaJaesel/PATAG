import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { AppNav } from "@/components/AppNav";
import { Search, MapPin, Filter, ChevronLeft, ChevronRight, ChevronDown, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { officials, agencies } from "@/lib/mock-data";
import { getUser } from "@/lib/auth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PHILIPPINE_REGIONS = [
  "National Capital Region (NCR)",
  "Cordillera Administrative Region (CAR)",
  "Ilocos Region (Region I)",
  "Cagayan Valley (Region II)",
  "Central Luzon (Region III)",
  "CALABARZON (Region IV-A)",
  "MIMAROPA (Region IV-B)",
  "Bicol Region (Region V)",
  "Western Visayas (Region VI)",
  "Central Visayas (Region VII)",
  "Eastern Visayas (Region VIII)",
  "Zamboanga Peninsula (Region IX)",
  "Northern Mindanao (Region X)",
  "Davao Region (Region XI)",
  "SOCCSKSARGEN (Region XII)",
  "Caraga (Region XIII)",
  "Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)",
] as const;

const ALL_LOCATIONS = "All";
const NATIONAL_LEVEL = "National Level";
const LOCATION_OPTIONS = [ALL_LOCATIONS, NATIONAL_LEVEL, ...PHILIPPINE_REGIONS] as const;

function getOfficialRegion(location: string) {
  const byCity: Record<string, string> = {
    Manila: "National Capital Region (NCR)",
    "Quezon City": "National Capital Region (NCR)",
    "Cebu City": "Central Visayas (Region VII)",
    Davao: "Davao Region (Region XI)",
    Baguio: "Cordillera Administrative Region (CAR)",
    Iloilo: "Western Visayas (Region VI)",
    Batangas: "CALABARZON (Region IV-A)",
  };

  return byCity[location] ?? "Unknown Region";
}

function isNationalOfficial(position: string) {
  return ["Senator", "Secretary", "Justice"].includes(position);
}

function matchesLocationFilter(official: (typeof officials)[number], selectedLocation: string) {
  if (selectedLocation === ALL_LOCATIONS) return true;
  if (selectedLocation === NATIONAL_LEVEL) return isNationalOfficial(official.position);
  return getOfficialRegion(official.location) === selectedLocation;
}

const SORT_OPTIONS = [
  "Relevance",
  "Alphabetical (Name: A-Z)",
  "Alphabetical (Name: Z-A)",
  "Seniority & Tenure (Longest Serving)",
  "Seniority & Tenure (Recently Assumed)",
] as const;

type SortOption = (typeof SORT_OPTIONS)[number];

function parseAssumedDate(dateAssumed: string) {
  const parsed = Date.parse(dateAssumed);
  if (!Number.isNaN(parsed)) return parsed;

  const yearMatch = dateAssumed.match(/\d{4}/);
  if (yearMatch) return Date.parse(`January 1 ${yearMatch[0]}`);

  return Number.MAX_SAFE_INTEGER;
}

export const Route = createFileRoute("/officials/")({
  beforeLoad: () => { if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" }); },
  head: () => ({ meta: [{ title: "Government Officials — P.A.T.A.G." }, { name: "description", content: "Search and explore verified government officials nationwide." }] }),
  component: OfficialsList,
});

function OfficialsList() {
  const [draftQ, setDraftQ] = useState("");
  const [searchQ, setSearchQ] = useState("");
  const [draftLocation, setDraftLocation] = useState<string>(ALL_LOCATIONS);
  const [searchLocation, setSearchLocation] = useState<string>(ALL_LOCATIONS);
  const [sortBy, setSortBy] = useState<SortOption>("Relevance");
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"individuals" | "agencies">("individuals");
  const PAGE_SIZE = 10;

  const applySearch = () => {
    setSearchQ(draftQ.trim());
    setSearchLocation(draftLocation);
    setPage(1);
  };

  const normalizedSearch = searchQ.toLowerCase();
  const filtered = officials.filter((o) => {
    const matchesKeyword =
      o.name.toLowerCase().includes(normalizedSearch)
      || o.position.toLowerCase().includes(normalizedSearch)
      || o.branch.toLowerCase().includes(normalizedSearch);

    return matchesKeyword && matchesLocationFilter(o, searchLocation);
  });

  const sortedResults = [...filtered].sort((a, b) => {
    if (sortBy === "Alphabetical (Name: A-Z)") return a.name.localeCompare(b.name);
    if (sortBy === "Alphabetical (Name: Z-A)") return b.name.localeCompare(a.name);
    if (sortBy === "Seniority & Tenure (Longest Serving)") {
      return parseAssumedDate(a.dateAssumed) - parseAssumedDate(b.dateAssumed);
    }
    if (sortBy === "Seniority & Tenure (Recently Assumed)") {
      return parseAssumedDate(b.dateAssumed) - parseAssumedDate(a.dateAssumed);
    }

    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedResults.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageItems = sortedResults.slice(pageStart, pageStart + PAGE_SIZE);

  return (
    <div className="min-h-screen bg-cream">
      <AppNav />
      <section className="bg-gradient-to-br from-rust via-cocoa to-onyx text-cream">
        <div className="mx-auto max-w-5xl px-4 py-10 text-center sm:px-6 sm:py-14">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl">P.A.T.A.G.</h1>
          <p className="mt-2 font-serif-display text-base text-cream/90 sm:text-lg">Search and explore verified government officials nationwide</p>
          <form
            className="mx-auto mt-6 flex max-w-3xl flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              applySearch();
            }}
          >
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-cream/95 px-3 py-2 shadow-card">
              <Search className="h-4 w-4 text-coffee" />
              <input value={draftQ} onChange={(e) => setDraftQ(e.target.value)} placeholder="Search Government Official or Keyword" className="w-full bg-transparent text-sm text-onyx outline-none placeholder:text-coffee/60" />
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-cream/95 px-3 py-2 shadow-card sm:w-72">
              <MapPin className="h-4 w-4 text-coffee" />
              <Select
                value={draftLocation}
                onValueChange={(value) => {
                  setDraftLocation(value);
                  setSearchLocation(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="h-auto w-full border-0 bg-transparent p-0 text-sm text-onyx shadow-none focus:ring-0">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {LOCATION_OPTIONS.map((locationOption) => (
                    <SelectItem key={locationOption} value={locationOption}>{locationOption}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <button type="submit" className="rounded-xl bg-forest px-6 py-2 font-semibold text-cream hover:opacity-90">Search</button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="relative">
            <div className="space-y-5 lg:sticky lg:top-4">
              {/* Always-visible Tracker card */}
              <div className="rounded-2xl bg-gradient-to-br from-cocoa to-coffee p-5 text-cream shadow-card">
                <div className="font-display text-lg leading-tight">Stay Informed on Pending and Approved Laws</div>
                <Link to="/bills" className="mt-4 inline-block rounded-full bg-forest px-4 py-1.5 text-xs font-semibold text-cream hover:opacity-90">View Tracker</Link>
              </div>

              {/* Collapsible Filters */}
              {filtersOpen ? (
                <div className="rounded-2xl border border-tan bg-white p-4 text-sm text-cocoa shadow-card">
                  <button onClick={() => setFiltersOpen(false)} className="mb-3 flex w-full items-center justify-between font-semibold">
                    <span className="flex items-center gap-2"><Filter className="h-4 w-4" /> Filters</span>
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <FilterGroup title="Status" options={["Active","Former","Appointed","Elected"]} />
                  <FilterGroup title="Branch" options={["Executive","Legislative","Judicial"]} />
                </div>
              ) : (
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-tan bg-white px-3 py-2 text-cocoa shadow-card hover:bg-muted"
                  aria-label="Expand filters"
                >
                  <ChevronRight className="h-4 w-4" />
                  <Filter className="h-4 w-4" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider">Filters</span>
                </button>
              )}
            </div>
          </aside>

          <div className="min-w-0">
            {/* Tab Switch */}
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="inline-flex rounded-full border border-tan bg-white p-1 shadow-card">
                <button
                  onClick={() => {
                    setActiveTab("individuals");
                    setPage(1);
                  }}
                  className={`rounded-full px-6 py-2 font-display transition ${
                    activeTab === "individuals"
                      ? "bg-gradient-to-br from-rust to-cocoa text-cream shadow-md"
                      : "bg-transparent text-cocoa hover:text-rust"
                  }`}
                >
                  Individuals
                </button>
                <button
                  onClick={() => {
                    setActiveTab("agencies");
                    setPage(1);
                  }}
                  className={`rounded-full px-6 py-2 font-display transition ${
                    activeTab === "agencies"
                      ? "bg-gradient-to-br from-rust to-cocoa text-cream shadow-md"
                      : "bg-transparent text-cocoa hover:text-rust"
                  }`}
                >
                  Agencies & Departments
                </button>
              </div>
              {activeTab === "individuals" && (
                <div className="flex items-center gap-2 text-sm text-coffee">
                  <span className="text-xs">Sort by:</span>
                  <SortSelect
                    value={sortBy}
                    onChange={(value) => {
                      setSortBy(value);
                      setPage(1);
                    }}
                    options={[...SORT_OPTIONS]}
                  />
                </div>
              )}
            </div>

            {/* Individuals Tab */}
            {activeTab === "individuals" && (
              <>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {pageItems.map((o) => (
                    <Link key={o.id} to="/officials/$officialId" params={{ officialId: o.id }} className="group rounded-2xl border border-tan bg-white p-4 shadow-card transition hover:-translate-y-0.5">
                      <div className="flex items-center gap-3">
                        <img src={o.photo} alt={o.name} loading="lazy" width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
                        <div className="min-w-0">
                          <div className="truncate font-semibold text-cocoa">{o.name}</div>
                          <div className="truncate text-sm text-coffee">{o.position}</div>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                        <span className="inline-flex items-center gap-1 rounded-full bg-forest/15 px-2 py-0.5 text-forest font-semibold">⚖ {o.branch}</span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-copper/15 px-2 py-0.5 text-copper font-semibold">📍 {o.location}</span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-coffee font-semibold">🗺 {isNationalOfficial(o.position) ? NATIONAL_LEVEL : getOfficialRegion(o.location)}</span>
                      </div>
                      <p className="mt-3 line-clamp-2 text-sm text-cocoa/80">{o.bio}</p>
                      <div className="mt-3 text-sm font-semibold text-rust group-hover:underline">View Profile →</div>
                    </Link>
                  ))}
                </div>
                {sortedResults.length === 0 && (
                  <div className="mt-5 rounded-2xl border border-tan bg-white p-6 text-sm text-coffee shadow-card">
                    No officials found for this keyword and location. Try a different region or choose All.
                  </div>
                )}
                <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-coffee sm:flex-row sm:items-center">
                  <div>
                    Showing {pageItems.length === 0 ? 0 : pageStart + 1}–{pageStart + pageItems.length} out of {sortedResults.length} officials
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="rounded-md border border-tan px-3 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      PREVIOUS
                    </button>
                    <span className="px-1 font-semibold">Page {currentPage} / {totalPages}</span>
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="rounded-md border border-tan px-3 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      NEXT
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Agencies Tab */}
            {activeTab === "agencies" && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {agencies.map((agency) => (
                  <AgencyCard key={agency.id} agency={agency} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function AgencyCard({ agency }: { agency: typeof agencies[number] }) {
  const openIssues = agency.issues.filter(i => i.status === "Open").length;
  const resolvedIssues = agency.issues.filter(i => i.status === "Resolved").length;

  return (
    <Link
      to="/agencies/$agencyId"
      params={{ agencyId: agency.id }}
      className="group rounded-2xl border border-tan bg-white shadow-card overflow-hidden transition hover:-translate-y-0.5"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-rust/10 to-cocoa/10 p-5 border-b border-tan">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg text-cocoa group-hover:text-rust transition">{agency.name}</h3>
            <p className="text-xs text-coffee mt-1">{agency.acronym}</p>
          </div>
          <span className="inline-flex items-center rounded-full bg-forest/15 px-3 py-1 text-xs font-semibold text-forest whitespace-nowrap">{agency.type}</span>
        </div>
        <p className="mt-3 text-xs text-cocoa/80 line-clamp-2">{agency.mandate}</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-coffee">
          <span>📍</span>
          <span>{agency.location}</span>
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-5">
        {/* View Details Button */}
        <button className="w-full rounded-lg bg-gradient-to-r from-rust to-cocoa px-4 py-2 font-semibold text-cream hover:opacity-90 transition text-sm group-hover:shadow-md">
          View Full Details →
        </button>
      </div>
    </Link>
  );
}

function SortSelect({ value, onChange, options }: { value: SortOption; onChange: (v: SortOption) => void; options: SortOption[] }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="appearance-none rounded-full border border-tan bg-white/70 py-1.5 pl-4 pr-8 text-center text-xs text-cocoa shadow-sm focus:outline-none focus:ring-2 focus:ring-copper/40"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-mocha" />
    </div>
  );
}

function FilterGroup({ title, options }: { title: string; options: string[] }) {
  return (
    <div className="mb-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-mocha">{title}</div>
      <ul className="mt-1 space-y-1">
        {options.map((o) => (
          <li key={o} className="flex items-center gap-2 text-sm text-cocoa">
            <input type="checkbox" className="h-3.5 w-3.5 accent-forest" /> {o}
          </li>
        ))}
      </ul>
    </div>
  );
}
