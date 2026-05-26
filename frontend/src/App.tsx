import PredictForm from './components/PredictForm'
import ResultCard from './components/ResultCard'
import ComparisonChart from './components/ComparisonChart'
import { usePrediction } from './hooks/usePrediction'

export default function App() {
  const { mutate, data, isPending, error } = usePrediction()

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Crime Rate Predictor</h1>
          <p className="mt-2 text-sm text-gray-500">
            Nouvelle-Zélande · GradientBoostingRegressor · données 2013–2015
          </p>
        </div>

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
      </div>
    </div>
  )
}
