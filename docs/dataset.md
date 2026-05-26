# Dataset

## Source

**New Zealand Police — Crime Statistics par zone géographique**
Données combinées : statistiques de criminalité NZ Police + données démographiques Stats NZ (recensement 2013, estimations de population 2015).

| Propriété | Valeur |
|---|---|
| Fichier | `analysis-public-place-assaults-sexual-assaults-and-robberies-2015-csv.csv` |
| Granularité | Area unit (~quartier) — une ligne = une zone de recensement 2013 |
| Lignes brutes | 2 020 |
| Lignes utilisables (après nettoyage) | ~1 477 |
| Géographie de référence | Découpage 2013 (Area Units, Urban Areas, Territorial Authorities, Régions) |
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
| `Victimisations_calendar_year_2015` | numérique | Nombre de victimisations dans la zone en 2015 | `550`, `12` |
| ` Rate_per_10000_population ` *(cible)* | numérique (string brut avec virgules) | Taux de victimisations pour **10 000** habitants | `346`, `1199` |
| ` Rate_ratio_NZ_average_rate ` | numérique | Ratio par rapport à la moyenne nationale | `6.6`, `1.1` |

## Stats clés

- **Taux supprimés (417 lignes, ~21 %)** : les zones avec ≤ 5 victimisations affichent `-` — confidentialité statistique NZ Police. Ces lignes sont exclues avant l'entraînement.
- **Population = 0 (126 lignes)** : zones non-résidentielles (industrielles, parcs). Exclues car `log(0)` est indéfini.
- **Distribution très right-skewed** : médiane ≈ 33, max = 5 750 (CBD/centres touristiques avec peu de résidents). Log-transform de la population atténue l'effet.
- **Auckland (437 lignes, 22 %)** : outlier statistique fort — population, densité et taux plus élevés. Indicateur binaire `Is_Auckland` ajouté.
- **Pas de valeurs manquantes** dans les colonnes features : `SimpleImputer` gardé pour robustesse déploiement.

## Limites connues

- Données figées autour de 2013–2015 : évolutions démographiques post-2015 non prises en compte.
- Granularité zone/région : on ne prédit pas à l'adresse ou au quartier.
- Définition du crime non détaillée : agrège probablement plusieurs catégories (violence, vol, etc.).
- Absence de variables socio-économiques (revenu médian, taux de chômage) qui seraient pourtant prédictives.
