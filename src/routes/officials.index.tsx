import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { AppNav } from "@/components/AppNav";
import { Search, MapPin, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { db } from "@/db/index";
import { getUser } from "@/lib/auth";

// 1. Fetch the list of officials from SQLite
const getOfficialsList = createServerFn({ method: "GET" }).handler(async () => {
  // Pull everyone and sort them alphabetically
  const result = await db.execute("SELECT id, name, title, branch, location, bio FROM officials ORDER BY name ASC");
  return result.rows;
});

// 2. Load the data before the page renders
export const Route = createFileRoute("/officials/")({
  beforeLoad: () => { if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" }); },
  loader: async () => await getOfficialsList(),
  head: () => ({ meta: [{ title: "Government Officials — P.A.T.A.G." }, { name: "description", content: "Search and explore verified government officials nationwide." }] }),
  component: OfficialsList,
});

function OfficialsList() {
  // 3. Grab the live database records from the loader
  const officials = Route.useLoaderData();
  
  const [q, setQ] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  
  // 4. Update the filter to search the new 'title' column instead of 'position'
  const filtered = officials.filter((o: any) => 
    o.name.toLowerCase().includes(q.toLowerCase()) || 
    o.title.toLowerCase().includes(q.toLowerCase())
  );
  
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
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Government Official or Keyword" className="w-full bg-transparent text-sm text-onyx outline-none placeholder:text-coffee/60" />
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-cream/95 px-3 py-2 shadow-card sm:w-56">
              <MapPin className="h-4 w-4 text-coffee" />
              <input placeholder="Location" className="w-full bg-transparent text-sm text-onyx outline-none placeholder:text-coffee/60" />
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
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-xl text-cocoa sm:text-2xl">Government Officials</h2>
              <div className="text-xs text-coffee">Sort by: <span className="font-semibold">Relevance</span></div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {pageItems.map((o: any) => {
                // Generate a smart fallback avatar using their name!
                const photoUrl = o.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(o.name)}&size=150&background=F3F0EA&color=34251D`;
                
                return (
                  <Link key={o.id} to="/officials/$officialId" params={{ officialId: String(o.id) }} className="group rounded-2xl border border-tan bg-white p-4 shadow-card transition hover:-translate-y-0.5">
                    <div className="flex items-center gap-3">
                      <img src={photoUrl} alt={o.name} loading="lazy" width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
                      <div className="min-w-0">
                        <div className="truncate font-semibold text-cocoa">{o.name}</div>
                        {/* 5. Swapped position for title here */}
                        <div className="truncate text-sm text-coffee">{o.title}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                      <span className="inline-flex items-center gap-1 rounded-full bg-forest/15 px-2 py-0.5 text-forest font-semibold">⚖ {o.branch}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-copper/15 px-2 py-0.5 text-copper font-semibold">📍 {o.location}</span>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm text-cocoa/80">{o.bio}</p>
                    <div className="mt-3 text-sm font-semibold text-rust group-hover:underline">View Profile →</div>
                  </Link>
                );
              })}
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