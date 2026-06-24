# DevPulse 📊

> **Developer Intelligence.** Track your flow state, coding streaks, and codebase focus autonomously.

DevPulse is a full-stack developer analytics platform that passively tracks your coding activity, context switches, and deep-work periods. It consists of a VS Code Extension, a Spring Boot Java backend, and a Next.js dashboard.

---

## 🚀 Features

- **Passive Tracking**: Automatically monitors active coding time without manual toggles.
- **Flow Score Calculation**: Computes your "Flow Score" based on uninterrupted coding sessions.
- **Context Switch Detection**: Identifies when you frequently jump between different codebases or files.
- **Real-Time Dashboard**: Beautiful, dark-themed Next.js UI with charts, sparklines, and daily streaks.
- **Top Repositories**: Tracks which repositories and languages command the majority of your time.

## 🏗️ Architecture

DevPulse is structured as a monorepo containing three distinct components:

1. **`devpulse-extension`**
   - The VS Code Extension written in TypeScript.
   - Monitors keystrokes, file changes, and window focus to emit heartbeats.
   - Built using `vsce`.

2. **`devpulse-backend`**
   - The core API built with **Java 17 & Spring Boot 3**.
   - Handles event ingestion, aggregation, and calculates flow states.
   - Persists data to a **PostgreSQL** database using JPA and Flyway migrations.
   - Docker-ready for easy production deployments.

3. **`devpulse-frontend`**
   - The user-facing dashboard built with **Next.js 14 (App Router)** and **Tailwind CSS**.
   - Features dynamic SWR data fetching, Recharts visualizations, and a sleek glassmorphic design.

## 💻 Local Development

### Prerequisites
- Node.js (v18+)
- Java 17+ and Maven
- Docker & Docker Compose (for the local Postgres DB)

### 1. Database
```bash
cd devpulse-backend
docker-compose up -d
```

### 2. Backend
```bash
cd devpulse-backend
mvn spring-boot:run
```
*The backend will run on `http://localhost:8080`.*

### 3. Frontend
```bash
cd devpulse-frontend
npm install
npm run dev
```
*The dashboard will run on `http://localhost:3000`.*

### 4. Extension
1. Open the `devpulse-extension` folder in VS Code.
2. Run `npm install`.
3. Press `F5` to open an Extension Development Host.

## 🌐 Production Deployment

- **Database**: Managed PostgreSQL (e.g., Supabase, Neon, or Railway)
- **Backend**: Containerized and deployed to Railway (`railway up`)
- **Frontend**: Deployed seamlessly to Vercel (`vercel deploy --prod`)

Ensure you set the appropriate environment variables (`DATABASE_URL`, `CORS_ALLOWED_ORIGINS` in the backend, and `NEXT_PUBLIC_API_URL` in the frontend).

## 🔒 Security
API calls from the extension to the backend are authenticated via generated API keys. Users must register to receive a unique token, which is stored locally and transmitted securely.

---
*Built with ❤️ for developers who love to flow.*
