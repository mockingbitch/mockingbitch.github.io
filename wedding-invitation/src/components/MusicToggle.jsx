import { motion } from 'framer-motion'

/**
 * A small glass pill that fades in and lets guests turn the ambient score on
 * or off. Controlled: state lives in <App/> so the preloader and page share it.
 */
export default function MusicToggle({ playing, onToggle, show = true }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      data-cursor="hover"
      aria-pressed={playing}
      aria-label={playing ? 'Pause music' : 'Play music'}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : -12 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      className="glass-dark fixed right-5 top-5 z-[110] flex items-center gap-2.5 rounded-full px-4 py-2.5 text-ivory/90 sm:right-7 sm:top-7"
    >
      {/* equalizer / note icon */}
      <span className="flex h-4 w-4 items-end justify-center gap-[2px]">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="w-[2px] rounded-full bg-champagne"
            animate={
              playing
                ? { height: ['30%', '100%', '45%', '85%', '30%'] }
                : { height: '28%' }
            }
            transition={
              playing
                ? { duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }
                : { duration: 0.4 }
            }
            style={{ height: '30%' }}
          />
        ))}
      </span>
      <span className="text-[0.6rem] font-medium uppercase tracking-[0.28em]">
        {playing ? 'Đang phát' : 'Âm nhạc'}
      </span>
    </motion.button>
  )
}
