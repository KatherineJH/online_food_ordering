import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: ["frontend", "a8d1-183-98-215-25.ngrok-free.app"],
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:5454", // 👈 Spring Boot 서버
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
});
