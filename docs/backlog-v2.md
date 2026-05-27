# Backlog V2

Priorisé à partir des apprentissages V1 (déploiement HF Spaces, tests internes) et des objectifs de soutenance.

## 🟢 Must (sans ça, pas livrable en soutenance)

- [ ] Frontend branché sur `/api/predict` — formulaire fonctionnel avec retour de la valeur prédite
- [ ] Affichage de la performance modèle dans l'UI (MAE = 91.6, R² = 0.205) — section "À propos du modèle"
- [ ] Gestion d'erreur 422 dans le formulaire (champ manquant → message inline)
- [ ] Tooltip ou phrase explicative sur l'unité "crimes / 10 000 hab"

## 🔵 Should (vraiment souhaitable)

- [ ] Endpoint `/api/stats` — retourne moyenne NZ, distribution par région, top 5 zones — pour alimenter les graphiques Recharts
- [ ] Graphique Recharts "Taux prédit vs moyenne nationale" affiché après prédiction
- [ ] Conserver les valeurs du formulaire entre deux prédictions (friction identifiée en V1)

## 🟡 Could (si le temps le permet)

- [ ] Endpoint `/api/explain` — feature importance du GBR pour expliquer la prédiction
- [ ] Filtre par région sur les graphiques Recharts
- [ ] Badge "zone peu représentée dans les données" pour les régions inconnues du modèle

## 🔴 Won't (hors périmètre, décision consciente)

- [ ] Authentification utilisateur
- [ ] Historique des prédictions
- [ ] Mobile-first / responsive parfait
- [ ] Données temps réel (dataset figé 2013–2015, pas de flux NZ Police)
- [ ] Ré-entraînement automatique du modèle
