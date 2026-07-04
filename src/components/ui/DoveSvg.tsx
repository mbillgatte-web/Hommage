import { motion } from 'framer-motion'

/**
 * Colombe reconnaissable (corps, tête, bec, queue) dont les ailes battent.
 * `flapDuration` contrôle la vitesse du battement.
 */
export function DoveSvg({
  size = 60,
  flapDuration = 0.6,
  delay = 0,
  className,
}: {
  size?: number
  flapDuration?: number
  delay?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 80 60"
      fill="none"
      className={className}
      aria-hidden
    >
      {/* queue */}
      <path d="M6 34 L26 30 L22 42 Z" fill="#ffffff" />
      {/* corps */}
      <path
        d="M22 34 Q40 24 58 28 Q52 40 36 42 Q27 42 22 34 Z"
        fill="#ffffff"
      />
      {/* tête */}
      <circle cx="60" cy="26" r="6" fill="#ffffff" />
      {/* bec */}
      <path d="M66 25 L74 23 L66 29 Z" fill="#f0b93a" />
      {/* oeil */}
      <circle cx="61" cy="25" r="1.1" fill="#3d5a7a" />
      {/* aile supérieure (bat vers le haut) */}
      <motion.path
        d="M32 32 Q38 10 54 4 Q46 18 44 32 Z"
        fill="#ffffff"
        style={{ transformOrigin: '38px 32px' }}
        animate={{ rotate: [0, -34, 0], scaleY: [1, 0.78, 1] }}
        transition={{ duration: flapDuration, repeat: Infinity, ease: 'easeInOut', delay }}
      />
      {/* aile inférieure (bat vers le bas) */}
      <motion.path
        d="M32 34 Q34 48 48 56 Q40 44 42 34 Z"
        fill="#eaf5fd"
        style={{ transformOrigin: '38px 34px' }}
        animate={{ rotate: [0, 22, 0], scaleY: [1, 1.12, 1] }}
        transition={{ duration: flapDuration, repeat: Infinity, ease: 'easeInOut', delay }}
      />
    </svg>
  )
}
