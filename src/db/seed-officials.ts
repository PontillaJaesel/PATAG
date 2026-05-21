// src/db/seed-officials.ts
import { createClient } from "@libsql/client";

const db = createClient({
  url: "file:patag.sqlite",
});

const officialsToInsert = [
  // --- 2022 ELECTED SENATORS ---
  {
    name: "Risa Hontiveros",
    photo: "/officials/hontiveros.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2016",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "A prominent advocate for women's rights, public health, and social justice, serving as a key figure in the Senate minority bloc.",
    policies: JSON.stringify([
      { name: "Mental Health Act", url: "https://senate.gov.ph" },
      { name: "Safe Spaces Act", url: "https://senate.gov.ph" },
      { name: "Expanded Maternity Leave Law", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2016 – Present", role: "Senator of the Republic" },
      { period: "2004 – 2010", role: "Representative, Akbayan Party-list" },
      { period: "1994 – 2004", role: "Broadcast Journalist" }
    ]),
    public_records: JSON.stringify([
      { title: "SALN Transparency", value: "Routinely filed and disclosed." },
      { title: "Audit Status", value: "COA Report — Clear." }
    ]),
    news: "Consistently vocal on West Philippine Sea sovereignty and leading Senate probes on human trafficking and institutional corruption.",
    source_text: "Senate Official Records (Hontiveros)",
    source_url: "https://senate.gov.ph/senator/Risa-Hontiveros",
    promises: JSON.stringify([
      { title: "Pass the Safe Spaces Act (Bawal Bastos Law)", status: "Fulfilled", link_text: "Safe Spaces Act", link_url: "https://senate.gov.ph" },
      { title: "Expand Maternity Leave to 105 Days", status: "Fulfilled", link_text: "Expanded Maternity Leave", link_url: "https://senate.gov.ph" },
      { title: "Pass the SOGIE Equality Bill", status: "In Progress", link_text: "SOGIE Equality Act", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Francis Escudero",
    photo: "/officials/escudero.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2022",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "A veteran legislator and Senate leader known for his extensive legal expertise and focus on local government autonomy and education.",
    policies: JSON.stringify([
      { name: "Universal Access to Quality Tertiary Education Act", url: "https://senate.gov.ph" },
      { name: "Anti-Enforced Disappearance Act", url: "https://senate.gov.ph" },
      { name: "Tax Reform for Acceleration and Inclusion (Sponsor)", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2022 – Present", role: "Senator of the Republic" },
      { period: "2019 – 2022", role: "Governor of Sorsogon" },
      { period: "2007 – 2019", role: "Senator of the Republic" }
    ]),
    public_records: JSON.stringify([
      { title: "Legislative Output", value: "Authored over 100 enacted laws." },
      { title: "Audit Status", value: "COA Report — Clear." }
    ]),
    news: "Focusing on expediting priority economic legislation and reviewing the national budget for better resource allocation.",
    source_text: "Senate Official Records (Escudero)",
    source_url: "https://senate.gov.ph/senator/Francis-%22Chiz%22-G.-Escudero",
    promises: JSON.stringify([
      { title: "Free College Education in State Universities", status: "Fulfilled", link_text: "Free Tuition Law", link_url: "https://senate.gov.ph" },
      { title: "Amend the Local Government Code for Devolution", status: "In Progress", link_text: "LGU Devolution Bills", link_url: "https://senate.gov.ph" },
      { title: "Digitize Senate Proceedings", status: "In Progress", link_text: "Senate E-Governance", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Raffy Tulfo",
    photo: "/officials/rtulfo.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2022",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "A popular broadcast journalist turned legislator who champions the rights of Overseas Filipino Workers (OFWs) and the labor sector.",
    policies: JSON.stringify([
      { name: "Magna Carta of Filipino Seafarers", url: "https://senate.gov.ph" },
      { name: "Anti-Abuse of Pakyawan Workers Act", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2022 – Present", role: "Senator of the Republic" },
      { period: "2001 – 2022", role: "Broadcast Journalist & Public Service Host" }
    ]),
    public_records: JSON.stringify([
      { title: "Committee Chairmanship", value: "Migrant Workers; Energy." },
      { title: "Audit Status", value: "COA Report — Clear." }
    ]),
    news: "Leading high-profile investigations on abusive employment practices and energy sector failures.",
    source_text: "Senate Official Records (Tulfo)",
    source_url: "https://senate.gov.ph/senator/Raffy-T.-Tulfo",
    promises: JSON.stringify([
      { title: "Strengthen the Department of Migrant Workers", status: "Fulfilled", link_text: "DMW Budget Allocation", link_url: "https://senate.gov.ph" },
      { title: "Increase minimum wage for domestic workers", status: "In Progress", link_text: "Kasambahay Wage Hike", link_url: "https://senate.gov.ph" },
      { title: "End the Endo / Contractualization system", status: "Not Fulfilled", link_text: "Security of Tenure Bill", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Robin Padilla",
    photo: "/officials/padilla.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2022",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "An action star turned politician who secured the highest number of votes in the 2022 senatorial elections. He strongly advocates for constitutional reform and Muslim rights.",
    policies: JSON.stringify([
      { name: "Constitutional Reform", url: "https://senate.gov.ph" },
      { name: "Federalism Advocacy", url: "https://senate.gov.ph" },
      { name: "Equal Rights for Muslim Filipinos", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2022 – Present", role: "Senator of the Republic" },
      { period: "1980s – 2022", role: "Film & Television Actor" }
    ]),
    public_records: JSON.stringify([
      { title: "Committee Chairmanship", value: "Constitutional Amendments and Revision of Codes" }
    ]),
    news: "Continues to push for charter change and federalism as key solutions to economic and regional development.",
    source_text: "Senate Official Records (Padilla)",
    source_url: "https://senate.gov.ph/senator/Robinhood-C.-Padilla",
    promises: JSON.stringify([
      { title: "Shift to Federalism", status: "In Progress", link_text: "Federalism Initiatives", link_url: "https://senate.gov.ph" },
      { title: "Legalize Medical Marijuana", status: "In Progress", link_text: "Medical Cannabis Bill", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Loren Legarda",
    photo: "/officials/legarda.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2022",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "A veteran public servant and globally recognized environmentalist, serving her fourth term in the Senate. She focuses on climate change, culture, and the arts.",
    policies: JSON.stringify([
      { name: "Climate Change Act", url: "https://senate.gov.ph" },
      { name: "Ecological Solid Waste Management Act", url: "https://senate.gov.ph" },
      { name: "Anti-Domestic Violence Act", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2022 – Present", role: "Senator of the Republic" },
      { period: "2019 – 2022", role: "Representative, Antique Lone District" },
      { period: "1998 – 2019", role: "Senator of the Republic (Multiple Terms)" }
    ]),
    public_records: JSON.stringify([
      { title: "Global Recognition", value: "UNEP Laureate; UNFCCC National Adaptation Plan Champion." }
    ]),
    news: "Pushing for stricter implementation of environmental laws and disaster resilience funding.",
    source_text: "Senate Official Records (Legarda)",
    source_url: "https://senate.gov.ph/senator/Loren-Legarda",
    promises: JSON.stringify([
      { title: "Mainstream Climate Adaptation", status: "Fulfilled", link_text: "Climate Budget Tagging", link_url: "https://senate.gov.ph" },
      { title: "Promote Indigenous Culture", status: "In Progress", link_text: "Cultural Mapping Law", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Sherwin Gatchalian",
    photo: "/officials/gatchalian.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2016",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "A former local chief executive who transitioned to the Senate, known for his data-driven approach to legislation, particularly in education and energy.",
    policies: JSON.stringify([
      { name: "Murang Kuryente Act", url: "https://senate.gov.ph" },
      { name: "Energy Virtual One-Stop Shop Act", url: "https://senate.gov.ph" },
      { name: "Excellence in Teacher Education Act", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2016 – Present", role: "Senator of the Republic" },
      { period: "2013 – 2016", role: "Representative, Valenzuela 1st District" },
      { period: "2004 – 2013", role: "Mayor of Valenzuela City" }
    ]),
    public_records: JSON.stringify([
      { title: "Committee Chairmanship", value: "Basic Education, Arts and Culture; Ways and Means." }
    ]),
    news: "Advocating for education reforms to address learning poverty and investigating energy grid reliability.",
    source_text: "Senate Official Records (Gatchalian)",
    source_url: "https://senate.gov.ph/senator/Win-Gatchalian",
    promises: JSON.stringify([
      { title: "Lower Electricity Rates", status: "In Progress", link_text: "Energy Sector Reforms", link_url: "https://senate.gov.ph" },
      { title: "Strengthen K-12 Curriculum", status: "In Progress", link_text: "EDCOM II", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Mark Villar",
    photo: "/officials/mvillar.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2022",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "Former Public Works Secretary who leverages his executive experience to push for infrastructure development and economic zoning.",
    policies: JSON.stringify([
      { name: "Build, Build, Build Program Initiatives", url: "https://senate.gov.ph" },
      { name: "Anti-Financial Account Scamming Act", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2022 – Present", role: "Senator of the Republic" },
      { period: "2016 – 2021", role: "Secretary, Department of Public Works and Highways" },
      { period: "2010 – 2016", role: "Representative, Las Piñas" }
    ]),
    public_records: JSON.stringify([
      { title: "Infrastructure Milestone", value: "Oversaw the completion of major bypass roads and bridges as DPWH Secretary." }
    ]),
    news: "Focused on passing legislation to combat cybercrime and financial fraud.",
    source_text: "Senate Official Records (Villar)",
    source_url: "https://senate.gov.ph/senator/Mark-A.-Villar",
    promises: JSON.stringify([
      { title: "Continue Infrastructure Development", status: "In Progress", link_text: "Infrastructure Bills", link_url: "https://senate.gov.ph" },
      { title: "Protect Digital Consumers", status: "In Progress", link_text: "AFASA Bill", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Alan Peter Cayetano",
    photo: "public/officials/acayetano.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2022",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "A seasoned politician with extensive experience spanning both legislative houses and the executive branch, focusing on foreign affairs and direct social services.",
    policies: JSON.stringify([
      { name: "Bayanihan to Heal as One Act (Sponsor)", url: "https://senate.gov.ph" },
      { name: "10K Ayuda Bill Advocacy", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2022 – Present", role: "Senator of the Republic" },
      { period: "2019 – 2020", role: "Speaker of the House of Representatives" },
      { period: "2017 – 2018", role: "Secretary of Foreign Affairs" }
    ]),
    public_records: JSON.stringify([
      { title: "Legislative Output", value: "Consistently authored major economic and health crisis response bills." }
    ]),
    news: "Continuing his push for targeted financial assistance for marginalized sectors and independent foreign policy oversight.",
    source_text: "Senate Official Records (Cayetano)",
    source_url: "https://senate.gov.ph/senator/Alan-Peter-S.-Cayetano",
    promises: JSON.stringify([
      { title: "Provide Direct Cash Assistance (10K Ayuda)", status: "In Progress", link_text: "Direct Stimulus Bills", link_url: "https://senate.gov.ph" },
      { title: "Strengthen Foreign Relations", status: "Fulfilled", link_text: "Diplomatic Engagements", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Juan Miguel Zubiri",
    photo: "/officials/zubiri.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2016",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "A consensus-builder and former Senate President, known for passing major economic and agricultural legislation through bipartisan support.",
    policies: JSON.stringify([
      { name: "Ease of Doing Business Act", url: "https://senate.gov.ph" },
      { name: "Philippine Cooperative Code", url: "https://senate.gov.ph" },
      { name: "Renewable Energy Act", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2016 – Present", role: "Senator of the Republic" },
      { period: "2022 – 2024", role: "Senate President" },
      { period: "1998 – 2007", role: "Representative, Bukidnon 3rd District" }
    ]),
    public_records: JSON.stringify([
      { title: "Leadership Roles", value: "Senate President; Senate Majority Leader." }
    ]),
    news: "Focused on passing the legislated wage hike to help workers cope with inflation.",
    source_text: "Senate Official Records (Zubiri)",
    source_url: "https://senate.gov.ph/senator/Juan-Miguel-F.-Zubiri",
    promises: JSON.stringify([
      { title: "Across-the-board Wage Increase", status: "In Progress", link_text: "P100 Wage Hike Bill", link_url: "https://senate.gov.ph" },
      { title: "Modernize Agriculture", status: "In Progress", link_text: "Agri-Modernization Bills", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Joel Villanueva",
    photo: "/officials/villanueva.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2016",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "Known as 'Tesdaman', he is a staunch advocate for employment generation, workers' rights, and technical-vocational education.",
    policies: JSON.stringify([
      { name: "Telecommuting Act", url: "https://senate.gov.ph" },
      { name: "First Time Jobseekers Assistance Act", url: "https://senate.gov.ph" },
      { name: "Tulong Trabaho Act", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2016 – Present", role: "Senator of the Republic" },
      { period: "2010 – 2016", role: "Director General, TESDA" },
      { period: "2001 – 2010", role: "Representative, CIBAC Party-list" }
    ]),
    public_records: JSON.stringify([
      { title: "Committee Chairmanship", value: "Labor, Employment and Human Resources Development." }
    ]),
    news: "Pushing for stronger protections for freelance workers and institutionalizing flexible work arrangements.",
    source_text: "Senate Official Records (Villanueva)",
    source_url: "https://senate.gov.ph/senator/Joel-Villanueva",
    promises: JSON.stringify([
      { title: "Protect Freelance Workers", status: "In Progress", link_text: "Freelance Workers Protection Bill", link_url: "https://senate.gov.ph" },
      { title: "Expand Tech-Voc Scholarships", status: "Fulfilled", link_text: "Tulong Trabaho Implementation", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "JV Ejercito",
    photo: "/officials/ejercito.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2022",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "The principal author of the Universal Health Care Law and a major proponent of railway and transportation infrastructure.",
    policies: JSON.stringify([
      { name: "Universal Health Care Act", url: "https://senate.gov.ph" },
      { name: "Department of Human Settlements and Urban Development Act", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2022 – Present", role: "Senator of the Republic" },
      { period: "2013 – 2019", role: "Senator of the Republic" },
      { period: "2001 – 2010", role: "Mayor of San Juan City" }
    ]),
    public_records: JSON.stringify([
      { title: "Key Legislation", value: "Principal Sponsor of the UHC Law." }
    ]),
    news: "Advocating for the expedited construction of the Philippine National Railways modernization projects.",
    source_text: "Senate Official Records (Ejercito)",
    source_url: "https://senate.gov.ph/senator/Joseph-Victor-%22JV%22-G.-Ejercito",
    promises: JSON.stringify([
      { title: "Fully Implement UHC", status: "In Progress", link_text: "UHC Funding and Oversight", link_url: "https://senate.gov.ph" },
      { title: "Develop National Railways", status: "In Progress", link_text: "Railway Modernization Advocacy", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Jinggoy Estrada",
    photo: "/officials/estrada.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2022",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "A returning senator and former local chief executive focusing on labor laws, national defense, and local government empowerment.",
    policies: JSON.stringify([
      { name: "Kasambahay Law", url: "https://senate.gov.ph" },
      { name: "PESO Act amendments", url: "https://senate.gov.ph" },
      { name: "Anti-Age Discrimination in Employment Act", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2022 – Present", role: "Senator of the Republic" },
      { period: "2004 – 2016", role: "Senator of the Republic" },
      { period: "1992 – 2001", role: "Mayor of San Juan City" }
    ]),
    public_records: JSON.stringify([
      { title: "Committee Chairmanship", value: "National Defense and Security, Peace, Unification and Reconciliation." }
    ]),
    news: "Leading hearings on military pension reforms and modernization of the Armed Forces.",
    source_text: "Senate Official Records (Estrada)",
    source_url: "https://senate.gov.ph/senator/Jinggoy-Ejercito-Estrada",
    promises: JSON.stringify([
      { title: "Reform Military Pensions", status: "In Progress", link_text: "MUP Pension Bill", link_url: "https://senate.gov.ph" },
      { title: "Enhance Labor Protections", status: "In Progress", link_text: "Labor Code Amendments", link_url: "https://senate.gov.ph" }
    ])
  },

  // --- 2025 ELECTED SENATORS ---
  {
    name: "Bong Go",
    photo: "/officials/go.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2025",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "Topped the 2025 Senatorial Elections. He continues his deep focus on grassroots healthcare access through the Malasakit Centers and sports development.",
    policies: JSON.stringify([
      { name: "Malasakit Centers Act", url: "https://senate.gov.ph" },
      { name: "National Academy of Sports Act", url: "https://senate.gov.ph" },
      { name: "Department of Migrant Workers Act (Co-author)", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2019 – Present", role: "Senator of the Republic" },
      { period: "2016 – 2018", role: "Special Assistant to the President" }
    ]),
    public_records: JSON.stringify([
      { title: "Healthcare Expansion", value: "Institutionalized over 150 Malasakit Centers nationwide." }
    ]),
    news: "Secured the highest mandate in the 2025 elections and is actively pushing for the establishment of Super Health Centers in rural areas.",
    source_text: "Senate Official Records (Go)",
    source_url: "https://senate.gov.ph/senator/Christopher-Lawrence-T.-Go",
    promises: JSON.stringify([
      { title: "Expand Super Health Centers", status: "In Progress", link_text: "Health Infrastructure Funding", link_url: "https://senate.gov.ph" },
      { title: "Increase Sports Funding", status: "Fulfilled", link_text: "National Sports Academy", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Bam Aquino",
    photo: "/officials/aquino.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2025",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "A returning senator who championed free college education. He focuses on youth empowerment, start-ups, and economic recovery.",
    policies: JSON.stringify([
      { name: "Free Tuition Law (Universal Access to Quality Tertiary Education)", url: "https://senate.gov.ph" },
      { name: "Go Negosyo Act", url: "https://senate.gov.ph" },
      { name: "Innovative Startup Act", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2025 – Present", role: "Senator of the Republic" },
      { period: "2013 – 2019", role: "Senator of the Republic" },
      { period: "2003 – 2006", role: "Chairman, National Youth Commission" }
    ]),
    public_records: JSON.stringify([
      { title: "Legislative Output", value: "Authored 35 enacted laws during his first term." }
    ]),
    news: "Successfully returned to the Senate in 2025, prioritizing legislation to support micro-businesses recovering from economic downturns.",
    source_text: "Senate Official Records (Aquino)",
    source_url: "https://senate.gov.ph/senator/Paolo-Benigno-%22Bam%22-Aquino-IV",
    promises: JSON.stringify([
      { title: "Support Micro and Small Enterprises", status: "In Progress", link_text: "MSME Relief Policies", link_url: "https://senate.gov.ph" },
      { title: "Expand Digital Infrastructure", status: "In Progress", link_text: "Better Internet Act", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Ronald dela Rosa",
    photo: "/officials/delarosa.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2025",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "Former Chief of the Philippine National Police, re-elected in 2025. He leads the Senate's efforts on public order, anti-drug policies, and law enforcement modernization.",
    policies: JSON.stringify([
      { name: "BFP Modernization Act", url: "https://senate.gov.ph" },
      { name: "Anti-Terrorism Act (Co-author)", url: "https://senate.gov.ph" },
      { name: "ROTC Institutionalization (Advocate)", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2019 – Present", role: "Senator of the Republic" },
      { period: "2016 – 2018", role: "Chief, Philippine National Police" },
      { period: "2018", role: "Director General, Bureau of Corrections" }
    ]),
    public_records: JSON.stringify([
      { title: "Committee Chairmanship", value: "Public Order and Dangerous Drugs." }
    ]),
    news: "Re-elected with a strong mandate in 2025; currently pushing for the mandatory ROTC program in colleges.",
    source_text: "Senate Official Records (Dela Rosa)",
    source_url: "https://senate.gov.ph/senator/Ronald-%22Bato%22-M.-dela-Rosa",
    promises: JSON.stringify([
      { title: "Mandatory ROTC", status: "In Progress", link_text: "ROTC Bill", link_url: "https://senate.gov.ph" },
      { title: "Modernize Law Enforcement", status: "Fulfilled", link_text: "BFP Modernization", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Erwin Tulfo",
    photo: "/officials/etulfo.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2025",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "Newly elected in 2025, transitioning from his role in the House of Representatives and as DSWD Secretary to focus on comprehensive social welfare legislation.",
    policies: JSON.stringify([
      { name: "Expanded Social Pension for Indigent Senior Citizens (Advocacy)", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2025 – Present", role: "Senator of the Republic" },
      { period: "2023 – 2025", role: "Representative, ACT-CIS Party-list" },
      { period: "2022", role: "Secretary, Department of Social Welfare and Development" }
    ]),
    public_records: JSON.stringify([
      { title: "Social Welfare Initiatives", value: "Spearheaded digitizing DSWD aid distribution." }
    ]),
    news: "Secured the 4th spot in the 2025 senatorial elections and is prioritizing bills that simplify public access to government emergency assistance.",
    source_text: "Senate Official Records (Tulfo)",
    source_url: "https://senate.gov.ph/senator/Erwin-T.-Tulfo",
    promises: JSON.stringify([
      { title: "Streamline DSWD Assistance", status: "In Progress", link_text: "AICS Digitalization", link_url: "https://senate.gov.ph" },
      { title: "Protect Media Workers", status: "In Progress", link_text: "Media Workers Welfare Bill", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Kiko Pangilinan",
    photo: "/officials/pangilinan.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2025",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "Returning to the Senate in 2025, he is the foremost advocate for agriculture, food security, and the welfare of Filipino farmers and fisherfolk.",
    policies: JSON.stringify([
      { name: "Sagip Saka Act", url: "https://senate.gov.ph" },
      { name: "Juvenile Justice and Welfare Act", url: "https://senate.gov.ph" },
      { name: "Free Irrigation Service Act", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2025 – Present", role: "Senator of the Republic" },
      { period: "2001 – 2013, 2016 – 2022", role: "Senator of the Republic" },
      { period: "2014 – 2015", role: "Presidential Assistant for Food Security" }
    ]),
    public_records: JSON.stringify([
      { title: "Agricultural Reforms", value: "Principal author of laws boosting local farmer enterprises." }
    ]),
    news: "Successfully returned to the Senate in 2025, vowing to tackle the persistent issues of food inflation and smuggling.",
    source_text: "Senate Official Records (Pangilinan)",
    source_url: "https://senate.gov.ph/senator/Francis-%22Kiko%22-Pangilinan",
    promises: JSON.stringify([
      { title: "Combat Agricultural Smuggling", status: "In Progress", link_text: "Anti-Agricultural Smuggling Amendments", link_url: "https://senate.gov.ph" },
      { title: "Increase Direct Purchases from Farmers", status: "In Progress", link_text: "Sagip Saka Expansion", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Rodante Marcoleta",
    photo: "/officials/marcoleta.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2025",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "A highly vocal legislator who successfully transitioned from the House of Representatives to the Senate in 2025, known for his conservative stances and strict constitutional oversight.",
    policies: JSON.stringify([
      { name: "Franchise Regulations", url: "https://senate.gov.ph" },
      { name: "Public Utility Amendments (Co-author)", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2025 – Present", role: "Senator of the Republic" },
      { period: "2016 – 2025", role: "Representative, SAGIP Party-list" },
      { period: "2004 – 2013", role: "Representative, Alagad Party-list" }
    ]),
    public_records: JSON.stringify([
      { title: "House Leadership", value: "Served as House Deputy Speaker." }
    ]),
    news: "Elected as a neophyte senator in 2025, he has immediately begun pushing for deeper inquiries into large corporate tax compliance and media franchises.",
    source_text: "Senate Official Records (Marcoleta)",
    source_url: "https://senate.gov.ph/senator/Rodante-D.-Marcoleta",
    promises: JSON.stringify([
      { title: "Strict Franchise Oversight", status: "In Progress", link_text: "Franchise Compliance Checks", link_url: "https://senate.gov.ph" },
      { title: "Lower Cost of Medicine", status: "In Progress", link_text: "SAGIP Health Advocacies", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Panfilo Lacson",
    photo: "/officials/lacson.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2025",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "A fiercely independent returning senator (2025) celebrated as the 'Watchdog of the National Budget' and a staunch anti-corruption crusader.",
    policies: JSON.stringify([
      { name: "Anti-Terrorism Act", url: "https://senate.gov.ph" },
      { name: "National ID System (PhilSys Act)", url: "https://senate.gov.ph" },
      { name: "Anti-Hazing Law", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2025 – Present", role: "Senator of the Republic" },
      { period: "2001 – 2013, 2016 – 2022", role: "Senator of the Republic" },
      { period: "1999 – 2001", role: "Chief, Philippine National Police" }
    ]),
    public_records: JSON.stringify([
      { title: "Budget Oversight", value: "Consistently flagged and removed billions in pork barrel funds." }
    ]),
    news: "Back in the Senate after the 2025 elections, immediately resuming his rigorous scrutiny of the National Expenditure Program.",
    source_text: "Senate Official Records (Lacson)",
    source_url: "https://senate.gov.ph/senator/Panfilo-%22Ping%22-M.-Lacson",
    promises: JSON.stringify([
      { title: "Eliminate Pork Barrel", status: "In Progress", link_text: "Budget Scrutiny", link_url: "https://senate.gov.ph" },
      { title: "Strengthen National Defense", status: "In Progress", link_text: "Defense Modernization Support", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Tito Sotto",
    photo: "/officials/sotto.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2025",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "A former Senate President who returned in 2025. He is a conservative pillar in the Senate, focusing on family values, anti-illegal drugs, and procedural efficiency.",
    policies: JSON.stringify([
      { name: "Comprehensive Dangerous Drugs Act", url: "https://senate.gov.ph" },
      { name: "Bayanihan Acts (Co-author)", url: "https://senate.gov.ph" },
      { name: "Cybercrime Prevention Act", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2025 – Present", role: "Senator of the Republic" },
      { period: "1992 – 2004, 2010 – 2022", role: "Senator of the Republic" },
      { period: "2018 – 2022", role: "Senate President" }
    ]),
    public_records: JSON.stringify([
      { title: "Leadership Roles", value: "Former Senate President and Majority Leader." }
    ]),
    news: "Returned to the upper chamber in 2025, focusing on strengthening the penal system and combating illegal drugs.",
    source_text: "Senate Official Records (Sotto)",
    source_url: "https://senate.gov.ph/senator/Vicente-C.-Sotto-III",
    promises: JSON.stringify([
      { title: "Strengthen Anti-Drug Laws", status: "In Progress", link_text: "Dangerous Drugs Amendments", link_url: "https://senate.gov.ph" },
      { title: "Protect Family Values", status: "In Progress", link_text: "Conservative Legislative Agenda", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Pia Cayetano",
    photo: "/officials/pcayetano.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2025",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "Re-elected in 2025, she is a triathlete and lawyer who aggressively champions women's health, education, and sustainable development.",
    policies: JSON.stringify([
      { name: "Reproductive Health Law", url: "https://senate.gov.ph" },
      { name: "CREATE Act", url: "https://senate.gov.ph" },
      { name: "Sin Tax Reform Law", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2019 – Present", role: "Senator of the Republic" },
      { period: "2016 – 2019", role: "Representative, Taguig 2nd District" },
      { period: "2004 – 2016", role: "Senator of the Republic" }
    ]),
    public_records: JSON.stringify([
      { title: "Tax and Health Output", value: "Key sponsor of major corporate tax reforms and public health funding." }
    ]),
    news: "Re-elected in 2025, she continues to defend women's rights and is advocating for a more robust maternal health infrastructure.",
    source_text: "Senate Official Records (Cayetano)",
    source_url: "https://senate.gov.ph/senator/Pia-S.-Cayetano",
    promises: JSON.stringify([
      { title: "Defend the RH Law", status: "Fulfilled", link_text: "RH Law Implementation", link_url: "https://senate.gov.ph" },
      { title: "Fund Public Health via Sin Taxes", status: "Fulfilled", link_text: "Sin Tax Allocations", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Camille Villar",
    photo: "/officials/cvillar.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2025",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "Newly elected in 2025, she brings a strong business background to the Senate, focusing on entrepreneurship, post-pandemic economic recovery, and digital innovation.",
    policies: JSON.stringify([
      { name: "Entrepreneurship Support (Advocacy)", url: "https://senate.gov.ph" },
      { name: "Digital Economy Taxation (Proposed)", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2025 – Present", role: "Senator of the Republic" },
      { period: "2019 – 2025", role: "Representative, Las Piñas Lone District" }
    ]),
    public_records: JSON.stringify([
      { title: "House Leadership", value: "Served as House Deputy Speaker." }
    ]),
    news: "Secured her first Senate term in the 2025 elections, pushing to cut red tape for local tech start-ups and SMEs.",
    source_text: "Senate Official Records (Villar)",
    source_url: "https://senate.gov.ph/senator/Camille-A.-Villar",
    promises: JSON.stringify([
      { title: "Support SMEs", status: "In Progress", link_text: "SME Tax Relief", link_url: "https://senate.gov.ph" },
      { title: "Modernize Digital Commerce", status: "In Progress", link_text: "E-Commerce Regulation", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Lito Lapid",
    photo: "/officials/lapid.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2025",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "Re-elected in 2025, this action star turned public servant advocates fiercely for the marginalized, focusing on free legal assistance and accessibility.",
    policies: JSON.stringify([
      { name: "Free Legal Assistance Act", url: "https://senate.gov.ph" },
      { name: "Lapid Law (Tourism)", url: "https://senate.gov.ph" },
      { name: "Meat Labeling Act", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2019 – Present", role: "Senator of the Republic" },
      { period: "2004 – 2016", role: "Senator of the Republic" },
      { period: "1995 – 2004", role: "Governor of Pampanga" }
    ]),
    public_records: JSON.stringify([
      { title: "Pro-Poor Legislation", value: "Consistent focus on laws understandable and accessible to the common Filipino." }
    ]),
    news: "Re-elected in 2025, pushing for better disaster relief protocols for indigenous and rural communities.",
    source_text: "Senate Official Records (Lapid)",
    source_url: "https://senate.gov.ph/senator/Manuel-%22Lito%22-M.-Lapid",
    promises: JSON.stringify([
      { title: "Expand Free Legal Aid", status: "In Progress", link_text: "Legal Aid Enhancements", link_url: "https://senate.gov.ph" },
      { title: "Promote Local Tourism", status: "Fulfilled", link_text: "Tourism Bills", link_url: "https://senate.gov.ph" }
    ])
  },
  {
    name: "Imee Marcos",
    photo: "/officials/marcos.png",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2025",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "Re-elected in 2025, she heavily focuses on agricultural subsidies, local government empowerment, and social services direct to barangays.",
    policies: JSON.stringify([
      { name: "Kadiwa ni Ani at Kita Act", url: "https://senate.gov.ph" },
      { name: "Sangguniang Kabataan Reform Act Amendments", url: "https://senate.gov.ph" },
      { name: "Agricultural Smuggling Penalties", url: "https://senate.gov.ph" }
    ]),
    career_history: JSON.stringify([
      { period: "2019 – Present", role: "Senator of the Republic" },
      { period: "2010 – 2019", role: "Governor of Ilocos Norte" },
      { period: "1998 – 2007", role: "Representative, Ilocos Norte 2nd District" }
    ]),
    public_records: JSON.stringify([
      { title: "Committee Chairmanship", value: "Electoral Reforms; Cooperatives." }
    ]),
    news: "Re-elected in the 2025 midterms, continuously pushing for the expansion of the Kadiwa store program and stronger electoral reform laws.",
    source_text: "Senate Official Records (Marcos)",
    source_url: "https://senate.gov.ph/senator/Imee-R.-Marcos",
    promises: JSON.stringify([
      { title: "Lower Food Prices", status: "In Progress", link_text: "Kadiwa Expansion", link_url: "https://senate.gov.ph" },
      { title: "Protect Farmers", status: "In Progress", link_text: "Anti-Smuggling Stances", link_url: "https://senate.gov.ph" }
    ])
  }
];

async function seedOfficials() {
  console.log("Emptying old officials table...");
  await db.execute("DROP TABLE IF EXISTS officials");

  console.log("Creating fresh officials table with clickable source links...");
  
  await db.execute(`
    CREATE TABLE officials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      department TEXT NOT NULL,
      date_assumed TEXT NOT NULL,
      status TEXT NOT NULL,
      appointed_by TEXT NOT NULL,
      branch TEXT NOT NULL,
      location TEXT NOT NULL,
      bio TEXT NOT NULL,
      policies TEXT NOT NULL,
      career_history TEXT NOT NULL,
      public_records TEXT NOT NULL,
      news TEXT NOT NULL,
      source_text TEXT NOT NULL,
      source_url TEXT NOT NULL,
      promises TEXT NOT NULL,
      photo TEXT
    )
  `);

  console.log(`Inserting ${officialsToInsert.length} senators into the database...`);

  for (const o of officialsToInsert) {
    await db.execute({
      sql: `
        INSERT INTO officials (
          name, title, department, date_assumed, status, appointed_by, 
          branch, location, bio, policies, career_history, public_records, 
          news, source_text, source_url, promises, photo
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        o.name, o.title, o.department, o.date_assumed, o.status, o.appointed_by,
        o.branch, o.location, o.bio, o.policies, o.career_history, o.public_records,
        o.news, o.source_text, o.source_url, o.promises, o.photo
      ]
    });
  }

  console.log("✅ Success! Your officials database is now seeded with fully clickable policy and promise links.");
}

seedOfficials();