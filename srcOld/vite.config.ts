import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);
const host = mobile ? "0.0.0.0" : false;
// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    TanStackRouterVite({
      routeFilePrefix: "r$",
    }),
    react(),
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || true,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
