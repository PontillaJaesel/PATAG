// src/db/seed-officials.ts
import { createClient } from "@libsql/client";

const db = createClient({
  url: "file:patag.sqlite",
});

const officialsToInsert = [
  // --- 2022 ELECTED SENATORS ---
  {
    name: "Risa Hontiveros",
    photo: "/officials/hontiveros.png", // Insert your image link here later!
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2016",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "A prominent advocate for women's rights, public health, and social justice, serving as a key figure in the Senate minority bloc.",
    policies: JSON.stringify(["Mental Health Act", "Safe Spaces Act", "Expanded Maternity Leave Law"]),
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
    sources: "Senate Official Records, COMELEC.",
    promises: JSON.stringify([
      { title: "Pass the Safe Spaces Act (Bawal Bastos Law)", status: "Fulfilled", link: "Safe Spaces Act" },
      { title: "Expand Maternity Leave to 105 Days", status: "Fulfilled", link: "Expanded Maternity Leave" },
      { title: "Pass the SOGIE Equality Bill", status: "In Progress", link: "SOGIE Equality Act" }
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
    policies: JSON.stringify(["Universal Access to Quality Tertiary Education Act", "Anti-Enforced Disappearance Act", "Tax Reform for Acceleration and Inclusion (Sponsor)"]),
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
    sources: "Senate Official Records, Sorsogon PIO.",
    promises: JSON.stringify([
      { title: "Free College Education in State Universities", status: "Fulfilled", link: "Free Tuition Law" },
      { title: "Amend the Local Government Code for Devolution", status: "In Progress", link: "LGU Devolution Bills" },
      { title: "Digitize Senate Proceedings", status: "In Progress", link: "Senate E-Governance" }
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
    policies: JSON.stringify(["Magna Carta of Filipino Seafarers", "Anti-Abuse of Pakyawan Workers Act"]),
    career_history: JSON.stringify([
      { period: "2022 – Present", role: "Senator of the Republic" },
      { period: "2001 – 2022", role: "Broadcast Journalist & Public Service Host" }
    ]),
    public_records: JSON.stringify([
      { title: "Committee Chairmanship", value: "Migrant Workers; Energy." },
      { title: "Audit Status", value: "COA Report — Clear." }
    ]),
    news: "Leading high-profile investigations on abusive employment practices and energy sector failures.",
    sources: "Senate Official Records, Media Archival Reports.",
    promises: JSON.stringify([
      { title: "Strengthen the Department of Migrant Workers", status: "Fulfilled", link: "DMW Budget Allocation" },
      { title: "Increase minimum wage for domestic workers", status: "In Progress", link: "Kasambahay Wage Hike" },
      { title: "End the Endo / Contractualization system", status: "Not Fulfilled", link: "Security of Tenure Bill" }
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
    policies: JSON.stringify(["Constitutional Reform", "Federalism Advocacy", "Equal Rights for Muslim Filipinos"]),
    career_history: JSON.stringify([
      { period: "2022 – Present", role: "Senator of the Republic" },
      { period: "1980s – 2022", role: "Film & Television Actor" }
    ]),
    public_records: JSON.stringify([
      { title: "Committee Chairmanship", value: "Constitutional Amendments and Revision of Codes" }
    ]),
    news: "Continues to push for charter change and federalism as key solutions to economic and regional development.",
    sources: "Senate Official Records",
    promises: JSON.stringify([
      { title: "Shift to Federalism", status: "In Progress", link: "Federalism Initiatives" },
      { title: "Legalize Medical Marijuana", status: "In Progress", link: "Medical Cannabis Bill" }
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
    policies: JSON.stringify(["Climate Change Act", "Ecological Solid Waste Management Act", "Anti-Domestic Violence Act"]),
    career_history: JSON.stringify([
      { period: "2022 – Present", role: "Senator of the Republic" },
      { period: "2019 – 2022", role: "Representative, Antique Lone District" },
      { period: "1998 – 2019", role: "Senator of the Republic (Multiple Terms)" }
    ]),
    public_records: JSON.stringify([
      { title: "Global Recognition", value: "UNEP Laureate; UNFCCC National Adaptation Plan Champion." }
    ]),
    news: "Pushing for stricter implementation of environmental laws and disaster resilience funding.",
    sources: "Senate Official Records, UNEP",
    promises: JSON.stringify([
      { title: "Mainstream Climate Adaptation", status: "Fulfilled", link: "Climate Budget Tagging" },
      { title: "Promote Indigenous Culture", status: "In Progress", link: "Cultural Mapping Law" }
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
    policies: JSON.stringify(["Murang Kuryente Act", "Energy Virtual One-Stop Shop Act", "Excellence in Teacher Education Act"]),
    career_history: JSON.stringify([
      { period: "2016 – Present", role: "Senator of the Republic" },
      { period: "2013 – 2016", role: "Representative, Valenzuela 1st District" },
      { period: "2004 – 2013", role: "Mayor of Valenzuela City" }
    ]),
    public_records: JSON.stringify([
      { title: "Committee Chairmanship", value: "Basic Education, Arts and Culture; Ways and Means." }
    ]),
    news: "Advocating for education reforms to address learning poverty and investigating energy grid reliability.",
    sources: "Senate Official Records",
    promises: JSON.stringify([
      { title: "Lower Electricity Rates", status: "In Progress", link: "Energy Sector Reforms" },
      { title: "Strengthen K-12 Curriculum", status: "In Progress", link: "EDCOM II" }
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
    policies: JSON.stringify(["Build, Build, Build Program Initiatives", "Anti-Financial Account Scamming Act"]),
    career_history: JSON.stringify([
      { period: "2022 – Present", role: "Senator of the Republic" },
      { period: "2016 – 2021", role: "Secretary, Department of Public Works and Highways" },
      { period: "2010 – 2016", role: "Representative, Las Piñas" }
    ]),
    public_records: JSON.stringify([
      { title: "Infrastructure Milestone", value: "Oversaw the completion of major bypass roads and bridges as DPWH Secretary." }
    ]),
    news: "Focused on passing legislation to combat cybercrime and financial fraud.",
    sources: "Senate Official Records, DPWH Archives",
    promises: JSON.stringify([
      { title: "Continue Infrastructure Development", status: "In Progress", link: "Infrastructure Bills" },
      { title: "Protect Digital Consumers", status: "In Progress", link: "AFASA Bill" }
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
    policies: JSON.stringify(["Bayanihan to Heal as One Act (Sponsor)", "10K Ayuda Bill Advocacy"]),
    career_history: JSON.stringify([
      { period: "2022 – Present", role: "Senator of the Republic" },
      { period: "2019 – 2020", role: "Speaker of the House of Representatives" },
      { period: "2017 – 2018", role: "Secretary of Foreign Affairs" }
    ]),
    public_records: JSON.stringify([
      { title: "Legislative Output", value: "Consistently authored major economic and health crisis response bills." }
    ]),
    news: "Continuing his push for targeted financial assistance for marginalized sectors and independent foreign policy oversight.",
    sources: "Senate Official Records",
    promises: JSON.stringify([
      { title: "Provide Direct Cash Assistance (10K Ayuda)", status: "In Progress", link: "Direct Stimulus Bills" },
      { title: "Strengthen Foreign Relations", status: "Fulfilled", link: "Diplomatic Engagements" }
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
    policies: JSON.stringify(["Ease of Doing Business Act", "Philippine Cooperative Code", "Renewable Energy Act"]),
    career_history: JSON.stringify([
      { period: "2016 – Present", role: "Senator of the Republic" },
      { period: "2022 – 2024", role: "Senate President" },
      { period: "1998 – 2007", role: "Representative, Bukidnon 3rd District" }
    ]),
    public_records: JSON.stringify([
      { title: "Leadership Roles", value: "Senate President; Senate Majority Leader." }
    ]),
    news: "Focused on passing the legislated wage hike to help workers cope with inflation.",
    sources: "Senate Official Records",
    promises: JSON.stringify([
      { title: "Across-the-board Wage Increase", status: "In Progress", link: "P100 Wage Hike Bill" },
      { title: "Modernize Agriculture", status: "In Progress", link: "Agri-Modernization Bills" }
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
    policies: JSON.stringify(["Telecommuting Act", "First Time Jobseekers Assistance Act", "Tulong Trabaho Act"]),
    career_history: JSON.stringify([
      { period: "2016 – Present", role: "Senator of the Republic" },
      { period: "2010 – 2016", role: "Director General, TESDA" },
      { period: "2001 – 2010", role: "Representative, CIBAC Party-list" }
    ]),
    public_records: JSON.stringify([
      { title: "Committee Chairmanship", value: "Labor, Employment and Human Resources Development." }
    ]),
    news: "Pushing for stronger protections for freelance workers and institutionalizing flexible work arrangements.",
    sources: "Senate Official Records, TESDA Archives",
    promises: JSON.stringify([
      { title: "Protect Freelance Workers", status: "In Progress", link: "Freelance Workers Protection Bill" },
      { title: "Expand Tech-Voc Scholarships", status: "Fulfilled", link: "Tulong Trabaho Implementation" }
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
    policies: JSON.stringify(["Universal Health Care Act", "Department of Human Settlements and Urban Development Act"]),
    career_history: JSON.stringify([
      { period: "2022 – Present", role: "Senator of the Republic" },
      { period: "2013 – 2019", role: "Senator of the Republic" },
      { period: "2001 – 2010", role: "Mayor of San Juan City" }
    ]),
    public_records: JSON.stringify([
      { title: "Key Legislation", value: "Principal Sponsor of the UHC Law." }
    ]),
    news: "Advocating for the expedited construction of the Philippine National Railways modernization projects.",
    sources: "Senate Official Records",
    promises: JSON.stringify([
      { title: "Fully Implement UHC", status: "In Progress", link: "UHC Funding and Oversight" },
      { title: "Develop National Railways", status: "In Progress", link: "Railway Modernization Advocacy" }
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
    policies: JSON.stringify(["Kasambahay Law", "PESO Act amendments", "Anti-Age Discrimination in Employment Act"]),
    career_history: JSON.stringify([
      { period: "2022 – Present", role: "Senator of the Republic" },
      { period: "2004 – 2016", role: "Senator of the Republic" },
      { period: "1992 – 2001", role: "Mayor of San Juan City" }
    ]),
    public_records: JSON.stringify([
      { title: "Committee Chairmanship", value: "National Defense and Security, Peace, Unification and Reconciliation." }
    ]),
    news: "Leading hearings on military pension reforms and modernization of the Armed Forces.",
    sources: "Senate Official Records",
    promises: JSON.stringify([
      { title: "Reform Military Pensions", status: "In Progress", link: "MUP Pension Bill" },
      { title: "Enhance Labor Protections", status: "In Progress", link: "Labor Code Amendments" }
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
    policies: JSON.stringify(["Malasakit Centers Act", "National Academy of Sports Act", "Department of Migrant Workers Act (Co-author)"]),
    career_history: JSON.stringify([
      { period: "2019 – Present", role: "Senator of the Republic" },
      { period: "2016 – 2018", role: "Special Assistant to the President" }
    ]),
    public_records: JSON.stringify([
      { title: "Healthcare Expansion", value: "Institutionalized over 150 Malasakit Centers nationwide." }
    ]),
    news: "Secured the highest mandate in the 2025 elections and is actively pushing for the establishment of Super Health Centers in rural areas.",
    sources: "Senate Official Records, COMELEC 2025 Results",
    promises: JSON.stringify([
      { title: "Expand Super Health Centers", status: "In Progress", link: "Health Infrastructure Funding" },
      { title: "Increase Sports Funding", status: "Fulfilled", link: "National Sports Academy" }
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
    policies: JSON.stringify(["Free Tuition Law (Universal Access to Quality Tertiary Education)", "Go Negosyo Act", "Innovative Startup Act"]),
    career_history: JSON.stringify([
      { period: "2025 – Present", role: "Senator of the Republic" },
      { period: "2013 – 2019", role: "Senator of the Republic" },
      { period: "2003 – 2006", role: "Chairman, National Youth Commission" }
    ]),
    public_records: JSON.stringify([
      { title: "Legislative Output", value: "Authored 35 enacted laws during his first term." }
    ]),
    news: "Successfully returned to the Senate in 2025, prioritizing legislation to support micro-businesses recovering from economic downturns.",
    sources: "Senate Official Records, COMELEC 2025 Results",
    promises: JSON.stringify([
      { title: "Support Micro and Small Enterprises", status: "In Progress", link: "MSME Relief Policies" },
      { title: "Expand Digital Infrastructure", status: "In Progress", link: "Better Internet Act" }
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
    policies: JSON.stringify(["BFP Modernization Act", "Anti-Terrorism Act (Co-author)", "ROTC Institutionalization (Advocate)"]),
    career_history: JSON.stringify([
      { period: "2019 – Present", role: "Senator of the Republic" },
      { period: "2016 – 2018", role: "Chief, Philippine National Police" },
      { period: "2018", role: "Director General, Bureau of Corrections" }
    ]),
    public_records: JSON.stringify([
      { title: "Committee Chairmanship", value: "Public Order and Dangerous Drugs." }
    ]),
    news: "Re-elected with a strong mandate in 2025; currently pushing for the mandatory ROTC program in colleges.",
    sources: "Senate Official Records, COMELEC 2025 Results",
    promises: JSON.stringify([
      { title: "Mandatory ROTC", status: "In Progress", link: "ROTC Bill" },
      { title: "Modernize Law Enforcement", status: "Fulfilled", link: "BFP Modernization" }
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
    policies: JSON.stringify(["Expanded Social Pension for Indigent Senior Citizens (Advocacy)"]),
    career_history: JSON.stringify([
      { period: "2025 – Present", role: "Senator of the Republic" },
      { period: "2023 – 2025", role: "Representative, ACT-CIS Party-list" },
      { period: "2022", role: "Secretary, Department of Social Welfare and Development" }
    ]),
    public_records: JSON.stringify([
      { title: "Social Welfare Initiatives", value: "Spearheaded digitizing DSWD aid distribution." }
    ]),
    news: "Secured the 4th spot in the 2025 senatorial elections and is prioritizing bills that simplify public access to government emergency assistance.",
    sources: "Senate Official Records, COMELEC 2025 Results",
    promises: JSON.stringify([
      { title: "Streamline DSWD Assistance", status: "In Progress", link: "AICS Digitalization" },
      { title: "Protect Media Workers", status: "In Progress", link: "Media Workers Welfare Bill" }
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
    policies: JSON.stringify(["Sagip Saka Act", "Juvenile Justice and Welfare Act", "Free Irrigation Service Act"]),
    career_history: JSON.stringify([
      { period: "2025 – Present", role: "Senator of the Republic" },
      { period: "2001 – 2013, 2016 – 2022", role: "Senator of the Republic" },
      { period: "2014 – 2015", role: "Presidential Assistant for Food Security" }
    ]),
    public_records: JSON.stringify([
      { title: "Agricultural Reforms", value: "Principal author of laws boosting local farmer enterprises." }
    ]),
    news: "Successfully returned to the Senate in 2025, vowing to tackle the persistent issues of food inflation and smuggling.",
    sources: "Senate Official Records, COMELEC 2025 Results",
    promises: JSON.stringify([
      { title: "Combat Agricultural Smuggling", status: "In Progress", link: "Anti-Agricultural Smuggling Amendments" },
      { title: "Increase Direct Purchases from Farmers", status: "In Progress", link: "Sagip Saka Expansion" }
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
    policies: JSON.stringify(["Franchise Regulations", "Public Utility Amendments (Co-author)"]),
    career_history: JSON.stringify([
      { period: "2025 – Present", role: "Senator of the Republic" },
      { period: "2016 – 2025", role: "Representative, SAGIP Party-list" },
      { period: "2004 – 2013", role: "Representative, Alagad Party-list" }
    ]),
    public_records: JSON.stringify([
      { title: "House Leadership", value: "Served as House Deputy Speaker." }
    ]),
    news: "Elected as a neophyte senator in 2025, he has immediately begun pushing for deeper inquiries into large corporate tax compliance and media franchises.",
    sources: "Senate Official Records, COMELEC 2025 Results",
    promises: JSON.stringify([
      { title: "Strict Franchise Oversight", status: "In Progress", link: "Franchise Compliance Checks" },
      { title: "Lower Cost of Medicine", status: "In Progress", link: "SAGIP Health Advocacies" }
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
    policies: JSON.stringify(["Anti-Terrorism Act", "National ID System (PhilSys Act)", "Anti-Hazing Law"]),
    career_history: JSON.stringify([
      { period: "2025 – Present", role: "Senator of the Republic" },
      { period: "2001 – 2013, 2016 – 2022", role: "Senator of the Republic" },
      { period: "1999 – 2001", role: "Chief, Philippine National Police" }
    ]),
    public_records: JSON.stringify([
      { title: "Budget Oversight", value: "Consistently flagged and removed billions in pork barrel funds." }
    ]),
    news: "Back in the Senate after the 2025 elections, immediately resuming his rigorous scrutiny of the National Expenditure Program.",
    sources: "Senate Official Records, COMELEC 2025 Results",
    promises: JSON.stringify([
      { title: "Eliminate Pork Barrel", status: "In Progress", link: "Budget Scrutiny" },
      { title: "Strengthen National Defense", status: "In Progress", link: "Defense Modernization Support" }
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
    policies: JSON.stringify(["Comprehensive Dangerous Drugs Act", "Bayanihan Acts (Co-author)", "Cybercrime Prevention Act"]),
    career_history: JSON.stringify([
      { period: "2025 – Present", role: "Senator of the Republic" },
      { period: "1992 – 2004, 2010 – 2022", role: "Senator of the Republic" },
      { period: "2018 – 2022", role: "Senate President" }
    ]),
    public_records: JSON.stringify([
      { title: "Leadership Roles", value: "Former Senate President and Majority Leader." }
    ]),
    news: "Returned to the upper chamber in 2025, focusing on strengthening the penal system and combating illegal drugs.",
    sources: "Senate Official Records, COMELEC 2025 Results",
    promises: JSON.stringify([
      { title: "Strengthen Anti-Drug Laws", status: "In Progress", link: "Dangerous Drugs Amendments" },
      { title: "Protect Family Values", status: "In Progress", link: "Conservative Legislative Agenda" }
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
    policies: JSON.stringify(["Reproductive Health Law", "CREATE Act", "Sin Tax Reform Law"]),
    career_history: JSON.stringify([
      { period: "2019 – Present", role: "Senator of the Republic" },
      { period: "2016 – 2019", role: "Representative, Taguig 2nd District" },
      { period: "2004 – 2016", role: "Senator of the Republic" }
    ]),
    public_records: JSON.stringify([
      { title: "Tax and Health Output", value: "Key sponsor of major corporate tax reforms and public health funding." }
    ]),
    news: "Re-elected in 2025, she continues to defend women's rights and is advocating for a more robust maternal health infrastructure.",
    sources: "Senate Official Records, COMELEC 2025 Results",
    promises: JSON.stringify([
      { title: "Defend the RH Law", status: "Fulfilled", link: "RH Law Implementation" },
      { title: "Fund Public Health via Sin Taxes", status: "Fulfilled", link: "Sin Tax Allocations" }
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
    policies: JSON.stringify(["Entrepreneurship Support (Advocacy)", "Digital Economy Taxation (Proposed)"]),
    career_history: JSON.stringify([
      { period: "2025 – Present", role: "Senator of the Republic" },
      { period: "2019 – 2025", role: "Representative, Las Piñas Lone District" }
    ]),
    public_records: JSON.stringify([
      { title: "House Leadership", value: "Served as House Deputy Speaker." }
    ]),
    news: "Secured her first Senate term in the 2025 elections, pushing to cut red tape for local tech start-ups and SMEs.",
    sources: "Senate Official Records, COMELEC 2025 Results",
    promises: JSON.stringify([
      { title: "Support SMEs", status: "In Progress", link: "SME Tax Relief" },
      { title: "Modernize Digital Commerce", status: "In Progress", link: "E-Commerce Regulation" }
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
    policies: JSON.stringify(["Free Legal Assistance Act", "Lapid Law (Tourism)", "Meat Labeling Act"]),
    career_history: JSON.stringify([
      { period: "2019 – Present", role: "Senator of the Republic" },
      { period: "2004 – 2016", role: "Senator of the Republic" },
      { period: "1995 – 2004", role: "Governor of Pampanga" }
    ]),
    public_records: JSON.stringify([
      { title: "Pro-Poor Legislation", value: "Consistent focus on laws understandable and accessible to the common Filipino." }
    ]),
    news: "Re-elected in 2025, pushing for better disaster relief protocols for indigenous and rural communities.",
    sources: "Senate Official Records, COMELEC 2025 Results",
    promises: JSON.stringify([
      { title: "Expand Free Legal Aid", status: "In Progress", link: "Legal Aid Enhancements" },
      { title: "Promote Local Tourism", status: "Fulfilled", link: "Tourism Bills" }
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
    policies: JSON.stringify(["Kadiwa ni Ani at Kita Act", "Sangguniang Kabataan Reform Act Amendments", "Agricultural Smuggling Penalties"]),
    career_history: JSON.stringify([
      { period: "2019 – Present", role: "Senator of the Republic" },
      { period: "2010 – 2019", role: "Governor of Ilocos Norte" },
      { period: "1998 – 2007", role: "Representative, Ilocos Norte 2nd District" }
    ]),
    public_records: JSON.stringify([
      { title: "Committee Chairmanship", value: "Electoral Reforms; Cooperatives." }
    ]),
    news: "Re-elected in the 2025 midterms, continuously pushing for the expansion of the Kadiwa store program and stronger electoral reform laws.",
    sources: "Senate Official Records, COMELEC 2025 Results",
    promises: JSON.stringify([
      { title: "Lower Food Prices", status: "In Progress", link: "Kadiwa Expansion" },
      { title: "Protect Farmers", status: "In Progress", link: "Anti-Smuggling Stances" }
    ])
  }
];

async function seedOfficials() {
  console.log("Emptying old officials table...");
  await db.execute("DROP TABLE IF EXISTS officials");

  console.log("Creating fresh officials table...");
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
      sources TEXT NOT NULL,
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
          news, sources, promises, photo
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        o.name, o.title, o.department, o.date_assumed, o.status, o.appointed_by,
        o.branch, o.location, o.bio, o.policies, o.career_history, o.public_records,
        o.news, o.sources, o.promises, o.photo
      ]
    });
  }

  console.log("✅ Success! Your officials database is now seeded.");
}

seedOfficials();