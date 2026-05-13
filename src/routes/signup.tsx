import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { User, Mail, Calendar, Eye } from "lucide-react";
import { AuthShell, Card, Field } from "./login";
import { Users, GraduationCap, Newspaper, Check, MapPin, Upload } from "lucide-react";
import { setUser } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — P.A.T.A.G." }, { name: "description", content: "Join PATAG." }] }),
  component: Signup,
});

type Step = 1 | 2 | 3;
type Role = "citizen" | "researcher" | "journalist";

function Signup() {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState({ fullName: "", email: "", dob: "", password: "", confirm: "" });
  const [role, setRole] = useState<Role>("citizen");
  const navigate = useNavigate();

  return (
    <AuthShell>
      {step === 1 && (
        <Card>
          <h1 className="text-center font-display text-3xl text-cream">Create an account</h1>
          <form
            className="mt-6 space-y-5"
            onSubmit={(e) => { e.preventDefault(); if (data.password !== data.confirm) { alert("Passwords don't match"); return; } setStep(2); }}
          >
            <Field icon={<User className="h-4 w-4" />}>
              <input required value={data.fullName} onChange={(e) => setData({ ...data, fullName: e.target.value })} placeholder="Full name" className="auth-input" />
            </Field>
            <Field icon={<Mail className="h-4 w-4" />}>
              <input required type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Email" className="auth-input" />
            </Field>
            <Field icon={<Calendar className="h-4 w-4" />}>
              <input required value={data.dob} onChange={(e) => setData({ ...data, dob: e.target.value })} placeholder="MM/DD/YYYY" className="auth-input" />
            </Field>
            <Field icon={<Eye className="h-4 w-4" />}>
              <input required type="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="Password" className="auth-input" />
            </Field>
            <Field icon={<Eye className="h-4 w-4" />}>
              <input required type="password" value={data.confirm} onChange={(e) => setData({ ...data, confirm: e.target.value })} placeholder="Confirm Password" className="auth-input" />
            </Field>
            <button className="w-full rounded-full bg-onyx py-3 font-semibold text-cream hover:bg-black transition">Continue →</button>
            <p className="text-center text-xs text-cream/80">Already have an account?{" "}
              <Link to="/login" className="text-copper font-semibold hover:underline">Login</Link>
            </p>
          </form>
        </Card>
      )}

      {step === 2 && (
        <Card className="max-w-2xl">
          <button onClick={() => setStep(1)} className="rounded-full bg-onyx/80 px-3 py-1 text-xs font-bold text-cream">BACK</button>
          <h1 className="mt-4 font-display text-3xl text-cream">How will you use PATAG?</h1>
          <p className="mt-1 text-sm text-cream/70">This shapes the data and tools you'll see. You can update later.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {([
              { id: "citizen", icon: <Users className="h-5 w-5" />, title: "Citizen / Voter", desc: "Track officials, votes, and public records relevant to your community." },
              { id: "researcher", icon: <GraduationCap className="h-5 w-5" />, title: "Student / Researcher", desc: "Access verified data for academic research and analysis." },
              { id: "journalist", icon: <Newspaper className="h-5 w-5" />, title: "Journalist / Media", desc: "Get raw data, exports, and advanced search after verification." },
            ] as const).map((opt) => {
              const sel = role === opt.id;
              return (
                <button key={opt.id} type="button" onClick={() => setRole(opt.id)}
                  className={"relative rounded-2xl p-4 text-left transition " + (sel ? "bg-forest text-cream ring-2 ring-forest" : "bg-onyx/60 text-cream hover:bg-onyx/80 ring-1 ring-white/10")}>
                  {sel && <Check className="absolute right-2 top-2 h-4 w-4 rounded-full bg-cream text-forest p-0.5" />}
                  <div className={"grid h-9 w-9 place-items-center rounded-lg " + (sel ? "bg-cream/20" : "bg-cream/10")}>{opt.icon}</div>
                  <div className="mt-3 font-semibold">{opt.title}</div>
                  <div className="mt-1 text-xs opacity-80">{opt.desc}</div>
                </button>
              );
            })}
          </div>
          <button onClick={() => setStep(3)} className="mt-6 w-full rounded-full bg-onyx py-3 font-semibold text-cream hover:bg-black transition">Continue</button>
          <p className="mt-3 text-center text-xs text-cream/80">Already have an account? <Link to="/login" className="text-copper font-semibold hover:underline">Login</Link></p>
        </Card>
      )}

      {step === 3 && (
        <Card className="max-w-xl">
          <button onClick={() => setStep(2)} className="rounded-full bg-onyx/80 px-3 py-1 text-xs font-bold text-cream">BACK</button>
          {role === "citizen" && <CitizenForm onSubmit={finish} />}
          {role === "researcher" && <ResearcherForm onSubmit={finish} />}
          {role === "journalist" && <JournalistForm onSubmit={finish} />}
          <p className="mt-4 text-center text-xs text-cream/80">Already have an account? <Link to="/login" className="text-copper font-semibold hover:underline">Login</Link></p>
        </Card>
      )}
    </AuthShell>
  );

  function finish(extra: Record<string, string>) {
    setUser({ email: data.email, fullName: data.fullName, role, location: extra.city ?? "Philippines" });
    navigate({ to: "/home" });
  }
}

