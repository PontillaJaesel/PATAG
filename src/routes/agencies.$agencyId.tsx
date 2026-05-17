import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { AppNav } from "@/components/AppNav";
import { ChevronLeft, AlertCircle, CheckCircle } from "lucide-react";
import { agencies, officials } from "@/lib/mock-data";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/agencies/$agencyId")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" });
  },
  head: () => {
    const agency = agencies.find(a => a.id === Route.useParams().agencyId);
    return {
      meta: [
        { title: `${agency?.name || "Agency"} — P.A.T.A.G.` },
        { name: "description", content: agency?.mandate || "Agency details and information." }
      ]
    };
  },
  component: AgencyDetails,
  notFoundComponent: () => (
    <div className="min-h-screen bg-cream">
      <AppNav />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-2xl border border-tan bg-white p-8 text-center">
          <h2 className="font-display text-2xl text-cocoa mb-2">Agency Not Found</h2>
          <p className="text-coffee mb-6">The agency you're looking for doesn't exist.</p>
          <Link to="/officials/" className="inline-flex items-center gap-2 text-rust font-semibold hover:text-rust/80">
            <ChevronLeft className="h-4 w-4" />
            Back to Officials
          </Link>
        </div>
      </div>
    </div>
  ),
});

function AgencyDetails() {
  const { agencyId } = Route.useParams();
  const agency = agencies.find(a => a.id === agencyId);
  const secretary = agency?.secretaryId ? officials.find(o => o.id === agency.secretaryId) : null;

  if (!agency) return null;

  const openIssues = agency.issues.filter(i => i.status === "Open");
  const resolvedIssues = agency.issues.filter(i => i.status === "Resolved");

  return (
    <div className="min-h-screen bg-cream">
      <AppNav />

      {/* Header Section */}
      <section className="bg-gradient-to-br from-rust via-cocoa to-onyx text-cream">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <Link to="/officials/" className="inline-flex items-center gap-2 text-cream/70 hover:text-cream mb-6 font-semibold text-sm">
            <ChevronLeft className="h-4 w-4" />
            Back to Officials
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl">{agency.name}</h1>
          <p className="mt-3 font-serif-display text-base text-cream/90 sm:text-lg max-w-3xl">{agency.mandate}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center rounded-full bg-forest/20 px-4 py-2 font-semibold text-cream">{agency.acronym}</span>
            <span className="inline-flex items-center rounded-full bg-copper/20 px-4 py-2 font-semibold text-cream">{agency.type}</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-cream/20 px-4 py-2 font-semibold text-cream">📍 {agency.location}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Budget Transparency Section */}
            <div className="rounded-2xl border border-tan bg-white p-6 shadow-card">
              <h2 className="font-display text-2xl text-cocoa mb-6">💰 Budget Transparency</h2>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="rounded-lg bg-forest/5 p-4">
                  <div className="text-sm text-coffee mb-2">Total Budget</div>
                  <div className="font-display text-2xl text-forest">₱{(agency.budget.totalBudget / 1_000_000_000).toFixed(1)}B</div>
                </div>
                <div className="rounded-lg bg-copper/5 p-4">
                  <div className="text-sm text-coffee mb-2">Utilised</div>
                  <div className="font-display text-2xl text-copper">₱{(agency.budget.utilisedBudget / 1_000_000_000).toFixed(1)}B</div>
                </div>
                <div className="rounded-lg bg-rust/5 p-4">
                  <div className="text-sm text-coffee mb-2">Surplus</div>
                  <div className="font-display text-2xl text-rust">₱{((agency.budget.totalBudget - agency.budget.utilisedBudget) / 1_000_000_000).toFixed(1)}B</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-cocoa text-lg mb-4">Program Budget Breakdown</h3>
                <ul className="space-y-3">
                  {agency.budget.breakdown.map((item, i) => (
                    <li key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                      <span className="font-semibold text-cocoa">{item.program}</span>
                      <span className="font-semibold text-rust">₱{(item.amount / 1_000_000_000).toFixed(2)}B</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Accountability Metrics */}
            <div className="rounded-2xl border border-tan bg-white p-6 shadow-card">
              <h2 className="font-display text-2xl text-cocoa mb-6">📊 Accountability Metrics</h2>
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-rust/5 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-rust" />
                    <span className="font-semibold text-cocoa">Open Issues</span>
                  </div>
                  <div className="font-display text-3xl text-rust">{openIssues.length}</div>
                </div>
                <div className="rounded-lg bg-forest/5 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-forest" />
                    <span className="font-semibold text-cocoa">Resolved</span>
                  </div>
                  <div className="font-display text-3xl text-forest">{resolvedIssues.length}</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-cocoa text-lg mb-4">COA Audit Status</h3>
                <div className="rounded-lg bg-muted p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-cocoa">Current Status</span>
                    <span className="inline-flex items-center rounded-full bg-forest/15 px-3 py-1 font-semibold text-forest">Active</span>
                  </div>
                </div>
              </div>
              {openIssues.length > 0 && (
                <div>
                  <h3 className="font-semibold text-cocoa text-lg mb-4">Outstanding Concerns</h3>
                  <ul className="space-y-2">
                    {openIssues.map((issue) => (
                      <li key={issue.id} className="p-4 rounded-lg border border-tan/50">
                        <div className="flex items-start gap-3">
                          <span className={`inline-flex rounded px-2 py-1 text-xs font-semibold whitespace-nowrap mt-0.5 ${
                            issue.severity === "High" ? "bg-rust/15 text-rust" :
                            issue.severity === "Medium" ? "bg-copper/15 text-copper" :
                            "bg-coffee/15 text-coffee"
                          }`}>
                            {issue.severity}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-cocoa">{issue.title}</div>
                            <div className="text-xs text-coffee mt-1">Reported: {issue.dateReported}</div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {resolvedIssues.length > 0 && (
                <div className="mt-6 pt-6 border-t border-tan">
                  <h3 className="font-semibold text-cocoa text-lg mb-4">Resolved Issues</h3>
                  <ul className="space-y-2">
                    {resolvedIssues.map((issue) => (
                      <li key={issue.id} className="p-4 rounded-lg border border-tan/50 bg-forest/5">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-forest mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-cocoa">{issue.title}</div>
                            <div className="text-xs text-coffee mt-1">Resolved on: {issue.dateReported}</div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Programs & Initiatives */}
            <div className="rounded-2xl border border-tan bg-white p-6 shadow-card">
              <h2 className="font-display text-2xl text-cocoa mb-6">🎯 Programs & Initiatives</h2>
              <div className="space-y-4">
                {agency.programs.map((program) => (
                  <div key={program.id} className="p-5 rounded-lg border border-tan/50 hover:border-tan transition">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-cocoa text-lg">{program.name}</h3>
                      </div>
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                        program.status === "Active" ? "bg-forest/15 text-forest" : "bg-clock/15 text-coffee"
                      }`}>
                        {program.status === "Active" ? "●" : "○"} {program.status}
                      </span>
                    </div>
                    <p className="text-coffee">{program.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sources & References */}
            <div className="rounded-2xl border border-tan bg-white p-6 shadow-card">
              <h2 className="font-display text-2xl text-cocoa mb-6">📚 Sources & References</h2>
              <ul className="space-y-3">
                {agency.sources.map((source, i) => (
                  <li key={i}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-forest font-semibold hover:text-forest/80 transition inline-flex items-center gap-2 p-3 rounded-lg bg-forest/5 hover:bg-forest/10"
                    >
                      {source.label}
                      <span>↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Department Head / Secretary Section */}
            {secretary && (
              <div className="rounded-2xl border border-tan bg-white p-6 shadow-card">
                <h2 className="font-display text-xl text-cocoa mb-4">👔 Department Head</h2>
                <img
                  src={secretary.photo}
                  alt={secretary.name}
                  loading="lazy"
                  width={120}
                  height={120}
                  className="h-32 w-32 rounded-full object-cover mx-auto mb-4"
                />
                <div className="text-center mb-4">
                  <div className="font-semibold text-cocoa text-lg">{secretary.name}</div>
                  <div className="text-sm text-coffee mt-1">Secretary of {agency.name.replace("Department of ", "")}</div>
                  <div className="text-xs text-coffee/80 mt-2">Assumed Office: {secretary.dateAssumed}</div>
                </div>
                <div className="space-y-3 mb-4 pt-4 border-t border-tan">
                  <div>
                    <div className="text-xs font-semibold text-cocoa uppercase tracking-wide mb-2">Key Policies</div>
                    <ul className="space-y-1">
                      {secretary.policies.map((policy, i) => (
                        <li key={i} className="text-xs text-coffee/80 flex items-start gap-2">
                          <span className="text-rust mt-0.5 flex-shrink-0">▸</span>
                          <span>{policy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Link
                  to="/officials/$officialId"
                  params={{ officialId: secretary.id }}
                  className="block w-full rounded-lg bg-gradient-to-r from-rust to-cocoa px-4 py-2.5 text-center font-semibold text-cream hover:opacity-90 transition text-sm"
                >
                  View Full Profile →
                </Link>
              </div>
            )}

            {/* Quick Facts */}
            <div className="mt-6 rounded-2xl border border-tan bg-white p-6 shadow-card">
              <h3 className="font-semibold text-cocoa text-lg mb-4">Quick Facts</h3>
              <div className="space-y-3 text-sm">
                <div className="pb-3 border-b border-tan">
                  <div className="text-coffee mb-1">Agency Type</div>
                  <div className="font-semibold text-cocoa">{agency.type}</div>
                </div>
                <div className="pb-3 border-b border-tan">
                  <div className="text-coffee mb-1">Location</div>
                  <div className="font-semibold text-cocoa">{agency.location}</div>
                </div>
                <div className="pb-3 border-b border-tan">
                  <div className="text-coffee mb-1">Fiscal Year</div>
                  <div className="font-semibold text-cocoa">{agency.budget.fiscalYear}</div>
                </div>
                <div className="pb-3 border-b border-tan">
                  <div className="text-coffee mb-1">Budget Utilization</div>
                  <div className="font-semibold text-cocoa">{Math.round((agency.budget.utilisedBudget / agency.budget.totalBudget) * 100)}%</div>
                </div>
                <div>
                  <div className="text-coffee mb-1">Total Programs</div>
                  <div className="font-semibold text-cocoa">{agency.programs.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
