# Crime Rate Predictor — New Zealand

Application full-stack de prédiction du taux de criminalité par zone géographique en Nouvelle-Zélande, développée dans le cadre d'un projet Bachelor Data.

À partir de la région, du type d'urbanisation et de la population d'une zone, le modèle (GradientBoostingRegressor) estime un taux de criminalité en crimes pour 1 000 habitants. La cible : permettre à un analyste ou un citoyen curieux de comparer des zones entre elles sans connaissances en data science.

**Dataset :** statistiques de criminalité NZ Police croisées avec le recensement Stats NZ 2013 et les estimations de population 2015.

## Stack

| Couche | Technologies |
|---|---|
| Frontend | Vite · React · TypeScript · Tailwind CSS · Recharts · React Query |
| Backend | FastAPI · Python · joblib · scikit-learn · pandas |
| Modèle | `modele_crimes.pkl` — Pipeline sklearn (GradientBoostingRegressor) |

## Lancer le projet

**Backend**
```bash
cd backend
pip install -r requirements.txt
python main.py
# → API disponible sur http://localhost:8000
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
# → App disponible sur http://localhost:5173
```

**Build de production**
```bash
cd frontend && npm run build
```

## Documentation

| Document | Contenu |
|---|---|
| [docs/architecture.md](docs/architecture.md) | Schéma global, flux de données |
| [docs/dataset.md](docs/dataset.md) | Description précise du dataset, colonnes, limites |
| [docs/question-predictive.md](docs/question-predictive.md) | Cible, features, choix du modèle et de la métrique |
| [docs/user-journey.md](docs/user-journey.md) | Parcours utilisateur |
| [docs/diagramme-sequence.md](docs/diagramme-sequence.md) | Séquence technique front ↔ back ↔ modèle |
