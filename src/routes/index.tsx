import { useEffect, useState, type ReactNode } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import shield from "@/assets/patag-shield.png";
import { ArrowRight, ArrowDown, Building2, Clock3, Gavel, Scale, Search, Shield, Users, ShieldCheck } from "lucide-react";
import { getUser } from "@/lib/auth";
import { AppNav } from "@/components/AppNav";
import { db } from "@/db/index";

// Data structure signatures for the pre-check engine lookup paths
type OfficialRecord = {
  id: number;
  name: string;
};

type BillRecord = {
  id: number;
  title: string;
};

const FRONT_PAGE_HIGHLIGHTS = [
  {
    branch: "Executive",
    title: "DBM releases conditional allotment for climate resilience projects",
    urgency: "Urgent budget watch",
    time: "Updated 28 mins ago",
    icon: <Shield className="h-5 w-5" />,
    className: "from-[#8B4513] to-[#5C3A21]",
  },
  {
    branch: "Legislative",
    title: "Senate committee schedules final hearing for Digital Governance bill",
    urgency: "Highly debated",
    time: "Updated 43 mins ago",
    icon: <Scale className="h-5 w-5" />,
    className: "from-[#4A3B32] to-[#1A1A1A]",
  },
  {
    branch: "Judicial",
    title: "Supreme Court publishes ruling on procurement transparency dispute",
    urgency: "New ruling",
    time: "Updated 1 hr ago",
    icon: <Gavel className="h-5 w-5" />,
    className: "from-[#6B5749] to-[#D2B48C]",
  },
  {
    branch: "Constitutional Bodies",
    title: "COA flags delayed liquidation of disaster funds in three regions",
    urgency: "Red flag",
    time: "Updated 1 hr ago",
    icon: <Building2 className="h-5 w-5" />,
    className: "from-[#B89B72] to-[#6B5749]",
  },
] as const;

