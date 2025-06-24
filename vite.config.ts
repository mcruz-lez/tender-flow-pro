import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    visualizer({
      filename: "bundle-analysis.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 3000, // Further increase chunk size warning limit
  },
  optimizeDeps: {
    exclude: [
      '@sentry/react',
      '@sentry/browser',
      '@sentry/tracing',
      '@sentry/integrations',
      '@sentry/node',
      '@sentry/utils',
      '@sentry/replay',
      '@supabase/supabase-js',
      '@supabase/auth-helpers-react',
      '@supabase/auth-helpers-shared',
      '@supabase/auth-helpers-nextjs',
      '@supabase/storage-js',
      'supabase',
    ],
  },
}));
