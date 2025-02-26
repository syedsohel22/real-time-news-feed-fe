import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    host: "0.0.0.0", // Allows access from external networks
    port: 5173,
  },

  preview: {
    host: "0.0.0.0",
    port: 4173, // Adjust if needed
    allowedHosts: ["real-time-news-feed-fe.onrender.com"], // Add your frontend Render domain
  },
});
