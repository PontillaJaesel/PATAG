import { createClient } from "@libsql/client";

const db = createClient({
  url: "file:patag.sqlite",
});

const agenciesToInsert = [
  {
    name: "Department of Health",
    acronym: "DOH",
    kind: "Department",
    description:
      "The lead department for national health policy, disease surveillance, hospital support, and public health delivery.",
    mandate:
      "Protect, promote, and preserve the health of every Filipino through accessible, equitable, and resilient public health systems.",
    headquarters: "San Lazaro Compound, Sta. Cruz, Manila",
    website: "doh.gov.ph",
    hotline: "(02) 8651-7800",
    secretary_name: "Teodoro J. Herbosa",
    secretary_title: "Secretary of Health",
    secretary_photo: "/officials/teodoro.jpg",
    secretary_bio:
      "Leads the national health response, hospital modernization, and public health preparedness programs.",
    overview_points: JSON.stringify([
      "Coordinates national hospitals and health facilities",
      "Leads outbreak response and immunization campaigns",
      "Oversees health regulation, licensing, and standards",
    ]),
    programs: JSON.stringify([
      "Universal Health Care implementation",
      "National Immunization Program",
      "BIDA Solusyon emerging disease response",
    ]),
    stats: JSON.stringify([
      { label: "Regional Centers", value: "17" },
      { label: "Priority Services", value: "24/7" },
      { label: "National Reach", value: "Nationwide" },
    ]),
  },
  {
    name: "Department of Education",
    acronym: "DepEd",
    kind: "Department",
    description:
      "The department responsible for basic education policy, curriculum standards, school operations, and teacher support.",
    mandate:
      "Provide every learner with quality, accessible, and inclusive basic education anchored on competence and civic responsibility.",
    headquarters: "Meralco Avenue, Pasig City",
    website: "deped.gov.ph",
    hotline: "(02) 8633-7201",
    secretary_name: "Juan Edgardo Sonny Angara",
    secretary_title: "Secretary of Education",
    secretary_photo: "/officials/juanedgardo.jpg",
    secretary_bio:
      "Guides curriculum reform, school infrastructure, and teacher welfare across the basic education system.",
    overview_points: JSON.stringify([
      "Sets national curriculum and learning standards",
      "Supports public school operations and classroom resources",
      "Coordinates teacher development and learner welfare",
    ]),
    programs: JSON.stringify([
      "Basic Education Learning Continuity",
      "Learners' Support and Catch-Up Program",
      "School Building and Classroom Improvement",
    ]),
    stats: JSON.stringify([
      { label: "Schools Covered", value: "47K+" },
      { label: "Teachers Supported", value: "900K+" },
      { label: "Learners Served", value: "27M+" },
    ]),
  },
  {
    name: "Department of Agriculture",
    acronym: "DA",
    kind: "Department",
    description:
      "The lead department for food security, irrigation support, farm modernization, and agricultural value chain development.",
    mandate:
      "Raise farm productivity and stabilize food supply while protecting the livelihoods of farmers and fisherfolk.",
    headquarters: "Elliptical Road, Diliman, Quezon City",
    website: "da.gov.ph",
    hotline: "(02) 927-2874",
    secretary_name: "Francisco P. Tiu Laurel Jr.",
    secretary_title: "Secretary of Agriculture",
    secretary_photo: "/officials/francisco.png",
    secretary_bio:
      "Focuses on food supply resilience, post-harvest support, and the modernization of Philippine agriculture.",
    overview_points: JSON.stringify([
      "Supports farmers through seed, fertilizer, and mechanization programs",
      "Maintains irrigation and farm-to-market connectivity priorities",
      "Coordinates food price stabilization and production monitoring",
    ]),
    programs: JSON.stringify([
      "Rice Competitiveness Enhancement Fund",
      "National corn and livestock support",
      "Food logistics and cold chain expansion",
    ]),
    stats: JSON.stringify([
      { label: "Field Offices", value: "16" },
      { label: "Priority Crops", value: "Major" },
      { label: "Coverage", value: "Archipelago-wide" },
    ]),
  },
  {
    name: "Department of Social Welfare and Development",
    acronym: "DSWD",
    kind: "Department",
    description:
      "The department delivering social protection, disaster relief, and direct assistance to vulnerable households.",
    mandate:
      "Strengthen social safety nets and immediate response programs for families, seniors, children, and persons in crisis.",
    headquarters: "Batasan Complex, Quezon City",
    website: "dswd.gov.ph",
    hotline: "(02) 931-8101",
    secretary_name: "Rexlon T. Gatchalian",
    secretary_title: "Secretary of Social Welfare and Development",
    secretary_photo: "/officials/rexlon.jpg",
    secretary_bio:
      "Oversees social assistance, disaster relief, and the country’s major poverty alleviation programs.",
    overview_points: JSON.stringify([
      "Delivers cash aid and emergency relief to families in crisis",
      "Maintains national social welfare field operations",
      "Coordinates disaster response and residential care services",
    ]),
    programs: JSON.stringify([
      "Pantawid Pamilyang Pilipino Program",
      "AICS emergency assistance",
      "Disaster response operations",
    ]),
    stats: JSON.stringify([
      { label: "Field Offices", value: "17" },
      { label: "Response Window", value: "24/7" },
      { label: "Beneficiaries", value: "Millions" },
    ]),
  },
  {
    name: "Department of Public Works and Highways",
    acronym: "DPWH",
    kind: "Department",
    description:
      "The department responsible for national roads, bridges, flood control, and public infrastructure delivery.",
    mandate:
      "Plan, design, and maintain the country’s core public works network with resilience, safety, and connectivity.",
    headquarters: "Bonifacio Drive, Port Area, Manila",
    website: "dpwh.gov.ph",
    hotline: "(02) 5304-3000",
    secretary_name: "Manuel M. Bonoan",
    secretary_title: "Secretary of Public Works and Highways",
    secretary_photo: "/officials/manuelbonoan.jpg",
    secretary_bio:
      "Directs infrastructure delivery, flood mitigation, and the national road maintenance program.",
    overview_points: JSON.stringify([
      "Constructs and maintains highways, bridges, and flood control structures",
      "Oversees infrastructure projects nationwide",
      "Monitors construction standards and engineering compliance",
    ]),
    programs: JSON.stringify([
      "Build Better More infrastructure program",
      "National bridge replacement and repair",
      "Flood control and drainage upgrades",
    ]),
    stats: JSON.stringify([
      { label: "District Engineering Offices", value: "200+" },
      { label: "Infrastructure Projects", value: "Thousands" },
      { label: "Coverage", value: "Nationwide" },
    ]),
  },
  {
    name: "Department of the Interior and Local Government",
    acronym: "DILG",
    kind: "Department",
    description:
      "The department overseeing local government units, public safety coordination, and community governance support.",
    mandate:
      "Strengthen local governance, peace and order, and citizen-facing public services across all regions.",
    headquarters: "Quezon Memorial Circle, Quezon City",
    website: "dilg.gov.ph",
    hotline: "(02) 8876-3454",
    secretary_name: "Juanito Victor C. Remulla Jr.",
    secretary_title: "Secretary of the Interior and Local Government",
    secretary_photo:
      "https://ui-avatars.com/api/?name=Jonvic+Remulla&size=240&background=F3F0EA&color=34251D",
    secretary_bio:
      "Helps coordinate LGU oversight, barangay governance, and public safety operations.",
    overview_points: JSON.stringify([
      "Coordinates LGU oversight and local governance reforms",
      "Supports barangay programs and public safety coordination",
      "Leads community-based peace and order initiatives",
    ]),
    programs: JSON.stringify([
      "Seal of Good Local Governance",
      "Barangay Development Program",
      "Public safety and anti-criminality coordination",
    ]),
    stats: JSON.stringify([
      { label: "LGUs Covered", value: "17 Regions" },
      { label: "Barangays", value: "42K+" },
      { label: "Service Scope", value: "Nationwide" },
    ]),
  },
  {
    name: "National Economic and Development Authority",
    acronym: "NEDA",
    kind: "Agency",
    description:
      "The government's economic planning authority that coordinates national development policy, investment priorities, and socio-economic targets.",
    mandate:
      "Guide long-term development planning, coordinate policy priorities, and align programs with inclusive growth goals.",
    headquarters: "Pasig City",
    website: "neda.gov.ph",
    hotline: "(02) 8634-1963",
    secretary_name: "Arsenio M. Balisacan",
    secretary_title: "Secretary of Socioeconomic Planning",
    secretary_photo: "/officials/arsenio.png",
    secretary_bio:
      "Steers national development planning, economic policy coordination, and investment prioritization.",
    overview_points: JSON.stringify([
      "Prepares the national development plan and medium-term targets",
      "Reviews major investments and policy reforms",
      "Coordinates cross-agency socio-economic planning",
    ]),
    programs: JSON.stringify([
      "Philippine Development Plan",
      "Public Investment Program",
      "Regional development coordination",
    ]),
    stats: JSON.stringify([
      { label: "Planning Horizon", value: "Long-term" },
      { label: "Policy Scope", value: "Whole-of-government" },
      { label: "Coverage", value: "National" },
    ]),
  },
];

