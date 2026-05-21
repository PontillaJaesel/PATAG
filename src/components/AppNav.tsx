import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import shield from "@/assets/patag-shield.png";
import { useAuth, clearUser } from "@/lib/auth";

export function AppNav() {
  const user = useAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const items = [
    { to: "/", label: "Home" },
    { to: "/officials/", label: "Officials" },
    { to: "/bills/", label: "Legislative Tracker" },
    { to: "/truth-hub", label: "Truth Media Hub" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-cocoa/30 bg-gradient-to-r from-espresso via-cocoa to-coffee text-cream">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={shield} alt="" width={28} height={28} className="h-7 w-7" />
          <span className="font-display text-base hidden sm:inline">P.A.T.A.G.</span>
        </Link>


        <nav className="ml-auto flex items-center gap-1 text-sm">
          {items.map((it) => {
            const normalize = (p: string) => (p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p);
            const here = normalize(path);
            const target = normalize(it.to);
            const active = here === target || (target !== "/" && here.startsWith(target + "/"));
            return (
              <Link
                key={it.to}
                to={it.to}
                className={
                  "px-3 py-1.5 rounded-full transition " +
                  (active ? "bg-forest text-cream font-semibold" : "text-cream/80 hover:text-cream hover:bg-white/10")
                }
              >
                {it.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 pl-3 border-l border-white/15">
          <span className="hidden lg:inline text-xs text-cream/70">{user?.location ?? "Philippines"}</span>
          <Link to="/profile" className="grid h-8 w-8 place-items-center rounded-full bg-cream text-onyx text-xs font-semibold hover:scale-105 transition-transform">
            {(user?.fullName ?? "G").slice(0, 1).toUpperCase()}
          </Link>
          <button onClick={() => { clearUser(); navigate({ to: "/" }); }} aria-label="Sign out" className="grid h-8 w-8 place-items-center rounded-full text-cream/70 hover:bg-white/10 hover:text-cream">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}