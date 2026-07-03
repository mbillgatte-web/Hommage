import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, CalendarDays } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { Divider } from '@/components/ui/Divider'
import { siteContent } from '@/content/site-content'

function getTimeLeft(targetDate: string) {
  const diff = Math.max(0, new Date(targetDate).getTime() - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function Countdown() {
  const { date, dateLabel, locationName, locationAddress, additionalInfo } = siteContent.event
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(date))

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(date)), 1000)
    return () => clearInterval(interval)
  }, [date])

  const tiles = [
    { label: 'Jours', value: timeLeft.days },
    { label: 'Heures', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Secondes', value: timeLeft.seconds },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-cloud px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 size-72 -translate-x-1/2 rounded-full bg-sky/20 blur-3xl"
      />
      <SectionReveal className="relative mx-auto max-w-3xl text-center">
        <span className="text-xs tracking-[0.3em] text-sky-deep uppercase">L'hommage</span>
        <h2 className="mt-3 flex items-center justify-center gap-3 font-serif text-4xl font-medium text-ink sm:text-5xl">
          <CalendarDays className="size-7 text-sky-deep" aria-hidden />
          {dateLabel}
        </h2>
        <Divider />

        <div className="mt-10 grid grid-cols-4 gap-3 sm:gap-6">
          {tiles.map((tile) => (
            <div
              key={tile.label}
              className="rounded-2xl border border-sky/20 bg-white/90 px-2 py-5 shadow-[0_10px_30px_-15px_rgba(2,132,199,0.4)] backdrop-blur-sm sm:px-4 sm:py-6"
            >
              <p className="bg-gradient-to-b from-sky to-sky-deep bg-clip-text font-serif text-3xl tabular-nums text-transparent sm:text-5xl">
                {String(tile.value).padStart(2, '0')}
              </p>
              <p className="mt-2 text-[10px] tracking-[0.2em] text-ink-soft uppercase sm:text-xs">
                {tile.label}
              </p>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col items-center gap-2 text-ink-soft"
        >
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-sky-deep" aria-hidden />
            <p className="font-medium text-ink">{locationName}</p>
          </div>
          <p className="text-sm text-ink-soft">{locationAddress}</p>
          <p className="mt-2 text-sm italic text-ink-soft/70">{additionalInfo}</p>
        </motion.div>
      </SectionReveal>
    </section>
  )
}
