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

## 🤝 Getting Started (How to use this)

Want to track your own coding flow? Setting up DevPulse takes less than 2 minutes!

### 1. Install the VS Code Extension
1. Download the `devpulse-extension-0.1.0.vsix` file (you can get it from the creator or the Releases page if available).
2. Open VS Code and press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac) to open the Command Palette.
3. Type **"Install from VSIX"** and hit Enter.
4. Select the `.vsix` file you just downloaded to install the extension.

### 2. Create Your Account
1. Visit the live dashboard: **[DevPulse Dashboard](https://devpulse-frontend-umber.vercel.app/register)**.
2. Sign up with your email and a password. (Your data is completely private and isolated).

### 3. Get Your API Key
1. Once logged in to the dashboard, click on the **Settings** tab.
2. You will see an automatically generated **API Key**. Copy this key to your clipboard.

### 4. Link VS Code to Your Dashboard
1. Go back to VS Code and open your Settings by pressing `Ctrl+,` (or `Cmd+,` on Mac).
2. Type **"DevPulse"** in the settings search bar.
3. Paste the API Key you copied into the `Devpulse: Api Key` field. 

### 5. Start Coding!
That's it! DevPulse is now running silently in the background. As you write code, switch files, or change repositories, it securely transmits your activity. Open the [web dashboard](https://devpulse-frontend-umber.vercel.app/dashboard) to watch your Flow Score update in real-time!

---
*Built with ❤️ for developers who love to flow.*
