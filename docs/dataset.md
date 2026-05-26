# Dataset

## Source

**New Zealand Police — Crime Statistics par zone géographique**
Données combinées : statistiques de criminalité NZ Police + données démographiques Stats NZ (recensement 2013, estimations de population 2015).

| Propriété | Valeur |
|---|---|
| Granularité | Zone géographique (une ligne = une aire urbaine ou autorité territoriale) |
| Géographie de référence | Découpage 2013 (Urban Areas, Territorial Authorities, Régions) |
| Population de référence | Estimation mid-point 2015 |
| Format | CSV tabulaire |

## Colonnes

| Colonne | Type | Signification | Exemples |
|---|---|---|---|
| `Region_2013_label` | catégoriel | Région administrative NZ | `Auckland`, `Wellington`, `Canterbury` |
| `Territorial_authority_area_2013_label` | catégoriel | Autorité territoriale (subdivisions régionales) | `Auckland Council`, `Christchurch City` |
| `Urban_area_2013_label` | catégoriel | Nom de la zone urbaine | `Auckland urban area`, `Tauranga urban area` |
| `Urban_area_type` | catégoriel | Classification du type d'urbanisation | `Major urban area`, `Secondary urban area`, `Rural` |
| `Population_mid_point_2015` | numérique | Population estimée au point médian 2015 | `1 495 000`, `24 300` |
| `Log_Population` | numérique | Log naturel de la population (feature dérivée) | `14.2`, `10.1` |
| `Is_Auckland` | binaire | Indicateur région Auckland (0/1) | `1`, `0` |
| `crime_rate` *(cible)* | numérique | Taux de criminalité (crimes pour 1 000 habitants) | `32.4`, `18.7` |

## Stats clés

- **Déséquilibre géographique** : Auckland représente ~33 % de la population totale ; son poids dans le dataset peut tirer les prédictions.
- **`Log_Population`** : feature dérivée ajoutée pour linéariser la relation population / taux de criminalité. Ne pas la supprimer sans réévaluer le modèle.
- **`Is_Auckland`** : flag binaire car Auckland est un outlier statistique fort (aire, densité, mix ethnique).
- **Valeurs manquantes** : comblées par la médiane via `SimpleImputer(strategy="median")` dans le pipeline.

## Limites connues

- Données figées autour de 2013–2015 : évolutions démographiques post-2015 non prises en compte.
- Granularité zone/région : on ne prédit pas à l'adresse ou au quartier.
- Définition du crime non détaillée : agrège probablement plusieurs catégories (violence, vol, etc.).
- Absence de variables socio-économiques (revenu médian, taux de chômage) qui seraient pourtant prédictives.
