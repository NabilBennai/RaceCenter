# RaceCenter

> Plateforme communautaire pour les fans de Formule 1 et de football.  
> Pronostics, classements, ligues privées, partage de setups, notifications et e-mails.

---

## Présentation

RaceCenter est une application full-stack qui centralise l’expérience sportive autour de deux univers :

- la Formule 1
- le football

La plateforme permettra aux utilisateurs de suivre des événements sportifs, réaliser des pronostics, rejoindre des ligues privées, consulter des classements, partager des setups F1, recevoir des notifications et interagir avec d’autres passionnés.

Le sprint 0 met en place la base technique du projet avec :

- un backend Spring Boot 4 exposant une API REST
- un frontend Angular 21 avec TailwindCSS et Angular Material
- une base PostgreSQL locale via Docker Compose
- une migration initiale Flyway
- des commandes de build et de test documentées

---

## Stack technique

### Backend

- Java 25
- Spring Boot 4
- Spring Security
- Spring Data JPA
- PostgreSQL
- Flyway
- Spring Mail
- Maven Wrapper

### Frontend

- Angular 21
- TypeScript
- TailwindCSS
- Angular Material
- RxJS
- Angular Signals
- Chart.js
- ngx-toastr

### Infrastructure locale

- Docker Compose
- PostgreSQL 18 Alpine

---

## Structure du projet

```txt
RaceCenter/
 ├── backend/                 # API REST Spring Boot 4
 │   ├── src/main/java/com/racecenter/
 │   │   ├── config/          # Configuration Spring Security
 │   │   └── shared/health/   # Endpoint de santé
 │   └── src/main/resources/
 │       └── db/migration/    # Migrations Flyway
 ├── frontend/                # Application Angular 21
 │   └── src/app/             # Layout temporaire Sprint 0
 ├── docs/                    # Documents de conception
 ├── docker-compose.yml       # PostgreSQL local
 └── README.md
```

---

## Prérequis

- Java 25
- Node.js compatible Angular 21 (`^20.19.0 || ^22.12.0 || >=24.0.0`)
- npm
- Docker et Docker Compose pour PostgreSQL

---

## Lancer le projet localement

### 1. Base PostgreSQL

```bash
docker compose up -d postgres
```

La base locale est créée avec les identifiants suivants :

```env
POSTGRES_DB=racecenter
POSTGRES_USER=racecenter
POSTGRES_PASSWORD=racecenter
```

### 2. Backend

```bash
cd backend
./mvnw spring-boot:run
```

Variables d’environnement configurables :

```env
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/racecenter
SPRING_DATASOURCE_USERNAME=racecenter
SPRING_DATASOURCE_PASSWORD=racecenter
MAIL_HOST=localhost
MAIL_PORT=1025
MAIL_USERNAME=
MAIL_PASSWORD=
```

Endpoint de santé :

```bash
curl http://localhost:8080/api/health
```

Réponse attendue :

```json
{
  "status": "OK",
  "service": "racecenter-backend",
  "timestamp": "..."
}
```

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

L’application Angular est disponible sur :

```txt
http://localhost:4200
```

La configuration API de développement est définie dans `frontend/src/environments/environment.development.ts` et pointe vers :

```txt
http://localhost:8080/api
```

---

## Commandes utiles

### Backend

```bash
cd backend
./mvnw test
./mvnw clean package
```

### Frontend

```bash
cd frontend
npm run build
npm test -- --watch=false
```

### Docker Compose

```bash
docker compose up -d postgres
docker compose ps
docker compose down
```

---

## Sprint 0 livré

- structure `backend/`, `frontend/`, `docs/`
- `.gitignore` racine
- backend Spring Boot 4 avec dépendances Web, Security, JPA, PostgreSQL, Flyway, Validation et Mail
- endpoint public `GET /api/health`
- configuration datasource PostgreSQL par variables d’environnement
- migration Flyway initiale `V1__init_schema.sql`
- frontend Angular 21 standalone avec page d’accueil temporaire
- TailwindCSS et Angular Material configurés
- Docker Compose PostgreSQL local

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
