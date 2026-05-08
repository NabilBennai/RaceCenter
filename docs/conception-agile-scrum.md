# RaceCenter — Conception Agile Scrum détaillée

## 1. Objectif du document

Ce document sert de guide Scrum complet pour développer RaceCenter étape par étape.

Il doit permettre à une équipe de développement de suivre le projet sans ambiguïté, avec :

- une vision produit claire
- des rôles définis
- une organisation Scrum simple
- un backlog structuré
- des sprints ordonnés
- des user stories détaillées
- des critères d’acceptation précis
- une Definition of Ready
- une Definition of Done
- un ordre d’implémentation recommandé

---

## 2. Vision produit

### Nom du projet

**RaceCenter**

### Description courte

RaceCenter est une plateforme web communautaire pour les fans de Formule 1 et de football.

Les utilisateurs peuvent :

- créer un compte
- vérifier leur e-mail
- se connecter
- suivre des matchs de football
- suivre des Grands Prix de Formule 1
- faire des pronostics
- rejoindre des ligues privées
- partager des setups F1
- recevoir des notifications
- recevoir des e-mails transactionnels

### Objectif principal

Créer une application full-stack moderne permettant de pratiquer :

- Spring Boot 4
- Angular 21
- PostgreSQL
- JWT
- Spring Security
- WebSocket
- Spring Mail
- Docker
- CI/CD
- déploiement gratuit

---

## 3. Périmètre fonctionnel

### Inclus dans le MVP

Le MVP doit contenir :

- inscription utilisateur
- connexion utilisateur
- vérification d’e-mail
- mot de passe oublié
- profil utilisateur
- consultation d’événements sportifs
- création de pronostics football
- création de pronostics F1
- classement utilisateurs
- création de ligues privées
- invitation par code
- notifications simples
- envoi d’e-mails transactionnels
- dashboard admin basique

### Hors MVP

Ces fonctionnalités sont prévues plus tard :

- application mobile
- IA de prédiction
- paiement
- abonnement premium
- messagerie privée complète
- live telemetry F1 avancée
- modération automatique par IA
- multi-langue complet

---

## 4. Organisation Scrum

### Product Owner

Responsabilités :

- définir la vision produit
- prioriser le backlog
- valider les user stories terminées
- clarifier les besoins fonctionnels
- décider du périmètre MVP

### Scrum Master

Responsabilités :

- organiser les rituels Scrum
- supprimer les blocages
- vérifier que l’équipe respecte la méthode
- aider l’équipe à améliorer son organisation

### Équipe de développement

Responsabilités :

- développer les fonctionnalités
- écrire les tests
- faire les revues de code
- maintenir la qualité technique
- livrer un incrément fonctionnel à chaque sprint

---

## 5. Rituels Scrum

### Sprint Planning

Fréquence : début de chaque sprint.

Durée recommandée : 1 à 2 heures.

Objectifs :

- choisir les user stories du sprint
- comprendre chaque story
- découper les tâches techniques
- estimer la charge
- définir l’objectif du sprint

Sortie attendue :

- un Sprint Backlog clair
- un objectif de sprint
- des stories prêtes à développer

### Daily Scrum

Fréquence : tous les jours de développement.

Durée recommandée : 10 à 15 minutes.

Chaque développeur répond à :

1. Qu’est-ce que j’ai fait depuis le dernier daily ?
2. Qu’est-ce que je vais faire aujourd’hui ?
3. Est-ce que j’ai un blocage ?

Règle importante : le daily ne sert pas à résoudre les problèmes techniques en détail. Les discussions longues doivent être faites après le daily.

### Sprint Review

Fréquence : fin de sprint.

Objectifs :

- présenter ce qui a été terminé
- démontrer les fonctionnalités
- recueillir les retours
- valider ou rejeter les stories

Une story est validée uniquement si tous ses critères d’acceptation sont respectés.

### Sprint Retrospective

Fréquence : après la Sprint Review.

Objectifs :

- identifier ce qui a bien fonctionné
- identifier ce qui a posé problème
- décider d’actions d’amélioration

Questions recommandées :

- Qu’est-ce qui s’est bien passé ?
- Qu’est-ce qui doit être amélioré ?
- Quelle action concrète applique-t-on au prochain sprint ?

---

## 6. Definition of Ready

