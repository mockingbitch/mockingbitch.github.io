import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import Preloader from './components/Preloader/Preloader'
import Atmosphere from './components/background/Atmosphere'
import PetalsCanvas from './components/background/PetalsCanvas'
import CustomCursor from './components/CustomCursor'
import MusicToggle from './components/MusicToggle'
import Navbar from './components/Navbar'

import Hero from './components/sections/Hero'
import LoveStory from './components/sections/LoveStory'
import WeddingInfo from './components/sections/WeddingInfo'
import Gallery from './components/sections/Gallery'
import Quote from './components/sections/Quote'
import Schedule from './components/sections/Schedule'
import Wishes from './components/sections/Wishes'
import Footer from './components/sections/Footer'

import { useLenis } from './hooks/useLenis'
import { useAmbientAudio } from './hooks/useAmbientAudio'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const lenisRef = useLenis(loaded)
  const { playing, toggle } = useAmbientAudio({ volume: 0.1 })

  // Keep the page pinned to the top while the intro plays.
  useEffect(() => {
    if (!loaded) {
      window.scrollTo(0, 0)
      if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    }
  }, [loaded])

  const scrollTo = useCallback(
    (id) => {
      const target = id === 'hero' ? 0 : `#${id}`
      const lenis = lenisRef.current
      if (lenis) {
        lenis.scrollTo(target, { offset: -10, duration: 1.4 })
      } else {
        const el = id === 'hero' ? document.body : document.getElementById(id)
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    [lenisRef]
  )

  return (
    <>
      <Atmosphere />
      {loaded && <PetalsCanvas density={1} />}
      <CustomCursor />

      <MusicToggle playing={playing} onToggle={toggle} show />

      <Navbar scrollTo={scrollTo} show={loaded} />

      <AnimatePresence>
        {!loaded && <Preloader key="preloader" onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      <main className="relative">
        <Hero reveal={loaded} onCta={() => scrollTo('story')} />
        <LoveStory />
        <WeddingInfo />
        <Schedule />
        <Gallery />
        <Quote />
        <Wishes />
        <Footer scrollTo={scrollTo} />
      </main>
    </>
  )
}
