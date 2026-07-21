import { motion } from 'framer-motion'
import { couple } from '../../data/content'

const EASE = [0.22, 1, 0.36, 1]

/**
 * A realistic paper envelope. When `open` flips true the wax-sealed flap folds
 * back in 3D and the invitation card glides up and out from inside.
 */
export default function Envelope({ appear, open }) {
  return (
    <motion.div
      className="relative"
      style={{ width: 'clamp(280px, 82vw, 430px)', perspective: 1600 }}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={appear ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 30 }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      {/* ambient glow */}
      <div
        className="absolute -inset-16 -z-10 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(197,160,92,0.34), transparent 70%)' }}
      />

      {/* envelope body box */}
      <div className="relative w-full" style={{ aspectRatio: '1.5 / 1', transformStyle: 'preserve-3d' }}>
        {/* drop shadow */}
        <div
          className="absolute inset-x-6 bottom-[-6%] h-[18%] rounded-[50%] blur-xl"
          style={{ background: 'rgba(35,31,28,0.4)' }}
        />

        {/* inside / back panel (visible once open) */}
        <div
          className="absolute inset-0 rounded-[6px]"
          style={{
            background: 'linear-gradient(160deg, #efe4d3, #e2d0b9)',
            boxShadow: 'inset 0 2px 18px rgba(120,90,50,0.25)',
          }}
        />

        {/* THE LETTER / invitation card */}
        <motion.div
          className="absolute left-[5%] right-[5%] z-20 overflow-hidden rounded-[4px]"
          style={{
            bottom: '6%',
            height: '94%',
            background: 'linear-gradient(165deg, #fffdf8 0%, #fbf4e7 100%)',
            boxShadow: '0 10px 30px -12px rgba(120,90,50,0.5)',
          }}
          initial={{ y: 0 }}
          animate={open ? { y: '-78%', scale: 1.03 } : { y: 0, scale: 1 }}
          transition={{ duration: 1.3, ease: EASE, delay: open ? 0.65 : 0 }}
        >
          <div className="flex h-full flex-col items-center justify-start px-6 pt-7 text-center">
            <span className="font-sans text-[0.55rem] uppercase tracking-[0.42em] text-gold-deep">
              Trân trọng kính mời
            </span>
            <div className="my-3 h-px w-12 bg-gold/50" />
            <span className="font-script text-2xl text-rose-gold">Lễ thành hôn của</span>
            <h3 className="mt-2 font-display text-2xl leading-tight text-charcoal sm:text-[1.7rem]">
              {couple.groom}
              <span className="mx-1.5 text-gold">&amp;</span>
              {couple.bride}
            </h3>
            <span className="mt-3 font-serif text-sm tracking-[0.3em] text-charcoal/70">
              {couple.dateShort}
            </span>
          </div>
        </motion.div>

        {/* front pocket — covers lower part, with a V notch at the top */}
        <div
          className="absolute inset-0 z-30 rounded-[6px]"
          style={{
            clipPath: 'polygon(0% 0%, 50% 46%, 100% 0%, 100% 100%, 0% 100%)',
            background: 'linear-gradient(155deg, #f6ecdb 0%, #ead9c1 55%, #e1cdaf 100%)',
            boxShadow: 'inset 0 0 30px rgba(140,105,60,0.16)',
          }}
        >
          {/* seam highlights */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, transparent 49.6%, rgba(164,126,59,0.22) 50%, transparent 50.4%), linear-gradient(225deg, transparent 49.6%, rgba(164,126,59,0.22) 50%, transparent 50.4%)',
            }}
          />
        </div>

        {/* THE FLAP */}
        <motion.div
          className="absolute left-0 top-0 w-full origin-top"
          style={{
            height: '54%',
            clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
            background: 'linear-gradient(160deg, #f3e6d2 0%, #e6d3b7 70%, #dcc7a6 100%)',
            boxShadow: '0 6px 16px -8px rgba(120,90,50,0.4)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'visible',
          }}
          initial={{ rotateX: 0, zIndex: 40 }}
          animate={
            open
              ? { rotateX: -172, zIndex: [40, 40, 4, 4] }
              : { rotateX: 0, zIndex: 40 }
          }
          transition={{
            rotateX: { duration: 1, ease: EASE },
            zIndex: { duration: 1, times: [0, 0.45, 0.46, 1] },
          }}
        >
          {/* wax seal */}
          <motion.div
            className="absolute left-1/2 top-[78%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:h-14 sm:w-14"
            style={{
              background: 'radial-gradient(circle at 35% 30%, #d49aa0, #b3656f 55%, #8f4953)',
              boxShadow: '0 4px 12px rgba(90,40,45,0.5), inset 0 1px 4px rgba(255,255,255,0.4)',
            }}
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-display text-base text-ivory/95 sm:text-lg">P&amp;D</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
