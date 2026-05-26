import type { PredictResponse } from '../types/prediction'

const NATIONAL_AVERAGE = 28.5

interface Props {
  data: PredictResponse
}

export default function ResultCard({ data }: Props) {
  const diff = data.prediction - NATIONAL_AVERAGE
  const isAbove = diff > 0

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">Taux prédit pour {data.region}</p>
          <p className="text-4xl font-bold text-indigo-600 mt-1">
            {data.prediction.toFixed(1)}
            <span className="text-lg font-normal text-gray-500 ml-2">{data.unit}</span>
          </p>
        </div>
        {data.region.toLowerCase().includes('auckland') && (
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
            Outlier Auckland
          </span>
        )}
      </div>

      <div className={`rounded-lg px-3 py-2 text-sm ${isAbove ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
        {isAbove ? '▲' : '▼'} {Math.abs(diff).toFixed(1)} par rapport à la moyenne nationale ({NATIONAL_AVERAGE})
      </div>
    </div>
  )
}
