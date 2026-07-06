import { Hero } from '@/components/sections/Hero'
import { Biography } from '@/components/sections/Biography'
import { Gallery } from '@/components/sections/Gallery'
import { Testimonials } from '@/components/sections/Testimonials'
import { Countdown } from '@/components/sections/Countdown'
import { RsvpForm } from '@/components/sections/RsvpForm'
import { MessageForm } from '@/components/sections/MessageForm'

function App() {
  return (
    <main>
      <Hero />
      <Biography />
      <Gallery />
      <Testimonials />
      <Countdown />
      <RsvpForm />
      <MessageForm />
      <footer className="bg-cloud px-6 py-10 text-center">
        <p className="font-serif text-sm italic text-ink-soft/70">
          En mémoire de Mama MAVOO ODETTE — avec amour, sa famille
        </p>
        <p className="mt-4 text-xs text-ink-soft/50">
          © {new Date().getFullYear()} — Réalisé par{' '}
          <a
            href="https://agi-conseil.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-sky-deep"
          >
            agi-conseil.com
          </a>
        </p>
      </footer>
    </main>
  )
}

export default App