function CitizenForm({ onSubmit }: { onSubmit: (x: Record<string, string>) => void }) {
  const [city, setCity] = useState("");
  const [voter, setVoter] = useState("Yes");
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ city }); }} className="mt-4">
      <h1 className="font-display text-3xl text-cream">Tell us about you</h1>
      <p className="mt-1 text-sm text-cream/70">Helps us surface data relevant to your community and sector.</p>
      <div className="mt-5 space-y-4">
        <Labeled label="Occupational industry"><select className="auth-select"><option>Select industry</option><option>Education</option><option>Healthcare</option><option>Government</option></select></Labeled>
        <div className="grid grid-cols-2 gap-3">
          <Labeled label="City / Municipality">
            <div className="flex items-center gap-2 border-b border-white/20 pb-2"><MapPin className="h-4 w-4 text-cream/60" /><input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Batangas City" className="auth-input" /></div>
          </Labeled>
          <Labeled label="Province"><select className="auth-select"><option>Select province</option><option>Batangas</option><option>Cebu</option><option>Metro Manila</option></select></Labeled>
        </div>
        <Labeled label="Are you a registered voter?">
          <div className="grid grid-cols-3 gap-2">
            {["Yes","No","SK Voter"].map(o => (
              <button type="button" key={o} onClick={() => setVoter(o)} className={"rounded-lg border py-2 text-sm transition " + (voter===o ? "border-copper bg-copper/20 text-cream" : "border-white/15 text-cream/80 hover:bg-white/5")}>
                <span className="mr-2">{voter===o ? "●" : "○"}</span>{o}
              </button>
            ))}
          </div>
        </Labeled>
        <label className="flex items-start gap-2 text-xs text-cream/80"><input required type="checkbox" className="mt-0.5 accent-copper" />I agree to the <a className="text-copper underline">Terms of Service</a> and <a className="text-copper underline">Privacy Policy</a></label>
      </div>
      <button className="mt-6 w-full rounded-full bg-onyx py-3 font-semibold text-cream hover:bg-black transition">Create account</button>
    </form>
  );
}

function ResearcherForm({ onSubmit }: { onSubmit: (x: Record<string, string>) => void }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({}); }} className="mt-4">
      <h1 className="font-display text-3xl text-cream">Research Details</h1>
      <p className="mt-1 text-sm text-cream/70">Optional ID upload unlocks a Verified Badge and advanced research tools.</p>
      <div className="mt-5 space-y-4">
        <Labeled label="Organization Type"><select className="auth-select"><option>What type of organization are you affiliated with?</option><option>University</option><option>Think Tank</option><option>NGO</option></select></Labeled>
        <Labeled label="Institution or Organization Name"><input className="auth-input border-b border-white/20 pb-2 w-full" placeholder="e.g. University of the Philippines Diliman" /></Labeled>
        <Labeled label="Upload your identification card"><UploadBox /></Labeled>
        <label className="flex items-start gap-2 text-xs text-cream/80"><input required type="checkbox" className="mt-0.5 accent-copper" />I agree to the <a className="text-copper underline">Terms</a> and <a className="text-copper underline">Privacy Policy</a></label>
      </div>
      <button className="mt-6 w-full rounded-full bg-onyx py-3 font-semibold text-cream hover:bg-black transition">Create account</button>
    </form>
  );
}

function JournalistForm({ onSubmit }: { onSubmit: (x: Record<string, string>) => void }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({}); }} className="mt-4">
      <h1 className="font-display text-3xl text-cream">Verify your Credentials</h1>
      <p className="mt-1 text-sm text-cream/70">Optional ID upload unlocks a Verified Badge and advanced research tools.</p>
      <div className="mt-5 space-y-4">
        <Labeled label="Institution / Organization Name"><input className="auth-input border-b border-white/20 pb-2 w-full" placeholder="e.g. Philippine Daily Inquirer" /></Labeled>
        <Labeled label="Upload Professional or Press ID"><UploadBox /></Labeled>
        <Labeled label="Author portfolio or professional profile"><input className="auth-input border-b border-white/20 pb-2 w-full" placeholder="https://" /></Labeled>
        <div className="rounded-lg bg-white/5 p-3 text-xs text-cream/80 ring-1 ring-white/10">Pending verification. Your account stays in Pending status until our human reviewers confirm your credentials.</div>
        <label className="flex items-start gap-2 text-xs text-cream/80"><input required type="checkbox" className="mt-0.5 accent-copper" />I agree to the <a className="text-copper underline">Terms</a> and <a className="text-copper underline">Privacy Policy</a></label>
      </div>
      <button className="mt-6 w-full rounded-full bg-onyx py-3 font-semibold text-cream hover:bg-black transition">Create account</button>
    </form>
  );
}

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><div className="mb-1 text-xs text-cream/70">{label}</div>{children}</div>;
}

function UploadBox() {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-white/20 p-3 text-sm text-cream/80 hover:bg-white/5">
      <span className="grid h-9 w-9 place-items-center rounded-md bg-copper/30 text-copper"><Upload className="h-4 w-4" /></span>
      <span>
        <span className="block font-medium text-cream">Click to upload</span>
        <span className="block text-xs text-cream/60">JPG, PNG, or PDF · max 5 MB</span>
      </span>
      <input type="file" className="hidden" />
    </label>
  );
}