Une user story est prête à être développée si :

- le besoin est clair
- les critères d’acceptation sont écrits
- les maquettes ou descriptions UI sont disponibles si nécessaire
- les règles métier sont comprises
- les dépendances sont identifiées
- la story est suffisamment petite pour être terminée dans un sprint
- les endpoints nécessaires sont identifiés
- les impacts base de données sont compris

Si une story ne respecte pas ces conditions, elle ne doit pas entrer dans le sprint.

---

## 7. Definition of Done

Une user story est terminée si :

- le code backend est développé
- le code frontend est développé si nécessaire
- les tests minimum sont passés
- les validations frontend sont présentes
- les validations backend sont présentes
- les erreurs sont gérées proprement
- le code est relu
- la fonctionnalité est testée manuellement
- la documentation est mise à jour si nécessaire
- aucun bug bloquant n’est connu
- la fonctionnalité respecte les critères d’acceptation

---

## 8. Convention de branches Git

### Branches principales

```txt
main       → version stable
develop    → branche d’intégration
feature/*  → nouvelles fonctionnalités
fix/*      → corrections de bugs
chore/*    → tâches techniques
```

### Exemple de nommage

```txt
feature/auth-register
feature/auth-login
feature/email-verification
feature/f1-predictions
fix/jwt-refresh-token
chore/docker-backend
```

### Règle de merge

Chaque fonctionnalité doit passer par une Pull Request.

Une Pull Request doit contenir :

- une description claire
- les screenshots si modification UI
- les tests réalisés
- les impacts éventuels

---

## 9. Convention de commits

Utiliser Conventional Commits.

Exemples :

```txt
feat: add user registration
feat: add email verification
fix: correct login error handling
chore: configure docker compose
docs: add technical documentation
refactor: improve auth service
```

Types recommandés :

| Type | Usage |
|---|---|
| feat | Nouvelle fonctionnalité |
| fix | Correction de bug |
| docs | Documentation |
| chore | Configuration ou maintenance |
| refactor | Refactorisation |
| test | Tests |
| style | Mise en forme uniquement |

---

## 10. Épics du projet

### Epic 1 — Initialisation technique

Objectif : créer les bases du projet.

Contenu :

- repo Git
- structure backend
- structure frontend
- PostgreSQL
- Flyway
- Docker local
- configuration environnement

### Epic 2 — Authentification

Objectif : permettre aux utilisateurs de créer un compte et se connecter.

Contenu :

- inscription
- connexion
- JWT
- refresh token
- vérification e-mail
- mot de passe oublié

### Epic 3 — Profil utilisateur

Objectif : permettre à l’utilisateur de personnaliser son profil.

Contenu :

- profil utilisateur
- préférences sportives
- statistiques personnelles

### Epic 4 — Football

Objectif : intégrer le module football.

Contenu :

- matchs
- équipes
- classements
- pronostics football

### Epic 5 — Formule 1

Objectif : intégrer le module F1.

Contenu :

- calendrier F1
- classements pilotes
- classements constructeurs
- pronostics F1

### Epic 6 — Ligues privées

Objectif : permettre aux utilisateurs de jouer entre amis.

Contenu :

- création de ligue
- code invitation
- classement privé

### Epic 7 — Setups F1

Objectif : permettre le partage communautaire de setups.

Contenu :

- création setup
- consultation setup
- vote
- commentaires

### Epic 8 — Notifications et e-mails

Objectif : notifier les utilisateurs.

Contenu :

- notifications in-app
- WebSocket
- e-mails transactionnels
- rappels événements

### Epic 9 — Administration

Objectif : permettre la gestion de la plateforme.

Contenu :

- gestion utilisateurs
- modération commentaires
- statistiques globales

### Epic 10 — Déploiement

Objectif : rendre l’application accessible publiquement.

Contenu :

- Docker
- Render
- Vercel
- Neon
- GitHub Actions

---

## 11. Roadmap Scrum globale

### Sprint 0 — Préparation projet

Objectif : initialiser l’environnement technique.

Durée recommandée : 1 semaine.

Livrable : base projet prête à développer.

### Sprint 1 — Authentification de base

Objectif : inscription et connexion JWT.

Livrable : un utilisateur peut créer un compte et se connecter.

### Sprint 2 — E-mails et sécurité avancée

