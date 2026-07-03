# SkillForge

**SkillForge** is an AI-powered curriculum generation platform that turns any topic into a personalized learning roadmap with modules, objectives, exercises, projects, and estimated study hours.

**Live Demo:** https://getskillforge.org

Unlike a one-shot chatbot response, SkillForge uses a multi-stage **Planner → Critic → Architect** pipeline to generate more structured, reviewable curricula and persist them per user.

## Highlights

* Generate personalized learning roadmaps from any topic and experience level
* Multi-stage curriculum generation pipeline for higher-quality outputs
* Google OAuth + JWT authentication
* Persistent curriculum history with save / unsave support
* Full-stack production deployment with React, FastAPI, PostgreSQL, Docker, and Nginx

---

## Features

* **AI-generated learning roadmaps** from any topic and experience level
* **Structured curriculum output** with:

  * modules
  * topics
  * learning objectives
  * exercises
  * mini-projects / projects
  * estimated study hours
* **Multi-stage curriculum generation pipeline** for higher quality outputs
* **Google OAuth login**
* **JWT-based authentication**
* **Persistent curriculum history**
* **Save / unsave curricula**
* **Delete individual curricula or clear history**
* **Per-user curriculum storage and generation tracking**
* **Dockerized full-stack deployment**
* **Production deployment with Nginx reverse proxy**

---

## How It Works

SkillForge uses a multi-stage AI pipeline to generate more structured curricula than a single one-shot prompt.

### Curriculum Generation Pipeline

**Planner → Critic → Architect**

* **Planner** creates an initial curriculum structure for the requested topic
* **Critic** reviews the plan and identifies weaknesses, gaps, or areas to improve
* **Architect** produces the final curriculum blueprint

The result is a curriculum designed to feel more intentional and reviewable than a raw chatbot response.

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* TailwindCSS

### Backend

* FastAPI
* Pydantic
* Psycopg3

### Database

* PostgreSQL 17

### AI

* Gemini 3.1 Flash Lite

### Auth

* Google OAuth
* JWT authentication

### Deployment / Infra

* Docker
* Docker Compose
* Nginx
* AWS EC2
* Ubuntu 24.04

---

## Architecture Overview

SkillForge is a full-stack application with three core services:

* **Frontend** – React + TypeScript SPA served behind Nginx
* **Backend** – FastAPI API responsible for authentication, curriculum generation, and persistence
* **Database** – PostgreSQL for users, curriculum history, saved state, and generation tracking

### Auth Flow

1. User signs in with Google
2. Frontend sends the Google credential to the backend
3. Backend verifies the Google ID token
4. Backend finds or creates the user in PostgreSQL
5. Backend issues a JWT
6. Frontend stores the JWT and uses it for authenticated requests

### Request Flow

1. User enters a topic and experience level
2. Frontend sends the request to the backend
3. Backend runs the Planner → Critic → Architect pipeline
4. Final curriculum is validated and stored in PostgreSQL
5. Frontend displays the generated curriculum and updates history

---

## Example Curriculum Output

A generated curriculum can include:

* **Module titles**
* **Topics per module**
* **Learning objectives**
* **Practice exercises**
* **Mini-projects / projects**
* **Estimated hours**

Example topics you might generate a roadmap for:

* Machine Learning
* Data Structures & Algorithms
* React
* FastAPI
* Computer Networks
* Operating Systems

---

## Project Structure

