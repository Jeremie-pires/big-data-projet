import { useState } from 'react'
import type { PredictRequest } from '../types/prediction'

const REGIONS = [
  'Auckland', 'Bay of Plenty', 'Canterbury', 'Gisborne', "Hawke's Bay",
  'Manawatu-Wanganui', 'Marlborough', 'Nelson', 'Northland', 'Otago',
  'Southland', 'Taranaki', 'Tasman', 'Waikato', 'Wellington', 'West Coast',
]

const URBAN_TYPES = [
  'Major urban area',
  'Large urban area',
  'Medium urban area',
  'Small urban area',
  'Rural area',
]

const DEFAULT: PredictRequest = {
  region: '',
  territorial_authority: '',
  urban_area_label: '',
  urban_area_type: '',
  population: 0,
}

interface Props {
  onSubmit: (req: PredictRequest) => void
  isLoading: boolean
}

export default function PredictForm({ onSubmit, isLoading }: Props) {
  const [form, setForm] = useState<PredictRequest>(DEFAULT)

  const set = (field: keyof PredictRequest) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: field === 'population' ? Number(e.target.value) : e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  const isValid = form.region && form.territorial_authority && form.urban_area_type && form.population > 0

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Région</label>
          <select value={form.region} onChange={set('region')} required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Sélectionner…</option>
            {REGIONS.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type urbain</label>
          <select value={form.urban_area_type} onChange={set('urban_area_type')} required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Sélectionner…</option>
            {URBAN_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Autorité territoriale</label>
          <input type="text" value={form.territorial_authority} onChange={set('territorial_authority')} required
            placeholder="ex : Auckland Council"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Zone urbaine</label>
          <input type="text" value={form.urban_area_label} onChange={set('urban_area_label')}
            placeholder="ex : Auckland urban area"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Population <span className="text-gray-400 font-normal">(estimation 2015)</span>
          </label>
          <input type="number" value={form.population || ''} onChange={set('population')} required min={1}
            placeholder="ex : 1 500 000"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      <button type="submit" disabled={!isValid || isLoading}
        className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        {isLoading ? 'Calcul en cours…' : 'Prédire le taux de criminalité'}
      </button>
    </form>
  )
}