Objectif : vérification e-mail, refresh token et mot de passe oublié.

Livrable : authentification complète.

### Sprint 3 — Profil utilisateur

Objectif : gestion du profil utilisateur.

Livrable : un utilisateur peut consulter et modifier son profil.

### Sprint 4 — Module Football

Objectif : affichage des matchs et création de pronostics football.

Livrable : un utilisateur peut pronostiquer un match.

### Sprint 5 — Module Formule 1

Objectif : affichage des courses et création de pronostics F1.

Livrable : un utilisateur peut pronostiquer un Grand Prix.

### Sprint 6 — Classements et ligues privées

Objectif : créer une compétition entre utilisateurs.

Livrable : les utilisateurs peuvent rejoindre une ligue et voir un classement.

### Sprint 7 — Setups F1

Objectif : partager et noter des setups.

Livrable : les utilisateurs peuvent publier et voter pour des setups.

### Sprint 8 — Notifications

Objectif : ajouter notifications in-app et WebSocket.

Livrable : notifications temps réel simples.

### Sprint 9 — Administration

Objectif : créer un dashboard admin.

Livrable : admin peut gérer les utilisateurs et voir les stats.

### Sprint 10 — Déploiement et finalisation

Objectif : mettre en ligne le projet.

Livrable : application accessible publiquement.

---

## 12. Détail des sprints

## Sprint 0 — Préparation projet

### Objectif du sprint

Mettre en place les bases techniques du projet pour que l’équipe puisse développer correctement.

### US-001 — Créer la structure du repository

En tant que développeur, je veux une structure claire du repository afin de séparer le backend, le frontend et la documentation.

#### Tâches

- créer dossier `backend`
- créer dossier `frontend`
- créer dossier `docs`
- créer `README.md`
- créer `.gitignore`
- documenter les commandes de lancement

#### Critères d’acceptation

- le repository contient `backend`, `frontend` et `docs`
- le README explique comment lancer le projet
- les fichiers inutiles ne sont pas versionnés

### US-002 — Initialiser le backend Spring Boot

En tant que développeur, je veux initialiser le backend Spring Boot afin de créer l’API REST.

#### Tâches

- créer projet Spring Boot 4
- ajouter Spring Web
- ajouter Spring Security
- ajouter Spring Data JPA
- ajouter PostgreSQL Driver
- ajouter Flyway
- ajouter Validation
- ajouter Spring Mail
- créer endpoint `/api/health`

#### Critères d’acceptation

- le backend démarre sans erreur
- l’endpoint `/api/health` retourne une réponse OK
- Maven build fonctionne

### US-003 — Initialiser le frontend Angular

En tant que développeur, je veux initialiser le frontend Angular afin de créer l’interface utilisateur.

#### Tâches

- créer projet Angular 21
- configurer TailwindCSS
- configurer Angular Material
- créer layout principal
- créer page d’accueil temporaire
- créer configuration d’environnement API

#### Critères d’acceptation

- Angular démarre avec `ng serve`
- la page d’accueil s’affiche
- Tailwind fonctionne
- Angular Material fonctionne

### US-004 — Configurer PostgreSQL et Docker Compose

En tant que développeur, je veux une base PostgreSQL locale afin de développer avec une base réaliste.

#### Tâches

- créer `docker-compose.yml`
- ajouter service PostgreSQL
- configurer username/password/database
- connecter Spring Boot à PostgreSQL
- créer première migration Flyway

#### Critères d’acceptation

- PostgreSQL démarre avec Docker Compose
- Spring Boot se connecte à PostgreSQL
- Flyway exécute la migration initiale

---

## Sprint 1 — Authentification de base

### Objectif du sprint

Permettre à un utilisateur de s’inscrire et de se connecter avec JWT.

### US-005 — Créer l’entité User

En tant que développeur, je veux créer l’entité User afin de stocker les utilisateurs.

#### Tâches

- créer table `users`
- créer entité `UserEntity`
- créer enum `Role`
- créer repository `UserRepository`
- créer DTO utilisateur
- créer mapper utilisateur

#### Critères d’acceptation

- la table `users` existe
- un utilisateur peut être sauvegardé en base
- le mot de passe n’est jamais exposé dans les DTO

### US-006 — Inscription utilisateur

En tant que visiteur, je veux créer un compte afin d’utiliser RaceCenter.

