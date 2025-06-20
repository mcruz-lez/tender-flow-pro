import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    setupFiles: ["./jest.setup.js"],
    globals: true,
    environment: "jsdom",
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
