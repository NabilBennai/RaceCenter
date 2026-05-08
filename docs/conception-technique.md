# RaceCenter — Documentation Technique & Fonctionnelle

## 1. Présentation du projet

RaceCenter est une plateforme communautaire autour de la Formule 1 et du football.

L’application permet aux utilisateurs de :

- suivre des événements sportifs
- réaliser des pronostics
- participer à des ligues privées
- partager des setups F1
- recevoir des notifications et des e-mails
- interagir avec la communauté

Le projet est conçu pour pratiquer une architecture full-stack moderne avec Spring Boot 4, Angular 21, PostgreSQL, JWT, WebSocket, Docker, CI/CD et systèmes d’e-mails.

---

## 2. Objectifs pédagogiques

Ce projet permet de pratiquer :

- architecture backend en couches
- architecture frontend Angular moderne
- authentification JWT
- refresh token
- vérification d’e-mail
- mot de passe oublié
- WebSocket
- e-mails transactionnels
- intégration d’APIs externes
- PostgreSQL
- Flyway
- Docker
- déploiement gratuit
- CI/CD GitHub Actions

---

## 3. Architecture globale

```txt
Frontend Angular 21
        ↓
API REST Spring Boot 4
        ↓
Base PostgreSQL

+ WebSocket
+ SMTP
+ APIs externes sportives
+ Redis optionnel
```

---

## 4. Stack technique

### Backend

| Technologie | Utilisation |
|---|---|
| Java 25 | Langage backend |
| Spring Boot 4 | Framework principal |
| Spring Security | Sécurité |
| JWT | Authentification stateless |
| Spring Data JPA | Accès base de données |
| Hibernate | ORM |
| PostgreSQL | Base de données |
| Flyway | Migrations SQL |
| Spring Mail | Envoi d’e-mails |
| WebSocket | Temps réel |
| Redis | Cache et notifications optionnelles |
| Docker | Conteneurisation |
| Maven | Build tool |

### Frontend

| Technologie | Utilisation |
|---|---|
| Angular 21 | Framework frontend |
| TypeScript | Langage frontend |
| TailwindCSS | Styling |
| Angular Material | Composants UI |
| RxJS | Programmation réactive |
| Angular Signals | Gestion d’état moderne |
| Chart.js | Graphiques |
| ngx-toastr | Notifications UI |

### Infrastructure

| Service | Rôle |
|---|---|
| Vercel | Hébergement frontend |
| Render | Hébergement backend |
| Neon | Hébergement PostgreSQL |
| Brevo / Resend | Fournisseur e-mails |
| GitHub Actions | CI/CD |

---

## 5. Architecture backend

### Architecture en couches

```txt
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

### Structure backend proposée

```txt
backend/src/main/java/com/racecenter/
 ├── auth
 ├── user
 ├── football
 ├── formula1
 ├── prediction
 ├── setup
 ├── league
 ├── notification
 ├── websocket
 ├── mail
 ├── admin
 ├── shared
 └── config
```

### Rôle des couches

#### Controller

Expose les endpoints REST et reçoit les requêtes HTTP.

#### Service

Contient la logique métier.

#### Repository

Gère les accès à la base de données via Spring Data JPA.

#### DTO

Permet de ne pas exposer directement les entités JPA au frontend.

#### Mapper

Transforme les entités en DTO et les DTO en entités.

---

## 6. Architecture frontend

### Structure Angular proposée

```txt
frontend/src/app/
 ├── core
 ├── shared
 ├── layouts
 ├── features
 │    ├── auth
 │    ├── football
 │    ├── formula1
 │    ├── prediction
 │    ├── setup
 │    ├── league
 │    ├── admin
 │    └── profile
 └── ui
```

### Principes frontend

- standalone components
- lazy loading
- route guards
- interceptors JWT
- reactive forms
- Angular Signals
- composants réutilisables
- séparation core/shared/features
- design responsive mobile-first

---

## 7. Sécurité

### Authentification

Le système utilise :

- JWT Access Token
- Refresh Token
- BCrypt pour le hash des mots de passe
- authentification stateless

### Rôles

| Rôle | Description |
|---|---|
| USER | Utilisateur standard |
| MODERATOR | Modération |
| ADMIN | Administration complète |

### Flux JWT

```txt
Connexion utilisateur
        ↓
Spring Security
        ↓
Génération JWT
        ↓
Stockage côté frontend
        ↓