#### Tâches backend

- créer endpoint `POST /api/auth/register`
- créer `RegisterRequest`
- valider email, username et password
- vérifier unicité email
- vérifier unicité username
- hasher le mot de passe avec BCrypt
- créer utilisateur avec rôle USER

#### Tâches frontend

- créer page inscription
- créer formulaire réactif
- afficher erreurs de validation
- appeler API register
- rediriger après succès

#### Critères d’acceptation

- un visiteur peut créer un compte
- un email déjà utilisé retourne une erreur claire
- un username déjà utilisé retourne une erreur claire
- le mot de passe est hashé en base
- le frontend affiche les erreurs proprement

### US-007 — Connexion utilisateur

En tant qu’utilisateur, je veux me connecter afin d’accéder aux fonctionnalités privées.

#### Tâches backend

- créer endpoint `POST /api/auth/login`
- vérifier email et mot de passe
- générer access token JWT
- retourner les informations utilisateur minimales

#### Tâches frontend

- créer page login
- créer formulaire login
- appeler API login
- stocker le token
- rediriger vers dashboard

#### Critères d’acceptation

- un utilisateur valide peut se connecter
- un mauvais mot de passe retourne une erreur
- le token est reçu côté frontend
- l’utilisateur est redirigé après connexion

### US-008 — Protéger les routes privées

En tant qu’utilisateur non connecté, je ne dois pas pouvoir accéder aux pages privées.

#### Tâches backend

- configurer Spring Security
- autoriser `/api/auth/**`
- protéger les endpoints privés
- créer filtre JWT

#### Tâches frontend

- créer AuthGuard
- créer AuthInterceptor
- ajouter Authorization header
- rediriger non connecté vers login

#### Critères d’acceptation

- les endpoints privés refusent les utilisateurs non authentifiés
- le frontend bloque les pages privées
- le JWT est envoyé automatiquement aux appels API

---

## Sprint 2 — E-mails et sécurité avancée

### Objectif du sprint

Compléter l’authentification avec vérification e-mail, refresh token et reset password.

### US-009 — Vérification e-mail

En tant qu’utilisateur inscrit, je veux vérifier mon e-mail afin d’activer mon compte.

#### Tâches backend

- créer table `email_verification_tokens`
- générer token à l’inscription
- envoyer e-mail de vérification
- créer endpoint `POST /api/auth/verify-email`
- activer compte après vérification

#### Tâches frontend

- créer page vérification e-mail
- lire token depuis URL
- appeler endpoint verification
- afficher succès ou erreur

#### Critères d’acceptation

- un e-mail est envoyé après inscription
- le lien de vérification active le compte
- un token expiré est refusé
- un token invalide est refusé

### US-010 — Refresh token

En tant qu’utilisateur connecté, je veux rester connecté sans me reconnecter trop souvent.

#### Tâches backend

- créer table `refresh_tokens`
- générer refresh token au login
- créer endpoint `POST /api/auth/refresh`
- révoquer anciens tokens si nécessaire
- gérer expiration token

#### Tâches frontend

- stocker refresh token selon stratégie choisie
- appeler refresh automatiquement si access token expiré
- déconnecter si refresh impossible

#### Critères d’acceptation

- l’access token peut être renouvelé
- un refresh token expiré est refusé
- un refresh token révoqué est refusé

### US-011 — Mot de passe oublié

En tant qu’utilisateur, je veux réinitialiser mon mot de passe si je l’ai oublié.

#### Tâches backend

- créer table `password_reset_tokens`
- créer endpoint `POST /api/auth/forgot-password`
- générer token reset password
- envoyer e-mail reset password
- créer endpoint `POST /api/auth/reset-password`
- modifier mot de passe après validation token

#### Tâches frontend

- page mot de passe oublié
- page reset password
- validation nouveau mot de passe
- affichage messages succès/erreur

#### Critères d’acceptation

- un utilisateur reçoit un e-mail de reset
- un token valide permet de changer le mot de passe
- un token expiré est refusé
- le nouveau mot de passe est hashé

---

## Sprint 3 — Profil utilisateur

### Objectif du sprint

Permettre à l’utilisateur de gérer son profil.

### US-012 — Consulter mon profil

En tant qu’utilisateur connecté, je veux voir mon profil afin de consulter mes informations.

