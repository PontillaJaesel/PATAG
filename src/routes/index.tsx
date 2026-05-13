import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicNav } from "@/components/PublicNav";
import { Footer } from "@/components/Footer";
import shield from "@/assets/patag-shield.png";
import { ArrowRight, Building2, Clock3, Gavel, Scale, Search, Shield } from "lucide-react";

const FRONT_PAGE_HIGHLIGHTS = [
  {
    branch: "Executive",
    title: "DBM releases conditional allotment for climate resilience projects",
    urgency: "Urgent budget watch",
    time: "Updated 28 mins ago",
    icon: <Shield className="h-5 w-5" />,
    className: "from-rust to-cocoa",
  },
  {
    branch: "Legislative",
    title: "Senate committee schedules final hearing for Digital Governance bill",
    urgency: "Highly debated",
    time: "Updated 43 mins ago",
    icon: <Scale className="h-5 w-5" />,
    className: "from-coffee to-onyx",
  },
  {
    branch: "Judicial",
    title: "Supreme Court publishes ruling on procurement transparency dispute",
    urgency: "New ruling",
    time: "Updated 1 hr ago",
    icon: <Gavel className="h-5 w-5" />,
    className: "from-mocha to-tan",
  },
  {
    branch: "Constitutional Bodies",
    title: "COA flags delayed liquidation of disaster funds in three regions",
    urgency: "Red flag",
    time: "Updated 1 hr ago",
    icon: <Building2 className="h-5 w-5" />,
    className: "from-tan to-mocha",
  },
] as const;

