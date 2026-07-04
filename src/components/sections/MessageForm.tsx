import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import {
  HeartHandshake,
  Lock,
  MessageCircleHeart,
  Camera,
  Users,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { Divider } from '@/components/ui/Divider'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { N8N_MESSAGE_WEBHOOK_URL, postToWebhook } from '@/lib/webhooks'

type Step = 'choice' | 'family' | 'friend' | 'success'
type MessageType = 'family' | 'friend'

const fade = {
  initial: { opacity: 0, x: 12 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.2 },
}

export function MessageForm() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>('choice')
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function closeModal() {
    setOpen(false)
    // Laisse l'animation de fermeture se jouer avant de réinitialiser l'étape.
    setTimeout(() => {
      setStep('choice')
      setPhotoPreview(null)
      setError(null)
    }, 250)
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setPhotoPreview((previous) => {
      if (previous) URL.revokeObjectURL(previous)
      return URL.createObjectURL(file)
    })
  }

  async function handleSubmit(type: MessageType, event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    const formData = new FormData(event.currentTarget)

    try {
      await postToWebhook(N8N_MESSAGE_WEBHOOK_URL, {
        type,
        authorName: String(formData.get('authorName') ?? '').trim(),
        content: String(formData.get('content') ?? '').trim(),
        submittedAt: new Date().toISOString(),
      })
      setStep('success')
    } catch {
      setError("Votre message n'a pas pu être envoyé. Veuillez réessayer.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="bg-gradient-to-b from-cloud to-white px-6 py-24">
      <SectionReveal className="mx-auto max-w-lg text-center">
        <span className="text-xs tracking-[0.3em] text-sky-deep uppercase">Message privé</span>
        <h2 className="mt-3 font-serif text-4xl font-medium text-ink sm:text-5xl">
          Un mot pour la famille
        </h2>
        <Divider />
        <p className="mt-4 flex items-center justify-center gap-2 text-sm text-ink-soft">
          <Lock className="size-4 text-sky-deep" aria-hidden />
          Ce message est privé et ne sera visible que par la famille.
        </p>

        <Button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-8 mx-auto"
        >
          <MessageCircleHeart className="size-4" aria-hidden />
          Laisser un message
        </Button>
      </SectionReveal>

      <Modal open={open} onClose={closeModal} labelledBy="message-modal-title">
        <>
          {step === 'choice' && (
            <motion.div key="choice" {...fade}>
              <h3 id="message-modal-title" className="text-center font-serif text-2xl font-medium text-ink">
                Vous êtes...
              </h3>
              <p className="mt-2 text-center text-sm text-ink-soft">
                Le formulaire s'adapte selon votre lien avec Mama Odette.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setStep('family')}
                  className="group flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-sky/25 bg-cloud/60 p-6 text-center transition-colors hover:border-sky-deep hover:bg-sky/10"
                >
                  <Users className="size-8 text-sky-deep" aria-hidden />
                  <span className="font-serif text-lg text-ink">De la famille</span>
                  <span className="text-xs text-ink-soft">Un fils, une fille, un(e) petit(e)-fils/fille…</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep('friend')}
                  className="group flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-sky/25 bg-cloud/60 p-6 text-center transition-colors hover:border-sky-deep hover:bg-sky/10"
                >
                  <HeartHandshake className="size-8 text-sky-deep" aria-hidden />
                  <span className="font-serif text-lg text-ink">Un(e) ami(e)</span>
                  <span className="text-xs text-ink-soft">Un proche qui l'a connue</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 'family' && (
            <motion.div key="family" {...fade}>
              <button
                type="button"
                onClick={() => setStep('choice')}
                className="mb-4 flex cursor-pointer items-center gap-1 text-sm text-ink-soft hover:text-sky-deep"
              >
                <ArrowLeft className="size-4" aria-hidden /> Retour
              </button>
              <h3 id="message-modal-title" className="font-serif text-2xl font-medium text-ink">
                Un mot en tant que famille
              </h3>

              <form onSubmit={(event) => handleSubmit('family', event)} className="mt-6 space-y-5 text-left">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex size-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-sky/40 bg-cloud text-sky-deep transition-colors hover:border-sky-deep"
                  >
                    {photoPreview ? (
                      <img src={photoPreview} alt="" className="size-full object-cover" />
                    ) : (
                      <Camera className="size-6" aria-hidden />
                    )}
                  </button>
                  <div>
                    <p className="text-sm font-medium text-ink-soft">Votre photo (optionnelle)</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer text-xs text-sky-deep underline underline-offset-2"
                    >
                      {photoPreview ? 'Changer la photo' : 'Ajouter une photo'}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="family-name" className="block text-sm font-medium text-ink-soft">
                    Votre nom <span className="text-sky-deep">*</span>
                  </label>
                  <input
                    id="family-name"
                    name="authorName"
                    type="text"
                    required
                    autoComplete="name"
                    className="mt-2 w-full rounded-xl border border-sky/30 bg-cloud px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-sky-deep focus:ring-2 focus:ring-sky/40 focus:outline-none"
                    placeholder="Prénom et nom"
                  />
                </div>

                <div>
                  <label htmlFor="family-content" className="block text-sm font-medium text-ink-soft">
                    Votre message <span className="text-sky-deep">*</span>
                  </label>
                  <textarea
                    id="family-content"
                    name="content"
                    required
                    rows={4}
                    maxLength={2000}
                    className="mt-2 w-full resize-none rounded-xl border border-sky/30 bg-cloud px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-sky-deep focus:ring-2 focus:ring-sky/40 focus:outline-none"
                    placeholder="Écrivez ici votre message pour la famille..."
                  />
                </div>

                {error && (
                  <p className="flex items-center gap-2 text-sm text-red-600" role="alert">
                    <AlertCircle className="size-4 shrink-0" aria-hidden />
                    {error}
                  </p>
                )}

                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? 'Envoi en cours…' : 'Envoyer mon message'}
                </Button>
              </form>
            </motion.div>
          )}

          {step === 'friend' && (
            <motion.div key="friend" {...fade}>
              <button
                type="button"
                onClick={() => setStep('choice')}
                className="mb-4 flex cursor-pointer items-center gap-1 text-sm text-ink-soft hover:text-sky-deep"
              >
                <ArrowLeft className="size-4" aria-hidden /> Retour
              </button>
              <h3 id="message-modal-title" className="font-serif text-2xl font-medium text-ink">
                Un mot en tant qu'ami(e)
              </h3>

              <form onSubmit={(event) => handleSubmit('friend', event)} className="mt-6 space-y-5 text-left">
                <div>
                  <label htmlFor="friend-name" className="block text-sm font-medium text-ink-soft">
                    Votre nom <span className="text-sky-deep">*</span>
                  </label>
                  <input
                    id="friend-name"
                    name="authorName"
                    type="text"
                    required
                    autoComplete="name"
                    className="mt-2 w-full rounded-xl border border-sky/30 bg-cloud px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-sky-deep focus:ring-2 focus:ring-sky/40 focus:outline-none"
                    placeholder="Prénom et nom"
                  />
                </div>

                <div>
                  <label htmlFor="friend-content" className="block text-sm font-medium text-ink-soft">
                    Votre message <span className="text-sky-deep">*</span>
                  </label>
                  <textarea
                    id="friend-content"
                    name="content"
                    required
                    rows={4}
                    maxLength={2000}
                    className="mt-2 w-full resize-none rounded-xl border border-sky/30 bg-cloud px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-sky-deep focus:ring-2 focus:ring-sky/40 focus:outline-none"
                    placeholder="Écrivez ici votre message pour la famille..."
                  />
                </div>

                {error && (
                  <p className="flex items-center gap-2 text-sm text-red-600" role="alert">
                    <AlertCircle className="size-4 shrink-0" aria-hidden />
                    {error}
                  </p>
                )}

                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? 'Envoi en cours…' : 'Envoyer mon message'}
                </Button>
              </form>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div key="success" {...fade} className="flex flex-col items-center gap-3 py-6 text-center">
              <HeartHandshake className="size-10 text-sky-deep" aria-hidden />
              <h3 id="message-modal-title" className="font-serif text-2xl font-medium text-ink">
                Merci pour ce mot
              </h3>
              <p className="text-sm text-ink-soft">Il touchera la famille.</p>
              <Button type="button" variant="outline" onClick={closeModal} className="mt-2">
                Fermer
              </Button>
            </motion.div>
          )}
        </>
      </Modal>
    </section>
  )
}