Authorization: Bearer TOKEN
```

### Règles d’accès

| Endpoint | Accès |
|---|---|
| /api/auth/** | Public |
| /api/admin/** | ADMIN |
| /api/moderation/** | MODERATOR ou ADMIN |
| /api/predictions/** | USER connecté |
| /api/profile/** | USER connecté |

---

## 8. Fonctionnalités principales

## 8.1 Module Authentification

### Fonctionnalités

- inscription
- connexion
- déconnexion
- JWT
- refresh token
- vérification e-mail
- mot de passe oublié
- réinitialisation mot de passe
- gestion des rôles

### E-mails liés

- bienvenue
- vérification de compte
- réinitialisation du mot de passe

---

## 8.2 Module Profil utilisateur

### Fonctionnalités

- avatar utilisateur
- bio utilisateur
- équipe favorite
- pilote F1 favori
- constructeur favori
- historique des pronostics
- statistiques utilisateur
- ligues rejointes

---

## 8.3 Module Football

### Matchs

Fonctionnalités :

- calendrier des matchs
- détails des matchs
- classements
- statistiques équipes
- recherche de matchs
- filtres championnat/date/équipe

### APIs prévues

- API-Football
- TheSportsDB

### Pronostics Football

Types de pronostics :

- score exact
- vainqueur
- match nul
- premier buteur

Système de points proposé :

| Type | Points |
|---|---|
| Bon vainqueur | 3 |
| Score exact | 5 |
| Bon buteur | 2 |

---

## 8.4 Module Formule 1

### Courses

Fonctionnalités :

- calendrier F1
- détails Grand Prix
- classements pilotes
- classements constructeurs
- qualifications
- sprint races
- météo

### APIs prévues

- OpenF1 API
- Ergast API

### Pronostics F1

Types de pronostics :

- pole position
- vainqueur course
- podium
- meilleur tour
- DNF

Système de points proposé :

| Type | Points |
|---|---|
| Bon vainqueur | 5 |
| Bon podium | 10 |
| Bonne pole | 3 |
| Meilleur tour | 2 |

---

## 8.5 Module Partage de setups F1

### Fonctionnalités

- création de setup
- partage de setup
- vote des setups
- commentaires
- classement des setups populaires
- setups par circuit
- setups pluie/sec

### Données d’un setup

#### Aérodynamique

- aileron avant
- aileron arrière

#### Transmission

- différentiel à l’accélération
- différentiel à la décélération

#### Géométrie suspension

- carrossage avant
- carrossage arrière
- pincement avant
- pincement arrière

#### Suspension

- suspension avant
- suspension arrière
- barre anti-roulis avant
- barre anti-roulis arrière
- hauteur caisse avant
- hauteur caisse arrière

#### Freins

- pression des freins
- répartition des freins

#### Pneus

- pression pneu avant gauche
- pression pneu avant droit
- pression pneu arrière gauche
- pression pneu arrière droit

---

## 8.6 Module Ligues privées

### Fonctionnalités

- création de ligue
- génération d’un code invitation
- rejoindre une ligue
- classement de ligue
- statistiques de ligue
- chat de ligue

### Types de ligues

- football
- F1
- mixte

---

## 8.7 Module Commentaires

### Fonctionnalités

- commenter un événement
- répondre à un commentaire
- liker un commentaire
- signaler un commentaire
- modérer les commentaires

---

## 8.8 Module Notifications

### Notifications temps réel

Exemples :

- réponse à un commentaire
- invitation dans une ligue
- résultat disponible
- rappel de course
- rappel de match

### Canaux

- WebSocket
- e-mail
- notification in-app

---

## 8.9 Module E-mails

### Types d’e-mails transactionnels

- bienvenue
- vérification de compte
- reset password
- confirmation de pronostic
- invitation de ligue
- rappel d’événement

### Templates

Les templates HTML peuvent être stockés dans :

```txt
backend/src/main/resources/templates/mail
```

Données dynamiques injectées :

- username
- course
- match
- classement
- pronostics
- lien de vérification
- lien de réinitialisation

---

## 8.10 Module Administration

### Fonctionnalités

- gestion utilisateurs
- bannissements
- gestion des rôles
- modération commentaires
- dashboard statistiques
- notifications globales

### KPIs dashboard

- utilisateurs actifs
- nombre de pronostics
- nombre de ligues
- activité quotidienne
- équipes populaires
- pilotes populaires
- setups les mieux notés

---

## 9. Temps réel

### Fonctionnalités WebSocket

- notifications live
- classements live
- scores live
- événements de course live
- activité des ligues

### Backend

Spring WebSocket avec STOMP.

### Frontend

RxJS + Angular Signals.

---

## 10. Base de données

### Tables principales

#### users

| Colonne | Type |
|---|---|
| id | UUID |
| username | VARCHAR |
| email | VARCHAR |
| password | VARCHAR |
| role | VARCHAR |
| enabled | BOOLEAN |
| created_at | TIMESTAMP |

#### refresh_tokens

| Colonne | Type |
|---|---|
| id | UUID |
| user_id | UUID |
| token | VARCHAR |
| expires_at | TIMESTAMP |
| revoked | BOOLEAN |

#### email_verification_tokens

| Colonne | Type |
|---|---|
| id | UUID |
| user_id | UUID |
| token | VARCHAR |
| expires_at | TIMESTAMP |

#### password_reset_tokens

| Colonne | Type |
|---|---|
| id | UUID |
| user_id | UUID |
| token | VARCHAR |
| expires_at | TIMESTAMP |

#### football_predictions

| Colonne | Type |
|---|---|
| id | UUID |
| user_id | UUID |
| fixture_id | BIGINT |
| home_score | INTEGER |
| away_score | INTEGER |
| predicted_winner | VARCHAR |
| points | INTEGER |

#### f1_predictions

| Colonne | Type |
|---|---|
| id | UUID |
| user_id | UUID |
| race_id | BIGINT |
| predicted_winner | VARCHAR |
| predicted_pole | VARCHAR |
| predicted_fastest_lap | VARCHAR |
| points | INTEGER |

#### setups

| Colonne | Type |
|---|---|
| id | UUID |
| user_id | UUID |
| track_id | BIGINT |
| constructor | VARCHAR |
| game_version | VARCHAR |
| weather_type | VARCHAR |
| setup_data | JSONB |
| created_at | TIMESTAMP |

#### leagues

| Colonne | Type |
|---|---|
| id | UUID |
| name | VARCHAR |
| type | VARCHAR |
| invite_code | VARCHAR |
| owner_id | UUID |
| created_at | TIMESTAMP |

#### league_members

| Colonne | Type |
|---|---|
| id | UUID |
| league_id | UUID |
| user_id | UUID |
| joined_at | TIMESTAMP |

#### notifications

| Colonne | Type |
|---|---|
| id | UUID |
| user_id | UUID |
| title | VARCHAR |
| message | TEXT |
| read | BOOLEAN |
| created_at | TIMESTAMP |

---

## 11. API REST

### Auth

```txt
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/verify-email
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Profil

