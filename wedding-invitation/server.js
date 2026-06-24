// ============================================================
//  Production server (no dependencies).
//  Serves the built /dist folder and the /api/wishes endpoint, so
//  guest wishes are persisted to data/wishes.json on the real site.
//
//    npm run build
//    npm start            # → http://localhost:4173
// ============================================================
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { wishesMiddleware } from './server/wishesApi.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.resolve(__dirname, 'dist')
const PORT = process.env.PORT || 4173

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

function serveStatic(req, res) {
  if (!fs.existsSync(DIST)) {
    res.statusCode = 500
    res.end('Build not found. Run "npm run build" first.')
    return
  }

  const urlPath = decodeURIComponent((req.url || '/').split('?')[0])
  // Resolve safely within DIST to prevent path traversal.
  let filePath = path.join(DIST, urlPath)
  if (!filePath.startsWith(DIST)) filePath = DIST

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html')
  }
  // SPA / unknown route → index.html
  if (!fs.existsSync(filePath)) filePath = path.join(DIST, 'index.html')

  const ext = path.extname(filePath).toLowerCase()
  res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream')
  fs.createReadStream(filePath).pipe(res)
}

const server = http.createServer((req, res) => {
  if ((req.url || '').split('?')[0] === '/api/wishes') {
    return wishesMiddleware(req, res)
  }
  serveStatic(req, res)
})

server.listen(PORT, () => {
  console.log(`\n  ✦ Aria invitation running at http://localhost:${PORT}\n`)
})