#### Tâches backend

- créer endpoint `GET /api/profile/me`
- retourner username, email, bio, préférences

#### Tâches frontend

- créer page profil
- afficher infos utilisateur
- afficher statistiques basiques

#### Critères d’acceptation

- l’utilisateur connecté voit son profil
- un utilisateur non connecté est redirigé
- le mot de passe n’est jamais retourné

### US-013 — Modifier mon profil

En tant qu’utilisateur connecté, je veux modifier mon profil afin de personnaliser mon compte.

#### Tâches backend

- créer endpoint `PUT /api/profile/me`
- permettre modification bio
- permettre équipe favorite
- permettre pilote favori
- permettre constructeur favori

#### Tâches frontend

- créer formulaire édition profil
- validation champs
- sauvegarde via API
- message de succès

#### Critères d’acceptation

- l’utilisateur peut modifier sa bio
- l’utilisateur peut modifier ses préférences
- les données modifiées persistent après refresh

---

## Sprint 4 — Module Football

### Objectif du sprint

Afficher des matchs de football et permettre les pronostics.

### US-014 — Afficher la liste des matchs

En tant qu’utilisateur, je veux consulter les matchs afin de choisir ceux sur lesquels pronostiquer.

#### Tâches backend

- créer endpoint `GET /api/football/matches`
- créer service Football
- intégrer API externe ou données mockées
- gérer pagination/filtres

#### Tâches frontend

- créer page matchs football
- afficher cartes matchs
- ajouter filtres date/équipe/compétition

#### Critères d’acceptation

- une liste de matchs s’affiche
- les matchs peuvent être filtrés
- l’interface est responsive

### US-015 — Créer un pronostic football

En tant qu’utilisateur connecté, je veux pronostiquer un match afin de gagner des points.

#### Tâches backend

- créer table `football_predictions`
- créer endpoint `POST /api/predictions/football`
- empêcher plusieurs pronostics pour le même match
- empêcher pronostic après début match

#### Tâches frontend

- créer formulaire pronostic football
- choisir score domicile
- choisir score extérieur
- envoyer pronostic
- afficher confirmation

#### Critères d’acceptation

- l’utilisateur peut créer un pronostic
- impossible de pronostiquer deux fois le même match
- impossible de pronostiquer un match commencé

### US-016 — Calculer les points football

En tant qu’utilisateur, je veux recevoir des points selon mes bons pronostics.

#### Tâches backend

- créer service calcul points
- appliquer règles métier
- mettre à jour points après résultat

#### Règles de points

- bon vainqueur : 3 points
- score exact : 5 points
- bon buteur : 2 points si implémenté

#### Critères d’acceptation

- les points sont calculés correctement
- un score exact donne 5 points
- un mauvais résultat donne 0 point

---

## Sprint 5 — Module Formule 1

### Objectif du sprint

Afficher les courses F1 et permettre les pronostics.

### US-017 — Afficher le calendrier F1

En tant qu’utilisateur, je veux consulter les Grands Prix afin de suivre la saison.

#### Tâches backend

- créer endpoint `GET /api/f1/races`
- intégrer OpenF1 ou données mockées
- retourner nom GP, circuit, pays, date

#### Tâches frontend

- créer page calendrier F1
- afficher cartes GP
- mettre en avant le prochain GP

#### Critères d’acceptation

- le calendrier F1 s’affiche
- le prochain GP est identifiable
- les données sont lisibles sur mobile

### US-018 — Créer un pronostic F1

En tant qu’utilisateur connecté, je veux pronostiquer un Grand Prix afin de gagner des points.

#### Tâches backend

- créer table `f1_predictions`
- créer endpoint `POST /api/predictions/f1`
- enregistrer vainqueur prédit
- enregistrer pole position prédite
- enregistrer meilleur tour prédit
- empêcher modification après début qualification

#### Tâches frontend

- créer formulaire pronostic F1
- sélectionner vainqueur
- sélectionner pole
- sélectionner meilleur tour
- afficher confirmation

#### Critères d’acceptation

- l’utilisateur peut créer un pronostic F1
- impossible de pronostiquer après deadline
- impossible de créer plusieurs pronostics pour le même GP

### US-019 — Calculer les points F1

En tant qu’utilisateur, je veux recevoir des points selon mes bons pronostics F1.

