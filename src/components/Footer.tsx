export function Footer() {
  return (
    <footer className="bg-gradient-dark text-cream/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="font-display text-2xl text-cream">P.A.T.A.G.</div>
          <p className="mt-3 max-w-sm text-sm text-cream/70">
            Public Access for Truth, Alliances, and Governance — the open Filipino civic platform.
          </p>
        </div>
        {[
          { h: "Platform", l: ["Individuals", "Teams", "Admins", "Developers"] },
          { h: "Features", l: ["Gov Tracker", "Pre-experience", "Integrations"] },
          { h: "Learn more", l: ["Blog", "Case studies", "Customer stories", "Best practices"] },
          { h: "Support", l: ["Contact", "Support", "Legal"] },
        ].map((c) => (
          <div key={c.h}>
            <div className="text-cream font-semibold mb-3">{c.h}</div>
            <ul className="space-y-2 text-sm">
              {c.l.map((x) => <li key={x} className="hover:text-cream cursor-pointer">{x}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} P.A.T.A.G. — Truth is a public utility.
      </div>
    </footer>
  );
}
