# Question prédictive

## Énoncé

> **Étant donné la région, le type d'urbanisation et la population d'une zone géographique néo-zélandaise, quel est le taux de criminalité attendu (crimes pour 1 000 habitants) ?**

## Cible y

| Propriété | Valeur |
|---|---|
| Colonne | `crime_rate` |
| Type | Continu (float) |
| Unité | Crimes pour 1 000 habitants |
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

**MAE (Mean Absolute Error)** en unité `crimes / 1 000 hab`.

Justification : plus lisible qu'un RMSE pour un utilisateur non-statisticien ("le modèle se trompe en moyenne de X crimes pour 1 000 habitants"), et moins sensible aux outliers que le RMSE — pertinent ici car Auckland est un outlier fort.

Métrique secondaire : **R²** pour évaluer la part de variance expliquée.
