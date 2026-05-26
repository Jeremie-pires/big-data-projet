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
      Comparer avec la moyenne nationale: 4: Utilisateur
      Visualiser le graphique par région: 4: Utilisateur
      Modifier les paramètres et relancer: 3: Utilisateur
```

## Notes sur les scores

- **Saisie de la population (3/5)** : saisir un nombre brut est moins intuitif que de sélectionner dans une liste — envisager une aide contextuelle (ex : "Auckland ≈ 1,5 M hab").
- **Modifier et relancer (3/5)** : la friction augmente si le formulaire ne conserve pas les valeurs précédentes entre deux prédictions.
