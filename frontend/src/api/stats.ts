import type { StatsResponse } from '../types/prediction'

const BASE = import.meta.env.VITE_API_URL ?? ''

export async function getStats(): Promise<StatsResponse> {
  const r = await fetch(`${BASE}/api/stats`)
  if (!r.ok) throw new Error('Erreur API /stats')
  return r.json()
}
