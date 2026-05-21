import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { AppNav } from "@/components/AppNav";
import {
  Search,
  MapPin,
  Filter,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Building2,
  Landmark,
  Bookmark,
  BookmarkCheck,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { db } from "@/db/index";
import { getUser } from "@/lib/auth";
import { useBookmarkToggle } from "@/lib/bookmarks";
import { useOfficialReactions } from "@/lib/official-reactions";
import { getAgencyLogoPath, getAgencySecretaryPhotoPath, getOfficialPhotoPath } from "@/lib/public-images";

type DirectoryTab = "individuals" | "agencies";

type OfficialRecord = {
  id: number;
  name: string;
  title: string;
  status: string;
  branch: string;
  location: string;
  bio: string;
  photo: string;
  appointed_by: string; 
};

type DirectoryOfficialRecord = OfficialRecord & {
  source?: "official" | "agency-secretary";
  agencyName?: string;
};

type AgencyRecord = {
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
  overview_points: string[];
  programs: string[];
  stats: { label: string; value: string }[];
};

const getOfficialsList = createServerFn({ method: "GET" }).handler(async () => {
  const result = await db.execute(
    "SELECT id, name, title, status, branch, location, bio, appointed_by FROM officials ORDER BY name ASC",
  );

  const rows = result.rows as unknown as Array<Record<string, unknown>>;

  return rows.map(
    (row): OfficialRecord => ({
      id: Number(row.id as number | string),
      name: String(row.name ?? ""),
      title: String(row.title ?? ""),
        status: String(row.status ?? ""),
      branch: String(row.branch ?? "").charAt(0).toUpperCase() + String(row.branch ?? "").slice(1).toLowerCase(),
      location: String(row.location ?? ""),
      bio: String(row.bio ?? ""),
      photo: String(row.photo ?? ""),
      appointed_by: String(row.appointed_by ?? ""),
    }),
  );
});

const getAgenciesList = createServerFn({ method: "GET" }).handler(
  async (): Promise<AgencyRecord[]> => {
    const result = await db.execute("SELECT * FROM agencies ORDER BY kind ASC, name ASC");

    const rows = result.rows as unknown as Array<Record<string, unknown>>;

    return rows.map(
      (row): AgencyRecord => ({
        id: Number(row.id as number | string),
        name: String(row.name ?? ""),
        acronym: String(row.acronym ?? ""),
        kind: String(row.kind ?? ""),
        description: String(row.description ?? ""),
        mandate: String(row.mandate ?? ""),
        headquarters: String(row.headquarters ?? ""),
        website: String(row.website ?? ""),
        hotline: String(row.hotline ?? ""),
        secretary_name: String(row.secretary_name ?? ""),
        secretary_title: String(row.secretary_title ?? ""),
        secretary_photo: String(row.secretary_photo ?? ""),
        secretary_bio: String(row.secretary_bio ?? ""),
        overview_points: JSON.parse(String(row.overview_points ?? "[]")),
        programs: JSON.parse(String(row.programs ?? "[]")),
        stats: JSON.parse(String(row.stats ?? "[]")),
      }),
    );
  },
);

const DIRECTORY_TAB_KEY = "patag.directory.tab";
const DIRECTORY_PAGE_KEY = "patag.directory.page";
const DIRECTORY_AGENCY_PAGE_KEY = "patag.directory.agencyPage";

function readStoredNumber(key: string, fallback: number) {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function readStoredTab(): DirectoryTab {
  if (typeof window === "undefined") return "individuals";
  const raw = window.localStorage.getItem(DIRECTORY_TAB_KEY);
  return raw === "agencies" ? "agencies" : "individuals";
}

export const Route = createFileRoute("/officials/")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" });
  },
  loader: async () => ({
    officials: await getOfficialsList(),
    agencies: await getAgenciesList(),
  }),
  head: () => ({
    meta: [
      { title: "Government Officials — P.A.T.A.G." },
      {
        name: "description",
        content: "Search and explore verified government officials nationwide.",
      },
    ],
  }),
  component: OfficialsList,
});

