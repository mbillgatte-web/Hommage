import { useState } from 'react'
import { motion } from 'framer-motion'
import { Divider } from '@/components/ui/Divider'
import { Lightbox } from '@/components/ui/Lightbox'
import { siteContent } from '@/content/site-content'

export function Gallery() {
  const { heading, photos } = siteContent.gallery
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (photos.length === 0) return null

  return (
    <section className="relative overflow-hidden bg-white px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <span className="text-xs tracking-[0.3em] text-sky-deep uppercase">Galerie</span>
        <h2 className="mt-3 font-serif text-4xl font-medium text-ink sm:text-5xl">{heading}</h2>
        <Divider />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo, index) => (
            <motion.button
              key={photo.src}
              type="button"
              onClick={() => setOpenIndex(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
              className="group aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl border border-sky/20 shadow-[0_10px_25px_-12px_rgba(2,132,199,0.4)]"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        photos={photos}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onChangeIndex={setOpenIndex}
      />
    </section>
  )
}
