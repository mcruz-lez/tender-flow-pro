import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    setupFiles: ["./jest.setup.js"],
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});
