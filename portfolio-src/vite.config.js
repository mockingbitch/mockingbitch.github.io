import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Published as a sub-path of the GitHub Pages user site:
  // https://mockingbitch.github.io/portfolio/
  base: '/portfolio/',
  plugins: [react()],
  server: {
    host: true,
    port: 5174,
  },
  build: {
    // Emit the static site into the repo-root /portfolio folder so GitHub
    // Pages (which deploys the whole branch) serves it at /portfolio/.
    outDir: '../portfolio',
    emptyOutDir: true,
    target: 'es2018',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
          smooth: ['lenis'],
        },
      },
    },
  },
})
