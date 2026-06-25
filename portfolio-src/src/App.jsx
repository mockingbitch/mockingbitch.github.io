import { MotionConfig } from 'framer-motion'
import { useLenis } from './hooks/useLenis.js'
import Background from './components/Background.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/sections/Hero.jsx'
import About from './components/sections/About.jsx'
import Skills from './components/sections/Skills.jsx'
import Experience from './components/sections/Experience.jsx'
import Projects from './components/sections/Projects.jsx'
import Contact from './components/sections/Contact.jsx'
import Footer from './components/sections/Footer.jsx'

export default function App() {
  useLenis()

  return (
    // reducedMotion="user" makes Framer honor prefers-reduced-motion globally
    // (it drives motion via JS, which CSS media queries can't reach).
    <MotionConfig reducedMotion="user">
      <a
        href="#home"
        className="sr-only btn-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>
      <Background />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
