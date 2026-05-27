import type { PredictRequest, PredictResponse } from '../types/prediction'

const BASE = import.meta.env.VITE_API_URL ?? ''

export async function postPredict(req: PredictRequest): Promise<PredictResponse> {
  const res = await fetch(`${BASE}/api/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}))
    throw new Error(detail?.detail ?? `Erreur ${res.status}`)
  }
  return res.json()
}
