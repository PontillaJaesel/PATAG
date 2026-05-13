import { Link, useNavigate } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import shield from "@/assets/patag-shield.png";
import { useAuth, clearUser } from "@/lib/auth";

export function PublicNav() {
  const user = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cocoa/40 bg-onyx/85 backdrop-blur supports-[backdrop-filter]:bg-onyx/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={shield} alt="P.A.T.A.G." width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-cream text-lg tracking-wide">P.A.T.A.G.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-cream/80">
          <Link to="/services" activeProps={{ className: "text-cream" }} className="hover:text-cream transition-colors">Service</Link>
          <Link to="/about" activeProps={{ className: "text-cream" }} className="hover:text-cream transition-colors">About</Link>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <button aria-label="Settings" className="grid h-9 w-9 place-items-center rounded-full text-cream/80 hover:bg-white/10 hover:text-cream transition">
            <Settings className="h-4 w-4" />
          </button>
          {user ? (
            <>
              <Link to="/home" className="text-sm text-cream/80 hover:text-cream">Dashboard</Link>
              <button onClick={() => { clearUser(); navigate({ to: "/" }); }} className="rounded-full bg-cream px-4 py-2 text-sm font-semibold text-onyx hover:bg-white transition">Log out</button>
            </>
          ) : (
            <Link to="/login" className="rounded-full bg-cream px-5 py-2 text-sm font-semibold text-onyx hover:bg-white transition">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
