import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { AppNav } from "@/components/AppNav";
import { ShieldCheck, ScanSearch, Image as ImgIcon, Link2, AlertTriangle, CheckCircle2, FileVideo } from "lucide-react";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/truth-hub")({
  beforeLoad: () => { if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" }); },
  head: () => ({ meta: [
    { title: "Truth Media Hub — P.A.T.A.G." },
    { name: "description", content: "Verify articles, detect deepfakes, and check the legitimacy of media circulating on social platforms." },
  ]}),
  component: TruthHub,
});

type Tab = "article" | "image" | "video";

function TruthHub() {
  const [tab, setTab] = useState<Tab>("article");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<null | { score: number; verdict: string; reasons: string[] }>(null);

  function analyze() {
    if (!input) return;
    // Mock analysis — deterministic from input length
    const score = Math.min(95, 40 + (input.length * 7) % 55);
    setResult({
      score,
      verdict: score > 75 ? "Likely Authentic" : score > 50 ? "Inconclusive — needs review" : "Likely Manipulated",
      reasons: [
        "Cross-checked against 3 verified Philippine news outlets.",
        "Domain age and registration history reviewed.",
        "Image hash compared to known deepfake corpus.",
      ],
    });
  }

  return (
    <div className="min-h-screen bg-cream">
      <AppNav />
      <section className="bg-gradient-to-br from-forest via-cocoa to-onyx text-cream">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 text-xs uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5" /> Truth Media Hub
          </div>
          <h1 className="mt-4 font-display text-5xl">Verify before you share.</h1>
          <p className="mt-2 max-w-2xl font-serif-display text-lg text-cream/85">
            Paste an article URL, upload a suspicious photo, or drop a video link — PATAG cross-checks it against verified sources and a deepfake detection model.
          </p>
        </div>
      </section>

      <section className="mx-auto -mt-8 max-w-5xl px-6">
        <div className="rounded-3xl border border-tan bg-white p-6 shadow-card">
          <div className="flex flex-wrap gap-2">
            {([
              { id: "article", label: "Article URL", icon: <Link2 className="h-4 w-4" /> },
              { id: "image", label: "Photo", icon: <ImgIcon className="h-4 w-4" /> },
              { id: "video", label: "Video / Deepfake", icon: <FileVideo className="h-4 w-4" /> },
            ] as const).map((t) => (
              <button key={t.id} onClick={() => { setTab(t.id); setResult(null); }}
                className={"inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition " +
                  (tab === t.id ? "bg-forest text-cream" : "bg-cream text-cocoa hover:bg-tan/60")}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          <div className="mt-5">
            {tab === "article" && (
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="https://example.com/news-article"
                className="w-full rounded-xl border border-tan bg-cream/40 px-4 py-3 text-sm text-onyx outline-none focus:ring-2 focus:ring-forest" />
            )}
            {tab === "image" && (
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-tan bg-cream/40 p-6 text-sm text-cocoa hover:bg-cream/60">
                <ScanSearch className="h-5 w-5" /> Click to upload a photo to scan for manipulation
                <input type="file" className="hidden" onChange={(e) => setInput(e.target.files?.[0]?.name ?? "")} />
              </label>
            )}
            {tab === "video" && (
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste a TikTok / Facebook / YouTube link"
                className="w-full rounded-xl border border-tan bg-cream/40 px-4 py-3 text-sm text-onyx outline-none focus:ring-2 focus:ring-forest" />
            )}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-coffee">Powered by source cross-referencing & deepfake heuristics. Always corroborate before publishing.</div>
              <button onClick={analyze} className="rounded-full bg-copper px-5 py-2 text-sm font-semibold text-cream hover:opacity-90">Analyze</button>
            </div>
          </div>

          {result && (
            <div className="mt-6 rounded-2xl border border-tan bg-cream/50 p-5">
              <div className="flex items-center justify-between">
                <div className="font-display text-2xl text-cocoa">{result.verdict}</div>
                <div className={
                  "rounded-full px-3 py-1 text-xs font-bold " +
                  (result.score > 75 ? "bg-forest text-cream" : result.score > 50 ? "bg-copper text-cream" : "bg-rust text-cream")
                }>{result.score}% authenticity</div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-tan/60">
                <div className={"h-full " + (result.score > 75 ? "bg-forest" : result.score > 50 ? "bg-copper" : "bg-rust")} style={{ width: result.score + "%" }} />
              </div>
              <ul className="mt-4 space-y-2 text-sm text-cocoa">
                {result.reasons.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    {result.score > 50 ? <CheckCircle2 className="mt-0.5 h-4 w-4 text-forest shrink-0" /> : <AlertTriangle className="mt-0.5 h-4 w-4 text-rust shrink-0" />}
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14">
        <h2 className="font-display text-2xl text-cocoa">Recently flagged in the Philippines</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            { t: "AI-generated 'press conference' clip", v: "Deepfake", cls: "bg-rust" },
            { t: "Doctored ballot photograph", v: "Manipulated", cls: "bg-copper" },
            { t: "Misattributed quote to senator", v: "Misleading", cls: "bg-copper" },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-tan bg-white p-5 shadow-card">
              <div className={"inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold text-cream " + c.cls}>{c.v}</div>
              <div className="mt-3 font-semibold text-cocoa">{c.t}</div>
              <div className="mt-1 text-xs text-coffee">Reviewed by PATAG verification team</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
