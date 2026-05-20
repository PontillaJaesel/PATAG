import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, Card, Field } from "./login";
import { User, Mail, Calendar, Eye, EyeOff, Users, GraduationCap, Newspaper, Check, MapPin } from "lucide-react";
import { registerUser } from "../functions/action";
import UploadBox from './-UploadBox';

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

  // New States for validation and UX
  const [error, setError] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const industries = [
    "Education",
    "Healthcare",
    "Government",
    "IT / Technology",
    "Business / Finance",
    "Agriculture",
    "Transportation",
    "Manufacturing",
    "Unemployed",
    "Retired",
    "Student",
    "Others"
  ];

  const voterTypes = [
    "Regular Voter",
    "SK Voter",
    "First-time Voter",
    "Overseas Voter",
    "Senior Citizen",
    "PWD",
    "Not a Voter"
  ];

  const locationData: Record<string, string[]> = {
    "Batangas": [
      "Batangas City", "Lipa City", "Tanauan City",
      "Santo Tomas", "Bauan", "San Pascual", "Lemery", "Nasugbu"
    ],
    "Cebu": [
      "Cebu City", "Lapu-Lapu City", "Mandaue City",
      "Talisay City", "Toledo City", "Bogo City", "Carcar City"
    ],
    "Metro Manila": [
      "Manila", "Quezon City", "Makati City",
      "Taguig City", "Pasig City", "Mandaluyong City", "Paranaque City",
      "Caloocan City", "Valenzuela City", "Muntinlupa City"
    ],
    "Cavite": [
      "Bacoor City", "Dasmarinas City", "Imus City",
      "Tagaytay City", "Trece Martires City", "General Trias City",
      "Carmona", "Silang", "Kawit"
    ],
    "Laguna": [
      "Calamba City", "Santa Rosa City", "Binan City",
      "San Pedro City", "Cabuyao City", "San Pablo City",
      "Los Banos", "Santa Cruz"
    ],
    "Rizal": [
      "Antipolo City", "Cainta", "Taytay",
      "San Mateo", "Rodriguez", "Binangonan", "Angono"
    ],
    "Bulacan": [
      "Malolos City", "Meycauayan City", "San Jose del Monte City",
      "Baliuag City", "Marilao", "Bocaue", "Santa Maria"
    ],
    "Pampanga": [
      "San Fernando City", "Angeles City", "Mabalacat City",
      "Guagua", "Lubao", "Porac", "Apalit"
    ],
    "Pangasinan": [
      "Dagupan City", "Urdaneta City", "Alaminos City",
      "San Carlos City", "Lingayen", "Calasiao", "Mangaldan"
    ],
    "Iloilo": [
      "Iloilo City", "Passi City", "Oton",
      "Pototan", "Pavia", "Santa Barbara", "Miagao"
    ],
    "Negros Occidental": [
      "Bacolod City", "Bago City", "Cadiz City",
      "Kabankalan City", "San Carlos City", "Silay City", "Talisay City"
    ],
    "Davao del Sur": [
      "Davao City", "Digos City", "Bansalan",
      "Hagonoy", "Malalag", "Matanao", "Santa Cruz"
    ],
    "Misamis Oriental": [
      "Cagayan de Oro City", "Gingoog City", "El Salvador City",
      "Tagoloan", "Villanueva", "Opol", "Balingasag"
    ]
  };

  const provinces = Object.keys(locationData);

  const [specificWork, setSpecificWork] = useState('');
  const [voterType, setVoterType] = useState('');
  const navigate = useNavigate();

  // Smart Birthday Formatter
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");

    if (val.length >= 2) {
      const month = parseInt(val.substring(0, 2));
      if (month > 12) val = "12" + val.substring(2);
      if (month === 0) val = "01" + val.substring(2);
    }

    if (val.length >= 4) {
      const day = parseInt(val.substring(2, 4));
      if (day > 31) val = val.substring(0, 2) + "31" + val.substring(4);
      if (day === 0) val = val.substring(0, 2) + "01" + val.substring(4);
    }

    let formatted = val;
    if (val.length > 4) {
      formatted = `${val.substring(0, 2)}/${val.substring(2, 4)}/${val.substring(4, 8)}`;
    } else if (val.length > 2) {
      formatted = `${val.substring(0, 2)}/${val.substring(2)}`;
    }

    setData({ ...data, dob: formatted });
  };

  return (
    <AuthShell>
      {step === 1 && (
        <Card>
          <h1 className="text-center font-display text-3xl text-cream">Create an account</h1>
          <form
            className="mt-6 space-y-5"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              setError("");

              // 1. Password Match
              if (data.password !== data.confirm) {
                setError("Passwords do not match.");
                return;
              }

              // 2. Complete Birthday
              if (data.dob.length < 10) {
                setError("Please enter a complete birthday.");
                return;
              }

              // 3. Strict Age Calculation
              const [month, day, year] = data.dob.split("/").map(Number);
              const birthDate = new Date(year, month - 1, day);
              const referenceDate = new Date(2026, 4, 21); // Base year 2026

              let calculatedAge = referenceDate.getFullYear() - birthDate.getFullYear();
              const monthDiff = referenceDate.getMonth() - birthDate.getMonth();

              if (monthDiff < 0 || (monthDiff === 0 && referenceDate.getDate() < birthDate.getDate())) {
                calculatedAge--;
              }

              // 4. Age Validations
              if (calculatedAge < 7) {
                setError("You must be at least 7 years old to create a PATAG account.");
                return;
              }
              if (calculatedAge > 120) {
                setError("Please enter a valid birth year.");
                return;
              }

              setAge(calculatedAge);

              // 5. Auto-route young users
              if (calculatedAge < 14) {
                setRole("researcher");
              }

              setStep(2);
            }}
          >
            <Field icon={<User className="h-4 w-4" />}>
              <input required value={data.fullName} onChange={(e) => setData({ ...data, fullName: e.target.value })} placeholder="Full name" className="auth-input" />
            </Field>
            <Field icon={<Mail className="h-4 w-4" />}>
              <input required type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Email" className="auth-input" />
            </Field>
            <Field icon={<Calendar className="h-4 w-4" />}>
              <input required value={data.dob} onChange={handleDobChange} maxLength={10} placeholder="Birthday (MM/DD/YYYY)" className="auth-input" />
            </Field>

            <Field
              icon={
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-cream transition-colors focus:outline-none" aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              }
            >
              <input required type={showPassword ? "text" : "password"} value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="Password" className="auth-input" />
            </Field>

            <Field
              icon={
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="hover:text-cream transition-colors focus:outline-none" aria-label={showConfirmPassword ? "Hide password" : "Show password"}>
                  {showConfirmPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              }
            >
              <input required type={showConfirmPassword ? "text" : "password"} value={data.confirm} onChange={(e) => setData({ ...data, confirm: e.target.value })} placeholder="Confirm Password" className="auth-input" />
            </Field>

            {error && (
              <div className="rounded-lg bg-red-500/10 p-3 text-center text-xs font-medium text-red-400 border border-red-500/20">
                {error}
              </div>
            )}

            <button className="w-full rounded-full bg-onyx py-3 font-semibold text-cream hover:bg-black transition">Continue &rarr;</button>
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

          {age !== null && age < 14 && (
            <div className="mt-4 rounded-lg bg-blue-500/10 p-3 text-xs text-blue-200 border border-blue-500/20">
              Because you are under 14, the Student role has been automatically selected to provide you with the best learning experience.
            </div>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {([
              { id: "citizen", icon: <Users className="h-5 w-5" />, title: "Citizen / Voter", desc: "Track officials, votes, and public records relevant to your community." },
              { id: "researcher", icon: <GraduationCap className="h-5 w-5" />, title: "Student / Researcher", desc: "Access verified data for academic research and analysis." },
              { id: "journalist", icon: <Newspaper className="h-5 w-5" />, title: "Journalist / Media", desc: "Get raw data, exports, and advanced search after verification." },
            ] as const).map((opt) => {
              const sel = role === opt.id;
              const isLocked = age !== null && age < 14 && opt.id !== "researcher";

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isLocked}
                  onClick={() => setRole(opt.id)}
                  className={`relative rounded-2xl p-4 text-left transition ${sel ? "bg-forest text-cream ring-2 ring-forest" : "bg-onyx/60 text-cream ring-1 ring-white/10"} ${isLocked ? "opacity-40 cursor-not-allowed" : "hover:bg-onyx/80"}`}
                >
                  {sel && <Check className="absolute right-2 top-2 h-4 w-4 rounded-full bg-cream text-forest p-0.5" />}
                  <div className={"grid h-9 w-9 place-items-center rounded-lg " + (sel ? "bg-cream/20" : "bg-cream/10")}>{opt.icon}</div>
                  <div className="mt-3 font-semibold">{opt.title}</div>
                  <div className="mt-1 text-xs opacity-80">{opt.desc}</div>
                </button>
              );
            })}
          </div>
          <button onClick={() => setStep(3)} className="mt-6 w-full rounded-full bg-onyx py-3 font-semibold text-cream hover:bg-black transition">Continue &rarr;</button>
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

  async function finish(extra: Record<string, any>) {
    try {
      await registerUser({
        data: {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          dob: data.dob,
          role: role,
          location: extra.city ?? "Philippines",
          industry: extra.industry ?? "",
          specificWork: extra.specificWork ?? "",
          voterType: extra.voterType ?? "",
          idFile: extra.idFile ?? null
        }
      });

      navigate({ to: "/home" });

    } catch (error: any) {
      alert(error.message);
      setStep(1);
    }
  }

  function CitizenForm({ onSubmit }: { onSubmit: (x: Record<string, any>) => void }) {
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [idFile, setIdFile] = useState<File | null>(null);

    return (
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ city, province, industry: selectedIndustry, specificWork, voterType, idFile });
      }} className="mt-4">
        <h1 className="font-display text-3xl text-cream">Tell us about you</h1>
        <p className="mt-1 text-sm text-cream/70">Helps us surface data relevant to your community and sector.</p>

        <div className="mt-5 space-y-4">
          <Labeled label="Occupational Industry">
            <select
              className="auth-select"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              required
            >
              <option value="" disabled>Select industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </Labeled>

          {selectedIndustry && (
            <Labeled label={selectedIndustry === "Others" ? "Specify Industry" : "Specific Work / Position"}>
              <input
                type="text"
                required
                value={specificWork}
                onChange={(e) => setSpecificWork(e.target.value)}
                placeholder={
                  selectedIndustry === "Others"
                    ? "Please specify your industry/work"
                    : "e.g. Teacher, Nurse, Software Developer"
                }
                className="auth-input border-b border-white/20 pb-2 w-full"
              />
            </Labeled>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Labeled label="Province">
              <select
                className="auth-select"
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value);
                  setCity(""); // <--- CRITICAL: Reset city when province changes!
                }}
                required
              >
                <option value="" disabled>Select province</option>
                {provinces.map(prov => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
            </Labeled>

            <Labeled label="City / Municipality">
              <div className="flex items-center gap-2 border-b border-white/20 pb-2">
                <MapPin className="h-4 w-4 text-cream/60" />

                <select
                  className="w-full bg-transparent text-cream focus:outline-none appearance-none"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  disabled={!province}
                >
                  <option value="" disabled>
                    {province ? "Select city" : "Select province first"}
                  </option>
                  {province && locationData[province].map(c => (
                    <option key={c} value={c} className="bg-onyx text-cream">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </Labeled>
          </div>

          <Labeled label="Voter Type">
            <select
              className="auth-select"
              value={voterType}
              onChange={(e) => setVoterType(e.target.value)}
              required
            >
              <option value="" disabled>Select voter type</option>
              {voterTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Labeled>

          {voterType && voterType !== "Not a Voter" && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <Labeled label="Upload Voter's ID or Registration (Optional)">
                <UploadBox
                  photo={idFile}
                  onPhotoChange={setIdFile}
                />
              </Labeled>
              <div className="mt-2 rounded-lg bg-white/5 p-3 text-xs text-cream/80 ring-1 ring-white/10">
                Optional: Once reviewed by a PATAG admin, you will receive a Verified Voter badge on your profile. You can skip this and upload it later.
              </div>
            </div>
          )}

          <label className="flex items-start gap-2 text-xs text-cream/80">
            <input required type="checkbox" className="mt-0.5 accent-copper" />
            <span>I agree to the <a className="text-copper underline cursor-pointer">Terms of Service</a> and <a className="text-copper underline cursor-pointer">Privacy Policy</a></span>
          </label>
        </div>
        <button className="mt-6 w-full rounded-full bg-onyx py-3 font-semibold text-cream hover:bg-black transition">Create account</button>
      </form>
    );
  }

  function ResearcherForm({ onSubmit }: { onSubmit: (x: Record<string, any>) => void }) {
    const [instName, setInstName] = useState("");
    const [idFile, setIdFile] = useState<File | null>(null);

    return (
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); onSubmit({ city: instName, idFile }); }} className="mt-4">
        <h1 className="font-display text-3xl text-cream">Research Details</h1>
        <p className="mt-1 text-sm text-cream/70">Tell us where you study or work to tailor your data access.</p>
        <div className="mt-5 space-y-4">
          <Labeled label="Organization Type">
            <select className="auth-select" required>
              <option value="" disabled>Select organization type</option>
              <option value="High School">High School / K-12</option>
              <option value="University">University / College</option>
              <option value="Think Tank">Think Tank</option>
              <option value="NGO">NGO</option>
            </select>
          </Labeled>
          <Labeled label="Institution or Organization Name">
            <input required value={instName} onChange={(e) => setInstName(e.target.value)} className="auth-input border-b border-white/20 pb-2 w-full" placeholder="e.g. BatStateU Alangilan" />
          </Labeled>
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <Labeled label="Upload Student or Institutional ID (Optional)">
              <UploadBox photo={idFile} onPhotoChange={setIdFile} />
            </Labeled>
            <div className="mt-2 rounded-lg bg-white/5 p-3 text-xs text-cream/80 ring-1 ring-white/10">
              Optional: Uploading a valid ID places your account in queue for a Verified Researcher badge, unlocking advanced data export tools after admin review.
            </div>
          </div>
          <label className="flex items-start gap-2 text-xs text-cream/80">
            <input required type="checkbox" className="mt-0.5 accent-copper" />
            <span>I agree to the <a className="text-copper underline cursor-pointer">Terms</a> and <a className="text-copper underline cursor-pointer">Privacy Policy</a></span>
          </label>
        </div>
        <button className="mt-6 w-full rounded-full bg-onyx py-3 font-semibold text-cream hover:bg-black transition">Create account</button>
      </form>
    );
  }

  function JournalistForm({ onSubmit }: { onSubmit: (x: Record<string, any>) => void }) {
    const [pubName, setPubName] = useState("");
    const [idFile, setIdFile] = useState<File | null>(null);

    return (
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); onSubmit({ city: pubName, idFile }); }} className="mt-4">
        <h1 className="font-display text-3xl text-cream">Verify your Credentials</h1>
        <p className="mt-1 text-sm text-cream/70">Connect your publication to access raw datasets and PR contacts.</p>
        <div className="mt-5 space-y-4">
          <Labeled label="Institution / Publication Name">
            <input required value={pubName} onChange={(e) => setPubName(e.target.value)} className="auth-input border-b border-white/20 pb-2 w-full" placeholder="e.g. Philippine Daily Inquirer" />
          </Labeled>
          <Labeled label="Author portfolio or professional profile">
            <input required type="url" className="auth-input border-b border-white/20 pb-2 w-full" placeholder="https://" />
          </Labeled>
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <Labeled label="Upload Professional or Press ID (Optional)">
              <UploadBox photo={idFile} onPhotoChange={setIdFile} />
            </Labeled>
            <div className="mt-2 rounded-lg bg-white/5 p-3 text-xs text-cream/80 ring-1 ring-white/10">
              Optional: Press accounts require human verification. You can create your account now and upload your credentials later to unlock full media access.
            </div>
          </div>
          <label className="flex items-start gap-2 text-xs text-cream/80">
            <input required type="checkbox" className="mt-0.5 accent-copper" />
            <span>I agree to the <a className="text-copper underline cursor-pointer">Terms</a> and <a className="text-copper underline cursor-pointer">Privacy Policy</a></span>
          </label>
        </div>
        <button className="mt-6 w-full rounded-full bg-onyx py-3 font-semibold text-cream hover:bg-black transition">Create account</button>
      </form>
    );
  }

  // --- Helper Components ---
  function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
    return (
      <div>
        <div className="mb-1 text-xs text-cream/70">{label}</div>
        {children}
      </div>
    );
  }
}