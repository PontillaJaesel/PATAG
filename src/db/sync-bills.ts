// src/db/sync-bills.ts
import { db } from "./index";

db.run("DROP TABLE IF EXISTS bills");

db.run(`
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

const insert = db.prepare(`
  INSERT INTO bills (
    bill_no, title, date_filed, category, authors, status, stage, brief_description, full_description, source_link, pulse_approve, pulse_disapprove
  ) VALUES (
    $bill_no, $title, $date_filed, $category, $authors, $status, $stage, $brief_description, $full_description, $source_link, $pulse_approve, $pulse_disapprove
  )
`);

insert.run({
  $bill_no: "SBN-1243",
  $title: "Urban Agriculture Act of 2025",
  $date_filed: "August 27, 2025",
  $category: "Agriculture / Environment",
  $authors: "Sen. Imee R. Marcos, Sen. Francis Pangilinan",
  $status: "Senate (Pending in Committee)",
  $stage: 2, // e.g., 2 = Senate
  $brief_description: "Institutionalizes urban agriculture and vertical farming in metropolitan areas to ensure food security.",
  $full_description: "An Act promoting the integration of urban agriculture and other innovative, sustainable agricultural production technologies in cities and strategic areas. It seeks to repurpose idle urban lands and building spaces for vertical farming to shorten the food supply chain, lower the cost of produce, and regenerate urban ecosystems.",
  $source_link: "Senate Legislative Information System (SBN-1243)",
  $pulse_approve: 8500,
  $pulse_disapprove: 1200
});

console.log("Database synced to your exact data structure!");