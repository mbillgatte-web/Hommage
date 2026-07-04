export const N8N_RSVP_WEBHOOK_URL = import.meta.env.VITE_N8N_RSVP_WEBHOOK_URL as string | undefined
export const N8N_MESSAGE_WEBHOOK_URL = import.meta.env.VITE_N8N_MESSAGE_WEBHOOK_URL as
  | string
  | undefined
export const N8N_TESTIMONIALS_LIST_URL = import.meta.env.VITE_N8N_TESTIMONIALS_LIST_URL as
  | string
  | undefined

export async function postToWebhook(url: string | undefined, payload: Record<string, unknown>) {
  if (!url) {
    throw new Error(
      "Aucune URL de webhook configurée (variable d'environnement manquante).",
    )
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Le serveur a répondu avec une erreur (${response.status}).`)
  }
}

export type LiveTestimonial = {
  authorName: string
  content: string
  photoUrl?: string | null
}

/** Récupère les témoignages famille publiés dynamiquement. Échoue silencieusement
 * (page publique : on ne veut jamais afficher d'erreur aux visiteurs). */
export async function fetchLiveTestimonials(): Promise<LiveTestimonial[]> {
  if (!N8N_TESTIMONIALS_LIST_URL) return []
  try {
    const response = await fetch(N8N_TESTIMONIALS_LIST_URL)
    if (!response.ok) return []
    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(',')[1] ?? '')
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}
