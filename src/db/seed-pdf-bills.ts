// src/db/seed-pdf-bills.ts
import { createClient } from "@libsql/client";

const db = createClient({
  url: "file:patag.sqlite",
});

const billsToInsert = [
  // --- 2025 BILLS ---
  {
    bill_no: "HB-05482",
    title: "Resettlement Area Improvement and Sustainable Development Act of 2025",
    date_filed: "October 13, 2025",
    category: "Infrastructure / Social Welfare",
    authors: "Rep. Salvador A. Pleyto, Sr.",
    status: "House (Pending in Committee)",
    stage: 2,
    brief_description: "Mandates the comprehensive physical and economic rehabilitation of all government-identified resettlement areas.",
    full_description: "This bill requires the Department of Human Settlements and Urban Development (DHSUD) to upgrade the physical aspects of resettlement areas nationwide. It moves beyond merely providing shelter by mandating the construction of adequate drainage, water supply, and social infrastructure (health centers, schools) while promoting local employment preference for resettled residents during the construction phase.",
    source_link: "House of Representatives Legislative Documents (HB05482)",
    pulse_approve: 12400, pulse_disapprove: 1100
  },
  {
    bill_no: "SBN-1243",
    title: "Urban Agriculture Act of 2025",
    date_filed: "August 27, 2025",
    category: "Agriculture / Environment",
    authors: "Sen. Imee R. Marcos, Sen. Francis Pangilinan",
    status: "Senate (Pending in Committee)",
    stage: 2,
    brief_description: "Institutionalizes urban agriculture and vertical farming in metropolitan areas to ensure food security.",
    full_description: "An Act promoting the integration of urban agriculture and other innovative, sustainable agricultural production technologies in cities and strategic areas. It seeks to repurpose idle urban lands and building spaces for vertical farming to shorten the food supply chain, lower the cost of produce, and regenerate urban ecosystems.",
    source_link: "Senate Legislative Information System (SBN-1243)",
    pulse_approve: 8500, pulse_disapprove: 1200
  },
  {
    bill_no: "SBN-424",
    title: "Abolition of Travel Tax Act",
    date_filed: "July 10, 2025",
    category: "Tourism & Culture / Economy",
    authors: "Sen. Alan Peter Cayetano",
    status: "Senate (Consolidated/Pending Committee Report)",
    stage: 2,
    brief_description: "Abolishes the Philippine travel tax to make travel more accessible and boost regional tourism.",
    full_description: "This measure seeks to abolish the travel tax imposed under the decades-old Presidential Decree No. 1183. The author argues the tax is an outdated financial burden on ordinary Filipinos and hinders the country's commitments under the ASEAN Tourism Agreement. Eliminating the tax is projected to spur long-term economic gains through increased travel spending.",
    source_link: "Senate Press Release - Cayetano pushes for abolition of travel tax",
    pulse_approve: 45200, pulse_disapprove: 340
  },
  {
    bill_no: "SBN-2991",
    title: "Digital Nomad Visa Act",
    date_filed: "February 20, 2025",
    category: "Sci-Tech / Economy",
    authors: "Sen. Joel Villanueva",
    status: "Senate (Pending in Committee)",
    stage: 2,
    brief_description: "Creates a dedicated visa category to attract foreign digital nomads and remote workers.",
    full_description: "Recognizing the global shift toward remote work, this bill provides a specific legal framework and visa category for foreign digital professionals. By allowing them to live in the Philippines while working for offshore employers, the bill aims to boost local consumption, foreign currency inflow, and the domestic tech and tourism ecosystems.",
    source_link: "Senate Legislative Information System (SBN-2991)",
    pulse_approve: 18900, pulse_disapprove: 4100
  },
  {
    bill_no: "SBN-2983",
    title: "Philippine Health Card Act of 2025",
    date_filed: "February 4, 2025",
    category: "Health",
    authors: "Sen. Christopher Lawrence \"Bong\" T. Go",
    status: "Senate (Pending in Committee)",
    stage: 2,
    brief_description: "Mandates the issuance of a unified physical and digital health card to all Filipinos.",
    full_description: "This bill aims to streamline healthcare access by providing every Filipino citizen with a standardized Philippine Health Card. The card would consolidate PhilHealth membership, medical records, and financial assistance tracking, significantly cutting down bureaucratic delays during hospital admissions and emergency medical interventions.",
    source_link: "Senate Legislative Information System (SBN-2983)",
    pulse_approve: 32000, pulse_disapprove: 850
  },
  {
    bill_no: "SBN-2930",
    title: "Artificial Intelligence (AI) Training for Government Workforce Act",
    date_filed: "January 22, 2025",
    category: "Sci-Tech / Governance",
    authors: "Sen. Jinggoy E. Estrada",
    status: "Senate (Pending in Committee)",
    stage: 2,
    brief_description: "Mandates AI literacy and operational training for the national government workforce.",
    full_description: "An Act to provide a comprehensive Artificial Intelligence training program for government employees. It aims to modernize the bureaucracy by equipping public servants with the skills necessary to safely and effectively use AI tools, thereby increasing administrative efficiency, improving public service delivery, and preparing the government for digital transformation.",
    source_link: "Senate Bills Directory (SBN-2930)",
    pulse_approve: 9400, pulse_disapprove: 2100
  },
  {
    bill_no: "SBN-2932",
    title: "Local Governance Meritocracy Act",
    date_filed: "January 22, 2025",
    category: "Governance",
    authors: "Sen. Jinggoy E. Estrada",
    status: "Senate (Pending in Committee)",
    stage: 2,
    brief_description: "Consolidates performance measurement tools and reward systems for Local Government Units (LGUs).",
    full_description: "This legislation seeks to institutionalize a culture of meritocracy across all local government units in the Philippines. It streamlines various existing assessment tools into a cohesive framework that ties national government incentives, grants, and capacity-building funds directly to measurable LGU performance and transparency metrics.",
    source_link: "Senate Bills Directory (SBN-2932)",
    pulse_approve: 11200, pulse_disapprove: 600
  },
  {
    bill_no: "SBN-2927",
    title: "Magna Carta for Public Disaster Risk Reduction and Management (DRRM) Workers",
    date_filed: "January 20, 2025",
    category: "Labor / Environment",
    authors: "Sen. Loren B. Legarda",
    status: "Senate (Pending in Committee)",
    stage: 2,
    brief_description: "Establishes the rights, protections, and standardized benefits for DRRM workers.",
    full_description: "Recognizing the hazardous nature of their jobs, this bill provides a Magna Carta for public disaster risk reduction and management personnel. It ensures they receive adequate compensation, hazard pay, mandatory insurance, and continuous capacity-building. It aims to professionalize the DRRM sector to better equip the country against worsening climate change impacts.",
    source_link: "Senate Bills Directory (SBN-2927)",
    pulse_approve: 28500, pulse_disapprove: 200
  },
  {
    bill_no: "SBN-2925",
    title: "Cebu Normal University Central Cebu City Campus Act",
    date_filed: "January 20, 2025",
    category: "Education",
    authors: "Sen. Cynthia A. Villar",
    status: "Senate (Pending in Committee)",
    stage: 2,
    brief_description: "Establishes a regular, fully-funded campus of Cebu Normal University in Central Cebu City.",
    full_description: "To democratize access to quality tertiary education, this bill establishes a regular campus of the Cebu Normal University in Central Cebu City. It mandates annual appropriations to ensure the campus can offer comprehensive undergraduate and graduate programs, easing the congestion of the main campus.",
    source_link: "Senate Bills Directory (SBN-2925)",
    pulse_approve: 7800, pulse_disapprove: 400
  },
  {
    bill_no: "SBN-2922",
    title: "Crimes Against Chastity Equalization Act",
    date_filed: "January 20, 2025",
    category: "Justice",
    authors: "Sen. Risa Hontiveros",
    status: "Senate (Pending in Committee)",
    stage: 2,
    brief_description: "Amends the Revised Penal Code to ensure fundamental gender equality in crimes against chastity.",
    full_description: "This act aims to eliminate the discriminatory distinctions between adultery (committed by a wife) and concubinage (committed by a husband) under the Revised Penal Code. By repealing and amending these outdated provisions, the bill seeks to establish equal standards of marital fidelity and equal evidentiary requirements for both men and women.",
    source_link: "Senate Bills Directory (SBN-2922)",
    pulse_approve: 35000, pulse_disapprove: 8900
  },

  // --- 2026 BILLS ---
  {
    bill_no: "SBN-2121",
    title: "Emergency Financial Stability and Consumer Protection Act",
    date_filed: "May 6, 2026",
    category: "Economy",
    authors: "Senator Joel Villanueva",
    status: "Senate (Filed)",
    stage: 1,
    brief_description: "Grants emergency regulatory powers to the Bangko Sentral ng Pilipinas (BSP) during national crises.",
    full_description: "An Act granting the Bangko Sentral ng Pilipinas emergency regulatory powers over supervised institutions during a declared national emergency. It aims to ensure that the BSP has the agility to implement sweeping financial protections, stabilize the economy, and safeguard consumer banking interests when national emergencies occur.",
    source_link: "Senate Legislative Information System (SBN-2121)",
    pulse_approve: 8400, pulse_disapprove: 1500
  },
  {
    bill_no: "SBN-2120",
    title: "Lakambini Act of 2026",
    date_filed: "May 6, 2026",
    category: "Education",
    authors: "Senator Risa Hontiveros",
    status: "Senate (Filed)",
    stage: 1,
    brief_description: "Institutionalizes the study of Filipino women heroes in schools.",
    full_description: "An Act institutionalizing the study of Filipino women heroes in the curricula of all public and private educational institutions. The bill aims to promote historical awareness, gender equality, and properly recognize the pivotal role of women in shaping Philippine history and society.",
    source_link: "Senate Legislative Information System (SBN-2120)",
    pulse_approve: 21000, pulse_disapprove: 1200
  },
  {
    bill_no: "SBN-2119",
    title: "Laoag City Medical Center",
    date_filed: "May 6, 2026",
    category: "Health",
    authors: "Senator Imee R. Marcos",
    status: "Senate (Filed)",
    stage: 1,
    brief_description: "Upgrades the Laoag City General Hospital into a Level II Medical Center.",
    full_description: "An Act upgrading the Laoag City General Hospital in Laoag City, Ilocos Norte, into a Level II General Hospital to be known as the Laoag City Medical Center. The bill mandates increasing its bed capacity and funding to provide better and more advanced healthcare services.",
    source_link: "Senate Legislative Information System (SBN-2119)",
    pulse_approve: 9800, pulse_disapprove: 300
  },
  {
    bill_no: "SBN-2118",
    title: "Declaring Hundred Islands National Park as a Tourism Zone",
    date_filed: "May 6, 2026",
    category: "Tourism & Culture / Environment",
    authors: "Senator Imee R. Marcos",
    status: "Senate (Filed)",
    stage: 1,
    brief_description: "Officially declares the Hundred Islands National Park as a protected tourism zone.",
    full_description: "An Act declaring the Hundred Islands National Park, located in the City of Alaminos, Province of Pangasinan, as an official Tourism Zone. This designation aims to drive targeted national funding towards the area for sustainable tourism development while instituting stricter environmental protection protocols.",
    source_link: "Senate Legislative Information System (SBN-2118)",
    pulse_approve: 15400, pulse_disapprove: 400
  },
  {
    bill_no: "SBN-2116",
    title: "Revised Philippine Coast Guard Law",
    date_filed: "May 6, 2026",
    category: "Infrastructure / Governance",
    authors: "Sen. Juan Miguel Zubiri, Sen. Ronald Dela Rosa, Sen. Raffy Tulfo",
    status: "Senate (Filed)",
    stage: 1,
    brief_description: "Modernizes the structure and capabilities of the Philippine Coast Guard (PCG).",
    full_description: "An Act providing for the Revised Philippine Coast Guard Law. It aims to modernize the PCG by restructuring its organization, expanding its personnel, and significantly upgrading its maritime infrastructure, vessels, and equipment to better enforce maritime laws and protect the Philippine exclusive economic zone.",
    source_link: "Senate Legislative Information System (SBN-2116)",
    pulse_approve: 42000, pulse_disapprove: 500
  },
  {
    bill_no: "SBN-2115",
    title: "Anti-Abuse of Pakyawan Workers Act",
    date_filed: "May 6, 2026",
    category: "Labor",
    authors: "Sen. Raffy Tulfo, Sen. Jinggoy Estrada, Sen. Loren Legarda",
    status: "Senate (Filed)",
    stage: 1,
    brief_description: "Protects the rights of piece-rate (\"pakyawan\") workers.",
    full_description: "An Act strengthening the rights of piece-rate workers, providing stricter reportorial requirements and penalties for violations thereof. This bill seeks to end exploitative labor practices against informal workers by mandating fair compensation, basic occupational safety standards, and holding employers accountable.",
    source_link: "Senate Legislative Information System (SBN-2115)",
    pulse_approve: 27500, pulse_disapprove: 600
  },
  {
    bill_no: "SBN-2114",
    title: "Tunay Na Ugnayan, Buhay, At Oportunidad Sa Asukal (TUBO) Act of 2026",
    date_filed: "May 6, 2026",
    category: "Agriculture",
    authors: "Senator JV Ejercito",
    status: "Senate (Filed)",
    stage: 1,
    brief_description: "Revitalizes the Philippine sugar industry and supports sugar farmers.",
    full_description: "An Act strengthening the sugar industry by expanding the mandate and composition of the Sugar Regulatory Administration (SRA). The TUBO Act focuses on providing direct technical and financial support to local sugar farmers to improve yields, modernize milling infrastructure, and protect the domestic market.",
    source_link: "Senate Legislative Information System (SBN-2114)",
    pulse_approve: 11200, pulse_disapprove: 800
  },
  {
    bill_no: "HBN-8468",
    title: "EBAYAD Act",
    date_filed: "March 17, 2026",
    category: "Sci-Tech / Economy",
    authors: "House Committee on Banks, Financial Institutions and Currencies",
    status: "House (Filed / Primary Committee)",
    stage: 1,
    brief_description: "Mandates digital payment systems for government transactions and merchants.",
    full_description: "An Act adopting and regulating the use of digital payment systems for government financial transactions and all merchants. It aims to accelerate the country's transition to a digital economy by requiring secure electronic payment methods, reducing corruption, and promoting financial inclusion.",
    source_link: "House Bills Database (HBN-8468)",
    pulse_approve: 19800, pulse_disapprove: 4500
  },
  {
    bill_no: "HBN-8477",
    title: "Presidential Merit Scholarship Act",
    date_filed: "March 17, 2026",
    category: "Education",
    authors: "House Committee on Higher and Technical Education",
    status: "House (Filed / Primary Committee)",
    stage: 1,
    brief_description: "Institutionalizes a national framework for top-performing student scholarships.",
    full_description: "An Act institutionalizing the Presidential Merit Scholarship Program, integrating the Bagong Pilipinas Merit Scholarship Program into a national framework. It appropriates consistent funds to ensure that the brightest students, regardless of socioeconomic background, receive full financial support for their tertiary education.",
    source_link: "House Bills Database (HBN-8477)",
    pulse_approve: 38000, pulse_disapprove: 200
  },
  {
    bill_no: "SBN-1955",
    title: "Children's Safety in Social Media Act",
    date_filed: "Early 2026",
    category: "Justice / Social Welfare",
    authors: "Senator Loren Legarda",
    status: "Senate (Under Committee Hearing)",
    stage: 2,
    brief_description: "Establishes a minimum age of 16 for social media account ownership.",
    full_description: "An Act seeking to establish a minimum age of 16 for account ownership on covered age-restricted social media platforms. It imposes strict obligations on tech companies to enforce this age restriction, aiming to protect minors from cyberbullying, misinformation, and harmful digital content.",
    source_link: "Senate Press Release on SBN-1955",
    pulse_approve: 41000, pulse_disapprove: 15200
  },
  {
    bill_no: "SBN-1966",
    title: "Assistance to Individuals in Crisis Situations (AICS) Act",
    date_filed: "Early 2026",
    category: "Social Welfare",
    authors: "Senate Committee on Social Justice",
    status: "Senate (Approved on 3rd and Final Reading)",
    stage: 3,
    brief_description: "Institutionalizes the DSWD's AICS program.",
    full_description: "An Act aimed at institutionalizing the Assistance to Individuals in Crisis Situations (AICS) program of the DSWD. The bill provides a permanent mandate for financial and material assistance for individuals facing unexpected crises, and imposes severe penalties on politicians who use it for political patronage.",
    source_link: "DSWD Welcomes Senate Approval of AICS Bill",
    pulse_approve: 52000, pulse_disapprove: 300
  },
  {
    bill_no: "RA 12314",
    title: "General Appropriations Act (GAA) FY 2026",
    date_filed: "January 6, 2026",
    category: "Governance / Economy",
    authors: "Congress of the Philippines",
    status: "Enacted",
    stage: 5,
    brief_description: "The official National Budget for the Fiscal Year 2026.",
    full_description: "Republic Act No. 12314 outlines the total government expenditure plan for the 2026 fiscal year. It dictates the distribution of national funds across all executive departments, the legislature, judiciary, and special purpose funds to finance government operations.",
    source_link: "Department of Budget and Management (GAA 2026)",
    pulse_approve: 15000, pulse_disapprove: 12000
  },

  // --- 2024 ENACTED & FILED BILLS ---
  {
    bill_no: "RA 12001",
    title: "Real Property Valuation and Assessment Reform (RP-VAR) Act",
    date_filed: "June 13, 2024",
    category: "Governance / Economy",
    authors: "Congress of the Philippines",
    status: "Enacted",
    stage: 5,
    brief_description: "Standardizes the country's real property valuation system based on international standards.",
    full_description: "The RP-VAR Act mandates that all real properties be appraised based on prevailing market values conforming to the Philippine Valuation System. It aims to eliminate conflicting property valuations across different government agencies, digitize the assessment process, and grants a tax amnesty on uncollected real property taxes.",
    source_link: "Tax Laws Passed in 2024 - MTF Counsel",
    pulse_approve: 9400, pulse_disapprove: 1800
  },
  {
    bill_no: "RA 11995",
    title: "Philippine Ecosystem and Natural Capital Accounting System (PENCAS) Act",
    date_filed: "May 22, 2024",
    category: "Environment",
    authors: "Sen. Loren Legarda",
    status: "Enacted",
    stage: 5,
    brief_description: "Integrates natural capital and ecosystem services into national economic accounting.",
    full_description: "PENCAS institutionalizes a framework to properly account for the country's natural resources and ecosystems in the national economy. It moves beyond traditional GDP by ensuring that environmental depletion and the economic value of forests and oceans are measured and integrated into government planning.",
    source_link: "Legarda cites key legislative milestones in 2024 - PNA",
    pulse_approve: 17200, pulse_disapprove: 500
  },
  {
    bill_no: "RA 11976",
    title: "Ease of Paying Taxes (EOPT) Act",
    date_filed: "January 5, 2024",
    category: "Economy / Governance",
    authors: "Congress of the Philippines",
    status: "Enacted",
    stage: 5,
    brief_description: "Modernizes tax administration to improve compliance and convenience for taxpayers.",
    full_description: "The EOPT Act fundamentally alters Philippine taxation by allowing taxpayers to file returns and pay internal revenue taxes electronically or manually at any authorized agent bank, removing geographical restrictions. It also harmonizes the VAT base for goods and services.",
    source_link: "Tax Laws Passed in 2024 - MTF Counsel",
    pulse_approve: 48000, pulse_disapprove: 2500
  },
  {
    bill_no: "SBN-2868",
    title: "Anti-POGO Act of 2024",
    date_filed: "November 5, 2024",
    category: "Justice / Social Welfare",
    authors: "Sen. Win Gatchalian, Sen. Joel Villanueva, Sen. Risa Hontiveros",
    status: "Senate (Filed)",
    stage: 1,
    brief_description: "Completely bans Philippine Offshore Gaming Operators (POGOs).",
    full_description: "An Act banning and declaring illegal offshore gaming operations in the Philippines. This bill formally institutionalizes the total ban on POGOs, citing their association with severe transnational crimes such as human trafficking, scam syndicates, kidnapping, and money laundering.",
    source_link: "Senate Legislative Information System (SBN-2868)",
    pulse_approve: 89000, pulse_disapprove: 3400
  },
  {
    bill_no: "SBN-2864",
    title: "Revised Philippine Coast Guard Law",
    date_filed: "November 4, 2024",
    category: "Infrastructure",
    authors: "Sen. Raffy Tulfo",
    status: "Senate (Filed)",
    stage: 1,
    brief_description: "Modernizes the Philippine Coast Guard's policies and organizational structure.",
    full_description: "An Act strengthening the Philippine Coast Guard (PCG) by introducing policy and organizational reforms. It addresses the growing maritime security threats and administrative bottlenecks within the agency, ensuring proper funding to better patrol the West Philippine Sea.",
    source_link: "Senate Legislative Information System (SBN-2864)",
    pulse_approve: 33000, pulse_disapprove: 400
  }
];