export const Route = createFileRoute("/")({
  // Pre-load officials and bills context right into the landing route context map
  loader: async () => {
    try {
      const officialsRes = await db.execute("SELECT id, name FROM officials");
      const billsRes = await db.execute("SELECT id, title FROM bills");

      const officialsRows = officialsRes.rows as unknown as Array<Record<string, unknown>>;
      const billsRows = billsRes.rows as unknown as Array<Record<string, unknown>>;

      return {
        loadedOfficials: officialsRows.map((row): OfficialRecord => ({
          id: Number(row.id as number | string),
          name: String(row.name ?? ""),
        })),
        loadedBills: billsRows.map((row): BillRecord => ({
          id: Number(row.id as number | string),
          title: String(row.title ?? ""),
        })),
      };
    } catch (err) {
      console.error("Context checking pipeline loader failed:", err);
      return { loadedOfficials: [], loadedBills: [] };
    }
  },
  head: () => ({
    meta: [
      { title: "P.A.T.A.G. — Truth is a public utility" },
      {
        name: "description",
        content:
          "Public Access for Truth, Alliances, and Governance. The open Filipino civic platform tracking high-ranking officials and legislative actions.",
      },
      { property: "og:title", content: "P.A.T.A.G. — Truth is a public utility" },
      {
        property: "og:description",
        content:
          "Track legislative bills, budgets, and high-ranking politicians across the branches of government.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { loadedOfficials, loadedBills } = Route.useLoaderData();

  const [activeHeadline, setActiveHeadline] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHeadlineRotationPaused, setIsHeadlineRotationPaused] = useState(false);
  const [liveHeadlines, setLiveHeadlines] = useState<any[]>([]);

  const navigate = useNavigate();
  const user = typeof window !== "undefined" ? getUser() : null;

  useEffect(() => {
    async function fetchNews() {
      try {
        const API_KEY = "53ae23b57483f0bb032aeb0ac385549c";

        const response = await fetch(
          `https://gnews.io/api/v4/search?q="philippines" AND "politics"&lang=en&country=ph&max=5&apikey=${API_KEY}`
        );
        const data = await response.json();

        if (data.articles) {
          const formattedNews = data.articles.map((article: any) => ({
            title: article.title,
            source: article.source.name,
            url: article.url,
            thumbnail: article.image || "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1000&q=80",
          }));
          setLiveHeadlines(formattedNews);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    }
    fetchNews();
  }, []);

  useEffect(() => {
    if (isHeadlineRotationPaused || liveHeadlines.length === 0) return;

    const interval = setInterval(() => {
      setActiveHeadline((current) => (current + 1) % liveHeadlines.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHeadlineRotationPaused, liveHeadlines]);

  const currentHeadline = liveHeadlines[activeHeadline];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smart partial routing engine with strict type mappings
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanQuery = searchQuery.trim().toLowerCase();
    if (!cleanQuery) return;

    const queryWords = cleanQuery.split(/\s+/).filter(word => word.length > 1);

    // --- 1. PARTIAL SEARCH OFFICIALS ---
    const matchedOfficial = loadedOfficials?.find((off: OfficialRecord) => {
      const dbName = off.name.toLowerCase();
      if (dbName.includes(cleanQuery) || cleanQuery.includes(dbName)) return true;
      if (queryWords.length > 0) {
        return queryWords.every(word => dbName.includes(word));
      }
      return false;
    });

    if (matchedOfficial) {
      navigate({
        to: "/officials/$officialId",
        params: { officialId: String(matchedOfficial.id) }
      });
      return;
    }

    // --- 2. PARTIAL SEARCH BILLS ---
    const matchedBill = loadedBills?.find((b: BillRecord) => {
      const dbTitle = b.title.toLowerCase();
      if (dbTitle.includes(cleanQuery) || cleanQuery.includes(dbTitle)) return true;
      if (queryWords.length > 0) {
        return queryWords.every(word => dbTitle.includes(word));
      }
      return false;
    });

    if (matchedBill) {
      navigate({
        to: "/bills/$billId",
        params: { billId: String(matchedBill.id) }
      });
      return;
    }

    // --- 3. GENERIC FALLBACK ---
    navigate({
      to: "/officials",
      search: { q: searchQuery.trim() }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-cream">

      {/* Dynamic Header Integration */}
      {user ? (
        <AppNav />
      ) : (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-onyx/90 backdrop-blur-md shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <img src={shield} alt="P.A.T.A.G." className="h-8 w-8" />
              <span className="font-display text-xl font-bold tracking-widest text-cream">P.A.T.A.G.</span>
            </div>
            <Link to="/login" className="rounded-full bg-cream px-6 py-2 text-sm font-semibold text-onyx transition hover:bg-white hover:shadow-md">
              Login
            </Link>
          </div>
        </header>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-cream">
        <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.1),transparent_50%),radial-gradient(circle_at_80%_20%,#a05a2c,transparent_40%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-24 text-center md:flex-row md:items-center md:py-32 md:text-left">
          <div className="group relative shrink-0">
            <span className="absolute -inset-6 -z-10 rounded-full bg-cream/10 blur-3xl transition duration-700 group-hover:bg-cream/20 group-hover:scale-110" />
            <img
              src={shield}
              alt="P.A.T.A.G. shield"
              width={220}
              height={220}
              className="h-40 w-40 rounded-full border border-white/20 bg-white/5 p-3 shadow-2xl backdrop-blur-sm transition duration-500 group-hover:scale-105 group-hover:rotate-3 md:h-52 md:w-52"
            />
          </div>
          <div className="md:ml-8">
            <h1 className="font-display text-5xl tracking-tight text-white md:text-7xl drop-shadow-sm">P.A.T.A.G.</h1>
            <p className="mt-4 font-serif-display text-2xl text-cream md:text-3xl">
              Public Access for Truth, Alliances, and Governance
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-cream/80">
              A civic command center for evidence-backed governance updates in the Philippines.
              Search high-ranking executive and legislative records, monitor live-style branch signals, and participate in civic action.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold tracking-wide text-cream/90 md:justify-start">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
                1 · Search high-level records
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
                2 · Watch urgent signals
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
                3 · Review legislative actions
              </span>
            </div>

            {!user && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-onyx shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-cream"
                >
                  Access Platform <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => scrollToSection('services')}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/50"
                >
                  Explore tools <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/50"
                >
                  Read Manifesto <ArrowDown className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="font-display text-3xl text-cocoa md:text-4xl text-center md:text-left">
            Search high-ranking officials, bills, or legislative issues.
          </h2>
          <form
            onSubmit={handleSearchSubmit}
            className="group mt-8 flex flex-col gap-3 rounded-full border border-tan/80 bg-white p-2 shadow-sm ring-1 ring-transparent transition-all duration-300 focus-within:border-copper/50 focus-within:ring-copper/20 hover:shadow-md md:flex-row md:items-center"
          >
            <label htmlFor="patag-global-search" className="sr-only">
              Search PATAG for records
            </label>
            <div className="flex flex-1 items-center gap-3 px-4">
              <Search className="h-5 w-5 text-coffee/60 transition-colors group-focus-within:text-copper" />
              <input
                id="patag-global-search"
                className="w-full bg-transparent py-3 text-base text-onyx outline-none placeholder:text-coffee/50"
                placeholder="Type an executive official's name, pending bill, or trending issue..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-rust px-8 py-3.5 text-sm font-bold text-cream shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-cocoa hover:shadow-lg"
            >
              Initiate Search
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-coffee/80 md:text-left">
            Try:{" "}
            <button type="button" onClick={() => setSearchQuery("Senate Bill 1979")} className="font-semibold text-cocoa hover:text-rust transition-colors">
              Senate Bill 1979
            </button>{" "}
            ·{" "}
            <button type="button" onClick={() => setSearchQuery("COA executive findings")} className="font-semibold text-cocoa hover:text-rust transition-colors">
              COA executive findings
            </button>{" "}
            ·{" "}
            <button type="button" onClick={() => setSearchQuery("Legislative amendments")} className="font-semibold text-cocoa hover:text-rust transition-colors">
              Legislative amendments
            </button>
            <span className="ml-3 inline-block rounded-md bg-tan/30 px-2 py-0.5 text-[11px] font-medium tracking-wide text-mocha">
              System focuses exclusively on high-level positions.
            </span>
          </div>
        </div>
      </section>

      {/* Live News Section */}
      <section className="px-0 py-10">
        <div className="mx-auto mb-6 flex max-w-7xl items-center justify-between gap-3 px-6">
          <h2 className="font-display text-3xl text-cocoa md:text-4xl">What is happening in the Philippines now?</h2>
          <span className="inline-flex items-center gap-2 rounded-full border border-tan/60 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-mocha shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-forest"></span>
            </span>
            Verified National Pulse
          </span>
        </div>

        {currentHeadline ? (
          <a
            href={currentHeadline.url}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setIsHeadlineRotationPaused(true)}
            onMouseLeave={() => setIsHeadlineRotationPaused(false)}
            onFocus={() => setIsHeadlineRotationPaused(true)}
            onBlur={() => setIsHeadlineRotationPaused(false)}
            className="group relative block overflow-hidden border-y border-tan/50 shadow-card"
          >
            <img
              src={currentHeadline.thumbnail}
              alt={currentHeadline.title}
              className="h-[54vh] min-h-[340px] w-full object-cover transition duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx/95 via-onyx/45 to-transparent transition duration-300 group-hover:from-onyx/85" />
            <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl p-6 text-cream md:p-8">
              <div className="text-xs uppercase tracking-[0.18em] text-cream/70">
                {currentHeadline.source}
              </div>
              <div className="mt-2 max-w-4xl font-display text-3xl leading-tight md:text-5xl">
                {currentHeadline.title}
              </div>
            </div>
          </a>
        ) : (
          <div className="flex h-[54vh] min-h-[340px] w-full items-center justify-center border-y border-tan/50 bg-cream/50 text-coffee">
            Loading live updates...
          </div>
        )}

        <div className="mx-auto mt-4 flex max-w-7xl items-center justify-end gap-2 px-6">
          {liveHeadlines.map((headline, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveHeadline(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${index === activeHeadline
                ? "w-10 bg-rust shadow-sm"
                : "w-5 bg-tan hover:w-7 hover:bg-mocha/60"
                }`}
              aria-label={`Show headline ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Highlights Section */}
      <section className="relative overflow-hidden bg-[#181514] py-20 text-cream border-y border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#181514] via-transparent to-[#181514]"></div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-3xl text-cream md:text-4xl drop-shadow-md">
              Urgent highlights across branches.
            </h2>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-cream shadow-sm backdrop-blur-md">
              <Clock3 className="h-4 w-4 text-copper" />
              Live-style feed
            </span>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {FRONT_PAGE_HIGHLIGHTS.map((item) => (
              <article
                key={item.title}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-cream shadow-lg border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-white/20 ${item.className}`}
              >
                <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10 flex items-start justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold tracking-wide backdrop-blur-md border border-white/10">
                    {item.icon}
                    {item.branch}
                  </div>
                  <span className="text-[11px] font-medium tracking-wider text-cream/80 uppercase">{item.time}</span>
                </div>
                <h3 className="relative z-10 mt-6 font-display text-2xl leading-snug drop-shadow-sm">{item.title}</h3>
                <p className="relative z-10 mt-3 inline-block rounded-md bg-black/20 px-3 py-1.5 text-xs font-semibold tracking-wide text-cream/90 backdrop-blur-sm border border-white/5">
                  {item.urgency}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated Services Section */}
      <section id="services" className="relative overflow-hidden border-y border-tan/60 bg-cream/50 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(#e5d9c5_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="font-display text-4xl md:text-5xl text-cocoa">Platform Services</h2>
            <p className="mt-4 font-serif-display text-xl text-coffee max-w-2xl mx-auto">
              A toolkit for everyday accountability, tracking external pressures and highlighting questionable track records.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <ServiceCard
              accentClass="bg-forest"
              icon={<Users className="h-6 w-6" />}
              title="Officials Directory"
              desc="Verified profiles for elected and appointed high-ranking officials."
            />
            <ServiceCard
              accentClass="bg-rust"
              icon={<Scale className="h-6 w-6" />}
              title="Legislative Tracker"
              desc="Records of bills, legislative stages, and executive authorship."
            />
            <ServiceCard
              accentClass="bg-copper"
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Truth Media Hub"
              desc="Systems to detect deepfakes and verify circulating articles."
            />
          </div>
        </div>
      </section>

      {/* Integrated About Section (The Manifesto) */}
      <section id="about" className="bg-gradient-to-br from-[#2a2422] via-[#3d2c23] to-[#1e1511] py-24 text-cream">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <h2 className="font-display text-5xl md:text-6xl text-copper">The Manifesto</h2>
              <div className="mt-8 border-l-4 border-rust pl-6">
                <p className="font-serif-display text-2xl text-cream/95 leading-relaxed">
                  The platform is built on a simple premise: citizens deserve a clear, free, and verifiable view of how executive and legislative power is exercised.
                </p>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-sm transition duration-300 hover:bg-white/10">
                <p className="text-lg leading-relaxed text-cream/90">
                  Primary sources — legislative dockets, COA reports, Gazette issuances, and verified press coverage regarding high-ranking executive and legislative positions — are aggregated into a single searchable surface. Nothing is paywalled. Nothing is editorialized.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-sm transition duration-300 hover:bg-white/10">
                <p className="text-lg leading-relaxed text-cream/90">
                  The mission is to lower the cost of civic literacy from hours to seconds, removing external pressures and exposing questionable track records objectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Anonymous Footer */}
      <footer className="bg-[#1a1513] py-14 text-center text-cream/70 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 flex flex-col items-center">
          <img src={shield} alt="" className="h-12 w-12 opacity-30 grayscale mb-6" />
          <p className="font-display text-2xl tracking-widest text-cream/90">P.A.T.A.G.</p>
          <p className="mt-3 text-xs uppercase tracking-[0.3em] font-semibold text-copper">Decentralized • Anonymous • Uncompromised</p>

          <div className="mt-10 max-w-2xl text-[11px] leading-relaxed opacity-50">
            Information presented on this platform is aggregated directly from public domain records, official government gazettes, and verified media sources.
            Identities of platform maintainers, node operators, and researchers remain strictly confidential to preserve operational integrity and ensure the safety of the network.
            No tracking scripts are deployed. Access remains completely unrestricted.
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, desc, accentClass }: { icon: ReactNode; title: string; desc: string; accentClass: string }) {
  const navigate = useNavigate();

  const handleClick = () => {
    alert("Please log in first to access platform services.");
    navigate({ to: "/login" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full text-left group relative overflow-hidden rounded-3xl border border-tan/80 bg-white p-8 shadow-card transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className={`absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-[2.5] ${accentClass}`} />

      <div className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl text-cream shadow-md transition-transform duration-300 group-hover:scale-110 ${accentClass}`}>
        {icon}
      </div>

      <div className="relative z-10 mt-8">
        <h3 className="font-display text-2xl text-cocoa transition-colors duration-300 group-hover:text-rust">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-coffee">{desc}</p>
      </div>
    </button>
  );
}