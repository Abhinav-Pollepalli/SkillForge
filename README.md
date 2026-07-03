**Live Demo:** https://getskillforge.org


# SkillForge

**SkillForge** is an AI-powered curriculum generation platform that turns any topic into a personalized learning roadmap.
Give it a topic and experience level, and SkillForge generates a structured curriculum with modules, objectives, exercises, mini-projects, and estimated study hours.

Built as a full-stack portfolio project, SkillForge combines a React frontend, FastAPI backend, PostgreSQL persistence, Google OAuth authentication, and a multi-stage AI curriculum generation pipeline powered by Gemini.

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

SkillForge uses a multi-stage AI pipeline to generate better curricula than a single one-shot prompt.

### Curriculum Generation Pipeline

**Planner → Critic → Architect**

* **Planner** creates an initial curriculum structure for the requested topic
* **Critic** reviews the plan and identifies weaknesses, gaps, or areas to improve
* **Architect** produces the final curriculum blueprint

The result is a curriculum designed to feel more intentional and structured than a raw chatbot response.

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
* **Backend** – FastAPI API responsible for auth, curriculum generation, and persistence
* **Database** – PostgreSQL for users, curriculum history, saved state, and generation tracking

### Auth Flow

1. User signs in with Google
2. Frontend sends Google credential to the backend
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
│   ├── llm/
│   ├── prompts/
│   ├── services/
│   ├── database.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   ├── nginx.conf
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

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

Once running, the app should be available through the frontend service.

---

## Backend API Notes

The backend currently serves the FastAPI app from:

```python
backend.api.routes.curriculums:app
```

The API handles:

* Google OAuth authentication
* JWT issuance / verification
* curriculum generation
* curriculum history retrieval
* save / unsave operations
* delete / delete-all operations
* per-user generation tracking

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
