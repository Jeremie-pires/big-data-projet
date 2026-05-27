# Question prédictive

## Énoncé

> **Étant donné la région, le type d'urbanisation et la population d'une zone géographique néo-zélandaise, quel est le taux de criminalité attendu (crimes pour 10 000 habitants) ?**

## Cible y

| Propriété | Valeur |
|---|---|
| Colonne | ` Rate_per_10000_population ` (nettoyée : suppression espaces + virgules + lignes `-`) |
| Type | Continu (float) |
| Unité | Victimisations pour **10 000** habitants |
| Famille ML | **Régression** |

## Features X retenues

| Feature | Rôle | Type |
|---|---|---|
| `Region_2013_label` | Zone administrative de premier niveau | catégoriel → OneHotEncoder |
| `Territorial_authority_area_2013_label` | Subdivision régionale | catégoriel → OneHotEncoder |
| `Urban_area_type` | Degré d'urbanisation | catégoriel → OneHotEncoder |
| `Population_mid_point_2015` | Volume de population brut | numérique → StandardScaler |
| `Log_Population` | Population log-transformée (linéarise la relation) | numérique → StandardScaler |
| `Is_Auckland` | Indicateur outlier Auckland | binaire |

## Modèle

**GradientBoostingRegressor** (scikit-learn) encapsulé dans un `Pipeline` :

```
ColumnTransformer
├── SimpleImputer (median) + StandardScaler  → colonnes numériques
└── OneHotEncoder (ignore inconnu)           → colonnes catégorielles
└── GradientBoostingRegressor
```

Le GBR a été préféré à une régression linéaire car les relations population/criminalité sont non-linéaires, et aux forêts aléatoires pour sa meilleure performance sur des datasets de taille modeste.

## Métrique principale

**MAE (Mean Absolute Error)** en unité `crimes / 10 000 hab`.

Justification : plus lisible qu'un RMSE pour un utilisateur non-statisticien ("le modèle se trompe en moyenne de X victimisations pour 10 000 habitants"), et moins sensible aux outliers que le RMSE — pertinent ici car les CBD/zones touristiques affichent des taux jusqu'à 5 750.

Métrique secondaire : **R²** pour évaluer la part de variance expliquée.

## Scores finaux (V1 — test set, évalué une seule fois)

| Métrique | CV 5-fold (tuning) | **Test set** |
|---|---|---|
| MAE | 73.2 crimes / 10 000 hab | **91.6 crimes / 10 000 hab** |
| R² | — | **0.205** |

**Lecture honnête :** l'écart CV/test (+18 MAE) indique un léger overfit sur le jeu d'entraînement. Le R² = 0.205 signifie que le modèle n'explique que 20 % de la variance — acceptable pour un premier modèle sur un dataset de 1 603 lignes avec des outliers extrêmes (taux jusqu'à 5 750), mais à améliorer en V2 via de meilleures features socio-économiques.