const TOP_HEADLINES = [
  {
    title: "DBM publishes latest National Expenditure Program brief",
    source: "Department of Budget and Management",
    url: "https://www.dbm.gov.ph/index.php/newsroom",
    thumbnail:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Senate of the Philippines releases current committee hearing calendar",
    source: "Senate of the Philippines",
    url: "https://legacy.senate.gov.ph/",
    thumbnail:
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "House of Representatives posts latest legislative updates and agenda",
    source: "House of Representatives",
    url: "https://www.congress.gov.ph/",
    thumbnail:
      "https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Supreme Court Public Information Office posts official advisories",
    source: "Supreme Court of the Philippines",
    url: "https://sc.judiciary.gov.ph/",
    thumbnail:
      "https://images.unsplash.com/photo-1555374018-13a8994ab246?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "COA issues newly released annual audit observations",
    source: "Commission on Audit",
    url: "https://www.coa.gov.ph/reports/",
    thumbnail:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "P.A.T.A.G. — Truth is a public utility" },
      {
        name: "description",
        content:
          "Public Access for Truth, Alliances, and Governance. The open Filipino civic platform tracking every peso, every bill, every politician.",
      },
      { property: "og:title", content: "P.A.T.A.G. — Truth is a public utility" },
      {
        property: "og:description",
        content:
          "Track every bill, every peso, and every politician across the four branches of government.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [activeHeadline, setActiveHeadline] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHeadlineRotationPaused, setIsHeadlineRotationPaused] = useState(false);

  useEffect(() => {
    if (isHeadlineRotationPaused) return;

    const interval = setInterval(() => {
      setActiveHeadline((current) => (current + 1) % TOP_HEADLINES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHeadlineRotationPaused]);

  const currentHeadline = TOP_HEADLINES[activeHeadline];

  return (
    <div className="min-h-screen bg-cream">
      <PublicNav />

      <section className="relative overflow-hidden bg-gradient-hero text-cream">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay [background:radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-20 text-center md:flex-row md:items-start md:py-24 md:text-left">
          <img
            src={shield}
            alt="P.A.T.A.G. shield"
            width={180}
            height={180}
            className="h-32 w-32 md:h-40 md:w-40 drop-shadow-2xl"
          />
          <div className="md:ml-6">
            <h1 className="font-display text-5xl md:text-7xl tracking-tight">P.A.T.A.G.</h1>
            <p className="mt-3 font-serif-display text-2xl md:text-3xl text-cream/95">
              Public Access for Truth, Alliances, and Governance
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-cream/90 md:text-base">
              P.A.T.A.G. helps every Filipino quickly verify government actions. Start with search,
              scan the front page dashboard for urgent branch updates, then use the action hub to
              participate in civic decisions.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-onyx hover:bg-white"
              >
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-5 py-2.5 text-sm font-semibold text-cream hover:bg-white/10"
              >
                Explore platform tools
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-5 py-2.5 text-sm font-semibold text-cream hover:bg-white/10"
              >
                About P.A.T.A.G.
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-tan/60 bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-mocha">
            Global Search Engine
          </p>
          <h2 className="mt-2 font-display text-3xl text-rust md:text-4xl">
            Search politicians, bills, agencies, or issues.
          </h2>
          <form
            onSubmit={(event) => event.preventDefault()}
            className="mt-6 flex flex-col gap-3 rounded-2xl border border-tan/60 bg-white p-3 shadow-card md:flex-row md:items-center"
          >
            <label htmlFor="patag-global-search" className="sr-only">
              Search PATAG for a politician, bill, agency, or issue
            </label>
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-cream/70 px-3">
              <Search className="h-4 w-4 text-coffee" />
              <input
                id="patag-global-search"
                aria-label="Search PATAG"
                aria-describedby="search-examples"
                className="w-full bg-transparent py-3 text-sm text-onyx outline-none placeholder:text-coffee/60"
                placeholder="Type a politician, pending bill, agency, or trending issue"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-rust px-5 py-3 text-sm font-semibold text-cream hover:bg-cocoa"
            >
              Search PATAG
            </button>
          </form>
          <div id="search-examples" className="mt-3 text-sm text-mocha">
            Try: Republic Act updates · Senate Bill 1979 · COA findings · Public health issue
            <span className="ml-2 text-xs">Search results integration coming soon.</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-mocha">
              Front Page Dashboard
            </p>
            <h2 className="mt-2 font-display text-3xl text-rust md:text-4xl">
              Urgent highlights across four branches.
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-cocoa shadow-card">
            <Clock3 className="h-3.5 w-3.5" />
            Live-style feed (mock data)
          </span>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {FRONT_PAGE_HIGHLIGHTS.map((item) => (
            <article
              key={item.title}
              className={`rounded-2xl bg-gradient-to-br p-5 text-cream shadow-card ${item.className}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  {item.icon}
                  {item.branch}
                </div>
                <span className="text-xs text-cream/90">{item.time}</span>
              </div>
              <h3 className="mt-4 font-display text-xl leading-tight">{item.title}</h3>
              <p className="mt-2 text-sm text-cream/90">{item.urgency}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <p className="font-display text-sm uppercase tracking-[0.2em] text-mocha">
          Action & Engagement Hub
        </p>
        <h2 className="mt-2 font-display text-3xl text-rust md:text-4xl">
          Take action in minutes.
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <ActionCard
            to="/services"
            title="Find Your Representative"
            description="Locate and verify public officials connected to your area."
          />
          <ActionCard
            to="/services"
            title="Take a National Survey"
            description="Share your policy priorities and compare national sentiment."
          />
          <ActionCard
            to="/services"
            title="Track My District’s Budget"
            description="Follow allocations, releases, and implementation status by district."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-mocha">
              Updated News Headlines
            </p>
            <h2 className="mt-2 font-display text-3xl text-rust md:text-4xl">
              Top 5 official-source headlines.
            </h2>
          </div>
          <span className="text-xs font-semibold text-mocha">Rotates every 5 seconds</span>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
          <a
            href={currentHeadline.url}
            target="_blank"
            rel="noreferrer"
            className="group relative block overflow-hidden rounded-2xl border border-tan/70 shadow-card"
          >
            <img
              src={currentHeadline.thumbnail}
              alt={currentHeadline.title}
              className="h-72 w-full object-cover transition duration-500 group-hover:scale-105 md:h-80"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-onyx/35 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-cream">
              <div className="text-xs uppercase tracking-[0.18em] text-cream/70">
                {currentHeadline.source}
              </div>
              <div className="mt-2 font-display text-2xl leading-tight">
                {currentHeadline.title}
              </div>
            </div>
          </a>

          <div className="grid gap-3">
            {TOP_HEADLINES.map((headline, index) => (
              <a
                key={headline.title}
                href={headline.url}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => {
                  setIsHeadlineRotationPaused(true);
                  setActiveHeadline(index);
                }}
                onMouseLeave={() => setIsHeadlineRotationPaused(false)}
                onFocus={() => {
                  setIsHeadlineRotationPaused(true);
                  setActiveHeadline(index);
                }}
                onBlur={() => setIsHeadlineRotationPaused(false)}
                className={`group relative block overflow-hidden rounded-xl border shadow-card transition ${
                  index === activeHeadline ? "border-cocoa" : "border-tan/70"
                }`}
              >
                <img
                  src={headline.thumbnail}
                  alt={headline.title}
                  className="h-20 w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-onyx/65 opacity-0 transition group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-xs font-semibold leading-tight text-cream">
                  {headline.title}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-tan/60 bg-white/70">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-mocha">
            Transparency Policy
          </p>
          <h2 className="mt-2 font-display text-3xl text-rust md:text-4xl">
            Know how PATAG stays accountable.
          </h2>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cocoa">
            <Link to="/about" className="font-semibold hover:text-rust">
              About Us
            </Link>
            <Link to="/about" className="font-semibold hover:text-rust">
              Data Methodology
            </Link>
            <a href="mailto:team@patag.ph" className="font-semibold hover:text-rust">
              Contact: team@patag.ph
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ActionCard({
  to,
  title,
  description,
}: {
  to: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="rounded-2xl border border-tan/70 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-xl"
    >
      <h3 className="font-display text-xl text-cocoa">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-mocha">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-rust">
        Open
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
