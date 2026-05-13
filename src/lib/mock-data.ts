export type Official = {
  id: string;
  name: string;
  position: string;
  branch: "Executive" | "Legislative" | "Judicial";
  status: "Active" | "Former" | "Appointed" | "Elected";
  location: string;
  photo: string;
  bio: string;
  dateAssumed: string;
  appointedBy?: string;
  career: { period: string; role: string }[];
  policies: string[];
  records: { label: string; value: string }[];
};

const portrait = (seed: string) =>
  `https://i.pravatar.cc/300?u=${encodeURIComponent(seed)}`;

export const officials: Official[] = Array.from({ length: 17 }).map((_, i) => {
  const branches = ["Executive", "Legislative", "Judicial"] as const;
  const statuses = ["Active", "Elected", "Appointed", "Former"] as const;
  const positions = ["Senator", "Mayor", "Governor", "Representative", "Justice", "Secretary"];
  const cities = ["Manila", "Cebu City", "Davao", "Quezon City", "Baguio", "Iloilo", "Batangas"];
  const name = ["Esperanza Lim","Ramon Cruz","Maria Santos","Jose Aquino","Lualhati Reyes","Andres Bonilla","Gloria Tan","Pedro Villanueva","Rosa Mendoza","Carlos Domingo","Patricia Yu","Eduardo Ramos","Sofia delos Reyes","Manuel Garcia","Beatriz Lopez","Antonio Reyes","Imelda Cortez"][i];
  return {
    id: `off-${i + 1}`,
    name,
    position: positions[i % positions.length],
    branch: branches[i % 3],
    status: statuses[i % statuses.length],
    location: cities[i % cities.length],
    photo: portrait(name),
    bio: "A long-serving public servant known for transparency reforms, budget audits, and grassroots engagement across regional districts.",
    dateAssumed: "April 2022",
    appointedBy: "Office of the President",
    career: [
      { period: "2022 — Present", role: "Current Office" },
      { period: "2016 — 2022", role: "Department Director" },
      { period: "2010 — 2016", role: "Senior Special Advisor" },
    ],
    policies: ["Anti-Graft Act 4951", "Budget Transparency Act", "Open Data Initiative", "Civil Service Reform"],
    records: [
      { label: "Executive Issuance 001", value: "Total ban on procurement opacity." },
      { label: "Budget Transparency", value: "100% of public accounts disclosed." },
      { label: "Audit Status", value: "COA Report — Clear with notes." },
    ],
  };
});

export type Bill = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  filed: string;
  stage: 1 | 2 | 3 | 4 | 5;
  authors: string[];
  summary: string;
  pulse: { approve: number; disapprove: number };
  news: { source: string; title: string; verified: boolean; timestamp: string }[];
};

export const bills: Bill[] = [
  {
    id: "bill-001", number: "HB 1042", title: "Freedom of Information Act",
    category: "Transparency", description: "Mandates public access to government records.",
    filed: "2025-03-12", stage: 3,
    authors: ["Rep. Cruz", "Sen. Lim"],
    summary: "Establishes a citizens' right to access public documents with reasonable exceptions for national security and personal privacy.",
    pulse: { approve: 78, disapprove: 22 },
    news: [
      { source: "Philippine Daily Inquirer", title: "FOI bill clears House committee", verified: true, timestamp: "2025-04-02" },
      { source: "Rappler", title: "Civic groups back FOI push", verified: true, timestamp: "2025-04-05" },
    ],
  },
  {
    id: "bill-002", number: "SB 0214", title: "AI Accountability Act",
    category: "Technology", description: "Regulates use of AI in public decision-making.",
    filed: "2025-02-08", stage: 2,
    authors: ["Sen. Tan", "Sen. Aquino"],
    summary: "Requires audits, disclosures, and human review for any government use of automated decision systems.",
    pulse: { approve: 64, disapprove: 36 },
    news: [
      { source: "BusinessWorld", title: "AI bill draws industry input", verified: true, timestamp: "2025-03-19" },
    ],
  },
  {
    id: "bill-003", number: "HB 0998", title: "Civic Data Open Standards",
    category: "Open Government", description: "Standardizes datasets across LGUs.",
    filed: "2025-01-30", stage: 4,
    authors: ["Rep. Reyes"],
    summary: "Adopts machine-readable open formats for census, budget, and procurement data.",
    pulse: { approve: 82, disapprove: 18 },
    news: [
      { source: "ABS-CBN News", title: "LGUs trial open data portals", verified: true, timestamp: "2025-02-22" },
    ],
  },
  {
    id: "bill-004", number: "SB 0411", title: "Anti-Disinformation Framework",
    category: "Media", description: "Defines penalties for coordinated disinformation.",
    filed: "2025-04-21", stage: 1,
    authors: ["Sen. Mendoza", "Sen. Garcia"],
    summary: "Establishes a multi-stakeholder council to evaluate large-scale disinformation campaigns with due-process safeguards.",
    pulse: { approve: 55, disapprove: 45 },
    news: [],
  },
];

export const stages = ["Filed", "House", "Senate", "President", "Enacted"] as const;
