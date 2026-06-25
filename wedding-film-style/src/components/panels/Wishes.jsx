import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { wishes as copy } from '../../data/content'
import { fetchWishes, submitWish } from '../../lib/wishesClient'
import { fadeUp, stagger } from '../../lib/motion'
import Panel, { ChapterTag } from '../ui/Panel'

export default function Wishes({ no, total }) {
  const [list, setList] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    let alive = true
    fetchWishes().then((r) => alive && setList(r.wishes || []))
    return () => {
      alive = false
    }
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim() || sending) return
    setSending(true)
    try {
      const { wish } = await submitWish({ name, message })
      setList((l) => [wish, ...l])
      setName('')
      setMessage('')
    } catch {
      /* ignore */
    } finally {
      setSending(false)
    }
  }

  const field =
    'w-full border-b border-line bg-transparent py-2.5 font-sans text-paper placeholder-faint outline-none transition-colors focus:border-bronze'

  return (
    <Panel bg="bg-ink-800" contentClassName="items-center justify-center">
      <div
        data-vscroll
        className="no-scrollbar grid max-h-full w-full max-w-5xl gap-10 overflow-y-auto py-2 lg:grid-cols-2 lg:gap-16"
      >
        {/* form */}
        <motion.div
          variants={stagger(0.1, 0.05)}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp}>
            <ChapterTag no={no} total={total} label="Sổ Lưu Bút" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="display mt-5 text-[clamp(1.9rem,4vw,3rem)] text-paper">
            {copy.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-sm text-muted">
            {copy.intro}
          </motion.p>
          <motion.form variants={fadeUp} onSubmit={onSubmit} className="mt-7 space-y-5">
            <input
              className={field}
              placeholder={copy.placeholderName}
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
            />
            <textarea
              className={`${field} resize-none`}
              rows={3}
              placeholder={copy.placeholderMessage}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={400}
            />
            <button type="submit" disabled={sending} className="btn disabled:opacity-40">
              {sending ? 'Đang gửi…' : copy.button}
            </button>
          </motion.form>
        </motion.div>

        {/* recent wishes */}
        <div
          data-vscroll
          className="no-scrollbar space-y-4 lg:max-h-[68vh] lg:overflow-y-auto lg:pr-2"
        >
          {list.length === 0 ? (
            <p className="font-display text-lg italic text-faint">{copy.emptyState}</p>
          ) : (
            list.slice(0, 30).map((w, i) => (
              <div key={w.id || i} className="border-l border-line pl-4">
                <p className="font-display text-base italic text-paper/90">“{w.message}”</p>
                <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-wider2 text-bronze">
                  {w.name}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </Panel>
  )
}