function OfficialsList() {
  const { officials, agencies } = Route.useLoaderData();

  const [tab, setTab] = useState<DirectoryTab>(() => readStoredTab());
  const [q, setQ] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [page, setPage] = useState(() => readStoredNumber(DIRECTORY_PAGE_KEY, 1));
  const [agencyPage, setAgencyPage] = useState(() => readStoredNumber(DIRECTORY_AGENCY_PAGE_KEY, 1));
  const PAGE_SIZE = 9;
  const AGENCY_PAGE_SIZE = 6;
  const [sort, setSort] = useState<"relevance" | "az" | "za">("relevance");
  const [locationFilter, setLocationFilter] = useState<string>("All");
  const [selectedOfficialStatuses, setSelectedOfficialStatuses] = useState<string[]>([]);
  const [selectedOfficialAppointments, setSelectedOfficialAppointments] = useState<string[]>([]);
  const [selectedOfficialBranches, setSelectedOfficialBranches] = useState<string[]>([]);
  const [selectedAgencyKinds, setSelectedAgencyKinds] = useState<string[]>([]);

  useEffect(() => {
    window.localStorage.setItem(DIRECTORY_TAB_KEY, tab);
  }, [tab]);

  useEffect(() => {
    window.localStorage.setItem(DIRECTORY_PAGE_KEY, String(page));
  }, [page]);

  useEffect(() => {
    window.localStorage.setItem(DIRECTORY_AGENCY_PAGE_KEY, String(agencyPage));
  }, [agencyPage]);

  const PROVINCES = [
  "All",
  "Manila",
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
  "Samar",
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
];

  const officialStatusOptions = ["Active", "Former"];
  const officialAppointmentOptions = ["Appointed", "Elected"];
  const officialBranchOptions = ["Executive", "Legislative", "Judicial"];
  const agencyKindOptions = ["Department", "Agency"];

  const isIndividuals = tab === "individuals";
  const placeholder = isIndividuals
    ? "Search Government Official or Keyword"
    : "Search agency, department, or secretary";
  const heroCopy = isIndividuals
    ? "Search and explore verified government officials nationwide"
    : "Explore departments and agencies, then open a full profile for each office.";

  const handleTabChange = (nextTab: DirectoryTab) => {
    setTab(nextTab);
  };

  const toggleSelection = (
    value: string,
    setter: Dispatch<SetStateAction<string[]>>,
  ) => {
    setter((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  };

  const agencySecretaryOfficials = useMemo<DirectoryOfficialRecord[]>(() => {
    return agencies.map((agency) => ({
      id: -agency.id,
      name: agency.secretary_name,
      title: agency.secretary_title,
      branch: "Executive",
      location: agency.headquarters,
      bio: agency.secretary_bio,
      photo: getAgencySecretaryPhotoPath(agency.secretary_name) || agency.secretary_photo,
      status: "Active",
      source: "agency-secretary",
      agencyName: agency.name,
      appointed_by: "Office of the President",
    }));
  }, [agencies]);

  const allOfficials = useMemo<DirectoryOfficialRecord[]>(
    () => [...officials, ...agencySecretaryOfficials],
    [officials, agencySecretaryOfficials],
  );

  const filteredOfficials = useMemo(() => {
    return allOfficials.filter((official: DirectoryOfficialRecord) => {
      const haystack =
        `${official.name} ${official.title} ${official.branch} ${official.location} ${official.bio} ${official.agencyName ?? ""}`.toLowerCase();
      const matchesQ = haystack.includes(q.toLowerCase());
      const matchesLocation =
        locationFilter === "All" ||
        String(official.location ?? "")
          .toLowerCase()
          .includes(locationFilter.toLowerCase());
      const matchesStatus =
        selectedOfficialStatuses.length === 0 || selectedOfficialStatuses.includes(official.status);
      const matchesAppointment =
        selectedOfficialAppointments.length === 0 ||
        selectedOfficialAppointments.some((filter) => {
          const appointedBy = (official.appointed_by ?? "").toLowerCase();
          if (filter === "Elected") {
            return appointedBy.includes("election");
          }
          if (filter === "Appointed") {
            return appointedBy !== "" && !appointedBy.includes("election");
          }
          return false;
        });
      const matchesBranch =
        selectedOfficialBranches.length === 0 || selectedOfficialBranches.includes(official.branch);

      return matchesQ && matchesLocation && matchesStatus && matchesBranch && matchesAppointment;
    });
  }, [allOfficials, q, locationFilter, selectedOfficialStatuses, selectedOfficialBranches, selectedOfficialAppointments]);

  const filteredAgencies = useMemo(() => {
    return agencies.filter((agency: AgencyRecord) => {
      const haystack =
        `${agency.name} ${agency.acronym} ${agency.kind} ${agency.description} ${agency.mandate} ${agency.secretary_name} ${agency.headquarters}`.toLowerCase();
      const matchesQ = haystack.includes(q.toLowerCase());
      const matchesLocation =
        locationFilter === "All" ||
        String(agency.headquarters ?? "")
          .toLowerCase()
          .includes(locationFilter.toLowerCase());
      const matchesKind =
        selectedAgencyKinds.length === 0 || selectedAgencyKinds.includes(agency.kind);

      return matchesQ && matchesLocation && matchesKind;
    });
  }, [agencies, q, locationFilter, selectedAgencyKinds]);

  const sortedOfficials = useMemo(() => {
    const arr = [...filteredOfficials];
    if (sort === "az") return arr.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") return arr.sort((a, b) => b.name.localeCompare(a.name));
    return arr; // relevance / default
  }, [filteredOfficials, sort]);

  const sortedAgencies = useMemo(() => {
    const arr = [...filteredAgencies];
    if (sort === "az") return arr.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") return arr.sort((a, b) => b.name.localeCompare(a.name));
    return arr;
  }, [filteredAgencies, sort]);

  const totalPages = Math.max(1, Math.ceil(sortedOfficials.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageItems = sortedOfficials.slice(pageStart, pageStart + PAGE_SIZE);
  const totalAgencyPages = Math.max(1, Math.ceil(sortedAgencies.length / AGENCY_PAGE_SIZE));
  const currentAgencyPage = Math.min(agencyPage, totalAgencyPages);
  const agencyPageStart = (currentAgencyPage - 1) * AGENCY_PAGE_SIZE;
  const agencyPageItems = sortedAgencies.slice(
    agencyPageStart,
    agencyPageStart + AGENCY_PAGE_SIZE,
  );

  return (
    <div className="min-h-screen bg-cream">
      <AppNav />

      <section className="bg-gradient-to-br from-rust via-cocoa to-onyx text-cream">
        <div className="mx-auto max-w-5xl px-4 py-10 text-center sm:px-6 sm:py-14">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl">P.A.T.A.G.</h1>
          <p className="mt-2 font-serif-display text-base text-cream/90 sm:text-lg">{heroCopy}</p>

          <div className="mx-auto mt-6 flex max-w-3xl flex-col gap-2 sm:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-cream/95 px-3 py-2 shadow-card">
              <Search className="h-4 w-4 text-coffee" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-transparent text-sm text-onyx outline-none placeholder:text-coffee/60"
              />
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-cream/95 px-3 py-2 shadow-card sm:w-56">
              <MapPin className="h-4 w-4 text-coffee" />
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full bg-transparent text-sm text-onyx outline-none placeholder:text-coffee/60"
                aria-label="Filter by location"
              >
                {PROVINCES.map((r) => (
                  <option key={r} value={r} className="text-onyx">
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <button className="rounded-xl bg-forest px-6 py-2 font-semibold text-cream hover:opacity-90">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="relative lg:self-start">
                <div className="space-y-5 lg:sticky lg:top-4">
              <TrackerCard />

              {filtersOpen ? (
                <div className="rounded-2xl border border-tan bg-white p-4 text-sm text-cocoa shadow-card">
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="mb-3 flex w-full items-center justify-between font-semibold"
                  >
                    <span className="flex items-center gap-2">
                      <Filter className="h-4 w-4" /> Filters
                    </span>
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {isIndividuals ? (
                    <>
                      <FilterGroup
                        title="Status"
                        options={officialStatusOptions}
                        selected={selectedOfficialStatuses}
                        onToggle={(value) => toggleSelection(value, setSelectedOfficialStatuses)}
                      />
                      <FilterGroup
                        title="Appointment"
                        options={officialAppointmentOptions}
                        selected={selectedOfficialAppointments}
                        onToggle={(value) => toggleSelection(value, setSelectedOfficialAppointments)}
                      />
                      <FilterGroup
                        title="Branch"
                        options={officialBranchOptions}
                        selected={selectedOfficialBranches}
                        onToggle={(value) => toggleSelection(value, setSelectedOfficialBranches)}
                      />
                    </>
                  ) : (
                    <FilterGroup
                      title="Type"
                      options={agencyKindOptions}
                      selected={selectedAgencyKinds}
                      onToggle={(value) => toggleSelection(value, setSelectedAgencyKinds)}
                    />
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-tan bg-white px-3 py-2 text-cocoa shadow-card hover:bg-muted"
                  aria-label="Expand filters"
                >
                  <ChevronRight className="h-4 w-4" />
                  <Filter className="h-4 w-4" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider">
                    Filters
                  </span>
                </button>
              )}
            </div>
          </aside>

          <div className="min-w-0">
            <div className="flex items-center justify-between gap-3">
              <div className="flex w-full items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-4">
                  <div
                    role="tablist"
                    aria-label="Officials directory tabs"
                    className="relative inline-grid grid-cols-2 overflow-hidden rounded-full border border-tan bg-white p-1 shadow-[0_10px_25px_-18px_rgba(73,54,40,0.45)]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-1 left-1 w-[calc(50%-0.125rem)] rounded-full bg-gradient-to-r from-cocoa via-rust to-coffee shadow-[0_8px_18px_-10px_rgba(73,54,40,0.8)] transition-transform duration-500 ease-out"
                      style={{ transform: isIndividuals ? "translateX(0%)" : "translateX(100%)" }}
                    />
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isIndividuals}
                      onClick={() => handleTabChange("individuals")}
                      className={`relative z-10 rounded-full px-6 py-2.5 font-display text-sm font-semibold tracking-[0.08em] transition-colors duration-300 ${
                        isIndividuals ? "text-cream" : "text-cocoa hover:text-rust"
                      }`}
                    >
                      Individuals
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={!isIndividuals}
                      onClick={() => handleTabChange("agencies")}
                      className={`relative z-10 rounded-full px-6 py-2.5 font-display text-sm font-semibold tracking-[0.08em] transition-colors duration-300 ${
                        !isIndividuals ? "text-cream" : "text-cocoa hover:text-rust"
                      }`}
                    >
                      Agencies & Departments
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="hidden text-xs text-coffee">Sort</label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as "relevance" | "az" | "za")}
                    className="rounded-md border border-tan bg-white px-3 py-1 text-xs font-semibold text-cocoa"
                    aria-label="Sort results"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="az">Alphabetical (A-Z)</option>
                    <option value="za">Alphabetical (Z-A)</option>
                  </select>
                </div>
              </div>
            </div>

            <div key={tab} className="animate-in fade-in slide-in-from-bottom-2 duration-300 motion-safe:transition-all">
              {isIndividuals ? (
                <>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {pageItems.map((official: DirectoryOfficialRecord) => (
                      <OfficialPreviewCard key={official.id} official={official} />
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-coffee sm:flex-row sm:items-center">
                    <div>
                      Showing {pageItems.length === 0 ? 0 : pageStart + 1}–
                      {pageStart + pageItems.length} out of {filteredOfficials.length} officials
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage((current) => Math.max(1, current - 1))}
                        disabled={currentPage === 1}
                        className="rounded-md border border-tan px-3 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        PREVIOUS
                      </button>
                      <span className="px-1 font-semibold">
                        Page {currentPage} / {totalPages}
                      </span>
                      <button
                        onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                        disabled={currentPage === totalPages}
                        className="rounded-md border border-tan px-3 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        NEXT
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {agencyPageItems.map((agency: AgencyRecord) => (
                      <AgencyPreviewCard key={agency.id} agency={agency} />
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-coffee sm:flex-row sm:items-center">
                    <div>
                      Showing {agencyPageItems.length === 0 ? 0 : agencyPageStart + 1}–
                      {agencyPageStart + agencyPageItems.length} out of {filteredAgencies.length} agencies and departments
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setAgencyPage((current) => Math.max(1, current - 1))}
                        disabled={currentAgencyPage === 1}
                        className="rounded-md border border-tan px-3 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        PREVIOUS
                      </button>
                      <span className="px-1 font-semibold">
                        Page {currentAgencyPage} / {totalAgencyPages}
                      </span>
                      <button
                        onClick={() => setAgencyPage((current) => Math.min(totalAgencyPages, current + 1))}
                        disabled={currentAgencyPage === totalAgencyPages}
                        className="rounded-md border border-tan px-3 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        NEXT
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="mb-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-mocha">{title}</div>
      <ul className="mt-1 space-y-1">
        {options.map((option) => (
          <li key={option} className="flex items-center gap-2 text-sm text-cocoa">
            <label className="flex w-full cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onToggle(option)}
                className="h-3.5 w-3.5 accent-forest"
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TrackerCard() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-cocoa to-coffee p-5 text-cream shadow-card">
      <div className="font-display text-lg leading-tight">
        Stay Informed on Pending and Approved Laws
      </div>
      <Link
        to="/bills"
        className="mt-4 inline-block rounded-full bg-forest px-4 py-1.5 text-xs font-semibold text-cream hover:opacity-90"
      >
        View Tracker
      </Link>
    </div>
  );
}

function AgencyPreviewCard({ agency }: { agency: AgencyRecord }) {
  const logoUrl = getAgencyLogoPath(agency.acronym);
  const { bookmarked, toggle } = useBookmarkToggle("agencies", {
    id: agency.id,
    name: agency.name,
    acronym: agency.acronym,
    kind: agency.kind,
    headquarters: agency.headquarters,
    description: agency.description,
  });

  return (
    <Link
      to="/officials/agencies/$agencyId"
      params={{ agencyId: String(agency.id) }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-tan bg-white shadow-card transition hover:-translate-y-0.5"
    >
      <button
        type="button"
        aria-pressed={bookmarked}
        aria-label={bookmarked ? `Remove ${agency.name} from bookmarks` : `Bookmark ${agency.name}`}
        title={bookmarked ? "Remove bookmark" : "Bookmark agency"}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          toggle();
        }}
        className={`absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border shadow-sm transition ${
          bookmarked
            ? "border-forest bg-forest text-cream"
            : "border-white/70 bg-white text-cocoa hover:border-forest hover:text-forest"
        }`}
      >
        {bookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
      </button>
      <div className="h-24 bg-gradient-to-br from-forest via-cocoa to-onyx" />
      <div className="flex h-full flex-1 flex-col px-5 pb-5 pt-0">
        <div className="flex items-end justify-between gap-3">
          <div className="-mt-8 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white bg-cream text-center font-display text-lg text-cocoa shadow-card">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={`${agency.name} logo`}
                className="h-full w-full object-contain p-2"
              />
            ) : (
              agency.acronym
            )}
          </div>
          <span className="rounded-full bg-forest/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-forest">
            {agency.kind}
          </span>
        </div>

        <div className="mt-4">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-coffee">
            {agency.acronym}
          </div>
          <h3 className="mt-1 font-display text-xl text-cocoa">{agency.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-cocoa/80">
            {agency.description}
          </p>
        </div>

        <div className="mt-auto pt-5">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-rust group-hover:underline">
            Full Details <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function OfficialPreviewCard({ official }: { official: DirectoryOfficialRecord }) {
  const { likes, dislikes, incrementLike, incrementDislike } = useOfficialReactions(
    String(official.id),
  );
  const { bookmarked, toggle } = useBookmarkToggle("officials", {
    id: official.id,
    name: official.name,
    title: official.title,
    branch: official.branch,
    location: official.location,
    photo: official.photo,
  });
  const localPhotoPath = getOfficialPhotoPath(official.name);
  const cleanPhotoPath = official.photo && official.photo.startsWith("public/")
    ? official.photo.replace("public/", "/")
    : official.photo;

  const photoUrl = localPhotoPath || cleanPhotoPath || `https://ui-avatars.com/api/?name=${encodeURIComponent(official.name)}&size=150&background=F3F0EA&color=34251D`;

  return (
    <Link
      to="/officials/$officialId"
      params={{ officialId: String(official.id) }}
      className="group relative rounded-2xl border border-tan bg-white p-4 shadow-card transition hover:-translate-y-0.5"
    >
      <button
        type="button"
        aria-pressed={bookmarked}
        aria-label={bookmarked ? `Remove ${official.name} from bookmarks` : `Bookmark ${official.name}`}
        title={bookmarked ? "Remove bookmark" : "Bookmark official"}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          toggle();
        }}
        className={`absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border shadow-sm transition ${
          bookmarked
            ? "border-forest bg-forest text-cream"
            : "border-tan bg-white text-cocoa hover:border-forest hover:text-forest"
        }`}
      >
        {bookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
      </button>
      <div className="flex items-center gap-3">
        <img
          src={photoUrl}
          alt={official.name}
          loading="lazy"
          width={56}
          height={56}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div className="min-w-0">
          <div className="truncate font-semibold text-cocoa">{official.name}</div>
          <div className="truncate text-sm text-coffee">{official.title}</div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
        <span className="inline-flex items-center gap-1 rounded-full bg-forest/15 px-2 py-0.5 font-semibold text-forest">
          ⚖ {official.branch}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-copper/15 px-2 py-0.5 font-semibold text-copper">
          📍 {official.location}
        </span>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-cocoa/80">{official.bio}</p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="min-w-0 text-sm font-semibold text-rust group-hover:underline">
          View Profile →
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              incrementLike();
            }}
            className={`inline-flex w-auto shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-1.5 text-[11px] font-semibold transition sm:px-3 ${
              likes > 0
                ? "border-forest bg-forest/15 text-forest"
                : "border-tan bg-cream text-cocoa hover:border-forest hover:text-forest"
            }`}
            aria-label={`Like ${official.name}`}
          >
            <ThumbsUp className="h-3.5 w-3.5" />
            {likes}
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              incrementDislike();
            }}
            className={`inline-flex w-auto shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-1.5 text-[11px] font-semibold transition sm:px-3 ${
              dislikes > 0
                ? "border-rust bg-rust/15 text-rust"
                : "border-tan bg-cream text-cocoa hover:border-rust hover:text-rust"
            }`}
            aria-label={`Dislike ${official.name}`}
          >
            <ThumbsDown className="h-3.5 w-3.5" />
            {dislikes}
          </button>
        </div>
      </div>
    </Link>
  );
}
