import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { wishesMiddleware } from './server/wishesApi.js'

// Adds the /api/wishes endpoint to the dev & preview servers so submitted
// wishes are persisted to data/wishes.json during local development.
function wishesApiPlugin() {
  return {
    name: 'wishes-api',
    configureServer(server) {
      server.middlewares.use(wishesMiddleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(wishesMiddleware)
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  // Published as a sub-path of the GitHub Pages user site:
  // https://mockingbitch.github.io/wedding-film/
  base: '/wedding-film/',
  plugins: [react(), wishesApiPlugin()],
  server: {
    host: true,
    port: 5176,
  },
  build: {
    // Emit the static site into the repo-root /wedding-film folder so GitHub
    // Pages (which deploys the whole branch) serves it at /wedding-film/.
    outDir: '../wedding-film',
    emptyOutDir: true,
    target: 'es2018',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
        },
      },
    },
  },
})
