# User Journey

L'utilisateur cible est un analyste ou un citoyen curieux qui veut comparer le taux de criminalité estimé d'une zone néo-zélandaise avec d'autres zones similaires. Il n'a pas de connaissances en data science ; l'interface doit lui permettre de formuler une question géographique et d'obtenir une réponse chiffrée en quelques clics.

```mermaid
journey
    title Prédiction du taux de criminalité d'une zone NZ
    section Découverte
      Ouvrir l'application: 3: Utilisateur
      Lire la description du projet: 4: Utilisateur
    section Saisie des paramètres
      Sélectionner la région (dropdown): 5: Utilisateur
      Choisir le type urbain: 5: Utilisateur
      Entrer la population estimée: 3: Utilisateur
    section Prédiction
      Cliquer sur Prédire: 5: Utilisateur
      Voir le taux prédit affiché: 5: Utilisateur
    section Analyse
      Lire le taux prédit et son unité (/ 10 000 hab): 4: Utilisateur
      Modifier les paramètres et relancer: 3: Utilisateur
```

## Notes sur les scores (suite V1)

- **Saisie de la population (3/5)** : saisir un nombre brut est moins intuitif que de sélectionner dans une liste — envisager une aide contextuelle (ex : "Auckland ≈ 1,5 M hab").
- **Modifier et relancer (3/5)** : le formulaire V1 ne conserve pas les valeurs entre deux prédictions — friction confirmée en test.
- **Lecture du résultat (4/5)** : l'unité "crimes / 10 000 hab" n'est pas immédiatement compréhensible pour un non-initié — un tooltip ou une phrase de reformulation est nécessaire en V2.
- **Graphiques et contexte (manquant)** : l'absence de repère ("est-ce élevé par rapport à la moyenne NZ ?") rend la valeur prédite difficile à interpréter seule — à adresser via `/api/stats` en V2.
