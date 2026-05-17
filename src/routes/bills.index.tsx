import { useBillActions } from "@/lib/useBillActions";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { AppNav } from "@/components/AppNav";
import { ThumbsUp, ThumbsDown, Bookmark, ChevronDown, Check } from "lucide-react";
import heroImg from "@/assets/legislative-hero.png";
import { stages } from "@/lib/mock-data"; 
import { getUser } from "@/lib/auth";
import { db } from "@/db"; 

const getBillsList = createServerFn({ method: "GET" }).handler(async () => {
  const result = await db.execute("SELECT * FROM bills ORDER BY id DESC");
  
  return result.rows.map((r: any) => ({
    id: String(r.id),
    title: r.title,
    description: r.brief_description || r.summary || "No description provided.", 
    filed: r.date_filed,             
    number: r.bill_no || `HB-${r.id.toString().padStart(4, '0')}`,               
    category: r.category || "Uncategorized", 
    stage: r.stage || 1, 
    authors: String(r.authors || "Unknown").split(',').map((a: string) => a.trim()), 
  }));
});

export const Route = createFileRoute("/bills/")({
  beforeLoad: () => { if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" }); },
  loader: async () => {
    const bills = await getBillsList();
    return { bills };
  },
  head: () => ({ meta: [{ title: "Legislative Progress Tracker — P.A.T.A.G." }, { name: "description", content: "Every bill. Every stage. Every author." }] }),
  component: BillsList,
});

function BillsList() {
  const { bills } = Route.useLoaderData();

  const [sortCat, setSortCat] = useState("");
  const [sortStatus, setSortStatus] = useState("");

// Replace the old 'sorted' useMemo with this 'filtered' one
  const filtered = useMemo(() => {
    return bills.filter((b: any) => {
      let matchCat = true;
      let matchStatus = true;

      // 1. Filter by Category (using .includes so hybrid categories work)
      if (sortCat && sortCat !== "All") {
        matchCat = b.category.includes(sortCat);
      }

      // 2. Filter by Status (mapping the dropdown string to your DB's stage number)
      if (sortStatus && sortStatus !== "All") {
        const statusMap: Record<string, number> = {
          "Filed": 1, "House": 2, "Senate": 3, "President": 4, "Enacted": 5
        };
        matchStatus = b.stage === statusMap[sortStatus];
      }

      return matchCat && matchStatus;
    });
  }, [bills, sortCat, sortStatus]);

  return (
    <div className="min-h-screen bg-cream">
      <AppNav />

      <section className="relative overflow-hidden border-b border-tan bg-onyx">
        <img src={heroImg} alt="" width={1536} height={640} className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-linear-to-r from-onyx/90 via-onyx/40 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <h1 className="font-display text-4xl md:text-6xl text-cream tracking-wider">LEGISLATIVE PROGRESS TRACKER</h1>
          <p className="mt-2 font-serif italic text-cream/80">every bill. every stage. every author.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-2xl text-cocoa">Tracked Bills Directory</h2>
          <div className="flex items-center gap-3 text-sm text-coffee">
            <span>Sort by:</span>
            <SortSelect value={sortCat} onChange={setSortCat} placeholder="Category" options={["All", "Agriculture", "Economy", "Education", "Environment", "Governance", "Health", "Infrastructure", "Justice", "Labor", "Sci-Tech", "Social Welfare", "Tourism & Culture"]} />
            <SortSelect value={sortStatus} onChange={setSortStatus} placeholder="Status" options={["All", "Filed", "House", "Senate", "President", "Enacted"]} />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((b) => (
            <Link
              key={b.id}
              to="/bills/$billId"
              params={{ billId: b.id }}
              className="block rounded-2xl border border-tan/70 bg-white p-5 shadow-card transition hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-copper px-3 py-0.5 font-semibold text-cream">{b.number}</span>
                  <span className="font-medium text-cocoa">{b.category}</span>
                </div>
                <div className="text-xs text-mocha shrink-0">Filed {b.filed}</div>
              </div>

              <h3 className="mt-3 font-display text-2xl text-cocoa">{b.title}</h3>
              <p className="text-sm text-coffee">{b.description}</p>

              <div className="my-4 h-px bg-tan/60" />

              <Stepper stage={b.stage} />

              <div className="mt-5 flex items-end justify-between gap-4">
                <div className="text-xs">
                  <div className="uppercase tracking-[0.2em] text-mocha">Authored by</div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {b.authors.map((a: string) => (
                      <span key={a} className="rounded-full bg-tan/50 px-3 py-1 text-cocoa">{a}</span>
                    ))}
                  </div>
                </div>
                <BillActionButtons billId={b.id} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function BillActionButtons({ billId }: { billId: string }) {
  // Use our new shared hook!
  const { vote, setVote, bookmarked, setBookmarked } = useBillActions(billId);

  const toggleVote = (e: React.MouseEvent, type: 'up' | 'down') => {
    e.preventDefault();
    e.stopPropagation();
    setVote(vote === type ? null : type);
  };

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked(!bookmarked);
  };

  const baseClass = "grid h-10 w-10 place-items-center rounded-full border transition-all duration-200 hover:scale-105";
  const defaultClass = "bg-cream/40 border-tan text-cocoa hover:bg-cream";

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={(e) => toggleVote(e, 'up')}
        // Orange (copper) for upvote
        className={`${baseClass} ${vote === 'up' ? 'bg-copper border-transparent text-cream' : defaultClass}`}
      >
        <ThumbsUp className="h-4 w-4" />
      </button>
      
      <button
        onClick={(e) => toggleVote(e, 'down')}
        // Orange (copper) for downvote
        className={`${baseClass} ${vote === 'down' ? 'bg-copper border-transparent text-cream' : defaultClass}`}
      >
        <ThumbsDown className="h-4 w-4" />
      </button>
      
      <button
        onClick={toggleBookmark}
        // Green (forest) for bookmark
        className={`${baseClass} ${bookmarked ? 'bg-forest border-transparent text-cream' : defaultClass}`}
      >
        <Bookmark className="h-4 w-4" />
      </button>
    </div>
  );
}

export function Stepper({ stage }: { stage: number }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-mocha">Legislative Process</div>
      <div className="relative mt-3 flex items-center justify-between">
        <div className="absolute left-3 right-3 top-3.5 h-0.5 bg-tan/70" />
        {stages.map((s, i) => {
          const idx = i + 1;
          const done = idx < stage;
          const active = idx === stage;
          return (
            <div key={s} className="relative z-10 flex flex-col items-center">
              <div className={
                "grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold ring-4 ring-white " +
                (done
                  ? "bg-forest text-cream"
                  : active
                  ? "bg-copper text-cream"
                  : "bg-cream text-coffee border border-tan")
              }>
                {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : idx}
              </div>
              <div className="mt-1.5 text-[10px] uppercase tracking-wide text-coffee">{s}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SortSelect({
  value, onChange, placeholder, options,
}: { value: string; onChange: (v: string) => void; placeholder: string; options: string[] }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-full border border-tan bg-white/70 py-1.5 pl-4 pr-8 text-xs text-cocoa shadow-sm focus:outline-none focus:ring-2 focus:ring-copper/40"
      >
        <option value="" disabled hidden>{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-mocha" />
    </div>
  );
}