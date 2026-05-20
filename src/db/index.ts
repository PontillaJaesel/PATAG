import { createClient, type Client } from "@libsql/client";

const isServer = import.meta.env.SSR;

// Only open the SQLite client on the server. The browser bundle still imports
// this module indirectly through route files, so we must avoid creating a
// file-based client there.
export const db = isServer
  ? createClient({
      url: "file:patag.sqlite",
    })
  : new Proxy(
      {},
      {
        get() {
          throw new Error("Database access is server-only.");
        },
      },
    ) as Client;
