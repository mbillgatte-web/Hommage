import { Bird } from 'lucide-react'

export function Divider() {
  return (
    <div className="mx-auto mt-6 flex items-center justify-center gap-3">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-sky/60" />
      <Bird className="size-4 text-sky-deep/70" aria-hidden />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-sky/60" />
    </div>
  )
}
