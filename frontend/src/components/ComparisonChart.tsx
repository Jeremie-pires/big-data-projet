import { BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer, Cell } from 'recharts'

const NATIONAL_AVERAGE = 28.5

interface Props {
  prediction: number
  region: string
}

export default function ComparisonChart({ prediction, region }: Props) {
  const data = [
    { name: 'Moyenne nationale', value: NATIONAL_AVERAGE },
    { name: region, value: prediction },
  ]

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-700 mb-4">Comparaison avec la moyenne nationale</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} unit=" c/1k" />
          <Tooltip formatter={(v) => [`${Number(v).toFixed(1)} crimes/1 000 hab`, '']} />
          <ReferenceLine y={NATIONAL_AVERAGE} stroke="#94a3b8" strokeDasharray="4 2" />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={i === 0 ? '#94a3b8' : '#6366f1'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
