import { SectionReveal } from '@/components/ui/SectionReveal'
import { Divider } from '@/components/ui/Divider'
import { siteContent } from '@/content/site-content'

export function Biography() {
  const { heading, paragraphs } = siteContent.biography

  return (
    <section className="relative overflow-hidden bg-white px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cloud to-transparent"
      />
      <SectionReveal className="relative mx-auto max-w-2xl text-center">
        <span className="text-xs tracking-[0.3em] text-sky-deep uppercase">Souvenir</span>
        <h2 className="mt-3 font-serif text-4xl font-medium text-ink sm:text-5xl">{heading}</h2>
        <Divider />
        <div className="mt-8 space-y-5 text-left font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}
