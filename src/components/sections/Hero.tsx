import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clouds } from '@/components/ui/Clouds'
import { FlyingDove } from '@/components/ui/FlyingDove'
import { siteContent } from '@/content/site-content'

export function Hero() {
  const { fullName, initials, photoSrc, birthYear, deathYear, tagline } = siteContent.hero
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#bfe4fa] via-cloud to-white px-6 text-center">
      {/* halo lumineux céleste */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.9),transparent_55%)]"
      />

      {mounted && (
        <>
          <Clouds />

          {/* colombes qui battent des ailes et dérivent dans le ciel */}
          <FlyingDove
            xPath={['-8vw', '30vw', '60vw', '108vw']}
            yPath={['18%', '12%', '20%', '10%']}
            duration={26}
            scale={1}
          />
          <FlyingDove
            xPath={['108vw', '70vw', '35vw', '-8vw']}
            yPath={['30%', '24%', '30%', '26%']}
            duration={32}
            delay={5}
            scale={0.75}
            flip
          />
          <FlyingDove
            xPath={['-8vw', '45vw', '108vw']}
            yPath={['70%', '64%', '72%']}
            duration={30}
            delay={9}
            scale={0.6}
          />
        </>
      )}

      {/* portrait */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 60, damping: 14, delay: 0.1 }}
        className="relative z-10"
      >
        {/* auréole pulsante */}
        <motion.div
          aria-hidden
          className="absolute -inset-4 rounded-full bg-gradient-to-br from-white via-sky/30 to-[#bfe4fa]/40 blur-2xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative flex size-44 items-center justify-center rounded-full border-4 border-white bg-white shadow-[0_20px_50px_-15px_rgba(2,132,199,0.4)] sm:size-52">
          {photoSrc ? (
            <img src={photoSrc} alt={fullName} className="size-full rounded-full object-cover" />
          ) : (
            <span className="font-serif text-5xl font-medium text-sky-deep sm:text-6xl">
              {initials}
            </span>
          )}
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
        className="relative z-10 mt-8 font-serif text-5xl font-medium tracking-wide text-ink sm:text-6xl md:text-7xl"
      >
        {fullName}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.55 }}
        className="relative z-10 mt-3 flex items-center gap-4"
      >
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-sky/70" />
        <p className="font-serif text-xl text-ink-soft">
          {birthYear} — {deathYear}
        </p>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-sky/70" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 mt-6 max-w-md font-serif text-xl italic text-ink-soft/90 sm:text-2xl"
      >
        {tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 1, delay: 1.3 },
          y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1.3 },
        }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-ink-soft/60"
      >
        <span className="text-xs tracking-[0.25em] uppercase">Défiler</span>
        <span className="h-8 w-px bg-gradient-to-b from-sky/70 to-transparent" />
      </motion.div>
    </section>
  )
}
