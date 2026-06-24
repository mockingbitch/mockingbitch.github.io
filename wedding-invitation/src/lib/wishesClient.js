// Talks to /api/wishes (persisted to data/wishes.json when a server is
// present). On purely static hosting with no API, it gracefully falls back
// to localStorage so the guestbook still works.

const LS_KEY = 'wedding-wishes'

function readLocal() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveLocal(wish) {
  try {
    const list = readLocal()
    list.push(wish)
    localStorage.setItem(LS_KEY, JSON.stringify(list))
  } catch {
    /* storage unavailable — ignore */
  }
}

function makeLocalWish({ name, message }) {
  return {
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: name.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
    local: true,
  }
}

export async function fetchWishes() {
  try {
    const res = await fetch('/api/wishes', { headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error('no api')
    const data = await res.json()
    return { wishes: Array.isArray(data.wishes) ? data.wishes : [], source: 'server' }
  } catch {
    return { wishes: readLocal(), source: 'local' }
  }
}

export async function submitWish({ name, message }) {
  let res
  try {
    res = await fetch('/api/wishes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message }),
    })
  } catch {
    // Network failure → no backend (static hosting). Save locally.
    const wish = makeLocalWish({ name, message })
    saveLocal(wish)
    return { wish, source: 'local' }
  }

  if (res.status === 404 || res.status === 405) {
    const wish = makeLocalWish({ name, message })
    saveLocal(wish)
    return { wish, source: 'local' }
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Gửi lời chúc không thành công. Vui lòng thử lại.')
  }

  const data = await res.json()
  return { wish: data.wish, source: 'server' }
}
