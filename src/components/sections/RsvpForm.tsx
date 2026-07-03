import { useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { Divider } from '@/components/ui/Divider'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

const statusOptions = [
  { value: 'YES', label: 'Je serai présent(e)' },
  { value: 'MAYBE', label: "Je ne suis pas encore sûr(e)" },
  { value: 'NO', label: 'Je ne pourrai pas venir' },
] as const

export function RsvpForm() {
  const [status, setStatus] = useState<(typeof statusOptions)[number]['value']>('YES')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Branchement au stockage prévu dans une prochaine étape.
    setSubmitted(true)
  }

  return (
    <section id="rsvp" className="bg-white px-6 py-24">
      <SectionReveal className="mx-auto max-w-lg text-center">
        <span className="text-xs tracking-[0.3em] text-sky-deep uppercase">Présence</span>
        <h2 className="mt-3 font-serif text-4xl font-medium text-ink sm:text-5xl">
          Confirmez votre présence
        </h2>
        <Divider />

        <div className="mt-10 rounded-3xl border border-sky/20 bg-gradient-to-b from-white to-cloud p-6 shadow-[0_20px_50px_-25px_rgba(2,132,199,0.4)] sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <CheckCircle2 className="size-10 text-sky-deep" aria-hidden />
              <p className="font-serif text-lg text-ink">Merci, votre présence est confirmée.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div>
                <label htmlFor="rsvp-name" className="block text-sm font-medium text-ink-soft">
                  Votre nom <span className="text-sky-deep">*</span>
                </label>
                <input
                  id="rsvp-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="mt-2 w-full rounded-xl border border-sky/30 bg-white px-4 py-3 text-ink placeholder:text-ink-soft/40 focus:border-sky-deep focus:ring-2 focus:ring-sky/40 focus:outline-none"
                  placeholder="Prénom et nom"
                />
              </div>

              <fieldset>
                <legend className="text-sm font-medium text-ink-soft">
                  Serez-vous présent(e) ?
                </legend>
                <div className="mt-2 space-y-2">
                  {statusOptions.map((option) => (
                    <label
                      key={option.value}
                      className={cn(
                        'flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors',
                        status === option.value
                          ? 'border-sky-deep bg-sky/10'
                          : 'border-sky/25 bg-white hover:bg-cloud',
                      )}
                    >
                      <input
                        type="radio"
                        name="status"
                        value={option.value}
                        checked={status === option.value}
                        onChange={() => setStatus(option.value)}
                        className="accent-[#0284c7]"
                      />
                      <span className="text-sm text-ink">{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {status !== 'NO' && (
                <div>
                  <label htmlFor="rsvp-guests" className="block text-sm font-medium text-ink-soft">
                    Nombre de personnes (vous inclus(e))
                  </label>
                  <input
                    id="rsvp-guests"
                    name="guestCount"
                    type="number"
                    min={1}
                    max={20}
                    defaultValue={1}
                    className="mt-2 w-full rounded-xl border border-sky/30 bg-white px-4 py-3 text-ink focus:border-sky-deep focus:ring-2 focus:ring-sky/40 focus:outline-none"
                  />
                </div>
              )}

              <Button type="submit" className="w-full">
                Confirmer ma réponse
              </Button>
            </form>
          )}
        </div>
      </SectionReveal>
    </section>
  )
}
