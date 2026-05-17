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
  bioData: {
    dateOfBirth: string;
    age: number;
    civilStatus: string;
    education: string;
    nationality: string;
    religion: string;
  };
  campaignPromises: {
    promise: string;
    status: "Fulfilled" | "In Progress" | "Not Fulfilled";
    referenceLabel: string;
    referenceUrl: string;
  }[];
};

const portrait = (seed: string) =>
  `https://i.pravatar.cc/300?u=${encodeURIComponent(seed)}`;

export const officials: Official[] = Array.from({ length: 17 }).map((_, i) => {
  const branches = ["Executive", "Legislative", "Judicial"] as const;
  const statuses = ["Active", "Elected", "Appointed", "Former"] as const;
  const promiseStatuses = ["Fulfilled", "In Progress", "Not Fulfilled"] as const;
  const civilStatuses = ["Single", "Married", "Separated"] as const;
  const educations = [
    "UP Diliman (Public Administration)",
    "Ateneo de Manila University (Law)",
    "De La Salle University (Economics)",
    "University of San Carlos (Political Science)",
  ] as const;
  const religions = ["Roman Catholic", "Christian", "Iglesia ni Cristo", "Muslim"] as const;
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
    bioData: {
      dateOfBirth: `${(i % 28) + 1} ${["January", "March", "May", "July", "September", "November"][i % 6]} ${1968 + (i % 18)}`,
      age: 58 - (i % 14),
      civilStatus: civilStatuses[i % civilStatuses.length],
      education: educations[i % educations.length],
      nationality: "Filipino",
      religion: religions[i % religions.length],
    },
    campaignPromises: [
      {
        promise: "Publish monthly department spending reports in an open-data format.",
        status: promiseStatuses[i % promiseStatuses.length],
        referenceLabel: "Department Budget Tracker",
        referenceUrl: "https://www.dilg.gov.ph",
      },
      {
        promise: "Launch a hotline for reporting corruption and service delays.",
        status: promiseStatuses[(i + 1) % promiseStatuses.length],
        referenceLabel: "Citizen Feedback and Hotline",
        referenceUrl: "https://8888.gov.ph",
      },
      {
        promise: "Digitize permit processing to cut approval times by at least 30%.",
        status: promiseStatuses[(i + 2) % promiseStatuses.length],
        referenceLabel: "eGov Services Portal",
        referenceUrl: "https://egov.ph",
      },
      {
        promise: "Create annual scholarship slots for low-income students in the district.",
        status: promiseStatuses[(i + 1) % promiseStatuses.length],
        referenceLabel: "Public Assistance Program Bulletin",
        referenceUrl: "https://www.dswd.gov.ph",
      },
      {
        promise: "Complete flood control upgrades in high-risk barangays before the wet season.",
        status: promiseStatuses[i % promiseStatuses.length],
        referenceLabel: "DPWH Project Monitoring",
        referenceUrl: "https://www.dpwh.gov.ph",
      },
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

export type AgencyBudget = {
  fiscalYear: number;
  totalBudget: number;
  utilisedBudget: number;
  breakdown: { program: string; amount: number }[];
};

export type AgencyIssue = {
  id: string;
  title: string;
  status: "Open" | "Resolved";
  severity: "High" | "Medium" | "Low";
  dateReported: string;
};

export type AgencyProgram = {
  id: string;
  name: string;
  status: "Active" | "Pending";
  description: string;
};

export type Agency = {
  id: string;
  name: string;
  acronym: string;
  type: "Department" | "Commission" | "Authority" | "Bureau";
  location: string;
  mandate: string;
  secretaryId?: string;
  budget: AgencyBudget;
  issues: AgencyIssue[];
  programs: AgencyProgram[];
  sources: { label: string; url: string }[];
};

export const agencies: Agency[] = [
  {
    id: "agency-001",
    name: "Department of Interior and Local Government",
    acronym: "DILG",
    type: "Department",
    location: "Manila",
    mandate: "Strengthens local government units and promotes citizen participation in governance.",
    secretaryId: "off-1",
    budget: {
      fiscalYear: 2025,
      totalBudget: 48_500_000_000,
      utilisedBudget: 38_640_000_000,
      breakdown: [
        { program: "Local Government Operations", amount: 28_000_000_000 },
        { program: "Disaster Risk Reduction", amount: 7_200_000_000 },
        { program: "Community Development Projects", amount: 6_800_000_000 },
        { program: "Administrative & Support", amount: 3_500_000_000 },
      ],
    },
    issues: [
      { id: "issue-001", title: "Delayed LGU fund transfers in Q1", status: "Open", severity: "High", dateReported: "2025-02-15" },
      { id: "issue-002", title: "Audit findings on procurement process", status: "Open", severity: "Medium", dateReported: "2025-03-20" },
      { id: "issue-003", title: "Resolved: Enhanced compliance reporting system", status: "Resolved", severity: "Medium", dateReported: "2025-01-10" },
      { id: "issue-004", title: "Resolved: Records digitization project completed", status: "Resolved", severity: "Low", dateReported: "2024-11-05" },
    ],
    programs: [
      { id: "prog-001", name: "Malasakit Centers Expansion", status: "Active", description: "One-stop service centers for local citizen needs." },
      { id: "prog-002", name: "Barangay Digitalization Initiative", status: "Active", description: "Equipping barangays with digital infrastructure." },
      { id: "prog-003", name: "LGU Capacity Building Program", status: "Pending", description: "Training and certification for local officials." },
    ],
    sources: [
      { label: "DILG Official Website", url: "https://www.dilg.gov.ph" },
      { label: "DBM National Expenditure Program 2025", url: "https://www.dbm.gov.ph" },
      { label: "COA Audit Reports", url: "https://www.coa.gov.ph" },
    ],
  },
  {
    id: "agency-002",
    name: "Department of Education",
    acronym: "DepEd",
    type: "Department",
    location: "Pasig City",
    mandate: "Provides quality, accessible, and inclusive basic education for all Filipinos.",
    secretaryId: "off-3",
    budget: {
      fiscalYear: 2025,
      totalBudget: 752_400_000_000,
      utilisedBudget: 652_900_000_000,
      breakdown: [
        { program: "Teacher Salaries & Benefits", amount: 450_000_000_000 },
        { program: "School Operations & Maintenance", amount: 180_000_000_000 },
        { program: "Learning Materials & Infrastructure", amount: 90_000_000_000 },
        { program: "School-Based Programs", amount: 32_400_000_000 },
      ],
    },
    issues: [
      { id: "issue-005", title: "Teacher shortage in remote areas", status: "Open", severity: "High", dateReported: "2025-01-22" },
      { id: "issue-006", title: "Infrastructure development delays", status: "Open", severity: "Medium", dateReported: "2025-02-28" },
      { id: "issue-007", title: "Resolved: Curriculum modernization phase 1", status: "Resolved", severity: "Low", dateReported: "2024-09-15" },
    ],
    programs: [
      { id: "prog-004", name: "Kampanya Tayo para sa Kabutihan", status: "Active", description: "Values education and citizenship program." },
      { id: "prog-005", name: "Senior High School Enhancement", status: "Active", description: "Career guidance and technical skills training." },
      { id: "prog-006", name: "Universal Kindergarten Program", status: "Pending", description: "Free early childhood education nationwide." },
    ],
    sources: [
      { label: "DepEd Official Portal", url: "https://www.deped.gov.ph" },
      { label: "DBM Budget Tracker 2025", url: "https://www.dbm.gov.ph" },
      { label: "Commission on Audit DepEd Audits", url: "https://www.coa.gov.ph" },
    ],
  },
  {
    id: "agency-003",
    name: "Department of Health",
    acronym: "DOH",
    type: "Department",
    location: "San Lazaro Compound, Manila",
    mandate: "Protects and improves the health status of all Filipinos.",
    secretaryId: "off-5",
    budget: {
      fiscalYear: 2025,
      totalBudget: 165_200_000_000,
      utilisedBudget: 145_320_000_000,
      breakdown: [
        { program: "Hospital Operations & Personnel", amount: 85_000_000_000 },
        { program: "Disease Surveillance & Prevention", amount: 35_600_000_000 },
        { program: "Health Systems Strengthening", amount: 28_000_000_000 },
        { program: "Research & Development", amount: 16_600_000_000 },
      ],
    },
    issues: [
      { id: "issue-008", title: "Medical supply chain disruptions", status: "Open", severity: "High", dateReported: "2025-03-10" },
      { id: "issue-009", title: "Rural health center staffing concerns", status: "Open", severity: "Medium", dateReported: "2025-03-15" },
      { id: "issue-010", title: "Resolved: COVID-19 vaccination database modernization", status: "Resolved", severity: "Medium", dateReported: "2024-12-01" },
    ],
    programs: [
      { id: "prog-007", name: "Kalusugan sa Milyun", status: "Active", description: "Universal health coverage expansion." },
      { id: "prog-008", name: "Mental Health Awareness Campaign", status: "Active", description: "National mental health and psychosocial support." },
      { id: "prog-009", name: "Telemedicine Expansion", status: "Pending", description: "Remote healthcare access in underserved areas." },
    ],
    sources: [
      { label: "DOH Official Website", url: "https://www.doh.gov.ph" },
      { label: "DBM Health Sector Expenditure", url: "https://www.dbm.gov.ph" },
      { label: "WHO & Global Health Partnerships", url: "https://www.coa.gov.ph" },
    ],
  },
  {
    id: "agency-004",
    name: "Bureau of Internal Revenue",
    acronym: "BIR",
    type: "Bureau",
    location: "Dilao, Manila",
    mandate: "Assesses and collects internal revenue taxes to fund government operations.",
    secretaryId: "off-2",
    budget: {
      fiscalYear: 2025,
      totalBudget: 12_800_000_000,
      utilisedBudget: 11_040_000_000,
      breakdown: [
        { program: "Tax Administration & Assessment", amount: 6_400_000_000 },
        { program: "Taxpayer Services", amount: 3_200_000_000 },
        { program: "Systems & Technology", amount: 2_080_000_000 },
        { program: "Audit & Compliance", amount: 1_120_000_000 },
      ],
    },
    issues: [
      { id: "issue-011", title: "Tax compliance rate improvements needed", status: "Open", severity: "High", dateReported: "2025-02-01" },
      { id: "issue-012", title: "IT infrastructure modernization ongoing", status: "Resolved", severity: "Medium", dateReported: "2024-10-15" },
    ],
    programs: [
      { id: "prog-010", name: "Taxpayer Services Enhancement", status: "Active", description: "E-filing and digital tax services expansion." },
      { id: "prog-011", name: "Compliance Risk Assessment Program", status: "Active", description: "Targeted support for small to medium enterprises." },
    ],
    sources: [
      { label: "BIR Official Portal", url: "https://www.bir.gov.ph" },
      { label: "Revenue Performance Reports", url: "https://www.dbm.gov.ph" },
      { label: "COA Financial Audit", url: "https://www.coa.gov.ph" },
    ],
  },
  {
    id: "agency-005",
    name: "Civil Service Commission",
    acronym: "CSC",
    type: "Commission",
    location: "Quezon City",
    mandate: "Safeguards merit and fitness principles in the civil service.",
    secretaryId: "off-8",
    budget: {
      fiscalYear: 2025,
      totalBudget: 8_400_000_000,
      utilisedBudget: 7_392_000_000,
      breakdown: [
        { program: "Examination & Licensing Services", amount: 3_500_000_000 },
        { program: "Personnel Administration", amount: 2_200_000_000 },
        { program: "Career Development Programs", amount: 1_600_000_000 },
        { program: "Administrative Operations", amount: 1_100_000_000 },
      ],
    },
    issues: [
      { id: "issue-013", title: "Exam administration delays addressed", status: "Resolved", severity: "High", dateReported: "2024-11-20" },
      { id: "issue-014", title: "Database modernization in progress", status: "Open", severity: "Low", dateReported: "2025-02-10" },
    ],
    programs: [
      { id: "prog-012", name: "Civil Service Excellence Program", status: "Active", description: "Recognition and rewards for outstanding public servants." },
      { id: "prog-013", name: "Talent Management Initiative", status: "Pending", description: "Succession planning for key government positions." },
    ],
    sources: [
      { label: "CSC Official Website", url: "https://www.csc.gov.ph" },
      { label: "Civil Service Statistics", url: "https://www.dbm.gov.ph" },
      { label: "COA Performance Audit", url: "https://www.coa.gov.ph" },
    ],
  },
];

