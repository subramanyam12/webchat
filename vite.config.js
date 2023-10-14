import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from 'path'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')


export default defineConfig({
  plugins: [react()],
  root,
  plugins: [reactRefresh()],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        home: resolve(root, 'home', 'index.html'),
      }
    }
  }
});


