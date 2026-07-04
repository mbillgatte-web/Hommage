import { motion } from 'framer-motion'

function Feather({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.6} viewBox="0 0 20 32" fill="none" aria-hidden>
      <path
        d="M10 1 C4 8 2 18 10 31 C18 18 16 8 10 1 Z"
        fill="#ffffff"
        stroke="#cfe6f7"
        strokeWidth="0.8"
      />
      <path d="M10 5 L10 28" stroke="#cfe6f7" strokeWidth="0.7" />
    </svg>
  )
}

const drops = [
  { left: '12%', delay: 0, duration: 11, size: 14, sway: 30 },
  { left: '28%', delay: 4, duration: 14, size: 18, sway: -40 },
  { left: '48%', delay: 2, duration: 12, size: 12, sway: 25 },
  { left: '66%', delay: 6, duration: 15, size: 16, sway: -30 },
  { left: '82%', delay: 1, duration: 13, size: 15, sway: 35 },
]

/** Plumes qui descendent en tournoyant doucement à travers le ciel. */
export function Feathers() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {drops.map((f, i) => (
        <motion.div
          key={i}
          className="absolute -top-10"
          style={{ left: f.left }}
          initial={{ y: '-10%', x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: '110vh',
            x: [0, f.sway, -f.sway / 2, f.sway, 0],
            opacity: [0, 0.85, 0.85, 0.6, 0],
            rotate: [0, 60, -40, 80, 140],
          }}
          transition={{ duration: f.duration, delay: f.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Feather size={f.size} />
        </motion.div>
      ))}
    </div>
  )
}
