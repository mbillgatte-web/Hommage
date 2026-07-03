import { motion } from 'framer-motion'

type FlyingDoveProps = {
  /** keyframes de déplacement horizontal (en %) */
  xPath: string[]
  /** keyframes de déplacement vertical (en %) */
  yPath: string[]
  duration: number
  delay?: number
  scale?: number
  flip?: boolean
}

/**
 * Colombe stylisée qui bat des ailes (flapping) tout en dérivant dans le ciel.
 * Les ailes battent via une oscillation rapide de scaleY/rotate ;
 * le corps dérive lentement le long d'un chemin.
 */
export function FlyingDove({
  xPath,
  yPath,
  duration,
  delay = 0,
  scale = 1,
  flip = false,
}: FlyingDoveProps) {
  return (
    <motion.div
      className="pointer-events-none absolute top-0 left-0 text-white drop-shadow-[0_2px_6px_rgba(56,189,248,0.35)]"
      style={{ scaleX: flip ? -scale : scale, scaleY: scale }}
      initial={{ x: xPath[0], y: yPath[0], opacity: 0 }}
      animate={{ x: xPath, y: yPath, opacity: [0, 0.9, 0.9, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="54" height="40" viewBox="0 0 54 40" fill="none" aria-hidden>
        {/* corps + tête + queue */}
        <path
          d="M4 30 C12 30 16 26 22 24 C28 22 34 22 40 18 C46 14 50 12 52 8 C50 16 46 22 40 26 C34 30 26 32 18 32 C12 32 7 32 4 30 Z"
          fill="currentColor"
          opacity="0.95"
        />
        {/* aile gauche (bat) */}
        <motion.path
          d="M22 24 C24 16 28 8 34 4 C30 12 30 20 30 24 Z"
          fill="currentColor"
          style={{ transformOrigin: '28px 24px' }}
          animate={{ rotate: [0, -32, 0], scaleY: [1, 0.72, 1] }}
          transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut', delay }}
        />
        {/* aile droite (bat, décalée) */}
        <motion.path
          d="M22 24 C22 30 26 36 34 38 C30 32 28 28 30 24 Z"
          fill="currentColor"
          opacity="0.8"
          style={{ transformOrigin: '28px 24px' }}
          animate={{ rotate: [0, 26, 0], scaleY: [1, 1.15, 1] }}
          transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut', delay }}
        />
      </svg>
    </motion.div>
  )
}
