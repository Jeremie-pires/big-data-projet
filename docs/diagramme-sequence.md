# Diagramme de séquence — Flux de prédiction

Décrit l'enchaînement technique complet lors d'une demande de prédiction, depuis le clic utilisateur jusqu'à l'affichage du résultat.

```mermaid
sequenceDiagram
    actor U as Utilisateur
    participant FE as React Frontend
    participant RQ as React Query
    participant API as FastAPI Backend
    participant P as Pipeline sklearn
    participant M as GradientBoostingRegressor

    U->>FE: Remplit le formulaire et clique "Prédire"
    FE->>RQ: useMutation → déclenche la requête

    RQ->>API: POST /predict<br/>{ region, territorial_authority,<br/>  urban_area, urban_type,<br/>  population }

    API->>API: Validation Pydantic (PredictRequest)
    API->>API: Construit DataFrame pandas<br/>+ ajoute Log_Population, Is_Auckland

    API->>P: pipeline.predict(df)
    P->>P: ColumnTransformer.transform()<br/>(imputation, scaling, encoding)
    P->>M: GBR.predict(X_transformed)
    M-->>P: [34.7]
    P-->>API: np.ndarray([34.7])

    API-->>RQ: 200 OK<br/>{ prediction: 34.7,<br/>  unit: "crimes/1000 hab",<br/>  region: "Auckland" }

    RQ-->>FE: data mis à jour (cache React Query)
    FE-->>U: Affiche résultat + graphique Recharts
```

## Points d'erreur à gérer

| Cas | Réponse API | Comportement Frontend |
|---|---|---|
| Payload invalide (champ manquant) | `422 Unprocessable Entity` | Message de validation inline sur le formulaire |
| Région inconnue du modèle | `200` avec avertissement `unknown_category: true` | Badge "zone peu représentée dans les données" |
| Backend inaccessible | Timeout / `503` | Toast d'erreur, retry automatique React Query |
