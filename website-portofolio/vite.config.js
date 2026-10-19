import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The site is served from https://yussyafridayusfi.github.io/example-portfolio/
// Keep `base` in sync with the GitHub repository name.
export default defineConfig({
  base: '/example-portfolio/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
