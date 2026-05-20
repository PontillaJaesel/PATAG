import { createFileRoute, redirect } from "@tanstack/react-router";
import { LandingPage } from "@/components/LandingPage";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/home")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" });
  },
  head: () => ({ meta: [{ title: "Home — P.A.T.A.G." }] }),
  component: () => <LandingPage variant="app" />,
});