#### Règles de points

- bon vainqueur : 5 points
- podium exact : 10 points
- bonne pole : 3 points
- meilleur tour : 2 points

#### Critères d’acceptation

- les points sont calculés selon les règles
- les points sont visibles dans le profil
- les points alimentent le classement global

---

## Sprint 6 — Classements et ligues privées

### Objectif du sprint

Permettre aux utilisateurs de se comparer entre eux.

### US-020 — Classement global

En tant qu’utilisateur, je veux voir le classement global afin de comparer mes performances.

#### Tâches backend

- créer endpoint `GET /api/predictions/rankings`
- agréger points football et F1
- trier utilisateurs par points

#### Tâches frontend

- créer page classement
- afficher rang, username, points
- mettre en avant utilisateur connecté

#### Critères d’acceptation

- le classement affiche les utilisateurs triés par points
- l’utilisateur connecté est identifiable
- les scores sont cohérents

### US-021 — Créer une ligue privée

En tant qu’utilisateur connecté, je veux créer une ligue privée afin de jouer avec mes amis.

#### Tâches backend

- créer table `leagues`
- créer table `league_members`
- créer endpoint `POST /api/leagues`
- générer code invitation unique
- ajouter créateur comme membre

#### Tâches frontend

- créer page création ligue
- formulaire nom/type ligue
- afficher code invitation

#### Critères d’acceptation

- une ligue peut être créée
- le créateur est membre automatiquement
- un code invitation est généré

### US-022 — Rejoindre une ligue

En tant qu’utilisateur connecté, je veux rejoindre une ligue avec un code afin de jouer avec mes amis.

#### Tâches backend

- créer endpoint `POST /api/leagues/join`
- vérifier code invitation
- empêcher double inscription

#### Tâches frontend

- créer formulaire rejoindre ligue
- saisir code invitation
- afficher succès ou erreur

#### Critères d’acceptation

- un code valide permet de rejoindre la ligue
- un code invalide affiche une erreur
- impossible de rejoindre deux fois la même ligue

---

## Sprint 7 — Setups F1

### Objectif du sprint

Permettre aux utilisateurs de partager des setups F1.

### US-023 — Créer un setup F1

En tant qu’utilisateur connecté, je veux publier un setup afin de le partager avec la communauté.

#### Tâches backend

- créer table `setups`
- créer endpoint `POST /api/setups`
- stocker données setup en JSONB
- valider circuit, voiture, météo

#### Tâches frontend

- créer formulaire setup
- sections aérodynamique, transmission, suspension, freins, pneus
- envoyer setup à l’API

#### Critères d’acceptation

- un setup peut être publié
- les champs obligatoires sont validés
- le setup est associé à son auteur

### US-024 — Consulter les setups

En tant qu’utilisateur, je veux consulter les setups afin de trouver des réglages utiles.

#### Tâches backend

- créer endpoint `GET /api/setups`
- ajouter filtres circuit, voiture, météo
- ajouter pagination

#### Tâches frontend

- créer page liste setups
- afficher cartes setups
- ajouter filtres
- créer page détail setup

#### Critères d’acceptation

- les setups s’affichent
- les filtres fonctionnent
- la page détail affiche toutes les valeurs

### US-025 — Voter pour un setup

En tant qu’utilisateur connecté, je veux voter pour un setup afin de recommander les meilleurs réglages.

#### Tâches backend

- créer table `setup_votes`
- créer endpoint `POST /api/setups/{id}/vote`
- empêcher vote multiple même utilisateur/setup
- calculer score setup

#### Tâches frontend

- ajouter bouton vote
- afficher nombre de votes
- empêcher vote multiple côté UI

#### Critères d’acceptation

- un utilisateur peut voter une fois par setup
- le nombre de votes se met à jour
- un second vote est refusé

---

## Sprint 8 — Notifications

### Objectif du sprint

Ajouter des notifications in-app et temps réel.

### US-026 — Notifications in-app

En tant qu’utilisateur connecté, je veux recevoir des notifications dans l’application.

#### Tâches backend

- créer table `notifications`
- créer endpoint `GET /api/notifications`
- créer endpoint `PUT /api/notifications/{id}/read`
- créer service Notification

#### Tâches frontend

- créer icône notifications
- afficher liste notifications
- marquer comme lu

