// src/db/index.ts
import { Database } from "bun:sqlite";

// Initialize the database connection. 
// This connects to the 'patag.sqlite' file you generated earlier.
export const db = new Database("patag.sqlite");