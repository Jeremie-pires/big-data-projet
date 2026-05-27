import PredictForm from './components/PredictForm'
import ResultCard from './components/ResultCard'
import ComparisonChart from './components/ComparisonChart'
import StatsChart from './components/StatsChart'
import { usePrediction } from './hooks/usePrediction'

export default function App() {
  const { mutate, data, isPending, error } = usePrediction()

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Crime Rate Predictor</h1>
          <p className="mt-2 text-sm text-gray-500">
            Nouvelle-Zélande · GradientBoostingRegressor · données 2013–2015
          </p>
        </div>

        {/* Section Prédire */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Prédire</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <PredictForm onSubmit={mutate} isLoading={isPending} />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {(error as Error).message}
            </div>
          )}

          {data && (
            <>
              <ResultCard data={data} />
              <ComparisonChart prediction={data.prediction} region={data.region} />
            </>
          )}
        </section>

        {/* Section Explorer */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Explorer</h2>
          <StatsChart />
        </section>

        {/* Section Performance modèle */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Performance du modèle</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-xs text-gray-400 mb-4">Évalué une seule fois sur le test set (20 % des données, 321 zones)</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-indigo-50 p-4 text-center">
                <p className="text-2xl font-bold text-indigo-700">91.6</p>
                <p className="text-xs text-indigo-500 mt-1">MAE — crimes / 10 000 hab</p>
                <p className="text-xs text-gray-400 mt-1">Le modèle se trompe en moyenne de 91.6 unités</p>
              </div>
              <div className="rounded-lg bg-amber-50 p-4 text-center">
                <p className="text-2xl font-bold text-amber-700">0.205</p>
                <p className="text-xs text-amber-500 mt-1">R² — variance expliquée</p>
                <p className="text-xs text-gray-400 mt-1">20 % de la variance expliquée — outliers difficiles</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
