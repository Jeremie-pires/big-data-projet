import { useState } from 'react'
import type { PredictRequest } from '../types/prediction'
import options from '../data/options.json'

const REGIONS = Object.keys(options.authByRegion)
  .filter((r) => r !== 'Area Outside Region')
  .sort()

const URBAN_TYPES = ['Main urban area', 'Secondary urban area', 'Minor urban area', 'Rural area']

const SELECT_CLASS =
  'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed'

interface FormState {
  region: string
  territorial_authority: string
  urban_area_type: string
  population: number
}

const DEFAULT: FormState = { region: '', territorial_authority: '', urban_area_type: '', population: 0 }

interface Props {
  onSubmit: (req: PredictRequest) => void
  isLoading: boolean
}

export default function PredictForm({ onSubmit, isLoading }: Props) {
  const [form, setForm] = useState<FormState>(DEFAULT)

  const authorities = form.region
    ? ((options.authByRegion as Record<string, string[]>)[form.region] ?? []).filter(
        (a) => a !== 'Area Outside Territorial Authority'
      )
    : []

  const handle =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = field === 'population' ? Number(e.target.value) : e.target.value
      setForm((prev) => ({
        ...prev,
        [field]: value,
        ...(field === 'region' ? { territorial_authority: '' } : {}),
      }))
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const urban_area_label =
      (options.urbanByAuth as Record<string, string>)[form.territorial_authority] ?? ''
    onSubmit({ ...form, urban_area_label })
  }

  const isValid =
    form.region && form.territorial_authority && form.urban_area_type && form.population > 0

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Région</label>
          <select value={form.region} onChange={handle('region')} required className={SELECT_CLASS}>
            <option value="">Sélectionner…</option>
            {REGIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type urbain</label>
          <select
            value={form.urban_area_type}
            onChange={handle('urban_area_type')}
            required
            className={SELECT_CLASS}
          >
            <option value="">Sélectionner…</option>
            {URBAN_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Autorité territoriale
          </label>
          <select
            value={form.territorial_authority}
            onChange={handle('territorial_authority')}
            required
            disabled={!form.region}
            className={SELECT_CLASS}
          >
            <option value="">
              {form.region ? 'Sélectionner…' : 'Sélectionnez d\'abord une région'}
            </option>
            {authorities.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Population <span className="text-gray-400 font-normal">(estimation 2015)</span>
          </label>
          <input
            type="number"
            value={form.population || ''}
            onChange={handle('population')}
            required
            min={1}
            placeholder="ex : 150 000"
            className={SELECT_CLASS}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Calcul en cours…' : 'Prédire le taux de criminalité'}
      </button>
    </form>
  )
}