async function seedDatabase() {
  console.log("Emptying old bills table...");
  await db.execute("DROP TABLE IF EXISTS bills");

  console.log("Creating fresh bills table...");
  await db.execute(`
    CREATE TABLE bills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bill_no TEXT NOT NULL,
      title TEXT NOT NULL,
      date_filed TEXT NOT NULL,
      category TEXT,
      authors TEXT NOT NULL,
      status TEXT NOT NULL,
      stage INTEGER DEFAULT 1,
      brief_description TEXT,
      full_description TEXT,
      source_link TEXT,
      pulse_approve INTEGER DEFAULT 0,
      pulse_disapprove INTEGER DEFAULT 0
    )
  `);

  console.log(`Inserting ${billsToInsert.length} bills into the database...`);
  
  for (const b of billsToInsert) {
    await db.execute({
      sql: `
        INSERT INTO bills (
          bill_no, title, date_filed, category, authors, status, stage, 
          brief_description, full_description, source_link, pulse_approve, pulse_disapprove
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        b.bill_no, b.title, b.date_filed, b.category, b.authors, b.status, b.stage,
        b.brief_description, b.full_description, b.source_link, b.pulse_approve, b.pulse_disapprove
      ]
    });
  }

  console.log("✅ Success! Your P.A.T.A.G. database is now loaded with all 27 bills.");
}

// Run the function
seedDatabase();