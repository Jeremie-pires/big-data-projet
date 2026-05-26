# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Big Data project for crime data analysis and prediction. The repository is in early development — the main structure is scaffolded but not yet implemented. A pre-trained scikit-learn model (`modele_crimes.pkl`) is committed at the root.

## Repository Layout

```
backend/    # Data processing, APIs, or model-serving (Python expected)
frontend/   # Dashboard or user interface
docs/       # Project documentation
modele_crimes.pkl  # Pre-trained crime prediction model (scikit-learn pickle)
```

## Working Conventions

- **Language:** Python is expected for `backend/` (inferred from the `.pkl` model format).
- **Model file:** `modele_crimes.pkl` can be loaded with `joblib.load` or `pickle.load`. Treat it as an artifact — do not regenerate it unless explicitly asked.
- No build system, package manager, test runner, or linter is configured yet. Add commands to this file once they are set up.
- Stack : Vite + React + TS + React Query + Tailwind + Recharts / FastAPI + joblib
- Commandes : npm run dev, npm run build, python main.py
- Conventions : useState pour l'état local, React Query pour les données serveur, pas de state global
- À ne pas faire : pas de réécriture globale d'un fichier qui marche, pas de feature spéculative, changements chirurgicaux
