import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [".akinolabs.io"],
    hmr: {
      protocol: "wss",
      host: "akino3.akinolabs.io",
    },
  },
});
