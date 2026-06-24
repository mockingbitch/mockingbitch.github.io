import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import Ornament from '../ui/Ornament'
import MagneticButton from '../ui/MagneticButton'
import QRCard from '../ui/QRCard'
import { gifts, wishes as copy } from '../../data/content'
import { fetchWishes, submitWish } from '../../lib/wishesClient'
import { EASE, viewport } from '../../lib/motion'

function timeAgo(iso) {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return ''
  const diff = Math.max(0, Date.now() - then)
  const min = Math.floor(diff / 60000)
  if (min < 1) return 'vừa xong'
  if (min < 60) return `${min} phút trước`
  const hrs = Math.floor(min / 60)
  if (hrs < 24) return `${hrs} giờ trước`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days} ngày trước`
  return new Date(iso).toLocaleDateString('vi-VN')
}

function WishCard({ wish }) {
  return (
    <motion.figure
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="glass mb-5 block break-inside-avoid rounded-2xl p-6 shadow-glass"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="mb-3 text-gold/50" aria-hidden>
        <path d="M10 7H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2c0 2-1 3-3 4M20 7h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2c0 2-1 3-3 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <blockquote className="whitespace-pre-line font-serif text-lg italic leading-relaxed text-charcoal/85">
        {wish.message}
      </blockquote>
      <figcaption className="mt-4 flex items-center justify-between">
        <span className="font-display text-lg text-gold-deep">{wish.name}</span>
        <span className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-charcoal/40">
          {timeAgo(wish.createdAt)}
        </span>
      </figcaption>
    </motion.figure>
  )
}

const inputCls =
  'w-full bg-transparent py-2.5 font-serif text-lg text-charcoal placeholder-charcoal/30 outline-none'

export default function Wishes() {
  const [form, setForm] = useState({ name: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending
  const [toast, setToast] = useState(null) // { type, text }
  const [list, setList] = useState([])

  useEffect(() => {
    let alive = true
    fetchWishes().then(({ wishes }) => {
      if (alive) setList([...wishes].reverse()) // newest first
    })
    return () => {
      alive = false
    }
  }, [])

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Vui lòng cho biết tên của bạn.'
    if (form.message.trim().length < 2) e.message = 'Hãy viết đôi dòng nhé.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    if (status === 'sending') return
    if (!validate()) return
    setStatus('sending')
    setToast(null)
    try {
      const { wish } = await submitWish(form)
      setList((l) => [wish, ...l])
      setForm({ name: '', message: '' })
      setToast({ type: 'ok', text: 'Cảm ơn bạn! Lời chúc đã được gửi đến chúng mình. ✦' })
    } catch (err) {
      setToast({ type: 'err', text: err.message || 'Có lỗi xảy ra. Vui lòng thử lại.' })
    } finally {
      setStatus('idle')
    }
  }

  return (
    <section id="wishes" className="relative mx-auto max-w-content px-6 py-28 sm:py-36">
      {/* ---------- GIFTS / QR ---------- */}
      <SectionHeading eyebrow={gifts.eyebrow} title={gifts.title} intro={gifts.intro} />

      <div className="mt-14 flex flex-wrap items-stretch justify-center gap-7">
        {gifts.qrs.map((qr, i) => (
          <QRCard key={qr.side} data={qr} index={i} />
        ))}
      </div>

      <Ornament className="mx-auto my-20 opacity-80" width={240} />

      {/* ---------- WISHES / GUESTBOOK ---------- */}
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />

      {/* form */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 1, ease: EASE }}
        className="relative mx-auto mt-12 max-w-2xl"
      >
        <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-soft-pink/40 via-champagne/25 to-transparent blur-2xl" />
        <form onSubmit={onSubmit} className="glass rounded-[1.75rem] p-8 shadow-glass sm:p-10">
          <label className="group block text-left">
            <span className="font-sans text-[0.62rem] uppercase tracking-[0.28em] text-charcoal/55">
              Tên của bạn
            </span>
            <div className="relative mt-2">
              <input
                type="text"
                value={form.name}
                onChange={set('name')}
                placeholder={copy.placeholderName}
                className={inputCls}
              />
              <span className="absolute bottom-0 left-0 h-px w-full bg-charcoal/15" />
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-focus-within:w-full" />
            </div>
            {errors.name && <span className="mt-1.5 block font-serif text-sm italic text-rose-gold">{errors.name}</span>}
          </label>

          <label className="group mt-7 block text-left">
            <span className="font-sans text-[0.62rem] uppercase tracking-[0.28em] text-charcoal/55">
              Lời chúc
            </span>
            <div className="relative mt-2">
              <textarea
                rows={4}
                value={form.message}
                onChange={set('message')}
                placeholder={copy.placeholderMessage}
                className={`${inputCls} resize-none`}
              />
              <span className="absolute bottom-0 left-0 h-px w-full bg-charcoal/15" />
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-focus-within:w-full" />
            </div>
            {errors.message && <span className="mt-1.5 block font-serif text-sm italic text-rose-gold">{errors.message}</span>}
          </label>

          <div className="mt-8 flex flex-col items-center gap-4">
            <MagneticButton type="submit" variant="solid" className="min-w-[220px]">
              {status === 'sending' ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    className="h-3.5 w-3.5 rounded-full border-2 border-ink/30 border-t-ink"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                  Đang gửi…
                </span>
              ) : (
                copy.button
              )}
            </MagneticButton>

            <AnimatePresence>
              {toast && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`font-serif text-base italic ${
                    toast.type === 'ok' ? 'text-gold-deep' : 'text-rose-gold'
                  }`}
                >
                  {toast.text}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>
      </motion.div>

      {/* wishes wall */}
      <div className="mx-auto mt-16 max-w-4xl">
        <div className="mb-8 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-gold/40" />
          <h3 className="text-center font-display text-2xl text-charcoal">
            {copy.wallTitle}
            {list.length > 0 && <span className="ml-2 text-gold/70">({list.length})</span>}
          </h3>
          <span className="h-px w-10 bg-gold/40" />
        </div>

        {list.length === 0 ? (
          <p className="text-center font-serif text-xl italic text-charcoal/55">{copy.emptyState}</p>
        ) : (
          <div className="columns-1 gap-5 sm:columns-2">
            <AnimatePresence initial={false}>
              {list.map((wish) => (
                <WishCard key={wish.id} wish={wish} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}
