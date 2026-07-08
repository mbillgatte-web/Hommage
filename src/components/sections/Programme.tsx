import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { Divider } from '@/components/ui/Divider'
import { siteContent } from '@/content/site-content'

export function Programme() {
  const { heading, announcement, days } = siteContent.programme

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-cloud px-6 py-24">
      <SectionReveal className="relative mx-auto max-w-3xl text-center">
        <span className="text-xs tracking-[0.3em] text-sky-deep uppercase">Annonce</span>
        <h2 className="mt-3 font-serif text-4xl font-medium text-ink sm:text-5xl">{heading}</h2>
        <Divider />
      </SectionReveal>

      <SectionReveal className="relative mx-auto mt-10 max-w-2xl rounded-3xl border border-sky/20 bg-white/80 p-8 text-left shadow-[0_14px_35px_-15px_rgba(2,132,199,0.3)] backdrop-blur-sm sm:p-10">
        <div className="space-y-5 font-serif text-base italic leading-relaxed text-ink sm:text-lg">
          {announcement.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </SectionReveal>

      <div className="relative mx-auto mt-14 max-w-3xl space-y-6">
        {days.map((day, index) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
            className="overflow-hidden rounded-2xl border border-sky/20 bg-white shadow-[0_10px_30px_-18px_rgba(2,132,199,0.35)]"
          >
            <div className="flex flex-wrap items-center gap-3 bg-sky-deep px-6 py-4">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium tracking-wide text-white uppercase">
                {day.date}
              </span>
              <h3 className="font-serif text-lg text-white sm:text-xl">{day.title}</h3>
            </div>
            <ul className="space-y-3 px-6 py-5">
              {day.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="flex items-start gap-3 text-sm text-ink-soft sm:text-base"
                >
                  {typeof item === 'string' ? (
                    <>
                      <span
                        aria-hidden
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-sky-deep/60"
                      />
                      <span>{item}</span>
                    </>
                  ) : (
                    <>
                      <span className="mt-0.5 flex shrink-0 items-center gap-1 rounded-full bg-sky/15 px-2.5 py-0.5 text-xs font-medium text-sky-deep">
                        <Clock className="size-3" aria-hidden />
                        {item.time}
                      </span>
                      <span>{item.label}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
