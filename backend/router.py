from fastapi import APIRouter

from predictor import predict
from schemas import PredictRequest, PredictResponse

router = APIRouter()


@router.post("/predict", response_model=PredictResponse)
def predict_crime_rate(req: PredictRequest) -> PredictResponse:
    value = predict(req)
    return PredictResponse(prediction=value, region=req.region)
