import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// No `base` — Hostinger serves this from the domain root, unlike the earlier
// GitHub Pages deployment which needed the /Naturals-Tnj-New/ subpath prefix.
export default defineConfig({
  plugins: [react()],
})
