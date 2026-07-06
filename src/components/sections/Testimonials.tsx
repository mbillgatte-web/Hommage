import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Quote, User } from 'lucide-react'
import { Divider } from '@/components/ui/Divider'
import { siteContent } from '@/content/site-content'
import { buildDrivePhotoUrl, fetchLiveTestimonials } from '@/lib/webhooks'

const cardTransition = (index: number) => ({
  duration: 0.55,
  delay: index * 0.1,
  ease: 'easeOut' as const,
})

const revealProps = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

type FamilyCard = {
  author: string
  relation: string
  photoSrc: string | null
  quote: string
}

export function Testimonials() {
  const staticFamily: FamilyCard[] = siteContent.testimonials
    .filter((t) => t.type === 'family')
    .map((t) => ({ author: t.author, relation: t.relation, photoSrc: t.photoSrc, quote: t.quote }))
  const friends = siteContent.testimonials.filter((t) => t.type === 'friend')

  const [liveFamily, setLiveFamily] = useState<FamilyCard[]>([])

  useEffect(() => {
    let cancelled = false
    fetchLiveTestimonials().then((entries) => {
      if (cancelled) return
      setLiveFamily(
        entries.map((entry) => ({
          author: entry.authorName,
          relation: 'Famille',
          photoSrc: buildDrivePhotoUrl(entry.photoUrl),
          quote: entry.content,
        })),
      )
    })
    return () => {
      cancelled = true
    }
  }, [])

  const family = [...staticFamily, ...liveFamily]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cloud via-white to-cloud px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <span className="text-xs tracking-[0.3em] text-sky-deep uppercase">Témoignages</span>
        <h2 className="mt-3 font-serif text-4xl font-medium text-ink sm:text-5xl">
          Ce qu'elle a laissé en nous
        </h2>
        <Divider />

        {/* Famille — grandes cartes avec photo */}
        <p className="mt-10 font-sans text-xs tracking-[0.3em] text-sky-deep uppercase">
          La famille
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {family.map((testimonial, index) => (
            <motion.figure
              key={`${testimonial.author}-${index}`}
              {...revealProps}
              whileHover={{ y: -6 }}
              transition={cardTransition(index)}
              className="flex flex-col items-center rounded-3xl border border-sky/25 bg-white p-8 text-center shadow-[0_14px_35px_-15px_rgba(2,132,199,0.4)] transition-shadow hover:shadow-[0_22px_50px_-15px_rgba(2,132,199,0.5)]"
            >
              <div className="relative">
                {testimonial.photoSrc ? (
                  <img
                    src={testimonial.photoSrc}
                    alt={testimonial.author}
                    className="size-32 rounded-full border-4 border-white object-cover shadow-lg ring-2 ring-sky/30"
                  />
                ) : (
                  <div className="flex size-32 items-center justify-center rounded-full border-4 border-white bg-cloud shadow-lg ring-2 ring-sky/30">
                    <User className="size-12 text-sky-deep/60" aria-hidden />
                  </div>
                )}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-sky-deep px-3 py-0.5 text-[10px] font-medium tracking-wide text-white uppercase shadow">
                  {testimonial.relation}
                </span>
              </div>
              <blockquote className="mt-7 flex-1 font-serif text-xl italic leading-relaxed text-ink">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-sky/15 pt-4">
                <p className="font-sans text-sm font-semibold text-ink">{testimonial.author}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Amis / proches — message seul, plus sobre */}
        {friends.length > 0 && (
          <>
            <p className="mt-16 font-sans text-xs tracking-[0.3em] text-sky-deep uppercase">
              Les amis &amp; proches
            </p>
            <div className="mx-auto mt-6 grid max-w-3xl gap-5 sm:grid-cols-2">
              {friends.map((testimonial, index) => (
                <motion.figure
                  key={testimonial.author}
                  {...revealProps}
                  transition={cardTransition(index)}
                  className="flex flex-col rounded-2xl border border-sky/15 bg-white/70 p-6 text-left backdrop-blur-sm"
                >
                  <Quote className="size-5 text-sky-deep/50" aria-hidden />
                  <blockquote className="mt-3 flex-1 font-serif text-lg italic leading-relaxed text-ink">
                    {testimonial.quote}
                  </blockquote>
                  <figcaption className="mt-4 font-sans text-sm text-ink-soft">
                    — {testimonial.author}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
