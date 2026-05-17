// src/db/index.ts
import { createClient } from "@libsql/client";

// Connects to your existing local patag.sqlite file
export const db = createClient({
  url: "file:patag.sqlite",
});