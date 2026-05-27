import math
from pathlib import Path

# modele_crimes.pkl was pickled with an old numpy that stores MT19937 as a
# class type instead of a string name. Patch the ctor before joblib.load.
import numpy.random._pickle as _nrp

_orig_bit_generator_ctor = _nrp.__bit_generator_ctor

def _compat_bit_generator_ctor(bit_generator_name="MT19937"):
    if isinstance(bit_generator_name, type):
        return bit_generator_name()
    return _orig_bit_generator_ctor(bit_generator_name)

_nrp.__bit_generator_ctor = _compat_bit_generator_ctor

import joblib
import numpy as np
import pandas as pd

from schemas import PredictRequest

_MODEL_PATH = Path(__file__).parent / "modele_crimes.pkl"
_pipeline = joblib.load(_MODEL_PATH)


def predict(req: PredictRequest) -> float:
    population = max(req.population, 1)  # guard against log(0)
    df = pd.DataFrame(
        [
            {
                "Region_2013_label": req.region,
                "Territorial_authority_area_2013_label": req.territorial_authority,
                "Urban_area_2013_label": req.urban_area_label,
                "Urban_area_type": req.urban_area_type,
                "Population_mid_point_2015": population,
                "Log_Population": math.log(population),
                "Is_Auckland": 1 if "auckland" in req.region.lower() else 0,
            }
        ]
    )
    result: np.ndarray = _pipeline.predict(df)
    return round(float(result[0]), 2)