```text
SkillForge/
├── backend/
│   ├── api/
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── auth.py
│   │       └── curriculums.py
│   ├── database.py
│   ├── Dockerfile
│   ├── llm/
│   │   ├── __init__.py
│   │   ├── base.py
│   │   └── gemini.py
│   ├── migrations/
│   │   └── 001_add_saved_column.sql
│   ├── prompts/
│   │   ├── __init__.py
│   │   ├── architect.txt
│   │   ├── critic.txt
│   │   └── planner.txt
│   ├── requirements.txt
│   ├── schema.sql
│   ├── schemas/
│   │   ├── critic.py
│   │   ├── curriculum.py
│   │   └── planner.py
│   └── services/
│       ├── __init__.py
│       ├── architect.py
│       ├── critic.py
│       └── planner.py
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   ├── nginx.conf
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── Skill_Forge_Logo.png
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   ├── curriculum/
│   │   │   │   ├── CurriculumResult.tsx
│   │   │   │   ├── CurriculumSkeleton.tsx
│   │   │   │   ├── GenerateForm.tsx
│   │   │   │   ├── HistoryItem.tsx
│   │   │   │   ├── index.ts
│   │   │   │   └── ModuleCard.tsx
│   │   │   ├── layout/
│   │   │   │   ├── index.ts
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Topbar.tsx
│   │   │   └── ui/
│   │   │       ├── Badge.tsx
│   │   │       ├── Button.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── EmptyState.tsx
│   │   │       ├── ErrorBanner.tsx
│   │   │       ├── index.ts
│   │   │       ├── LoginButton.tsx
│   │   │       ├── StatCard.tsx
│   │   │       └── Toggle.tsx
│   │   ├── data/
│   │   ├── hooks/
│   │   │   └── useAppState.ts
│   │   ├── index.css
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   ├── auth.ts
│   │   │   └── utils.ts
│   │   ├── main.tsx
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── views/
│   │   │   ├── DashboardView.tsx
│   │   │   ├── HistoryView.tsx
│   │   │   ├── index.ts
│   │   │   ├── LoginView.css
│   │   │   ├── LoginView.tsx
│   │   │   ├── SavedView.tsx
│   │   │   └── SettingsView.tsx
│   │   └── vite-env.d.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── LICENSE
└── README.md
```

---

## Quick Start

```bash
git clone https://github.com/Abhinav-Pollepalli/SkillForge.git
cd SkillForge

cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

docker compose up --build
```

This will start the PostgreSQL database, FastAPI backend, and React frontend.

---

## Local Development

### Prerequisites

Make sure you have the following installed:

* **Python 3.13+**
* **Node.js**
* **PostgreSQL**
* **Docker + Docker Compose** (recommended for running the full stack)

---

## Environment Variables

SkillForge uses separate environment files for infrastructure, backend, and frontend configuration.

### Root `.env`

Used by Docker Compose for infrastructure-level configuration.

Example:

```env
POSTGRES_PASSWORD=your_postgres_password_here
```

### `backend/.env`

Used by the FastAPI backend.

Required variables:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_CLIENT_ID=your_google_client_id_here
JWT_SECRET_KEY=your_jwt_secret_key_here

DB_NAME=skillforge
DB_USER=skillforge
DB_PASSWORD=your_db_password_here
DB_HOST=db
DB_PORT=5432
```

### `frontend/.env`

Used by the Vite frontend.

```env
VITE_API_BASE=/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

---

## Running with Docker Compose

From the project root:

```bash
docker compose up --build
```

This starts:

* **PostgreSQL**
* **FastAPI backend**
* **React frontend served through Nginx**

Once the containers are up, the frontend is served through Nginx and the backend is available behind the `/api` reverse proxy.

---

## Database Overview

SkillForge currently uses two main tables:

### `users`

Stores:

* Google identity information
* email / name
* generation tracking
* account creation metadata

### `curriculum`

Stores:

* topic
* experience level
* generated curriculum JSON
* saved state
* creation timestamp
* owning user

---

## Production Notes

SkillForge is designed to run as a Dockerized full-stack app behind an Nginx reverse proxy.

Production deployment includes:

* React frontend served by Nginx
* `/api` reverse proxying to FastAPI
* PostgreSQL persistence
* Google OAuth authentication
* environment-based backend configuration
* Docker Compose orchestration

---

## Current Scope

SkillForge is intentionally focused on a strong V1 curriculum-generation experience.
The current version emphasizes:

* curriculum generation quality
* authentication
* persistence
* clean full-stack architecture
* production deployment

It does **not** currently aim to be a full tutoring platform or learning management system.

---

## Why I Built It

SkillForge was built as a portfolio project to combine:

* full-stack web development
* backend API design
* authentication / authorization
* database persistence
* Dockerized deployment
* practical AI integration in a product setting

The goal was to build an end-to-end application that feels like a real product rather than a toy demo.

---

## Roadmap / Future Improvements

Potential future improvements include:

* curriculum regeneration / refinement flows
* richer curriculum editing tools
* better curriculum comparison and feedback loops
* improved observability / analytics
* stronger production hardening and operational tooling

---

## License

This project is licensed under the MIT License.
