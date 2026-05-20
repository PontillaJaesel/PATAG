import { Database } from "bun:sqlite";

// 1. Connect to SQLite (This creates a 'patag.db' file in your project root)
export const db = new Database("patag.db", { create: true });

// 2. Create the users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    
    -- Role & Verification
    role TEXT DEFAULT 'citizen',             
    voterIdUrl TEXT,                         
    isVerified BOOLEAN DEFAULT 0,            
    
    -- Citizen Demographics
    industry TEXT,                           -- Stores 'Education', 'IT / Technology', 'Others', etc.
    specificWork TEXT,                       -- Stores the typed-in job title or specific work
    province TEXT,                           
    city TEXT,                               
    voterType TEXT                           -- Stores 'Regular Voter', 'SK Voter', etc.
  );
`);

console.log("SQLite Database Ready!");