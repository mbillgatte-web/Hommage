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
      </footer>
    </main>
  )
}

export default App