#### Critères d’acceptation

- l’utilisateur voit ses notifications
- une notification peut être marquée comme lue
- le compteur de notifications non lues fonctionne

### US-027 — Notifications WebSocket

En tant qu’utilisateur connecté, je veux recevoir les notifications sans recharger la page.

#### Tâches backend

- configurer Spring WebSocket
- configurer STOMP
- envoyer notification à un utilisateur précis

#### Tâches frontend

- créer service WebSocket
- écouter notifications
- mettre à jour signal notifications
- afficher toast

#### Critères d’acceptation

- une notification apparaît sans refresh
- le toast s’affiche
- la notification est ajoutée à la liste

---

## Sprint 9 — Administration

### Objectif du sprint

Créer un espace admin simple.

### US-028 — Dashboard admin

En tant qu’admin, je veux voir les statistiques de la plateforme.

#### Tâches backend

- créer endpoint `GET /api/admin/stats`
- compter utilisateurs
- compter pronostics
- compter ligues
- compter setups

#### Tâches frontend

- créer layout admin
- créer cartes statistiques
- protéger route admin

#### Critères d’acceptation

- seul un admin peut accéder au dashboard
- les statistiques s’affichent
- un utilisateur standard est refusé

### US-029 — Gestion utilisateurs admin

En tant qu’admin, je veux gérer les utilisateurs afin de modérer la plateforme.

#### Tâches backend

- créer endpoint `GET /api/admin/users`
- créer endpoint `PUT /api/admin/users/{id}/ban`
- créer endpoint `PUT /api/admin/users/{id}/role`

#### Tâches frontend

- créer page liste utilisateurs
- ajouter bouton bannir/débannir
- modifier rôle utilisateur

#### Critères d’acceptation

- l’admin peut lister les utilisateurs
- l’admin peut bannir un utilisateur
- l’admin peut modifier un rôle

---

## Sprint 10 — Déploiement et finalisation

### Objectif du sprint

Déployer l’application et finaliser la documentation.

### US-030 — Dockeriser le backend

En tant que développeur, je veux dockeriser le backend afin de le déployer facilement.

#### Tâches

- créer Dockerfile backend
- tester build local
- tester run local
- documenter commandes Docker

#### Critères d’acceptation

- l’image Docker build correctement
- le conteneur démarre
- l’API répond depuis le conteneur

### US-031 — Déployer le backend sur Render

En tant que développeur, je veux déployer l’API afin qu’elle soit accessible publiquement.

#### Tâches

- créer service Render
- connecter repo GitHub
- configurer variables d’environnement
- configurer base Neon
- vérifier endpoint health

#### Critères d’acceptation

- l’API est accessible publiquement
- l’API se connecte à PostgreSQL
- l’endpoint health répond

### US-032 — Déployer le frontend sur Vercel

En tant qu’utilisateur, je veux accéder au frontend en ligne.

#### Tâches

- créer projet Vercel
- connecter repo GitHub
- configurer build Angular
- configurer variable API URL
- tester appel backend

#### Critères d’acceptation

- le frontend est accessible publiquement
- le frontend appelle l’API Render
- les routes Angular fonctionnent après refresh

---

## 13. Ordre exact de réalisation recommandé

1. Créer le repository avec `backend/`, `frontend/`, `docs/` et `README.md`.
2. Initialiser Spring Boot.
3. Initialiser Angular.
4. Configurer PostgreSQL avec Docker Compose.
5. Créer l’entité User et Flyway.
6. Développer inscription.
7. Développer connexion JWT.
8. Ajouter AuthGuard et AuthInterceptor Angular.
9. Ajouter vérification e-mail.
10. Ajouter refresh token.
11. Ajouter mot de passe oublié.
12. Créer profil utilisateur.
13. Créer module football.
14. Créer pronostics football.
15. Créer module F1.
16. Créer pronostics F1.
17. Créer classement global.
18. Créer ligues privées.
19. Créer setups F1.
20. Ajouter votes setups.
21. Ajouter notifications in-app.
22. Ajouter WebSocket.
23. Créer dashboard admin.
24. Dockeriser backend.
25. Déployer backend.
26. Déployer frontend.
27. Finaliser documentation.

---

## 14. Checklist générale avant chaque merge

Avant de merger une Pull Request, vérifier :

