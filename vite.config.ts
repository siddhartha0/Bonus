import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "kepler.gl": path.resolve(
        __dirname,
        "node_modules/kepler.gl/dist/kepler.gl.js"
      ), // Explicitly provide the path
    },
  },
  optimizeDeps: {
    include: ["kepler.gl"], // Include kepler.gl for dependency optimization
  },
});
