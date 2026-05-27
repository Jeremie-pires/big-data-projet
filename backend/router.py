from fastapi import APIRouter

from predictor import predict
from schemas import PredictRequest, PredictResponse, StatsResponse

router = APIRouter()


@router.get("/health")
def health_check():
    return {"status": "ok", "model_loaded": True}


@router.post("/predict", response_model=PredictResponse)
def predict_crime_rate(req: PredictRequest) -> PredictResponse:
    value = predict(req)
    return PredictResponse(prediction=value, region=req.region)


@router.get("/stats", response_model=StatsResponse)
def get_stats() -> StatsResponse:
    return StatsResponse(
        mean=86.9,
        median=33.0,
        n_zones=1603,
        model_mae=91.6,
        model_r2=0.205,
    )
