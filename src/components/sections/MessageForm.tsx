import { useState, type FormEvent } from 'react'
import { HeartHandshake, Lock } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { Divider } from '@/components/ui/Divider'
import { Button } from '@/components/ui/Button'

export function MessageForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Branchement au stockage prévu dans une prochaine étape.
    setSubmitted(true)
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

        <div className="mt-8 rounded-3xl border border-sky/20 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(2,132,199,0.4)] sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <HeartHandshake className="size-10 text-sky-deep" aria-hidden />
              <p className="font-serif text-lg text-ink">
                Merci pour ce mot, il touchera la famille.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div>
                <label htmlFor="message-name" className="block text-sm font-medium text-ink-soft">
                  Votre nom <span className="text-sky-deep">*</span>
                </label>
                <input
                  id="message-name"
                  name="authorName"
                  type="text"
                  required
                  autoComplete="name"
                  className="mt-2 w-full rounded-xl border border-sky/30 bg-cloud px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-sky-deep focus:ring-2 focus:ring-sky/40 focus:outline-none"
                  placeholder="Prénom et nom"
                />
              </div>

              <div>
                <label htmlFor="message-content" className="block text-sm font-medium text-ink-soft">
                  Votre message <span className="text-sky-deep">*</span>
                </label>
                <textarea
                  id="message-content"
                  name="content"
                  required
                  rows={5}
                  maxLength={2000}
                  className="mt-2 w-full resize-none rounded-xl border border-sky/30 bg-cloud px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-sky-deep focus:ring-2 focus:ring-sky/40 focus:outline-none"
                  placeholder="Écrivez ici votre message pour la famille..."
                />
              </div>

              <Button type="submit" className="w-full">
                Envoyer mon message
              </Button>
            </form>
          )}
        </div>
      </SectionReveal>
    </section>
  )
}
