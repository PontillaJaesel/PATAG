import { Database } from "bun:sqlite";

// 1. Connect to SQLite (This creates a 'patag.db' file in your project root)
export const db = new Database("patag.db", { create: true });

// 2. Create the users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT,
    email TEXT UNIQUE,
    password TEXT,
    dob TEXT,
    role TEXT,
    location TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log("SQLite Database Ready!");