await db.execute(`
  CREATE TABLE IF NOT EXISTS agencies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    acronym TEXT NOT NULL,
    kind TEXT NOT NULL,
    description TEXT NOT NULL,
    mandate TEXT NOT NULL,
    headquarters TEXT NOT NULL,
    website TEXT NOT NULL,
    hotline TEXT NOT NULL,
    secretary_name TEXT NOT NULL,
    secretary_title TEXT NOT NULL,
    secretary_photo TEXT NOT NULL,
    secretary_bio TEXT NOT NULL,
    overview_points TEXT NOT NULL,
    programs TEXT NOT NULL,
    stats TEXT NOT NULL
  )
`);

await db.execute(`
  CREATE TABLE IF NOT EXISTS agency_details (
    agency_id INTEGER PRIMARY KEY,
    secretary_official_id INTEGER,
    secretary_assumed_date TEXT NOT NULL,
    secretary_tenure_years INTEGER NOT NULL,
    top_accomplishments TEXT NOT NULL,
    core_contributions TEXT NOT NULL,
    total_budget INTEGER NOT NULL,
    utilized_funds INTEGER NOT NULL,
    unutilized_surplus INTEGER NOT NULL,
    FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE CASCADE
  )
`);

await db.execute(`
  CREATE TABLE IF NOT EXISTS programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agency_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    phase_label TEXT NOT NULL,
    completion_percent INTEGER NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE CASCADE
  )
`);

