import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: true,
    port: 5173,
    // allowedHosts 삭제 (Netlify 배포 + 로컬 개발이면 필요 없음)
  },
});