```txt
GET /api/profile/me
PUT /api/profile/me
GET /api/profile/me/stats
```

### Football

```txt
GET /api/football/matches
GET /api/football/standings
GET /api/football/matches/{id}
```

### Formule 1

```txt
GET /api/f1/races
GET /api/f1/standings/drivers
GET /api/f1/standings/constructors
GET /api/f1/races/{id}
```

### Pronostics

```txt
POST /api/predictions/football
POST /api/predictions/f1
GET /api/predictions/me
GET /api/predictions/rankings
```

### Setups

```txt
POST /api/setups
GET /api/setups
GET /api/setups/{id}
PUT /api/setups/{id}
DELETE /api/setups/{id}
POST /api/setups/{id}/vote
```

### Ligues

```txt
POST /api/leagues
GET /api/leagues/me
POST /api/leagues/join
GET /api/leagues/{id}/ranking
```

### Notifications

```txt
GET /api/notifications
PUT /api/notifications/{id}/read
PUT /api/notifications/read-all
```

### Admin

```txt
GET /api/admin/users
PUT /api/admin/users/{id}/ban
PUT /api/admin/users/{id}/role
GET /api/admin/stats
```

---

## 12. Déploiement

### Backend — Render

Variables d’environnement :

```env
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
JWT_SECRET=
MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
APP_FRONTEND_URL=
```

### Frontend — Vercel

Variable d’environnement :

```env
NG_APP_API_URL=
```

### Base de données — Neon

PostgreSQL gratuit pour démarrer.

### E-mails — Brevo ou Resend

SMTP ou API HTTP selon le choix technique.

---

## 13. Docker backend

```dockerfile
FROM eclipse-temurin:25-jdk AS build
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:25-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

---

## 14. CI/CD

### Pipeline GitHub Actions prévu

- build backend
- exécution des tests backend
- build frontend
- exécution des tests frontend
- vérification lint
- déploiement frontend sur Vercel
- déploiement backend sur Render

---

## 15. Sécurité

Mesures prévues :

- JWT signé
- refresh token stocké côté serveur
- BCrypt
- HTTPS obligatoire en production
- validation des DTO
- protection CORS
- rate limiting
- expiration des tokens sensibles
- vérification e-mail
- contrôle des rôles

---

## 16. Performance

Optimisations prévues :

- pagination backend
- indexes PostgreSQL
- cache Redis sur données sportives
- lazy loading Angular
- compression HTTP
- réduction des appels APIs externes
- stockage local temporaire côté frontend si pertinent

---

## 17. Roadmap

### Phase 1 — Initialisation

- créer backend Spring Boot
- créer frontend Angular
- config PostgreSQL
- config Flyway
- Docker local

### Phase 2 — Authentification

- register
- login
- JWT
- refresh token
- vérification e-mail
- reset password

### Phase 3 — Football

- matchs
- standings
- pronostics
- classement utilisateurs

### Phase 4 — Formule 1

- calendrier F1
- standings pilotes
- standings constructeurs
- pronostics GP

### Phase 5 — Communauté

- ligues privées
- commentaires
- notifications
- setups F1

### Phase 6 — Déploiement

- Vercel
- Render
- Neon
- SMTP
- GitHub Actions

---

## 18. Évolutions futures

- application mobile Flutter ou Ionic
- PWA
- suggestions de pronostics avec IA
- live telemetry F1
- messagerie privée
- feed d’activité
- système de badges
- saisons et archives
- multi-langue français/anglais
