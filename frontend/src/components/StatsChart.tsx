import { useQuery } from '@tanstack/react-query'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { getStats } from '../api/stats'

export default function StatsChart() {
  const { data, isPending, error } = useQuery({ queryKey: ['stats'], queryFn: getStats })

  if (isPending) return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-sm text-gray-400">
      Chargement des statistiques…
    </div>
  )

  if (error) return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm text-sm text-red-600">
      Impossible de charger les statistiques.
    </div>
  )

  const chartData = [
    { name: 'Médiane NZ', value: data.median },
    { name: 'Moyenne NZ', value: data.mean },
  ]

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
      <div>
        <p className="text-sm font-medium text-gray-700">Distribution nationale — taux de criminalité (2015)</p>
        <p className="text-xs text-gray-400 mt-0.5">{data.n_zones} zones · crimes / 10 000 habitants</p>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} unit=" c/10k" />
          <Tooltip formatter={(v) => [`${Number(v).toFixed(1)} crimes / 10 000 hab`, '']} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            <Cell fill="#6366f1" />
            <Cell fill="#f59e0b" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <p className="text-xs text-gray-400">
        L'écart médiane / moyenne (33 vs 87) illustre la distribution fortement asymétrique — quelques zones touristiques ou CBD tirent la moyenne vers le haut.
      </p>
    </div>
  )
}
