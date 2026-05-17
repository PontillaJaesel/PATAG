import { useEffect, useMemo, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicNav } from "@/components/PublicNav";
import shield from "@/assets/patag-shield.png";
import { ArrowRight, Building2, Clock3, Gavel, Scale, Search, Shield, Users } from "lucide-react";

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
    title: "132 areas remain flooded due to Typhoon Uwan — NDRRMC",
    source: "Inquirer.net",
    url: "https://newsinfo.inquirer.net/2137306/fwd-132-areas-remain-flooded-due-to-typhoon-uwan-ndrrmc",
    thumbnail:
      "https://newsinfo.inquirer.net/files/2025/11/AFP__20251109__83HP2T3__v3__MidRes__PhilippinesWeatherTyphoon.jpg",
  },
  {
    title: "NBI files raps vs vloggers outside PH for disinformation",
    source: "Inquirer.net",
    url: "https://newsinfo.inquirer.net/2055033/nbi-files-raps-vs-vloggers-outside-ph-for-disinformation",
    thumbnail: "https://newsinfo.inquirer.net/files/2025/04/Jaime-Santiago-23April2025.jpg",
  },
  {
    title: "Extreme weather: Study says PH 10th hardest hit",
    source: "Inquirer.net",
    url: "https://newsinfo.inquirer.net/2034106/extreme-weather-study-says-ph-10th-hardest-hit",
    thumbnail: "https://newsinfo.inquirer.net/files/2025/02/News947535.jpg",
  },
  {
    title: "Legarda pushes for united effort to protect oceans, PH livelihood",
    source: "Inquirer.net",
    url: "https://newsinfo.inquirer.net/2095391/legarda-pushes-for-united-effort-to-protect-oceans-ph-livelihood",
    thumbnail: "https://newsinfo.inquirer.net/files/2025/08/legarda-dfa.jpeg",
  },
  {
    title: "Habagat, cyclone death toll rises to 37 — NDRRMC",
    source: "Inquirer.net",
    url: "https://newsinfo.inquirer.net/2089799/habagat-cyclone-death-toll-rises-to-37-ndrrmc",
    thumbnail:
      "https://newsinfo.inquirer.net/files/2025/07/Typhoon-damaged-rockshed-in-Baguio-Kennon-Road.jpg",
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
  const shuffledHeadlines = useMemo(
    () => [...TOP_HEADLINES].sort(() => Math.random() - 0.5).slice(0, 5),
    [],
  );

  useEffect(() => {
    if (isHeadlineRotationPaused || shuffledHeadlines.length === 0) return;

    const interval = setInterval(() => {
      setActiveHeadline((current) => (current + 1) % shuffledHeadlines.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHeadlineRotationPaused, shuffledHeadlines]);

  const currentHeadline = shuffledHeadlines[activeHeadline];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-cream">
      <PublicNav />

      <section className="relative overflow-hidden bg-gradient-hero text-cream">
        <div className="absolute inset-0 opacity-35 [background:radial-gradient(circle_at_10%_20%,white,transparent_45%),radial-gradient(circle_at_85%_25%,#d6a76a,transparent_35%)]" />
        <div className="absolute inset-x-0 top-0 border-b border-white/15 bg-black/15 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/85">
            <span>Anonymous civic intelligence stream</span>
            <span>Philippines-focused updates</span>
          </div>
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-20 text-center md:flex-row md:items-center md:py-24 md:text-left">
          <div className="group relative">
            <span className="absolute -inset-4 -z-10 rounded-full bg-cream/20 blur-2xl transition duration-500 group-hover:scale-110" />
            <img
              src={shield}
              alt="P.A.T.A.G. shield"
              width={200}
              height={200}
              className="h-36 w-36 rounded-full border border-cream/45 bg-white/10 p-2 drop-shadow-2xl transition duration-500 group-hover:scale-105 group-hover:rotate-3 md:h-44 md:w-44"
            />
          </div>
          <div className="md:ml-6">
            <h1 className="font-display text-5xl tracking-tight md:text-7xl">P.A.T.A.G.</h1>
            <p className="mt-3 font-serif-display text-2xl text-cream/95 md:text-3xl">
              Public Access for Truth, Alliances, and Governance
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-cream/90 md:text-base">
              Your civic command center for evidence-backed governance updates in the Philippines.
              Search what matters, scan live-style branch signals, then take action where you live.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-cream/85 md:justify-start md:text-sm">
              <span className="rounded-full border border-cream/40 bg-white/10 px-3 py-1">
                1 · Search any issue
              </span>
              <span className="rounded-full border border-cream/40 bg-white/10 px-3 py-1">
                2 · Watch urgent signals
              </span>
              <span className="rounded-full border border-cream/40 bg-white/10 px-3 py-1">
                3 · Join civic action
              </span>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-onyx transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
              >
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-5 py-2.5 text-sm font-semibold text-cream/90">
                Scroll for services and platform background
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-tan/60 bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <h2 className="font-display text-3xl text-rust md:text-4xl">
            Search politicians, bills, agencies, or issues.
          </h2>
          <form
            onSubmit={(event) => event.preventDefault()}
            className="mt-6 flex flex-col gap-3 rounded-2xl border border-tan/60 bg-white p-3 shadow-card transition duration-300 hover:border-cocoa/40 hover:shadow-xl md:flex-row md:items-center"
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
              className="rounded-xl bg-rust px-5 py-3 text-sm font-semibold text-cream transition duration-300 hover:-translate-y-0.5 hover:bg-cocoa"
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

      <section className="px-0 py-10">
        <div className="mx-auto mb-4 flex max-w-7xl items-center justify-between gap-3 px-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mocha">
              What is happening in the Philippines now?
            </p>
            <h2 className="font-display text-3xl text-rust md:text-4xl">Verified national pulse</h2>
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mocha">
            Rotates every 5s
          </span>
        </div>
        {currentHeadline && (
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
        )}
        <div className="mx-auto mt-3 flex max-w-7xl items-center justify-end gap-2 px-6">
          {shuffledHeadlines.map((headline, index) => (
            <button
              key={headline.title}
              type="button"
              onClick={() => setActiveHeadline(index)}
              className={`h-2.5 rounded-full transition ${
                index === activeHeadline
                  ? "w-10 bg-rust"
                  : "w-5 bg-mocha/30 hover:w-7 hover:bg-mocha/60"
              }`}
              aria-label={`Show headline ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="mt-2 font-display text-3xl text-rust md:text-4xl">
            Urgent highlights across four branches.
          </h2>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-cocoa shadow-card">
            <Clock3 className="h-3.5 w-3.5" />
            Live-style feed (mock data)
          </span>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {FRONT_PAGE_HIGHLIGHTS.map((item) => (
            <article
              key={item.title}
              className={`rounded-2xl bg-gradient-to-br p-5 text-cream shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl ${item.className}`}
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
        <h2 className="mt-2 font-display text-3xl text-rust md:text-4xl">
          Services available on this page.
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-mocha">
          Core platform services are listed here directly so you can explore without leaving the
          landing page.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <ActionCard
            icon={<Users className="h-5 w-5" />}
            title="Find Your Representative"
            description="Locate and verify public officials connected to your area."
          />
          <ActionCard
            icon={<Shield className="h-5 w-5" />}
            title="Take a National Survey"
            description="Share your policy priorities and compare national sentiment."
          />
          <ActionCard
            icon={<Building2 className="h-5 w-5" />}
            title="Track My District’s Budget"
            description="Follow allocations, releases, and implementation status by district."
          />
        </div>
      </section>

      <section className="border-y border-tan/60 bg-white/70">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <h2 className="mt-2 font-display text-3xl text-rust md:text-4xl">About P.A.T.A.G.</h2>
          <div className="mt-4 grid gap-3 text-sm text-cocoa md:grid-cols-3">
            <article className="rounded-xl border border-tan/50 bg-white px-4 py-3 shadow-card">
              <h3 className="font-semibold text-rust">Mission</h3>
              <p className="mt-1 text-mocha">
                Build a public-interest platform that tracks policy, budgets, and governance
                signals.
              </p>
            </article>
            <article className="rounded-xl border border-tan/50 bg-white px-4 py-3 shadow-card">
              <h3 className="font-semibold text-rust">Method</h3>
              <p className="mt-1 text-mocha">
                Summaries are structured from public records and verified news streams for quick
                civic context.
              </p>
            </article>
            <article className="rounded-xl border border-tan/50 bg-white px-4 py-3 shadow-card">
              <h3 className="font-semibold text-rust">Identity</h3>
              <p className="mt-1 text-mocha">
                This public surface stays intentionally neutral and anonymous to prioritize the
                information itself.
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-tan/70 bg-white p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-cocoa/50 hover:shadow-2xl">
      <span className="inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1 text-xs font-semibold text-rust">
        {icon}
        Action
      </span>
      <h3 className="mt-3 font-display text-xl text-cocoa">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-mocha">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-rust">
        Available on this page
        <ArrowRight className="h-4 w-4" />
      </span>
    </article>
  );
}
