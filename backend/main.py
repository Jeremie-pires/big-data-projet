from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from router import router

app = FastAPI(title="Crime Rate Predictor — NZ", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routes MUST be declared before the static catch-all
app.include_router(router, prefix="/api")

# Serve built React app — Docker uses frontend_dist/, local dev uses frontend/dist/
_dist_docker = Path(__file__).parent / "frontend_dist"
_dist_local = Path(__file__).parents[1] / "frontend" / "dist"
DIST = _dist_docker if _dist_docker.exists() else _dist_local

if DIST.exists():
    app.mount("/", StaticFiles(directory=DIST, html=True), name="static")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
