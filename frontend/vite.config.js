import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@reduxjs/toolkit": "/node_modules/@reduxjs/toolkit",
    },
  },
});
