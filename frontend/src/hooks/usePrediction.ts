import { useMutation } from '@tanstack/react-query'
import { postPredict } from '../api/predict'
import type { PredictRequest } from '../types/prediction'

export function usePrediction() {
  return useMutation({
    mutationFn: (req: PredictRequest) => postPredict(req),
  })
}
