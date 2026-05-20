import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "P.A.T.A.G. — Truth is a public utility" },
      {
        name: "description",
        content:
          "Public Access for Truth, Alliances, and Governance. The open Filipino civic platform tracking high-ranking officials and legislative actions.",
      },
      { property: "og:title", content: "P.A.T.A.G. — Truth is a public utility" },
      {
        property: "og:description",
        content:
          "Track legislative bills, budgets, and high-ranking politicians across the branches of government.",
      },
    ],
  }),
  component: () => <LandingPage variant="public" />,
});
