import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allow external access
    allowedHosts: ["akino3.akinolabs.io"],
    hmr: {
      host: "akino3.akinolabs.io",
    },
  },
});
