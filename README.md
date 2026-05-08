# RaceCenter

> Plateforme communautaire pour les fans de Formule 1 et de football.  
> Pronostics, classements, ligues privées, partage de setups, notifications et e-mails.

---

## Présentation

RaceCenter est une application full-stack qui centralise l’expérience sportive autour de deux univers :

- la Formule 1
- le football

La plateforme permet aux utilisateurs de :

- suivre des matchs et des Grands Prix
- réaliser des pronostics
- rejoindre des ligues privées
- consulter des classements
- partager des setups F1
- recevoir des notifications et des e-mails
- interagir avec d’autres passionnés

Ce projet est conçu pour pratiquer une stack moderne avec Spring Boot 4, Angular 21, PostgreSQL, JWT, WebSocket, Docker et l’envoi d’e-mails.

---

## Stack technique

### Backend

- Java 25
- Spring Boot 4
- Spring Security
- JWT Authentication
- Spring Data JPA
- PostgreSQL
- Flyway
- Spring Mail
- WebSocket
- Docker
- Maven

### Frontend

- Angular 21
- TypeScript
- TailwindCSS
- Angular Material
- RxJS
- Angular Signals
- Chart.js

### Infrastructure

- Vercel pour le frontend
- Render pour le backend
- Neon ou Supabase pour PostgreSQL
- Brevo ou Resend pour les e-mails
- GitHub Actions pour la CI/CD

---

## Fonctionnalités principales

### Authentification

- inscription
- connexion
- déconnexion
- JWT
- refresh token
- vérification d’e-mail
- mot de passe oublié
- réinitialisation du mot de passe
- rôles utilisateur, modérateur et admin

### Football

- calendrier des matchs
- détails des matchs
- classements
- statistiques équipes
- pronostics score exact
- pronostics vainqueur
- ligues privées entre amis

### Formule 1

- calendrier F1
- détails des Grands Prix
- classements pilotes
- classements constructeurs
- pronostics podium
- pronostics pole position
- pronostics meilleur tour
- prédictions DNF

### Partage de setups F1

- création de setups
- partage par circuit
- setups pluie/sec
- votes
- commentaires
- classement des meilleurs setups

### Notifications et e-mails

- e-mail de bienvenue
- vérification du compte
- reset password
- confirmation de pronostic
- invitation de ligue
- rappel avant match ou course
- notifications temps réel via WebSocket

### Administration

- gestion utilisateurs
- bannissements
- gestion des rôles
- modération commentaires
- statistiques globales
- notifications globales

---

## Architecture

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

## APIs externes prévues

### Formule 1

- OpenF1 API
- Ergast API

### Football

- API-Football
- TheSportsDB

---

## Structure du projet

```txt
racecenter/
 ├── backend/
 ├── frontend/
 └── docs/
     └── conception-technique.md
```

---

## Lancer le projet localement

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

Variables d’environnement nécessaires :

```env
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
JWT_SECRET=
MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
```

### Frontend

```bash
cd frontend
npm install
ng serve
```

Variable d’environnement :

```env
NG_APP_API_URL=http://localhost:8080/api
```

---

## Déploiement gratuit prévu

```txt
Angular 21 → Vercel
Spring Boot 4 → Render
PostgreSQL → Neon
E-mails → Brevo ou Resend
```

---

## Roadmap

### Phase 1 — Base projet

- initialisation backend
- initialisation frontend
- PostgreSQL
- Flyway
- Docker

### Phase 2 — Authentification

- inscription
- connexion
- JWT
- refresh token
- vérification e-mail
- reset password

### Phase 3 — Football

- matchs
- classements
- pronostics
- ligues privées

### Phase 4 — Formule 1

- calendrier
- standings
- pronostics
- Race Weekend Center

### Phase 5 — Communauté

- setups
- commentaires
- votes
- notifications

### Phase 6 — Déploiement

- Docker
- GitHub Actions
- Render
- Vercel
- Neon

---

## Licence

MIT
