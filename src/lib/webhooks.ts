export const N8N_RSVP_WEBHOOK_URL = import.meta.env.VITE_N8N_RSVP_WEBHOOK_URL as string | undefined
export const N8N_MESSAGE_WEBHOOK_URL = import.meta.env.VITE_N8N_MESSAGE_WEBHOOK_URL as
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
