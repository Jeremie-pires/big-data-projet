export interface PredictRequest {
  region: string
  territorial_authority: string
  urban_area_label: string
  urban_area_type: string
  population: number
}

export interface PredictResponse {
  prediction: number
  unit: string
  region: string
}

export interface StatsResponse {
  mean: number
  median: number
  n_zones: number
  model_mae: number
  model_r2: number
}
