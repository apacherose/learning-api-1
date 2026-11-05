import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/learning-api-1/",
  plugins: [react()],
  build: {
    outDir: "docs",
  },
});
