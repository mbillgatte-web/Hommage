import { useState } from 'react'
import { motion } from 'framer-motion'
import { Images } from 'lucide-react'
import { Divider } from '@/components/ui/Divider'
import { Lightbox } from '@/components/ui/Lightbox'
import { Button } from '@/components/ui/Button'
import { siteContent } from '@/content/site-content'

export function Gallery() {
  const { heading, photos } = siteContent.gallery
  const [open, setOpen] = useState(false)

  if (photos.length === 0) return null

  const coverPhoto = photos[0]

  return (
    <section className="relative overflow-hidden px-6 py-24 text-center">
      {/* fond flouté */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${coverPhoto.src})`, filter: 'blur(18px)', transform: 'scale(1.15)' }}
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink/70" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-lg"
      >
        <span className="text-xs tracking-[0.3em] text-sky uppercase">Galerie</span>
        <h2 className="mt-3 font-serif text-4xl font-medium text-white sm:text-5xl">{heading}</h2>
        <Divider />
        <p className="mt-6 text-white/80">
          {photos.length} photo{photos.length > 1 ? 's' : ''} en souvenir d'elle.
        </p>

        <Button type="button" onClick={() => setOpen(true)} className="mt-8 mx-auto">
          <Images className="size-4" aria-hidden />
          Voir les photos
        </Button>
      </motion.div>

      <Lightbox photos={photos} open={open} onClose={() => setOpen(false)} autoPlay />
    </section>
  )
}
