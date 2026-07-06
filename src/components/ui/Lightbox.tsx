import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

type LightboxProps = {
  photos: { src: string; alt: string }[]
  open: boolean
  onClose: () => void
  /** Défile automatiquement à travers toutes les photos. */
  autoPlay?: boolean
  /** Durée d'affichage de chaque photo en ms. */
  intervalMs?: number
}

export function Lightbox({ photos, open, onClose, autoPlay = false, intervalMs = 3500 }: LightboxProps) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(autoPlay)

  const goPrev = useCallback(() => {
    setIndex((current) => (current - 1 + photos.length) % photos.length)
  }, [photos.length])

  const goNext = useCallback(() => {
    setIndex((current) => (current + 1) % photos.length)
  }, [photos.length])

  // Réinitialise à l'ouverture.
  useEffect(() => {
    if (open) {
      setIndex(0)
      setPlaying(autoPlay)
    }
  }, [open, autoPlay])

  // Défilement automatique.
  useEffect(() => {
    if (!open || !playing || photos.length <= 1) return
    const timer = setInterval(goNext, intervalMs)
    return () => clearInterval(timer)
  }, [open, playing, photos.length, intervalMs, goNext])

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose, goPrev, goNext])

  const current = photos[index]

  return createPortal(
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-4 right-4 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="size-5" aria-hidden />
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Photo précédente"
                className="absolute left-2 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
              >
                <ChevronLeft className="size-6" aria-hidden />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Photo suivante"
                className="absolute right-2 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
              >
                <ChevronRight className="size-6" aria-hidden />
              </button>
            </>
          )}

          <AnimatePresence mode="popLayout">
            <motion.img
              key={current.src}
              src={current.src}
              alt={current.alt}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
          </AnimatePresence>

          <div className="absolute bottom-6 flex items-center gap-3">
            {photos.length > 1 && (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? 'Mettre en pause' : 'Lancer le défilement'}
                className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
              </button>
            )}
            {photos.length > 1 && (
              <span className="rounded-full bg-white/10 px-4 py-1 text-sm text-white">
                {index + 1} / {photos.length}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
