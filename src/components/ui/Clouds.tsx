import { motion } from 'framer-motion'

function CloudShape({ scale = 1, opacity = 1 }: { scale?: number; opacity?: number }) {
  return (
    <svg
      width={220 * scale}
      height={90 * scale}
      viewBox="0 0 220 90"
      fill="none"
      aria-hidden
      style={{ opacity }}
    >
      <defs>
        <radialGradient id="cloudGrad" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#eaf5fd" />
        </radialGradient>
      </defs>
      <g fill="url(#cloudGrad)">
        <ellipse cx="60" cy="58" rx="46" ry="30" />
        <ellipse cx="104" cy="46" rx="54" ry="40" />
        <ellipse cx="150" cy="56" rx="48" ry="32" />
        <ellipse cx="110" cy="66" rx="70" ry="26" />
      </g>
    </svg>
  )
}

type DriftCloudProps = {
  top: string
  startX: string
  duration: number
  delay?: number
  scale?: number
  opacity?: number
  blur?: number
}

function DriftCloud({
  top,
  startX,
  duration,
  delay = 0,
  scale = 1,
  opacity = 0.9,
  blur = 0,
}: DriftCloudProps) {
  return (
    <motion.div
      className="pointer-events-none absolute left-0"
      style={{ top, filter: blur ? `blur(${blur}px)` : undefined }}
      initial={{ x: startX }}
      animate={{ x: ['-20vw', '120vw'] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    >
      <CloudShape scale={scale} opacity={opacity} />
    </motion.div>
  )
}

/** Ciel de nuages en parallaxe : couches lointaines lentes et floues, couches proches nettes. */
export function Clouds() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* couche lointaine — floue, lente */}
      <DriftCloud top="8%" startX="-10vw" duration={90} scale={1.4} opacity={0.5} blur={4} />
      <DriftCloud top="26%" startX="40vw" duration={110} delay={8} scale={1.1} opacity={0.45} blur={3} />
      {/* couche médiane */}
      <DriftCloud top="14%" startX="60vw" duration={70} delay={4} scale={1} opacity={0.8} blur={1} />
      <DriftCloud top="62%" startX="10vw" duration={80} delay={2} scale={1.2} opacity={0.7} blur={1} />
      {/* couche proche — nette, plus rapide */}
      <DriftCloud top="72%" startX="70vw" duration={55} delay={6} scale={0.85} opacity={0.95} />
      <DriftCloud top="40%" startX="90vw" duration={64} delay={10} scale={0.7} opacity={0.9} />
    </div>
  )
}
