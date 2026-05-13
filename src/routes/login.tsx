import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import shield from "@/assets/patag-shield.png";
import bg from "@/assets/justice-bg.jpg";
import { setUser } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — P.A.T.A.G." }, { name: "description", content: "Sign in to your PATAG account." }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <AuthShell>
      <Card>
        <h1 className="text-center font-display text-3xl text-cream">Login</h1>
        <form
          className="mt-6 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (!email || !password) return;
            setUser({ email, fullName: email.split("@")[0], role: "citizen" });
            navigate({ to: "/home" });
          }}
        >
          <Field icon={<Mail className="h-4 w-4" />}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Email" className="auth-input" />
          </Field>
          <Field icon={<Lock className="h-4 w-4" />}>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="Password" className="auth-input" />
          </Field>
          <div className="flex items-center justify-between text-xs text-cream/80">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-3.5 w-3.5 accent-copper" />
              Remember me
            </label>
            <a href="#" className="text-copper hover:underline">Forget password?</a>
          </div>
          <button className="w-full rounded-full bg-onyx py-3 font-semibold text-cream hover:bg-black transition">Login</button>
          <p className="text-center text-xs text-cream/80">
            Don't have an account?{" "}
            <Link to="/signup" className="text-copper font-semibold hover:underline">Register</Link>
          </p>
        </form>
      </Card>
    </AuthShell>
  );
}

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-onyx text-cream">
      <img src={bg} alt="" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-onyx/85 via-onyx/70 to-onyx/95" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="mx-auto flex w-full max-w-7xl items-center gap-8 px-6 py-5">
          <Link to="/" className="flex items-center gap-2">
            <img src={shield} alt="" width={32} height={32} className="h-8 w-8" />
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-cream/80">
            <Link to="/services" className="hover:text-cream">Service</Link>
            <a href="#" className="hover:text-cream">Contract</a>
            <Link to="/about" className="hover:text-cream">About</Link>
          </nav>
          <button className="ml-auto grid h-9 w-9 place-items-center rounded-full text-cream/80 hover:bg-white/10">⚙</button>
        </header>
        <main className="flex flex-1 items-center justify-center px-4 py-10">{children}</main>
      </div>
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={"w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl " + className}>
      {children}
    </div>
  );
}

export function Field({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="flex items-center gap-3 border-b border-white/20 pb-2 focus-within:border-copper transition">
      <span className="flex-1">{children}</span>
      <span className="text-cream/60">{icon}</span>
    </label>
  );
}
