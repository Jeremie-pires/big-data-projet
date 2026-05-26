from pydantic import BaseModel, Field


class PredictRequest(BaseModel):
    region: str = Field(..., examples=["Auckland"])
    territorial_authority: str = Field(..., examples=["Auckland Council"])
    urban_area_label: str = Field(..., examples=["Auckland urban area"])
    urban_area_type: str = Field(..., examples=["Major urban area"])
    population: int = Field(..., gt=0, examples=[1500000])


class PredictResponse(BaseModel):
    prediction: float
    unit: str = "crimes / 1 000 habitants"
    region: str
