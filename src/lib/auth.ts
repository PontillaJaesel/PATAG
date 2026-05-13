// Lightweight client-side auth simulation (no backend yet).
const KEY = "patag.user";

export type PatagUser = {
  email: string;
  fullName: string;
  role: "citizen" | "researcher" | "journalist";
  location?: string;
};

export function getUser(): PatagUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PatagUser) : null;
  } catch {
    return null;
  }
}

export function setUser(u: PatagUser) {
  localStorage.setItem(KEY, JSON.stringify(u));
  window.dispatchEvent(new Event("patag:auth"));
}

export function clearUser() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("patag:auth"));
}

import { useEffect, useState } from "react";
export function useAuth() {
  const [user, setU] = useState<PatagUser | null>(null);
  useEffect(() => {
    setU(getUser());
    const handler = () => setU(getUser());
    window.addEventListener("patag:auth", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("patag:auth", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return user;
}
