import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    // Add the CSRF bypass right here!
    serverFns: {
      disableCsrfMiddlewareWarning: true,
    },
  },
  vite: {
    ssr: {
      external: ['@libsql/client'], // Swapped to our new driver
    },
  },
});