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

export const officials: Official[] = [
  {
    id: "off-1",
    name: "Ferdinand R. Marcos Jr.",
    position: "President",
    branch: "Executive",
    status: "Elected",
    location: "Manila",
    photo: "https://upload.wikimedia.org/wikipedia/commons/7/77/Portrait_of_President_Ferdinand_R._Marcos%2C_Jr_%28cropped2%29.jpg", // Placeholder for actual official portrait URL
    bio: "The 17th President of the Philippines, focusing on national unity, economic recovery, and agricultural food sovereignty.",
    dateAssumed: "June 30, 2022",
    career: [
      { period: "2022 — Present", role: "President of the Philippines" },
      { period: "2010 — 2016", role: "Senator of the Philippines" },
      { period: "1998 — 2007", role: "Governor of Ilocos Norte" }
    ],
    policies: ["Build Better More Program", "Masagana Rice Industry Development", "Executive Order No. 1 (Reorganization)"],
    records: [
      { label: "Reference", value: "https://www.pbbm.com.ph/" }
    ]
  },
  {
    id: "off-2",
    name: "Sara Z. Duterte",
    position: "Vice President",
    branch: "Executive",
    status: "Elected",
    location: "Manila",
    photo: "https://ovp.gov.ph/images/vpsd-portrait.jpg",
    bio: "The 15th Vice President of the Philippines; served as the Secretary of Education until her resignation in July 2024.",
    dateAssumed: "June 30, 2022",
    career: [
      { period: "2022 — Present", role: "Vice President of the Philippines" },
      { period: "2022 — 2024", role: "Secretary of Education" },
      { period: "2016 — 2022", role: "Mayor of Davao City" }
    ],
    policies: ["OVP Satellite Offices Initiative", "PagbaBAGo Campaign", "Magnegosyo Ta 'Day"],
    records: [
      { label: "Reference", value: "https://ovp.gov.ph/" }
    ]
  },
  {
    id: "off-3",
    name: "Ralph Recto",
    position: "Executive Secretary",
    branch: "Executive",
    status: "Appointed",
    location: "Manila",
    photo: "https://www.pna.gov.ph/photos/recto-portrait.jpg",
    bio: "Responsible for the day-to-day operations of the Office of the President and inter-agency coordination.",
    dateAssumed: "November 17, 2025",
    appointedBy: "Ferdinand R. Marcos Jr.",
    career: [
      { period: "2025 — Present", role: "Executive Secretary" },
      { period: "2024 — 2025", role: "Secretary of Finance" },
      { period: "2022 — 2024", role: "Deputy Speaker of the House" }
    ],
    policies: ["Administrative Coordination Reform", "Fiscal Oversight", "Legislative Liaison"],
    records: [
      { label: "Reference", value: "https://www.officialgazette.gov.ph/" }
    ]
  },
  {
    id: "off-4",
    name: "Sonny Angara",
    position: "Secretary of Education",
    branch: "Executive",
    status: "Appointed",
    location: "Pasig City",
    photo: "https://www.deped.gov.ph/angara-portrait.jpg",
    bio: "Leads the Department of Education with a focus on improving teacher welfare and modernizing the K-12 curriculum.",
    dateAssumed: "July 19, 2024",
    appointedBy: "Ferdinand R. Marcos Jr.",
    career: [
      { period: "2024 — Present", role: "Secretary of Education" },
      { period: "2013 — 2024", role: "Senator of the Philippines" },
      { period: "2004 — 2013", role: "Representative of Aurora" }
    ],
    policies: ["K-12 Curriculum Review", "Teacher Salary Standardization", "Universal Access to Tertiary Education Act"],
    records: [
      { label: "Reference", value: "https://www.deped.gov.ph/" }
    ]
  },
  {
    id: "off-5",
    name: "Frederick Go",
    position: "Secretary of Finance",
    branch: "Executive",
    status: "Appointed",
    location: "Manila",
    photo: "https://www.dof.gov.ph/go-portrait.jpg",
    bio: "Directs the country's fiscal policy and economic management to bolster investor confidence and sustainable growth.",
    dateAssumed: "November 17, 2025",
    appointedBy: "Ferdinand R. Marcos Jr.",
    career: [
      { period: "2025 — Present", role: "Secretary of Finance" },
      { period: "2024 — 2025", role: "Special Assistant to the President for Investment and Economic Affairs" },
      { period: "Pre-2024", role: "President and CEO, Robinsons Land Corp" }
    ],
    policies: ["Fiscal Discipline Framework", "Public-Private Partnership Expansion", "Tax Administration Modernization"],
    records: [
      { label: "Reference", value: "https://www.dof.gov.ph/" }
    ]
  },
  {
    id: "off-6",
    name: "Jonvic Remulla",
    position: "Secretary of the Interior and Local Government",
    branch: "Executive",
    status: "Appointed",
    location: "Quezon City",
    photo: "https://www.dilg.gov.ph/remulla-portrait.jpg",
    bio: "Oversees local government units and the Philippine National Police to ensure public safety and local autonomy.",
    dateAssumed: "October 8, 2024",
    appointedBy: "Ferdinand R. Marcos Jr.",
    career: [
      { period: "2024 — Present", role: "Secretary of the Interior and Local Government" },
      { period: "2019 — 2024", role: "Governor of Cavite" },
      { period: "2010 — 2016", role: "Governor of Cavite" }
    ],
    policies: ["Smart City Digitalization", "LGU Autonomy Strengthening", "Peace and Order Masterplan"],
    records: [
      { label: "Reference", value: "https://www.dilg.gov.ph/" }
    ]
  },
  {
    id: "off-7",
    name: "Gilbert Teodoro",
    position: "Secretary of National Defense",
    branch: "Executive",
    status: "Appointed",
    location: "Quezon City",
    photo: "https://www.dnd.gov.ph/teodoro-portrait.jpg",
    bio: "Manages national security and defense strategy, focusing on modernization and territorial integrity.",
    dateAssumed: "June 5, 2023",
    appointedBy: "Ferdinand R. Marcos Jr.",
    career: [
      { period: "2023 — Present", role: "Secretary of National Defense" },
      { period: "2007 — 2009", role: "Secretary of National Defense" },
      { period: "1998 — 2007", role: "Representative of Tarlac" }
    ],
    policies: ["Horizon 3 AFP Modernization", "Comprehensive Archipelagic Defense Concept", "NDRRMC Strengthening"],
    records: [
      { label: "Reference", value: "https://www.dnd.gov.ph/" }
    ]
  }
];

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
    id: "bill-001",
    number: "RA 12064",
    title: "Philippine Maritime Zones Act",
    category: "National Security",
    description: "Asserts Philippine jurisdiction over its maritime zones in accordance with UNCLOS.",
    filed: "2023-11-22",
    stage: 5, // Enacted
    authors: ["Sen. Francis Tolentino", "Rep. Robert Ace Barbers"],
    summary: "Defines the maritime zones under the jurisdiction of the Republic of the Philippines, including its internal waters, archipelagic waters, and exclusive economic zone (EEZ).",
    pulse: { approve: 92, disapprove: 8 },
    news: [
      { source: "PNA", title: "Marcos inks law on PH Maritime Zones", verified: true, timestamp: "2024-11-08" },
      { source: "Official Gazette", title: "Republic Act No. 12064 Published", verified: true, timestamp: "2024-11-13" }
    ],
  },
  {
    id: "bill-002",
    number: "RA 12010",
    title: "Anti-Financial Account Scamming Act (AFASA)",
    category: "Cybersecurity",
    description: "Penalizes money muling and social engineering schemes involving financial accounts.",
    filed: "2023-12-05",
    stage: 5, // Enacted
    authors: ["Sen. Mark Villar"],
    summary: "Provides authorities with the tools to combat online financial crimes by criminalizing the use of 'money mules' and phishing/vishing schemes.",
    pulse: { approve: 85, disapprove: 15 },
    news: [
      { source: "Senate.gov.ph", title: "AFASA law bares teeth; arrests on the rise", verified: true, timestamp: "2026-04-27" },
      { source: "BSP", title: "New regulations for AFASA implementation effective June 2025", verified: true, timestamp: "2025-05-15" }
    ],
  },
  {
    id: "bill-003",
    number: "RA 12080",
    title: "Konektadong Pinoy Act",
    category: "Technology",
    description: "Promotes open access in data transmission to lower internet costs and barriers to entry.",
    filed: "2022-07-18",
    stage: 5, // Enacted
    authors: ["Rep. Joey Salceda"],
    summary: "Removes the requirement for a legislative franchise for internet service providers, aiming to boost connectivity in underserved rural areas.",
    pulse: { approve: 88, disapprove: 12 },
    news: [
      { source: "Digital Policy Alert", title: "Open Access in Data Transmission Act enters into force", verified: true, timestamp: "2025-09-08" },
      { source: "DICT", title: "DICT releases Konektadong Pinoy IRR", verified: true, timestamp: "2025-12-01" }
    ],
  },
  {
    id: "bill-004",
    number: "HB 9349",
    title: "Absolute Divorce Act",
    category: "Social Justice",
    description: "Reinstates absolute divorce as a mode for dissolving marriages in the Philippines.",
    filed: "2024-06-11",
    stage: 2, // Pending in Committee
    authors: ["Rep. Edcel Lagman", "Rep. Sarah Jane Elago"],
    summary: "Provides legal grounds for absolute divorce, including cases of domestic abuse, irreconcilable differences, and psychological incapacity.",
    pulse: { approve: 52, disapprove: 48 },
    news: [
      { source: "YouTube", title: "House hearing on absolute divorce: Highly emotional debates", verified: true, timestamp: "2026-05-11" },
      { source: "Rappler", title: "Divorce bill faces fresh scrutiny in committee", verified: true, timestamp: "2026-05-12" }
    ],
  }
];

export const stages = ["Filed", "House", "Senate", "President", "Enacted"] as const;
