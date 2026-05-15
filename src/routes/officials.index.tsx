import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { AppNav } from "@/components/AppNav";
import { Search, MapPin, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { officials, type Official } from "@/lib/mock-data";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/officials/")({
  beforeLoad: () => { if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" }); },
  head: () => ({ meta: [{ title: "Government Officials — P.A.T.A.G." }, { name: "description", content: "Search and explore verified government officials nationwide." }] }),
  component: OfficialsList,
});

function OfficialsList() {
  const statusOptions: Official["status"][] = ["Active", "Former", "Appointed", "Elected"];
  const branchOptions: Official["branch"][] = ["Executive", "Legislative", "Judicial"];
  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "name-asc", label: "Name: A-Z" },
    { value: "name-desc", label: "Name: Z-A" },
    { value: "seniority-longest", label: "Longest Serving" },
    { value: "seniority-recent", label: "Recently Assumed" },
    { value: "hierarchy", label: "Hierarchy" },
    { value: "activity", label: "Most Recent Updates" },
    { value: "fulfillment", label: "Fulfillment Rate" },
  ] as const;
  type SortKey = (typeof sortOptions)[number]["value"];

  const [q, setQ] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [page, setPage] = useState(1);
  const [location, setLocation] = useState("");
  const [locQuery, setLocQuery] = useState("");
  const [locOpen, setLocOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<Official["status"][]>([]);
  const [selectedBranches, setSelectedBranches] = useState<Official["branch"][]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("relevance");
  const PAGE_SIZE = 10;
  const provinces = [
    "Abra",
    "Agusan del Norte",
    "Agusan del Sur",
    "Aklan",
    "Albay",
    "Antique",
    "Apayao",
    "Aurora",
    "Basilan",
    "Bataan",
    "Batanes",
    "Batangas",
    "Benguet",
    "Biliran",
    "Bohol",
    "Bukidnon",
    "Bulacan",
    "Cagayan",
    "Camarines Norte",
    "Camarines Sur",
    "Camiguin",
    "Capiz",
    "Catanduanes",
    "Cavite",
    "Cebu",
    "Cotabato",
    "Davao de Oro",
    "Davao del Norte",
    "Davao del Sur",
    "Davao Occidental",
    "Davao Oriental",
    "Dinagat Islands",
    "Eastern Samar",
    "Guimaras",
    "Ifugao",
    "Ilocos Norte",
    "Ilocos Sur",
    "Iloilo",
    "Isabela",
    "Kalinga",
    "La Union",
    "Laguna",
    "Lanao del Norte",
    "Lanao del Sur",
    "Leyte",
    "Maguindanao del Norte",
    "Maguindanao del Sur",
    "Marinduque",
    "Masbate",
    "Misamis Occidental",
    "Misamis Oriental",
    "Mountain Province",
    "Negros Occidental",
    "Negros Oriental",
    "Northern Samar",
    "Nueva Ecija",
    "Nueva Vizcaya",
    "Occidental Mindoro",
    "Oriental Mindoro",
    "Palawan",
    "Pampanga",
    "Pangasinan",
    "Quezon",
    "Quirino",
    "Rizal",
    "Romblon",
    "Sarangani",
    "Siquijor",
    "Sorsogon",
    "South Cotabato",
    "Southern Leyte",
    "Sultan Kudarat",
    "Sulu",
    "Surigao del Norte",
    "Surigao del Sur",
    "Tarlac",
    "Tawi-Tawi",
    "Zambales",
    "Zamboanga del Norte",
    "Zamboanga del Sur",
    "Zamboanga Sibugay",
    "National Capital Region"
  ].sort((a, b) => a.localeCompare(b));

  const filteredProvinces = provinces.filter(p => p.toLowerCase().includes(locQuery.toLowerCase()));

  const clearLocationFilter = () => {
    setLocation("");
    setLocQuery("All");
    setLocOpen(false);
    setPage(1);
  };

  const parseDateAssumed = (dateAssumed: string) => {
    const parsed = Date.parse(dateAssumed);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const getHierarchyRank = (official: Official) => {
    const ranks: Record<string, number> = {
      President: 0,
      "Vice President": 1,
      "Executive Secretary": 2,
      "Secretary of Finance": 3,
      "Secretary of Education": 4,
      "Secretary of the Interior and Local Government": 5,
      "Secretary of National Defense": 6,
    };

    return ranks[official.position] ?? 99;
  };

  const getActivityScore = (official: Official) => official.records.length * 1000 + parseDateAssumed(official.dateAssumed);
  const getFulfillmentScore = (official: Official) => official.policies.length * 1000 + official.records.length;

  const toggleStatus = (status: Official["status"]) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status],
    );
    setPage(1);
  };

  const toggleBranch = (branch: Official["branch"]) => {
    setSelectedBranches((prev) =>
      prev.includes(branch) ? prev.filter((b) => b !== branch) : [...prev, branch],
    );
    setPage(1);
  };

  const filtered = officials
    .map((official, index) => ({ official, index }))
    .filter(({ official }) => (
      (official.name.toLowerCase().includes(q.toLowerCase()) || official.position.toLowerCase().includes(q.toLowerCase())) &&
      (location === "" || official.location.toLowerCase().includes(location.toLowerCase())) &&
      (selectedStatuses.length === 0 || selectedStatuses.includes(official.status)) &&
      (selectedBranches.length === 0 || selectedBranches.includes(official.branch))
    ))
    .sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.official.name.localeCompare(b.official.name);
        case "name-desc":
          return b.official.name.localeCompare(a.official.name);
        case "seniority-longest":
          return parseDateAssumed(a.official.dateAssumed) - parseDateAssumed(b.official.dateAssumed);
        case "seniority-recent":
          return parseDateAssumed(b.official.dateAssumed) - parseDateAssumed(a.official.dateAssumed);
        case "hierarchy":
          return getHierarchyRank(a.official) - getHierarchyRank(b.official) || a.index - b.index;
        case "activity":
          return getActivityScore(b.official) - getActivityScore(a.official) || a.index - b.index;
        case "fulfillment":
          return getFulfillmentScore(b.official) - getFulfillmentScore(a.official) || a.index - b.index;
        case "relevance":
        default:
          return a.index - b.index;
      }
    });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  return (
    <div className="min-h-screen bg-cream">
      <AppNav />
      <section className="bg-gradient-to-br from-rust via-cocoa to-onyx text-cream">
        <div className="mx-auto max-w-5xl px-4 py-10 text-center sm:px-6 sm:py-14">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl">P.A.T.A.G.</h1>
          <p className="mt-2 font-serif-display text-base text-cream/90 sm:text-lg">Search and explore verified government officials nationwide</p>
          <div className="mx-auto mt-6 flex max-w-3xl flex-col gap-2 sm:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-cream/95 px-3 py-2 shadow-card">
              <Search className="h-4 w-4 text-coffee" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Government Official or Keyword" className="w-full bg-transparent text-sm text-cocoa outline-none placeholder:text-cocoa/70" />
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-cream/95 px-3 py-2 shadow-card sm:w-56 relative">
              <MapPin className="h-4 w-4 text-coffee" />
              <div className="relative w-full">
                <input
                  value={locQuery}
                  onChange={(e) => { setLocQuery(e.target.value); setLocOpen(true); }}
                  onFocus={() => setLocOpen(true)}
                  onBlur={() => setTimeout(() => setLocOpen(false), 150)}
                  placeholder="Location"
                  className="w-full bg-transparent text-sm text-cocoa outline-none placeholder:text-cocoa/70"
                />
                {locOpen && (
                  <ul className="absolute left-0 top-full z-50 mt-1 max-h-44 w-full overflow-auto rounded-md border bg-white text-sm text-cocoa shadow-lg">
                    <li
                      onMouseDown={(e) => { e.preventDefault(); clearLocationFilter(); }}
                      className="cursor-pointer px-3 py-2 text-onyx hover:bg-muted"
                    >
                      All
                    </li>
                    {filteredProvinces.length === 0 ? (
                      <li className="px-3 py-2 text-cocoa/80">No matches</li>
                    ) : (
                      filteredProvinces.map((p) => (
                        <li
                          key={p}
                          onMouseDown={(e) => { e.preventDefault(); setLocation(p); setLocQuery(p); setLocOpen(false); }}
                          className="cursor-pointer px-3 py-2 text-onyx hover:bg-muted"
                        >
                          {p}
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
            </div>
            <button className="rounded-xl bg-forest px-6 py-2 font-semibold text-cream hover:opacity-90">Search</button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="relative">
            <div className="space-y-5 lg:sticky lg:top-4">
              {/* Always-visible Tracker card */}
              <div className="rounded-2xl bg-gradient-to-br from-cocoa to-coffee p-5 text-cream shadow-card">
                <div className="font-display text-lg leading-tight">Stay Informed on Pending and Approved Laws</div>
                <Link to="/bills" search={{ q: "" }} className="mt-4 inline-block rounded-full bg-forest px-4 py-1.5 text-xs font-semibold text-cream hover:opacity-90">View Tracker</Link>
              </div>

              {/* Collapsible Filters */}
              {filtersOpen ? (
                <div className="rounded-2xl border border-tan bg-white p-4 text-sm text-cocoa shadow-card">
                  <button onClick={() => setFiltersOpen(false)} className="mb-3 flex w-full items-center justify-between font-semibold">
                    <span className="flex items-center gap-2"><Filter className="h-4 w-4" /> Filters</span>
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <FilterGroup
                    title="Status"
                    options={statusOptions}
                    selectedOptions={selectedStatuses}
                    onToggleOption={toggleStatus}
                  />
                  <FilterGroup
                    title="Branch"
                    options={branchOptions}
                    selectedOptions={selectedBranches}
                    onToggleOption={toggleBranch}
                  />
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
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-xl text-cocoa sm:text-2xl">Government Officials</h2>
              <label className="flex items-center gap-2 text-xs text-coffee">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value as SortKey); setPage(1); }}
                  className="rounded-md border border-tan bg-white px-2 py-1 text-xs font-semibold text-cocoa shadow-card outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {pageItems.map(({ official: o }) => (
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
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm text-cocoa/80">{o.bio}</p>
                  <div className="mt-3 text-sm font-semibold text-rust group-hover:underline">View Profile →</div>
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-coffee sm:flex-row sm:items-center">
              <div>
                Showing {pageItems.length === 0 ? 0 : pageStart + 1}–{pageStart + pageItems.length} out of {filtered.length} officials
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
          </div>
        </div>
      </section>
    </div>
  );
}

function FilterGroup<T extends string>({
  title,
  options,
  selectedOptions,
  onToggleOption,
}: {
  title: string;
  options: T[];
  selectedOptions: T[];
  onToggleOption: (option: T) => void;
}) {
  return (
    <div className="mb-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-mocha">{title}</div>
      <ul className="mt-1 space-y-1">
        {options.map((o) => (
          <li key={o} className="flex items-center gap-2 text-sm text-cocoa">
            <input
              type="checkbox"
              checked={selectedOptions.includes(o)}
              onChange={() => onToggleOption(o)}
              className="h-3.5 w-3.5 accent-forest"
            />
            {o}
          </li>
        ))}
      </ul>
    </div>
  );
}
