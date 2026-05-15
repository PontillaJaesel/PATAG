// src/db/setup.ts
import { Database } from "bun:sqlite";

// This will create a file named 'patag.sqlite' in your root folder
const db = new Database("patag.sqlite", { create: true });

// Create a table for the candidates
db.run(`
  CREATE TABLE IF NOT EXISTS candidates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    platform_summary TEXT
  )
`);

// Insert some initial data to test with
const insert = db.prepare("INSERT INTO candidates (name, position, platform_summary) VALUES ($name, $position, $platform)");
insert.run({ $name: "Juan Dela Cruz", $position: "Senator", $platform: "Healthcare reform and transparency" });

console.log("Database setup complete!");