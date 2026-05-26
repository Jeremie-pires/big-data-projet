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
