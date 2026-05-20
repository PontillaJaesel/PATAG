import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { AppNav } from "@/components/AppNav";
import { getUser, setUser } from "@/lib/auth";
import { useBookmarks, type BookmarkedAgency, type BookmarkedOfficial } from "@/lib/bookmarks";
import shield from "@/assets/patag-shield.png";
import {
  User,
  VenetianMask,
  Activity,
  Settings,
  ShieldAlert,
  MapPin,
  Briefcase,
  Mail,
  CheckCircle2,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
  Download,
  Trash2,
  Lock,
  Landmark,
  Building2,
  Image as ImageIcon,
} from "lucide-react";

export const Route = createFileRoute("/profile")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !getUser()) {
      throw redirect({ to: "/login" });
    }
  },
  head: () => ({
    meta: [{ title: "Citizen Profile — P.A.T.A.G." }],
  }),
  component: ProfilePage,
});

type Tab = "profile" | "activity" | "settings" | "security";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const user = typeof window !== "undefined" ? getUser() as any : null;

  return (
    <div className="min-h-screen bg-cream">
      <AppNav />

      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#2a2422] via-[#3d2c23] to-[#1e1511] py-14 text-cream">
        <div className="mx-auto max-w-6xl px-6 flex items-center gap-6">
          
          {/* Dynamic Avatar Display */}
          <div className={`flex h-24 w-24 items-center justify-center rounded-full text-4xl font-bold shadow-xl backdrop-blur-md ${
            user?.avatar === 'green' ? 'bg-forest border-forest' :
            user?.avatar === 'brown' ? 'bg-[#3d2c23] border-[#3d2c23]' :
            user?.avatar === 'black' ? 'bg-black border-black' :
            user?.avatar === 'incognito-m' ? 'bg-coffee border-coffee text-cream' :
            user?.avatar === 'incognito-w' ? 'bg-rust border-rust text-cream' :
            'bg-cream/10 border border-white/20 text-copper'
          }`}>
            {user?.avatar === 'incognito-m' ? <User className="h-12 w-12" /> :
             user?.avatar === 'incognito-w' ? <VenetianMask className="h-12 w-12" /> :
             (user?.avatar === 'green' || user?.avatar === 'brown' || user?.avatar === 'black') ? null :
             (user?.fullName?.charAt(0).toUpperCase() || "J")}
          </div>

          <div>
            <h1 className="font-display text-4xl tracking-tight">{user?.fullName || "Citizen"}</h1>
            <p className="mt-1 font-serif-display text-lg text-cream/70 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-forest" />
              Verified {user?.role || "Voter"} Account
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 shrink-0 space-y-2">
            <TabButton active={activeTab === "profile"} onClick={() => setActiveTab("profile")} icon={<User className="h-4 w-4" />} label="Edit Profile" />
            <TabButton active={activeTab === "activity"} onClick={() => setActiveTab("activity")} icon={<Activity className="h-4 w-4" />} label="My Activity" />
            <TabButton active={activeTab === "settings"} onClick={() => setActiveTab("settings")} icon={<Settings className="h-4 w-4" />} label="Preferences" />
            <TabButton active={activeTab === "security"} onClick={() => setActiveTab("security")} icon={<ShieldAlert className="h-4 w-4" />} label="Security" />
          </aside>

          {/* Tab Content Area */}
          <main className="flex-1">
            {activeTab === "profile" && <ProfileTab user={user} />}
            {activeTab === "activity" && <ActivityTab />}
            {activeTab === "settings" && <SettingsTab />}
            {activeTab === "security" && <SecurityTab />}
          </main>
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

// --- TAB COMPONENTS ---

function ProfileTab({ user }: { user: any }) {
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [avatar, setAvatar] = useState(user?.avatar || "default");
  const [isSaved, setIsSaved] = useState(false);

  const displayRole = user?.role === "researcher" ? "Student / Researcher" 
                    : user?.role === "journalist" ? "Journalist / Media" 
                    : "Citizen / Voter";

  const AVATARS = [
    { id: "default", label: "Initial", style: "bg-tan/40 text-cocoa font-bold text-xl" },
    { id: "green", label: "Pure Green", style: "bg-forest" },
    { id: "brown", label: "Dark Brown", style: "bg-[#3d2c23]" },
    { id: "black", label: "Pure Black", style: "bg-black" },
    { id: "incognito-m", label: "Incognito M", style: "bg-coffee text-cream", icon: <User className="h-7 w-7" /> },
    { id: "incognito-w", label: "Incognito W", style: "bg-rust text-cream", icon: <VenetianMask className="h-7 w-7" /> },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ ...user, fullName, avatar });
    setIsSaved(true);
    
    // Briefly show the success state, then refresh the page to update the header
    setTimeout(() => {
      setIsSaved(false);
      window.location.reload();
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-tan/80 bg-gradient-to-b from-white to-cream/30 p-8 shadow-card">
        <div className="mb-8 border-b border-tan/50 pb-4">
          <h2 className="font-display text-2xl text-cocoa">Personal Information</h2>
          <p className="mt-1 text-sm text-coffee">Manage your identity and how you appear to others on the platform.</p>
        </div>
        
        <form className="space-y-8" onSubmit={handleSave}>
          
          {/* Avatar Selection Area */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-mocha mb-4 flex items-center gap-2">
              <ImageIcon className="h-4 w-4" /> Choose a Profile Picture
            </h3>
            <div className="flex flex-wrap gap-4">
              {AVATARS.map(a => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAvatar(a.id)}
                  className={`flex flex-col items-center gap-2 transition-all duration-300 ${avatar === a.id ? 'scale-105 opacity-100' : 'opacity-60 hover:opacity-100'}`}
                >
                  <div className={`h-16 w-16 rounded-full flex items-center justify-center shadow-md border-[3px] ${avatar === a.id ? 'border-copper' : 'border-transparent'} ${a.style}`}>
                    {a.icon ? a.icon : (a.id === 'default' ? user?.fullName?.charAt(0).toUpperCase() || 'J' : '')}
                  </div>
                  <span className="text-[10px] font-semibold text-coffee">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="col-span-1 md:col-span-2 space-y-3">
              <div className="rounded-xl bg-copper/10 p-4 border border-copper/20 flex gap-3 items-start text-xs text-cocoa/90 shadow-inner">
                <ShieldAlert className="h-5 w-5 text-copper shrink-0" />
                <p><strong>Privacy Recommendation:</strong> To maintain your anonymity and protect your personal security on the platform, we strongly advise using a pseudonym or nickname rather than your real full name.</p>
              </div>
              <InputGroup icon={<User />} label="Display Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <LockedField icon={<Mail />} label="Email Address" value={user?.email || "citizen@example.com"} tooltip="Email is linked to your verified identity." />
          </div>

          <div className="border-t border-tan/50 pt-8 mt-4">
            <h3 className="font-display text-lg text-cocoa mb-5">Civic Demographics</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <LockedField 
                icon={<ShieldAlert />} 
                label="Account Role" 
                value={displayRole} 
                tooltip="Assigned during registration." 
              />
              <LockedField 
                icon={<Briefcase />} 
                label="Sector / Affiliation" 
                value="Pending Verification" 
                tooltip="Based on your signup credentials." 
              />
              <LockedField 
                icon={<MapPin />} 
                label="City / Municipality" 
                value={user?.location || "Batangas City"} 
                tooltip="Registered location." 
              />
              <LockedField 
                icon={<MapPin />} 
                label="Province" 
                value="Batangas" 
                tooltip="Registered province." 
              />
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-tan/50 mt-8">
            <button type="submit" className={`flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold text-cream shadow-md transition-all duration-300 ${isSaved ? 'bg-forest hover:bg-forest/90' : 'bg-rust hover:-translate-y-0.5 hover:bg-cocoa hover:shadow-lg'}`}>
              {isSaved ? <CheckCircle2 className="h-5 w-5" /> : null}
              {isSaved ? "Changes Saved!" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ActivityTab() {
  const trackedOfficials = useBookmarks<BookmarkedOfficial>("officials");
  const savedAgencies = useBookmarks<BookmarkedAgency>("agencies");

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-tan/80 bg-white p-8 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-2xl text-cocoa">Tracked Officials</h2>
          <span className="text-xs font-semibold text-copper">{trackedOfficials.length} Saved</span>
        </div>
        {trackedOfficials.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {trackedOfficials.map((official) => (
              <ActivityCard
                key={official.id}
                icon={<Landmark className="h-5 w-5 text-forest" />}
                title={official.name}
                subtitle={`${official.title} • ${official.branch}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-coffee">No officials bookmarked yet.</p>
        )}
      </div>

      <div className="rounded-3xl border border-tan/80 bg-white p-8 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-2xl text-cocoa">Saved Agencies & Departments</h2>
          <span className="text-xs font-semibold text-copper">{savedAgencies.length} Saved</span>
        </div>
        {savedAgencies.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {savedAgencies.map((agency) => (
              <ActivityCard
                key={agency.id}
                icon={<Building2 className="h-5 w-5 text-copper" />}
                title={agency.name}
                subtitle={`${agency.kind} • ${agency.headquarters}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-coffee">No agencies bookmarked yet.</p>
        )}
      </div>

      <div className="rounded-3xl border border-tan/80 bg-white p-8 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-2xl text-cocoa">Saved Legislation</h2>
          <span className="text-xs font-semibold text-copper">1 Saved</span>
        </div>
        <div className="grid gap-4">
          <ActivityCard icon={<Bookmark className="h-5 w-5 text-copper" />} title="Senate Bill 1979" subtitle="Digital Governance Act • Pending Second Reading" />
        </div>
      </div>

      <div className="rounded-3xl border border-tan/80 bg-white p-8 shadow-card">
        <h2 className="font-display text-2xl text-cocoa mb-4">"Public Pulse" History</h2>
        <div className="space-y-3">
          <PulseItem icon={<ThumbsUp className="h-4 w-4 text-forest" />} action="Approved" target="Senate Bill 1979" date="2 days ago" />
          <PulseItem icon={<ThumbsDown className="h-4 w-4 text-rust" />} action="Disapproved" target="COA Confidential Fund Resolution" date="1 week ago" />
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-tan/80 bg-white p-8 shadow-card">
        <h2 className="font-display text-2xl text-cocoa">Email Alerts</h2>
        <p className="mt-1 text-sm text-coffee mb-6">Control what notifications you receive in your inbox.</p>
        
        <div className="space-y-4">
          <ToggleItem label="Tracked Officials" description="Notify me when a tracked official votes on a bill or signs a law." defaultChecked />
          <ToggleItem label="Local Audits" description="Notify me when a new COA report is published for my registered city." defaultChecked />
          <ToggleItem label="Platform Updates" description="Receive weekly digests on national legislative progress." />
        </div>
      </div>

      <div className="rounded-3xl border border-tan/80 bg-white p-8 shadow-card">
        <h2 className="font-display text-2xl text-cocoa">Accessibility & Performance</h2>
        <p className="mt-1 text-sm text-coffee mb-6">Customize your platform experience without changing the visual layout.</p>
        
        <div className="space-y-4">
          <ToggleItem label="Reduced Motion" description="Disable animations and transitions for a faster, simpler experience." />
          <ToggleItem label="High Contrast Text" description="Increase font weight and contrast to make articles easier to read." />
          <ToggleItem label="Data Saver Mode" description="Prevent heavy media and videos from autoplaying in the Truth Hub." defaultChecked />
        </div>
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-tan/80 bg-white p-8 shadow-card">
        <h2 className="font-display text-2xl text-cocoa">Password Management</h2>
        <form className="mt-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <InputGroup icon={<Lock />} label="Current Password" type="password" />
          <InputGroup icon={<Lock />} label="New Password" type="password" />
          <InputGroup icon={<Lock />} label="Confirm New Password" type="password" />
          <button className="mt-2 rounded-full bg-onyx px-6 py-2.5 text-sm font-bold text-cream shadow-md transition hover:-translate-y-0.5 hover:bg-black">
            Update Password
          </button>
        </form>
      </div>

      <div className="rounded-3xl border border-tan/80 bg-white p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl text-cocoa">Request Data Export</h2>
          <p className="mt-1 text-sm text-coffee max-w-md">Download a complete archive of your demographic data, tracked items, and voting history as required by the Data Privacy Act.</p>
        </div>
        <button className="shrink-0 flex items-center gap-2 rounded-full bg-copper px-6 py-2.5 text-sm font-bold text-cream shadow-md transition hover:-translate-y-0.5 hover:bg-[#a05a2c]">
          <Download className="h-4 w-4" /> Export Data
        </button>
      </div>

      <div className="rounded-3xl border border-rust/30 bg-rust/5 p-8 shadow-sm">
        <h2 className="font-display text-xl text-rust">Danger Zone</h2>
        <p className="mt-1 text-sm text-rust/80 max-w-xl mb-5">Permanently erase your profile, demographics, and "Public Pulse" voting history. This action cannot be undone and your data will be scrubbed from our active servers immediately.</p>
        <button className="flex items-center gap-2 rounded-full bg-rust px-6 py-2.5 text-sm font-bold text-cream shadow-md transition hover:-translate-y-0.5 hover:bg-[#8e3124]">
          <Trash2 className="h-4 w-4" /> Delete Account
        </button>
      </div>
    </div>
  );
}

// --- UTILITY COMPONENTS ---

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
        active 
          ? "bg-white text-rust shadow-sm border border-tan/50" 
          : "text-coffee hover:bg-white/50 hover:text-cocoa border border-transparent"
      }`}
    >
      <span className={active ? "text-rust" : "text-mocha"}>{icon}</span>
      {label}
    </button>
  );
}

function InputGroup({ icon, label, value, onChange, type = "text" }: { icon: React.ReactNode; label: string; value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string }) {
  return (
    <div className="group flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-mocha pl-1">{label}</label>
      <div className="flex items-center gap-3 rounded-xl border border-tan/80 bg-white/50 px-4 py-3 shadow-sm transition-colors group-focus-within:border-copper/50 group-focus-within:bg-white group-focus-within:ring-1 group-focus-within:ring-copper/20">
        <span className="text-coffee/60 [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent text-sm text-onyx outline-none placeholder:text-coffee/50"
        />
      </div>
    </div>
  );
}

function LockedField({ icon, label, value, tooltip }: { icon: React.ReactNode; label: string; value: string; tooltip: string }) {
  return (
    <div className="group flex flex-col gap-1.5">
      <div className="flex items-center justify-between pl-1">
        <label className="text-xs font-semibold uppercase tracking-wider text-mocha">{label}</label>
        <Lock className="h-3 w-3 text-mocha" />
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-tan/40 bg-black/5 px-4 py-3 shadow-inner select-none">
        <span className="text-coffee/50 [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
        <div className="w-full text-sm text-onyx/70 font-medium cursor-not-allowed">{value}</div>
      </div>
      <div className="text-[10px] text-mocha pl-1 leading-tight">{tooltip}</div>
    </div>
  );
}

function SelectGroup({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-mocha pl-1">{label}</label>
      <select className="rounded-xl border border-tan/80 bg-white/50 px-4 py-3 text-sm text-onyx shadow-sm outline-none transition-colors focus:border-copper/50 focus:bg-white focus:ring-1 focus:ring-copper/20">
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function ActivityCard({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-tan/60 bg-muted/30 px-4 py-3 transition hover:bg-muted/50">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-tan/50">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-cocoa">{title}</h4>
        <p className="text-xs text-coffee mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

function PulseItem({ icon, action, target, date }: { icon: React.ReactNode; action: string; target: string; date: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-tan/60 bg-muted/30 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-tan/50">
          {icon}
        </div>
        <p className="text-sm text-cocoa">
          <span className="font-bold">{action}</span> <span className="text-coffee">on</span> <span className="font-semibold">{target}</span>
        </p>
      </div>
      <span className="text-xs text-mocha">{date}</span>
    </div>
  );
}

function ToggleItem({ label, description, defaultChecked = false }: { label: string; description: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label className="flex items-start gap-4 cursor-pointer p-2 rounded-lg hover:bg-muted/30 transition">
      <div className="mt-1 relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-300 focus-outline" style={{ backgroundColor: checked ? '#3E5C46' : '#d4c5b0' }}>
        <input type="checkbox" className="sr-only" checked={checked} onChange={() => setChecked(!checked)} />
        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition duration-300 ${checked ? 'translate-x-4' : 'translate-x-1'}`} />
      </div>
      <div>
        <div className="text-sm font-bold text-cocoa">{label}</div>
        <div className="text-xs text-coffee mt-0.5">{description}</div>
      </div>
    </label>
  );
}