await db.execute(`
  CREATE TABLE IF NOT EXISTS agency_news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agency_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    source TEXT NOT NULL,
    category TEXT NOT NULL,
    published_at TEXT NOT NULL,
    summary TEXT NOT NULL,
    url TEXT NOT NULL,
    is_fact_check INTEGER NOT NULL DEFAULT 0,
    sort_order INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE CASCADE
  )
`);

await db.execute(`
  CREATE TABLE IF NOT EXISTS coa_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agency_id INTEGER NOT NULL,
    audit_opinion TEXT NOT NULL,
    exception_percent INTEGER NOT NULL,
    resolved_percent INTEGER NOT NULL,
    recommendations_total INTEGER NOT NULL,
    notes TEXT NOT NULL,
    as_of_date TEXT NOT NULL,
    FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE CASCADE
  )
`);

await db.execute(`
  CREATE TABLE IF NOT EXISTS procurements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agency_id INTEGER NOT NULL,
    project_name TEXT NOT NULL,
    contractor_name TEXT NOT NULL,
    approved_budget INTEGER NOT NULL,
    expected_completion_date TEXT NOT NULL,
    status TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE CASCADE
  )
`);

await db.execute("DELETE FROM agencies");
await db.execute("DELETE FROM agency_details");
await db.execute("DELETE FROM programs");
await db.execute("DELETE FROM agency_news");
await db.execute("DELETE FROM coa_reports");
await db.execute("DELETE FROM procurements");

