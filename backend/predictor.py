import math
from pathlib import Path

import joblib
import numpy as np
import pandas as pd

from schemas import PredictRequest

_MODEL_PATH = Path(__file__).parent / "modele_crimes.pkl"
_pipeline = joblib.load(_MODEL_PATH)


def predict(req: PredictRequest) -> float:
    df = pd.DataFrame(
        [
            {
                "Region_2013_label": req.region,
                "Territorial_authority_area_2013_label": req.territorial_authority,
                "Urban_area_2013_label": req.urban_area_label,
                "Urban_area_type": req.urban_area_type,
                "Population_mid_point_2015": req.population,
                "Log_Population": math.log(req.population),
                "Is_Auckland": 1 if "auckland" in req.region.lower() else 0,
            }
        ]
    )
    result: np.ndarray = _pipeline.predict(df)
    return round(float(result[0]), 2)
