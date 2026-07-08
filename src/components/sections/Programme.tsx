import { motion } from 'framer-motion'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { Divider } from '@/components/ui/Divider'
import { cn } from '@/lib/cn'
import { siteContent } from '@/content/site-content'

type ProgrammeItem = string | { time: string; label: string }
type ProgrammeDay = { date: string; title: string; items: ProgrammeItem[] }

function TimelineCard({ day, side }: { day: ProgrammeDay; side: 'start' | 'end' }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-sky/15 bg-white/90 p-5 shadow-[0_8px_24px_-16px_rgba(2,132,199,0.35)] sm:p-6',
        side === 'start' ? 'sm:text-right' : 'sm:text-left',
      )}
    >
      <p className="text-xs font-medium tracking-[0.2em] text-sky-deep uppercase">{day.date}</p>
      <h3 className="mt-1 font-serif text-xl text-ink sm:text-2xl">{day.title}</h3>
      <ul className={cn('mt-3 flex flex-col gap-2', side === 'start' && 'sm:items-end')}>
        {day.items.map((item, index) => (
          <li key={index} className="text-sm text-ink-soft sm:text-base">
            {typeof item === 'string' ? (
              item
            ) : (
              <>
                <span className="font-medium text-sky-deep">{item.time}</span>
                {' — '}
                {item.label}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

const dotVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

const cardVariants = {
  hidden: (x: number) => ({ opacity: 0, x }),
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

function TimelineRow({ day, index }: { day: ProgrammeDay; index: number }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="relative grid grid-cols-[32px_1fr] items-start gap-x-4 sm:grid-cols-[1fr_32px_1fr] sm:gap-x-8"
    >
      <div className="hidden sm:block">
        {isEven && (
          <motion.div variants={cardVariants} custom={-32}>
            <TimelineCard day={day} side="start" />
          </motion.div>
        )}
      </div>

      <div className="flex justify-center pt-1">
        <motion.span
          variants={dotVariants}
          className="z-10 flex size-4 items-center justify-center rounded-full bg-sky-deep ring-4 ring-white"
          aria-hidden
        />
      </div>

      <div>
        <div className="sm:hidden">
          <motion.div variants={cardVariants} custom={24}>
            <TimelineCard day={day} side="end" />
          </motion.div>
        </div>
        <div className="hidden sm:block">
          {!isEven && (
            <motion.div variants={cardVariants} custom={32}>
              <TimelineCard day={day} side="end" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function Programme() {
  const { heading, announcement, days } = siteContent.programme

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-cloud px-6 py-24">
      <SectionReveal className="relative mx-auto max-w-2xl text-center">
        <span className="text-xs tracking-[0.3em] text-sky-deep uppercase">Annonce</span>
        <h2 className="mt-3 font-serif text-4xl font-medium text-ink sm:text-5xl">{heading}</h2>
        <Divider />
        <div className="mt-8 space-y-4 text-left font-serif text-base italic leading-relaxed text-ink-soft sm:text-lg">
          {announcement.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </SectionReveal>

      <div className="relative mx-auto mt-16 max-w-4xl">
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-sky/5 via-sky/40 to-sky/5 sm:left-1/2 sm:-translate-x-1/2"
        />
        <div className="space-y-10 sm:space-y-14">
          {days.map((day, index) => (
            <TimelineRow key={day.date} day={day} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
