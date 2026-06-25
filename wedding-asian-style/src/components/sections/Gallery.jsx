import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import Lightbox from '../ui/Lightbox'
import { gallery } from '../../data/content'
import { EASE, viewport } from '../../lib/motion'

export default function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <section id="gallery" className="relative mx-auto max-w-content px-6 py-28 sm:py-36">
      <SectionHeading eyebrow={gallery.eyebrow} title={gallery.title} intro={gallery.intro} />

      <div className="mt-16 columns-2 gap-4 sm:gap-5 lg:columns-3">
        {gallery.images.map((image, i) => (
          <motion.button
            key={image.src}
            type="button"
            onClick={() => setActive(i)}
            data-cursor="hover"
            aria-label={`View ${image.alt}`}
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 1, ease: EASE, delay: (i % 3) * 0.12 }}
            className={`group relative mb-4 block w-full overflow-hidden rounded-sm sm:mb-5 ${
              image.span === 'tall' ? 'aspect-[3/4]' : 'aspect-[4/3]'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[1.5s] ease-luxe group-hover:scale-[1.12]"
            />
            {/* hover veil + caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center gap-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="h-px w-6 bg-champagne" />
              <span className="font-serif text-base italic text-ivory">{image.alt}</span>
            </div>
            {/* corner expand glyph */}
            <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-ivory opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M4 9V4h5M20 15v5h-5M15 4h5v5M9 20H4v-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </motion.button>
        ))}
      </div>

      <Lightbox
        images={gallery.images}
        index={active}
        onClose={() => setActive(null)}
        onNavigate={setActive}
      />
    </section>
  )
}
