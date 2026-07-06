import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

type LightboxProps = {
  photos: { src: string; alt: string }[]
  index: number | null
  onClose: () => void
  onChangeIndex: (index: number) => void
}

export function Lightbox({ photos, index, onClose, onChangeIndex }: LightboxProps) {
  const open = index !== null
  const current = open ? photos[index] : null

  const goPrev = useCallback(() => {
    if (index === null) return
    onChangeIndex((index - 1 + photos.length) % photos.length)
  }, [index, photos.length, onChangeIndex])

  const goNext = useCallback(() => {
    if (index === null) return
    onChangeIndex((index + 1) % photos.length)
  }, [index, photos.length, onChangeIndex])

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

  return createPortal(
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 px-4 backdrop-blur-sm"
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

          <motion.img
            key={current.src}
            src={current.src}
            alt={current.alt}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
          />

          {photos.length > 1 && (
            <span className="absolute bottom-6 rounded-full bg-white/10 px-4 py-1 text-sm text-white">
              {index !== null ? index + 1 : 0} / {photos.length}
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