for (const agency of agenciesToInsert) {
  await db.execute({
    sql: `
      INSERT INTO agencies (
        name,
        acronym,
        kind,
        description,
        mandate,
        headquarters,
        website,
        hotline,
        secretary_name,
        secretary_title,
        secretary_photo,
        secretary_bio,
        overview_points,
        programs,
        stats
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    args: [
      agency.name,
      agency.acronym,
      agency.kind,
      agency.description,
      agency.mandate,
      agency.headquarters,
      agency.website,
      agency.hotline,
      agency.secretary_name,
      agency.secretary_title,
      agency.secretary_photo,
      agency.secretary_bio,
      agency.overview_points,
      agency.programs,
      agency.stats,
    ],
  });
}

const officialRows = await db.execute("SELECT id, name FROM officials");
const officialIdByName = new Map(
  (officialRows.rows as Array<{ id: number | string; name: string }>).map((row) => [
    row.name,
    Number(row.id),
  ]),
);

const agencyRows = await db.execute("SELECT id, acronym FROM agencies");
const agencyIdByAcronym = new Map(
  (agencyRows.rows as Array<{ id: number | string; acronym: string }>).map((row) => [
    row.acronym,
    Number(row.id),
  ]),
);

type AgencyDetailSeed = {
  acronym: string;
  secretary_assumed_date: string;
  secretary_tenure_years: number;
  top_accomplishments: string[];
  core_contributions: string[];
  total_budget: number;
  utilized_funds: number;
  unutilized_surplus: number;
  coaReport: {
    audit_opinion: string;
    exception_percent: number;
    resolved_percent: number;
    recommendations_total: number;
    notes: string;
    as_of_date: string;
  };
  programs: Array<{
    name: string;
    phase_label: string;
    completion_percent: number;
  }>;
  news: Array<{
    title: string;
    source: string;
    category: string;
    published_at: string;
    summary: string;
    url: string;
    is_fact_check: number;
  }>;
  procurements: Array<{
    project_name: string;
    contractor_name: string;
    approved_budget: number;
    expected_completion_date: string;
    status: string;
  }>;
};

const agencyDetailSeeds: AgencyDetailSeed[] = [
  {
    acronym: "DOH",
    secretary_assumed_date: "2023-06-05",
    secretary_tenure_years: 2,
    top_accomplishments: [
      "Expanded regional hospital readiness and emergency surge coordination",
      "Scaled up public health monitoring and disease surveillance systems",
    ],
    core_contributions: [
      "National health policy and public hospital oversight",
      "Immunization, outbreak response, and health regulation",
    ],
    total_budget: 278500000000,
    utilized_funds: 214300000000,
    unutilized_surplus: 64200000000,
    coaReport: {
      audit_opinion: "Unmodified",
      exception_percent: 8,
      resolved_percent: 92,
      recommendations_total: 14,
      notes: "Most audit observations were resolved within the current fiscal cycle.",
      as_of_date: "2025-03-31",
    },
    programs: [
      {
        name: "Universal Health Care Expansion",
        phase_label: "Implementation",
        completion_percent: 74,
      },
      { name: "Hospital Modernization Program", phase_label: "Active", completion_percent: 68 },
      {
        name: "Regional Disease Surveillance Upgrade",
        phase_label: "Rolling out",
        completion_percent: 58,
      },
    ],
    news: [
      {
        title: "DOH releases new hospital preparedness scorecards",
        source: "Philippine News Agency",
        category: "Verified News",
        published_at: "2026-05-02",
        summary:
          "Regional facilities posted higher readiness scores after the latest capacity review.",
        url: "https://doh.gov.ph",
        is_fact_check: 0,
      },
      {
        title: "Fact Check: Hospital supply shortage claims remain unverified",
        source: "Truth Media Hub",
        category: "Fact Check Alert",
        published_at: "2026-04-28",
        summary: "Agency records show procurement deliveries are ongoing across three regions.",
        url: "https://doh.gov.ph",
        is_fact_check: 1,
      },
    ],
    procurements: [
      {
        project_name: "Regional Cold Chain Upgrade",
        contractor_name: "HealthTech Philippines Inc.",
        approved_budget: 185000000,
        expected_completion_date: "2026-10-15",
        status: "Active",
      },
      {
        project_name: "Telemedicine Expansion Package",
        contractor_name: "MediLink Systems",
        approved_budget: 92000000,
        expected_completion_date: "2026-08-30",
        status: "Awarded",
      },
    ],
  },
  {
    acronym: "DepEd",
    secretary_assumed_date: "2024-07-19",
    secretary_tenure_years: 1,
    top_accomplishments: [
      "Expanded catch-up learning support in public schools",
      "Improved classroom repair and digital learning rollouts",
    ],
    core_contributions: [
      "Basic education policy and curriculum standards",
      "Public school operations and teacher support",
    ],
    total_budget: 631200000000,
    utilized_funds: 472000000000,
    unutilized_surplus: 159200000000,
    coaReport: {
      audit_opinion: "Qualified",
      exception_percent: 18,
      resolved_percent: 82,
      recommendations_total: 22,
      notes:
        "Disbursement and procurement documentation need tighter controls in select divisions.",
      as_of_date: "2025-04-15",
    },
    programs: [
      { name: "Learning Recovery Sprint", phase_label: "Implementation", completion_percent: 81 },
      { name: "School Building Repair Program", phase_label: "Active", completion_percent: 66 },
      { name: "Teacher Digital Readiness", phase_label: "Rolling out", completion_percent: 54 },
    ],
    news: [
      {
        title: "DepEd expands catch-up classes in priority provinces",
        source: "Department Advisory",
        category: "Verified News",
        published_at: "2026-05-01",
        summary:
          "New schedules target learners with the largest learning gaps in the first quarter.",
        url: "https://deped.gov.ph",
        is_fact_check: 0,
      },
      {
        title: "Fact Check: Classroom repair budget remains within approved envelope",
        source: "Truth Media Hub",
        category: "Fact Check Alert",
        published_at: "2026-04-26",
        summary: "Budget utilization records match the agency's published procurement summary.",
        url: "https://deped.gov.ph",
        is_fact_check: 1,
      },
    ],
    procurements: [
      {
        project_name: "Classroom Repair Materials Supply",
        contractor_name: "BuildRight Manufacturing",
        approved_budget: 248000000,
        expected_completion_date: "2026-09-20",
        status: "Active",
      },
      {
        project_name: "Learner Devices Distribution",
        contractor_name: "EduTech Logistics Corp.",
        approved_budget: 330000000,
        expected_completion_date: "2026-11-30",
        status: "Awarded",
      },
    ],
  },
  {
    acronym: "DA",
    secretary_assumed_date: "2023-07-06",
    secretary_tenure_years: 2,
    top_accomplishments: [
      "Accelerated post-harvest support and rice competitiveness programs",
      "Expanded mechanization and irrigation assistance for farm communities",
    ],
    core_contributions: [
      "Food security policy and agriculture modernization",
      "Support to farmers, fisherfolk, and irrigation networks",
    ],
    total_budget: 91200000000,
    utilized_funds: 69800000000,
    unutilized_surplus: 21400000000,
    coaReport: {
      audit_opinion: "Unmodified",
      exception_percent: 10,
      resolved_percent: 90,
      recommendations_total: 10,
      notes: "Commodity distribution controls are improving across field offices.",
      as_of_date: "2025-02-28",
    },
    programs: [
      { name: "Rice Competitiveness Enhancement", phase_label: "Active", completion_percent: 77 },
      { name: "National Irrigation Repair", phase_label: "Implementation", completion_percent: 63 },
      { name: "Farm Mechanization Rollout", phase_label: "Rolling out", completion_percent: 52 },
    ],
    news: [
      {
        title: "DA reports stable rice supply outlook ahead of harvest",
        source: "Philippine News Agency",
        category: "Verified News",
        published_at: "2026-05-04",
        summary:
          "Supply monitoring shows stable milling inventory and expanded logistics coordination.",
        url: "https://da.gov.ph",
        is_fact_check: 0,
      },
      {
        title: "Fact Check: Farm support fund remains on schedule",
        source: "Truth Media Hub",
        category: "Fact Check Alert",
        published_at: "2026-04-29",
        summary: "Verified allotments align with the published implementation plan.",
        url: "https://da.gov.ph",
        is_fact_check: 1,
      },
    ],
    procurements: [
      {
        project_name: "Irrigation Rehabilitation Package",
        contractor_name: "AgriBuild Solutions",
        approved_budget: 164000000,
        expected_completion_date: "2026-12-10",
        status: "Active",
      },
      {
        project_name: "Farm-to-Market Cold Storage Units",
        contractor_name: "Northstar Infrastructure",
        approved_budget: 123000000,
        expected_completion_date: "2026-08-18",
        status: "Awarded",
      },
    ],
  },
  {
    acronym: "DSWD",
    secretary_assumed_date: "2023-10-09",
    secretary_tenure_years: 2,
    top_accomplishments: [
      "Expanded disaster response deployment across vulnerable regions",
      "Improved cash aid turnaround for crisis-affected households",
    ],
    core_contributions: [
      "Social protection, direct assistance, and residential care services",
      "Emergency response and family welfare coordination",
    ],
    total_budget: 219800000000,
    utilized_funds: 165900000000,
    unutilized_surplus: 53900000000,
    coaReport: {
      audit_opinion: "Qualified",
      exception_percent: 16,
      resolved_percent: 84,
      recommendations_total: 18,
      notes: "Most exceptions relate to field-office documentation and are being corrected.",
      as_of_date: "2025-03-20",
    },
    programs: [
      { name: "AICS Rapid Assistance", phase_label: "Active", completion_percent: 85 },
      { name: "Disaster Relief Logistics", phase_label: "Implementation", completion_percent: 69 },
      {
        name: "Residential Care Modernization",
        phase_label: "Rolling out",
        completion_percent: 47,
      },
    ],
    news: [
      {
        title: "DSWD deploys enhanced relief logistics in typhoon corridor",
        source: "Department Bulletin",
        category: "Verified News",
        published_at: "2026-05-03",
        summary:
          "Relief packs and cash assistance are moving faster under the updated deployment plan.",
        url: "https://dswd.gov.ph",
        is_fact_check: 0,
      },
      {
        title: "Fact Check: Relief inventory claims corrected by warehouse records",
        source: "Truth Media Hub",
        category: "Fact Check Alert",
        published_at: "2026-04-30",
        summary:
          "Stock count reports show the national inventory is within the recorded threshold.",
        url: "https://dswd.gov.ph",
        is_fact_check: 1,
      },
    ],
    procurements: [
      {
        project_name: "Emergency Warehouse Expansion",
        contractor_name: "SafeHold Construction",
        approved_budget: 98000000,
        expected_completion_date: "2026-09-12",
        status: "Active",
      },
      {
        project_name: "Digital Beneficiary Registry Upgrade",
        contractor_name: "CivicData Systems",
        approved_budget: 74000000,
        expected_completion_date: "2026-07-25",
        status: "Awarded",
      },
    ],
  },
  {
    acronym: "DPWH",
    secretary_assumed_date: "2022-07-01",
    secretary_tenure_years: 3,
    top_accomplishments: [
      "Completed major road and bridge rehabilitation milestones",
      "Expanded flood control works and maintenance readiness",
    ],
    core_contributions: [
      "National roads, bridges, and flood control infrastructure",
      "Engineering standards and project delivery oversight",
    ],
    total_budget: 980500000000,
    utilized_funds: 742600000000,
    unutilized_surplus: 237900000000,
    coaReport: {
      audit_opinion: "Unmodified",
      exception_percent: 7,
      resolved_percent: 93,
      recommendations_total: 12,
      notes: "Project closeout documentation improved after central office review.",
      as_of_date: "2025-04-08",
    },
    programs: [
      { name: "Build Better More Roads", phase_label: "Implementation", completion_percent: 72 },
      { name: "Flood Control Priority Works", phase_label: "Active", completion_percent: 65 },
      { name: "Bridge Safety Rehabilitation", phase_label: "Rolling out", completion_percent: 57 },
    ],
    news: [
      {
        title: "DPWH opens new flood mitigation segments in low-lying districts",
        source: "Department Release",
        category: "Verified News",
        published_at: "2026-05-05",
        summary: "Fresh flood control segments are now active ahead of the rainy season.",
        url: "https://dpwh.gov.ph",
        is_fact_check: 0,
      },
      {
        title: "Fact Check: Bridge repair delays were limited to two project sites",
        source: "Truth Media Hub",
        category: "Fact Check Alert",
        published_at: "2026-04-27",
        summary: "Official project logs confirm most bridge repairs remain within target windows.",
        url: "https://dpwh.gov.ph",
        is_fact_check: 1,
      },
    ],
    procurements: [
      {
        project_name: "Provincial Bridge Reinforcement Package",
        contractor_name: "SteelSpan Consortium",
        approved_budget: 215000000,
        expected_completion_date: "2026-11-22",
        status: "Active",
      },
      {
        project_name: "Flood Control Channel Works",
        contractor_name: "RiverGuard Builders",
        approved_budget: 192000000,
        expected_completion_date: "2026-10-05",
        status: "Awarded",
      },
    ],
  },
  {
    acronym: "DILG",
    secretary_assumed_date: "2022-10-13",
    secretary_tenure_years: 3,
    top_accomplishments: [
      "Strengthened local governance scorecards and public safety coordination",
      "Improved barangay support and community peace-and-order response",
    ],
    core_contributions: [
      "Local government oversight and governance reform",
      "Public safety, barangay support, and peace and order coordination",
    ],
    total_budget: 65200000000,
    utilized_funds: 50400000000,
    unutilized_surplus: 14800000000,
    coaReport: {
      audit_opinion: "Unmodified",
      exception_percent: 9,
      resolved_percent: 91,
      recommendations_total: 11,
      notes: "LGU support grants are now tracked through a centralized review process.",
      as_of_date: "2025-02-14",
    },
    programs: [
      { name: "Seal of Good Local Governance", phase_label: "Active", completion_percent: 88 },
      {
        name: "Barangay Development Support",
        phase_label: "Implementation",
        completion_percent: 61,
      },
      { name: "Community Safety Coordination", phase_label: "Rolling out", completion_percent: 55 },
    ],
    news: [
      {
        title: "DILG updates governance benchmarks for local government units",
        source: "Department Advisory",
        category: "Verified News",
        published_at: "2026-05-01",
        summary:
          "The new governance metrics emphasize service delivery and financial transparency.",
        url: "https://dilg.gov.ph",
        is_fact_check: 0,
      },
      {
        title: "Fact Check: Barangay support funds remain accounted for",
        source: "Truth Media Hub",
        category: "Fact Check Alert",
        published_at: "2026-04-24",
        summary: "Audit files show grants are being reconciled on schedule by region.",
        url: "https://dilg.gov.ph",
        is_fact_check: 1,
      },
    ],
    procurements: [
      {
        project_name: "Local Governance Analytics Platform",
        contractor_name: "CivicPulse Technologies",
        approved_budget: 88000000,
        expected_completion_date: "2026-08-14",
        status: "Active",
      },
      {
        project_name: "Barangay Service Kiosks",
        contractor_name: "PublicWorks Digital",
        approved_budget: 69000000,
        expected_completion_date: "2026-12-01",
        status: "Awarded",
      },
    ],
  },
  {
    acronym: "NEDA",
    secretary_assumed_date: "2022-07-07",
    secretary_tenure_years: 3,
    top_accomplishments: [
      "Advanced medium-term development plan alignment across agencies",
      "Strengthened investment review and socioeconomic planning checkpoints",
    ],
    core_contributions: [
      "National economic planning and policy coordination",
      "Investment priorities and cross-agency development strategy",
    ],
    total_budget: 21200000000,
    utilized_funds: 16480000000,
    unutilized_surplus: 4720000000,
    coaReport: {
      audit_opinion: "Unmodified",
      exception_percent: 5,
      resolved_percent: 95,
      recommendations_total: 7,
      notes:
        "The agency maintained strong documentation discipline for planning and review functions.",
      as_of_date: "2025-01-31",
    },
    programs: [
      {
        name: "Philippine Development Plan Tracking",
        phase_label: "Active",
        completion_percent: 79,
      },
      {
        name: "Regional Investment Prioritization",
        phase_label: "Implementation",
        completion_percent: 67,
      },
      {
        name: "Policy Dashboard Modernization",
        phase_label: "Rolling out",
        completion_percent: 59,
      },
    ],
    news: [
      {
        title: "NEDA releases updated investment priorities dashboard",
        source: "Agency Bulletin",
        category: "Verified News",
        published_at: "2026-05-04",
        summary:
          "The dashboard now consolidates planning indicators and public investment progress.",
        url: "https://neda.gov.ph",
        is_fact_check: 0,
      },
      {
        title: "Fact Check: Development targets remain on the published timetable",
        source: "Truth Media Hub",
        category: "Fact Check Alert",
        published_at: "2026-04-30",
        summary: "Quarterly logs show no major delays in cross-agency plan coordination.",
        url: "https://neda.gov.ph",
        is_fact_check: 1,
      },
    ],
    procurements: [
      {
        project_name: "Development Dashboard Enhancement",
        contractor_name: "PlanWorks Data Services",
        approved_budget: 57000000,
        expected_completion_date: "2026-07-28",
        status: "Active",
      },
      {
        project_name: "Regional Planning Analytics Support",
        contractor_name: "Orbit Insights",
        approved_budget: 46000000,
        expected_completion_date: "2026-11-10",
        status: "Awarded",
      },
    ],
  },
];

for (const detailSeed of agencyDetailSeeds) {
  const agencyId = agencyIdByAcronym.get(detailSeed.acronym);
  if (!agencyId) continue;

  await db.execute({
    sql: `
      INSERT INTO agency_details (
        agency_id,
        secretary_official_id,
        secretary_assumed_date,
        secretary_tenure_years,
        top_accomplishments,
        core_contributions,
        total_budget,
        utilized_funds,
        unutilized_surplus
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    args: [
      agencyId,
      officialIdByName.get(
        agenciesToInsert.find((agency) => agency.acronym === detailSeed.acronym)?.secretary_name ??
          "",
      ) ?? null,
      detailSeed.secretary_assumed_date,
      detailSeed.secretary_tenure_years,
      JSON.stringify(detailSeed.top_accomplishments),
      JSON.stringify(detailSeed.core_contributions),
      detailSeed.total_budget,
      detailSeed.utilized_funds,
      detailSeed.unutilized_surplus,
    ],
  });

  for (const [index, program] of detailSeed.programs.entries()) {
    await db.execute({
      sql: `
        INSERT INTO programs (
          agency_id,
          name,
          phase_label,
          completion_percent,
          sort_order
        ) VALUES (?, ?, ?, ?, ?)
      `,
      args: [agencyId, program.name, program.phase_label, program.completion_percent, index],
    });
  }

  for (const [index, newsItem] of detailSeed.news.entries()) {
    await db.execute({
      sql: `
        INSERT INTO agency_news (
          agency_id,
          title,
          source,
          category,
          published_at,
          summary,
          url,
          is_fact_check,
          sort_order
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        agencyId,
        newsItem.title,
        newsItem.source,
        newsItem.category,
        newsItem.published_at,
        newsItem.summary,
        newsItem.url,
        newsItem.is_fact_check,
        index,
      ],
    });
  }

  await db.execute({
    sql: `
      INSERT INTO coa_reports (
        agency_id,
        audit_opinion,
        exception_percent,
        resolved_percent,
        recommendations_total,
        notes,
        as_of_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    args: [
      agencyId,
      detailSeed.coaReport.audit_opinion,
      detailSeed.coaReport.exception_percent,
      detailSeed.coaReport.resolved_percent,
      detailSeed.coaReport.recommendations_total,
      detailSeed.coaReport.notes,
      detailSeed.coaReport.as_of_date,
    ],
  });

  for (const [index, procurement] of detailSeed.procurements.entries()) {
    await db.execute({
      sql: `
        INSERT INTO procurements (
          agency_id,
          project_name,
          contractor_name,
          approved_budget,
          expected_completion_date,
          status,
          sort_order
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        agencyId,
        procurement.project_name,
        procurement.contractor_name,
        procurement.approved_budget,
        procurement.expected_completion_date,
        procurement.status,
        index,
      ],
    });
  }
}

console.log(`Seeded ${agenciesToInsert.length} agencies and departments.`);