- le code compile
- les tests passent
- la fonctionnalité a été testée manuellement
- aucune donnée sensible n’est commitée
- les variables d’environnement sont documentées
- les erreurs sont gérées
- les DTO sont utilisés
- les endpoints sont protégés si nécessaire
- le frontend est responsive
- la PR respecte le besoin métier

---

## 15. Checklist backend

Pour chaque fonctionnalité backend :

- créer ou modifier migration Flyway
- créer entité si nécessaire
- créer repository
- créer DTO request/response
- créer mapper
- créer service
- créer controller
- ajouter validations
- gérer exceptions
- sécuriser endpoint
- tester avec Postman ou Swagger

---

## 16. Checklist frontend

Pour chaque fonctionnalité frontend :

- créer route
- créer composant page
- créer service API
- créer interfaces TypeScript
- créer formulaire si nécessaire
- ajouter validations
- gérer loading
- gérer erreurs
- gérer succès
- vérifier responsive mobile

---

## 17. Règles de qualité

### Backend

- ne jamais exposer les entités JPA directement
- utiliser des DTO
- centraliser les exceptions
- valider les entrées avec Bean Validation
- séparer logique métier et contrôleurs
- ne jamais logger les mots de passe ou tokens

### Frontend

- éviter la logique métier complexe dans les composants
- utiliser des services
- utiliser des interfaces TypeScript
- afficher les erreurs utilisateur clairement
- éviter les composants trop gros
- préférer lazy loading pour les features

### Git

- une branche par fonctionnalité
- une PR par fonctionnalité
- commits clairs
- pas de secrets dans Git
- pas de code mort

---

## 18. Priorité des fonctionnalités

### Priorité haute

- auth
- JWT
- e-mails
- profil
- pronostics
- classements
- déploiement

### Priorité moyenne

- ligues privées
- setups F1
- notifications
- dashboard admin

### Priorité basse

- WebSocket avancé
- chat ligue
- IA
- PWA
- application mobile

---

## 19. Risques projet

### Risque 1 — APIs sportives limitées

Certaines APIs peuvent être payantes ou limitées.

Solution :

- commencer avec données mockées
- isoler les appels APIs dans des services dédiés
- prévoir fallback local

### Risque 2 — Authentification trop complexe

JWT + refresh token + e-mail peut devenir long à développer.

Solution :

- commencer simple avec access token
- ajouter refresh token ensuite
- tester chaque étape séparément

### Risque 3 — Scope trop large

RaceCenter peut devenir trop gros.

Solution :

- respecter le MVP
- ne pas commencer les features bonus trop tôt
- terminer chaque sprint avant d’ajouter du nouveau périmètre

### Risque 4 — Déploiement difficile

Render, Vercel et Neon peuvent nécessiter des configurations spécifiques.

Solution :

- déployer une première version simple tôt
- ne pas attendre la fin du projet
- documenter chaque variable d’environnement

---

## 20. Livrable final attendu

À la fin du projet, l’équipe doit livrer :

- frontend Angular déployé
- backend Spring Boot déployé
- base PostgreSQL en ligne
- authentification complète
- e-mails fonctionnels
- pronostics football
- pronostics F1
- classements
- ligues privées
- setups F1
- dashboard admin
- documentation technique
- README complet

---

## 21. Définition du MVP validé

Le MVP est considéré comme terminé lorsque :

- un utilisateur peut s’inscrire
- un utilisateur peut vérifier son e-mail
- un utilisateur peut se connecter
- un utilisateur peut modifier son profil
- un utilisateur peut faire un pronostic football
- un utilisateur peut faire un pronostic F1
- un utilisateur peut voir son classement
- un utilisateur peut créer ou rejoindre une ligue
- les e-mails essentiels fonctionnent
- l’application est déployée
- la documentation est à jour

---

## 22. Notes finales pour l’équipe

L’équipe doit avancer dans l’ordre défini par les sprints.

Il ne faut pas commencer une fonctionnalité avancée si les bases suivantes ne sont pas terminées :

- authentification
- sécurité
- structure backend
- structure frontend
- base de données
- environnement local

Chaque sprint doit livrer une fonctionnalité utilisable, même simple.

La priorité est de construire une application stable, propre et maintenable avant d’ajouter des fonctionnalités bonus.
