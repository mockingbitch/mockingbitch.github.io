// ============================================================
//  Wishes API — persists guestbook messages to data/wishes.json.
//  No external dependencies; usable as connect-style middleware by
//  both the Vite dev/preview server and the production server.js.
// ============================================================
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.resolve(__dirname, '..', 'data')
const DATA_FILE = path.join(DATA_DIR, 'wishes.json')

const MAX_NAME = 80
const MAX_MESSAGE = 600

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8')
}

export function readWishes() {
  try {
    ensureStore()
    const raw = fs.readFileSync(DATA_FILE, 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

// Normalise newlines, drop other control characters, then clamp length.
// Keeps newline (10); removes the rest of 0–31 and 127. No regex literals
// with control characters (which are fragile in source files).
function clean(value, max) {
  const normalized = String(value ?? '').replace(/\r\n?/g, '\n')
  let out = ''
  for (const ch of normalized) {
    const code = ch.codePointAt(0)
    if (code === 10 || (code > 31 && code !== 127)) out += ch
  }
  return out.trim().slice(0, max)
}

export function addWish(input) {
  const name = clean(input?.name, MAX_NAME)
  const message = clean(input?.message, MAX_MESSAGE)
  if (!name || !message) {
    const err = new Error('Vui lòng nhập tên và lời chúc.')
    err.statusCode = 400
    throw err
  }

  ensureStore()
  const wishes = readWishes()
  const wish = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    message,
    createdAt: new Date().toISOString(),
  }
  wishes.push(wish)
  fs.writeFileSync(DATA_FILE, JSON.stringify(wishes, null, 2), 'utf8')
  return wish
}

function sendJson(res, status, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(payload))
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    let tooLarge = false
    req.on('data', (chunk) => {
      data += chunk
      if (data.length > 1e5) {
        tooLarge = true
        req.destroy()
      }
    })
    req.on('end', () => {
      if (tooLarge) return reject(new Error('Payload too large'))
      try {
        resolve(data ? JSON.parse(data) : {})
      } catch {
        reject(new Error('Invalid JSON'))
      }
    })
    req.on('error', reject)
  })
}

/**
 * Connect-style middleware. Handles GET/POST /api/wishes; otherwise next().
 */
export function wishesMiddleware(req, res, next) {
  const url = (req.url || '').split('?')[0]
  if (url !== '/api/wishes') return next ? next() : undefined

  if (req.method === 'GET') {
    return sendJson(res, 200, { wishes: readWishes() })
  }

  if (req.method === 'POST') {
    return readBody(req)
      .then((body) => sendJson(res, 201, { wish: addWish(body) }))
      .catch((err) => sendJson(res, err.statusCode || 400, { error: err.message || 'Bad request' }))
  }

  res.statusCode = 405
  res.setHeader('Allow', 'GET, POST')
  res.end('Method Not Allowed')
}
