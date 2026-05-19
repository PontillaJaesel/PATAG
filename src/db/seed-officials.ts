// src/db/seed-officials.ts
import { createClient } from "@libsql/client";

const db = createClient({
  url: "file:patag.sqlite",
});

const officialsToInsert = [
  {
    name: "Risa Hontiveros",
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
    news: "Consistently vocal on West Philippine Sea sovereignty and leading Senate probes on human trafficking.",
    sources: "Senate Official Records, COMELEC.",
    promises: JSON.stringify([
      { title: "Pass the Safe Spaces Act (Bawal Bastos Law)", status: "Fulfilled", link: "Safe Spaces Act" },
      { title: "Expand Maternity Leave to 105 Days", status: "Fulfilled", link: "Expanded Maternity Leave" },
      { title: "Pass the SOGIE Equality Bill", status: "In Progress", link: "SOGIE Equality Act" }
    ])
  },
  {
    name: "Francis Escudero",
    title: "Senator",
    department: "Legislative",
    date_assumed: "June 2022",
    status: "Active",
    appointed_by: "National Election",
    branch: "LEGISLATIVE",
    location: "MANILA",
    bio: "A veteran legislator and current Senate President, known for his extensive legal expertise and focus on local government autonomy and education.",
    policies: JSON.stringify(["Universal Access to Quality Tertiary Education Act", "Anti-Enforced Disappearance Act", "Tax Reform for Acceleration and Inclusion (Sponsor)"]),
    career_history: JSON.stringify([
      { period: "2024 – Present", role: "Senate President" },
      { period: "2022 – Present", role: "Senator of the Republic" },
      { period: "2019 – 2022", role: "Governor of Sorsogon" }
    ]),
    public_records: JSON.stringify([
      { title: "Legislative Output", value: "Authored over 100 enacted laws." },
      { title: "Audit Status", value: "COA Report — Clear." }
    ]),
    news: "Recently assumed the Senate Presidency, focusing on expediting priority economic legislation.",
    sources: "Senate Official Records, Sorsogon PIO.",
    promises: JSON.stringify([
      { title: "Free College Education in State Universities", status: "Fulfilled", link: "Free Tuition Law" },
      { title: "Amend the Local Government Code for Devolution", status: "In Progress", link: "LGU Devolution Bills" },
      { title: "Digitize Senate Proceedings", status: "In Progress", link: "Senate E-Governance" }
    ])
  },
  {
    name: "Raffy Tulfo",
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
    news: "Leading investigations on abusive employment practices and energy sector failures.",
    sources: "Senate Official Records, Media Archival Reports.",
    promises: JSON.stringify([
      { title: "Strengthen the Department of Migrant Workers", status: "Fulfilled", link: "DMW Budget Allocation" },
      { title: "Increase minimum wage for domestic workers", status: "In Progress", link: "Kasambahay Wage Hike" },
      { title: "End the Endo / Contractualization system", status: "Not Fulfilled", link: "Security of Tenure Bill" }
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
      promises TEXT NOT NULL
    )
  `);

  console.log(`Inserting ${officialsToInsert.length} senators into the database...`);
  
  for (const o of officialsToInsert) {
    await db.execute({
      sql: `
        INSERT INTO officials (
          name, title, department, date_assumed, status, appointed_by, 
          branch, location, bio, policies, career_history, public_records, 
          news, sources, promises
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        o.name, o.title, o.department, o.date_assumed, o.status, o.appointed_by,
        o.branch, o.location, o.bio, o.policies, o.career_history, o.public_records,
        o.news, o.sources, o.promises
      ]
    });
  }

  console.log("✅ Success! Your officials database is now seeded.");
}

seedOfficials();