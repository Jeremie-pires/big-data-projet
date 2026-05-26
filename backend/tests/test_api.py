import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

VALID_PAYLOAD = {
    "region": "Canterbury Region",
    "territorial_authority": "Christchurch City",
    "urban_area_label": "Christchurch urban area",
    "urban_area_type": "Main urban area",
    "population": 50000,
}


def test_health():
    r = client.get("/api/health")
    assert r.status_code == 200
    body = r.json()
    assert body["status"] == "ok"
    assert body["model_loaded"] is True


def test_predict_returns_number():
    r = client.post("/api/predict", json=VALID_PAYLOAD)
    assert r.status_code == 200
    body = r.json()
    assert "prediction" in body
    assert isinstance(body["prediction"], (int, float))
    assert body["prediction"] > 0


def test_predict_rejects_bad_input():
    r = client.post("/api/predict", json={"region": "Auckland"})
    assert r.status_code == 422
