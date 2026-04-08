import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: true, // ✅ allow all hosts (IMPORTANT)
    hmr: {
      protocol: "wss",
      host: "akino3.akinolabs.io",
    },
  },
});
