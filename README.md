# Crime Rate Predictor — New Zealand

Application full-stack de prédiction du taux de criminalité par zone géographique en Nouvelle-Zélande, développée dans le cadre d'un projet Bachelor Data. À partir de la région, du type d'urbanisation et de la population d'une zone, un modèle GradientBoostingRegressor (scikit-learn, MAE = 91.6 crimes / 10 000 hab, R² = 0.205) estime le taux de criminalité attendu. L'objectif : permettre à un analyste ou un citoyen curieux de comparer des zones entre elles sans connaissances en data science, via un formulaire simple et des visualisations Recharts.

**Dataset :** statistiques de criminalité NZ Police croisées avec le recensement Stats NZ 2013 et les estimations de population 2015 — 1 603 zones géographiques utilisables après nettoyage.

## En ligne

**URL publique :** https://jeremie-pires-bigdata-projet.hf.space

Déployé sur Hugging Face Spaces (Docker). L'URL sert le frontend React et l'API FastAPI sur la même origine.

## Stack

| Couche | Technologies |
|---|---|
| Frontend | Vite · React · TypeScript · Tailwind CSS · Recharts · React Query |
| Backend | FastAPI · Python · joblib · scikit-learn · pandas |
| Modèle | `modele_crimes.pkl` — Pipeline sklearn (GradientBoostingRegressor) |

## Lancer en local

**Mode développement** (hot-reload, front séparé sur :5173)

```bash
# Terminal 1 — Backend
cd backend
pip install -r requirements.txt
python main.py          # → API sur http://localhost:8000

# Terminal 2 — Frontend
cd frontend
npm install
npm run dev             # → App sur http://localhost:5173
```

**Mode production** (front intégré, tout sur :8000)

```bash
cd frontend && npm run build   # génère frontend/dist/
cd ../backend && python main.py
# → http://localhost:8000 sert le front + l'API
```

**Docker** (identique au déploiement HF)

```bash
docker build -t crime-predictor .
docker run -p 7860:7860 crime-predictor
# → http://localhost:7860
```

## Documentation

| Document | Contenu |
|---|---|
| [docs/architecture.md](docs/architecture.md) | Schéma global, flux de données |
| [docs/dataset.md](docs/dataset.md) | Description précise du dataset, colonnes, limites |
| [docs/question-predictive.md](docs/question-predictive.md) | Cible, features, choix du modèle et de la métrique |
| [docs/user-journey.md](docs/user-journey.md) | Parcours utilisateur |
| [docs/diagramme-sequence.md](docs/diagramme-sequence.md) | Séquence technique front ↔ back ↔ modèle |
