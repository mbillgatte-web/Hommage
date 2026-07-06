import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clouds } from '@/components/ui/Clouds'
import { Feathers } from '@/components/ui/Feathers'
import { DoveSvg } from '@/components/ui/DoveSvg'
import { siteContent } from '@/content/site-content'

const SPARKLES = [
  { top: '6%', left: '18%', delay: 0, size: 8 },
  { top: '16%', left: '82%', delay: 0.8, size: 6 },
  { top: '70%', left: '12%', delay: 1.4, size: 7 },
  { top: '62%', left: '86%', delay: 0.4, size: 9 },
  { top: '30%', left: '8%', delay: 1.1, size: 5 },
  { top: '40%', left: '92%', delay: 1.7, size: 6 },
]

export function Hero() {
  const { fullName, initials, photoSrc, birthYear, deathYear, tagline } = siteContent.hero
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#a8d8f5] via-cloud to-white px-6 text-center">
      {/* rayons de lumière célestes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_0%,transparent_0deg,rgba(255,255,255,0.5)_20deg,transparent_40deg,transparent_320deg,rgba(255,255,255,0.5)_340deg,transparent_360deg)] opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.95),transparent_55%)]"
      />

      {mounted && (
        <>
          <Clouds />
          <Feathers />

          {/* scintillements */}
          {SPARKLES.map((s, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.9)]"
              style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2.4, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </>
      )}

      {/* Portrait + colombes juste à côté */}
      <div className="relative z-10 flex items-center justify-center">
        {/* colombe de gauche */}
        {mounted && (
          <motion.div
            className="absolute right-full mr-2 hidden sm:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.5 },
              x: { duration: 0.8, delay: 0.5 },
              y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <DoveSvg size={82} flapDuration={0.55} />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 14, delay: 0.1 }}
          className="relative"
        >
          {/* auréole pulsante */}
          <motion.div
            aria-hidden
            className="absolute -inset-4 rounded-full bg-gradient-to-br from-white via-sky/40 to-[#a8d8f5]/50 blur-2xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* anneau doré tournant lentement */}
          <motion.div
            aria-hidden
            className="absolute -inset-1 rounded-full border border-dashed border-sky/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative flex size-60 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gradient-to-b from-cloud to-white shadow-[0_20px_55px_-12px_rgba(2,132,199,0.55)] sm:size-64 md:size-72">
            {photoSrc ? (
              <img src={photoSrc} alt={fullName} className="size-full rounded-full object-cover" />
            ) : (
              <span className="font-serif text-5xl font-medium text-sky-deep sm:text-6xl">
                {initials}
              </span>
            )}
          </div>
        </motion.div>

        {/* colombe de droite */}
        {mounted && (
          <motion.div
            className="absolute left-full ml-2 hidden sm:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.7 },
              x: { duration: 0.8, delay: 0.7 },
              y: { duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 },
            }}
          >
            <DoveSvg size={72} flapDuration={0.62} delay={0.2} className="-scale-x-100" />
          </motion.div>
        )}
      </div>

      {/* colombes visibles aussi sur mobile (au-dessus du portrait) */}
      {mounted && (
        <div className="pointer-events-none absolute top-[14%] z-10 flex w-full justify-between px-6 sm:hidden">
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
            <DoveSvg size={52} flapDuration={0.55} />
          </motion.div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}>
            <DoveSvg size={46} flapDuration={0.62} className="-scale-x-100" />
          </motion.div>
        </div>
      )}

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
