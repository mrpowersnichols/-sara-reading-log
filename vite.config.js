import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// This must match the actual GitHub repo name, since GitHub Pages serves
// project sites from a subpath (yourname.github.io/repo-name).
export default defineConfig({
  plugins: [react()],
  base: "/sara-reading-log/",
});
