# M-OBS (Mantle Observability Stack)

A Mantle-focused observability and transaction triage console for developers and non-technical stakeholders.

## 📦 Repositories

This is the main coordination repository. The application is split into separate repositories:

- **🔗 Main Repository:** https://github.com/hackonteam/m-obs (this repo)
- **⚙️ Backend:** https://github.com/hackonteam/m-obs-backend (API + Worker)
- **🎨 Frontend:** https://github.com/hackonteam/m-obs-frontend (SvelteKit Web App)

Each repository contains its own README with specific setup and deployment instructions.

## Overview

M-OBS provides real-time monitoring, transaction analysis, and alerting for Mantle mainnet:
- **Dashboard**: Key metrics, failure rates, gas trends
- **Transaction Explorer**: Search, filter, and deep-dive into transactions
- **Provider Health**: RPC provider comparison and monitoring
- **Alerting**: Configurable rules for proactive monitoring
- **Contract Watchlist**: Track specific contracts with ABI-based decoding

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  SvelteKit  │────►│   FastAPI    │────►│  Supabase   │
│   Frontend  │     │     API      │     │  PostgreSQL │
└─────────────┘     └──────────────┘     └─────────────┘
                                                 ▲
                                                 │
                                          ┌──────┴──────┐
                                          │   Worker    │
                                          │  (Async)    │
                                          └─────────────┘
                                                 ▲
                                                 │
                                          ┌──────┴──────┐
                                          │   Mantle    │
                                          │   Mainnet   │
                                          └─────────────┘
```

## Stack

- **Backend API**: Python + FastAPI
- **Worker**: Python async (ingestion, metrics, alerts)
- **Database**: Supabase PostgreSQL
- **Frontend**: SvelteKit + Tailwind + DaisyUI
- **Charts**: uPlot
- **Deployment**: 
  - Backend: Render.com (API + Worker)
  - Frontend: Vercel
  - Database: Supabase

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 20+
- pnpm 8+
- Supabase account
- Render.com account (for backend deployment)
- Vercel account (for frontend deployment)

### Repository Setup

1. **Clone all repositories:**
   ```bash
   # Main repository (coordination + database)
   git clone https://github.com/hackonteam/m-obs.git
   cd m-obs
   
   # Backend repository (optional, for development)
   git clone https://github.com/hackonteam/m-obs-backend.git
   
   # Frontend repository (optional, for development)
   git clone https://github.com/hackonteam/m-obs-frontend.git
   ```

2. **Set up database:**
   ```bash
   # From main repository
   cd m-obs/supabase
   
   # Install Supabase CLI (if not already installed)
   npm install -g supabase
   
   # Link to your project
   supabase link --project-ref <your-project-ref>
   
   # Run migrations
   supabase db push
   ```

3. **Set up and run backend:**
   ```bash
   # See backend repository for detailed instructions
   cd m-obs-backend
   
   # Configure environment
   cp .env.example .env
   # Edit .env with your credentials
   
   # Terminal 1: Run Worker
   cd worker
   python -m venv venv && source venv/bin/activate
   pip install -e .
   python -m src.main
   
   # Terminal 2: Run API
   cd api
   python -m venv venv && source venv/bin/activate
   pip install -e .
   uvicorn src.main:app --reload
   ```

4. **Set up and run frontend:**
   ```bash
   # See frontend repository for detailed instructions
   cd m-obs-frontend
   
   # Configure environment
   echo "PUBLIC_API_URL=http://localhost:8000" > .env
   
   # Install and run
   pnpm install
   pnpm dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:5173
   - API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## Configuration

### Environment Variables

```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-service-role-key

# API
API_PORT=8000
CORS_ORIGINS=http://localhost:5173

# Worker
WORKER_ID=worker-1
POLL_INTERVAL_PROBE=30
POLL_INTERVAL_SCANNER=2
POLL_INTERVAL_ROLLUP=60
```

### RPC Providers

Configured in `supabase/migrations/00010_seed_rpc_endpoints.sql`:
- https://rpc.mantle.xyz (primary)
- https://rpc.ankr.com/mantle
- https://mantle-rpc.publicnode.com

## Development

### Repository Structure

The project is organized into separate repositories:

**Main Repository (this repo):**
```
m-obs/
├── supabase/
│   └── migrations/   # Database schema and migrations (11 files)
├── docs/             # Project documentation
├── packages/
│   └── shared/       # Shared types (future use)
├── README.md         # This file
├── IMPLEMENTATION.md # Implementation status
└── TASKS.md          # Development roadmap
```

**Backend Repository:** https://github.com/hackonteam/m-obs-backend
```
m-obs-backend/
├── api/              # FastAPI REST API (11 endpoints)
│   ├── src/
│   │   ├── routes/   # API endpoints
│   │   └── models/   # Pydantic schemas
│   └── pyproject.toml
├── worker/           # Python async worker (4 pipelines)
│   ├── src/
│   │   ├── pipelines/    # Background pipelines
│   │   ├── providers/    # RPC client & manager
│   │   └── decoders/     # Error decoding
│   └── pyproject.toml
└── README.md         # Backend-specific documentation
```

**Frontend Repository:** https://github.com/hackonteam/m-obs-frontend
```
m-obs-frontend/
├── src/
│   ├── routes/       # SvelteKit pages (6 pages)
│   │   ├── +page.svelte           # Dashboard
│   │   ├── transactions/          # Transaction explorer
│   │   ├── providers/             # Provider health
│   │   └── alerts/                # Alert management
│   └── lib/
│       ├── api/      # API client
│       └── components/  # Reusable components
├── static/
└── README.md         # Frontend-specific documentation
```

### Working with Multiple Repositories

**Main repository (database migrations):**
```bash
cd m-obs/supabase
supabase migration new <migration_name>
# Edit the created file
supabase db push
```

**Backend development:**
```bash
cd m-obs-backend
# See backend README for detailed development guide
# Run tests: cd api && pytest
# Run tests: cd worker && pytest
```

**Frontend development:**
```bash
cd m-obs-frontend
# See frontend README for detailed development guide
# Run tests: pnpm test
# Type check: pnpm check
```

## Deployment

M-OBS uses a split deployment architecture for optimal performance and scalability:

### 🗄️ Database (Supabase)

1. Create project at https://supabase.com
2. Link locally from this repository:
   ```bash
   cd supabase
   supabase link --project-ref <your-project-ref>
   supabase db push
   ```
3. Note your database URL for backend configuration

### ⚙️ Backend (Render.com)

Deploy backend services (API + Worker) to Render.com:

1. **Fork/Clone:** https://github.com/hackonteam/m-obs-backend
2. **Follow deployment guide:** See `backend/README.md` in backend repository
3. **Services to create:**
   - `m-obs-api` - Web Service (FastAPI)
   - `m-obs-worker` - Background Worker (Python)
4. **Configure environment variables** with your Supabase credentials
5. **Note your API URL** for frontend configuration

**Detailed instructions:** https://github.com/hackonteam/m-obs-backend#deployment-on-rendercom

### 🎨 Frontend (Vercel)

Deploy frontend to Vercel:

1. **Fork/Clone:** https://github.com/hackonteam/m-obs-frontend
2. **Follow deployment guide:** See `frontend/README.md` in frontend repository
3. **Import project** to Vercel from GitHub
4. **Configure environment variable:**
   ```
   PUBLIC_API_URL=https://your-api.onrender.com
   ```
5. **Deploy** and note your Vercel URL

**Detailed instructions:** https://github.com/hackonteam/m-obs-frontend#deployment-on-vercel

### 🔗 Final Configuration

After deploying all services:

1. **Update backend CORS** on Render to include your Vercel URL:
   ```
   CORS_ORIGINS=https://your-app.vercel.app
   ```

2. **Test end-to-end:**
   - Visit your Vercel URL
   - Check dashboard loads with data
   - Verify API connectivity
   - Monitor logs on Render and Vercel

### 📊 Deployment Architecture

```
┌──────────────────┐
│  Vercel          │
│  (Frontend)      │
│  SvelteKit       │
└────────┬─────────┘
         │ HTTPS
         ▼
┌──────────────────┐
│  Render.com      │
│  ┌─────────────┐ │
│  │ API Service │ │────┐
│  └─────────────┘ │    │
│  ┌─────────────┐ │    │
│  │   Worker    │ │────┤
│  └─────────────┘ │    │
└──────────────────┘    │
                        │ PostgreSQL
                        ▼
               ┌──────────────────┐
               │  Supabase        │
               │  PostgreSQL      │
               └──────────────────┘
```

## API Reference

See full API documentation at `/docs` endpoint or `docs/API.md`.

**Key Endpoints:**
- `GET /metrics/overview` - Dashboard metrics
- `GET /providers/health` - RPC provider status
- `GET /txs` - Transaction list with filters
- `GET /txs/{hash}` - Transaction detail
- `GET /alerts` - Alert rules and events
- `POST /contracts` - Add contract to watchlist

## Documentation

- [User Requirements (URD)](docs/URD.md)
- [Software Requirements (SRS)](docs/SRS.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Product Spec](docs/PRODUCT_ARCH_SPEC.md)
- [UI/UX Spec](docs/UI_UX_SPEC.md)
- [Implementation Tasks](TASKS.md)

## Team

**HackOn Team Vietnam**

M-OBS is developed and maintained by HackOn Team Vietnam, a dedicated team focused on building innovative blockchain infrastructure tools.

### Contact

- **Email**: work.hackonteam@gmail.com
- **Telegram**: https://t.me/hackonteam

### Team Members

- **Bernie Nguyen** - Founder, Leader of HackOn Team Vietnam; Full-stack developer; Main developer
- **Thien Vo** - Front-end developer intern
- **Canh Trinh** - Researcher, Back-end developer intern
- **Sharkyz Duong Pham** - Business developer lead
- **Hieu Tran** - Business developer

### Collaboration

This project is developed in collaboration with **Phu Nhuan Builder**.

- **Email**: phunhuanbuilder@gmail.com

## Contributing

Contributions are welcome! Each repository has its own contribution workflow:

### Contributing to Backend
1. Fork https://github.com/hackonteam/m-obs-backend
2. Create feature branch: `git checkout -b feature/your-feature`
3. Make changes and add tests
4. Submit pull request to backend repository

### Contributing to Frontend
1. Fork https://github.com/hackonteam/m-obs-frontend
2. Create feature branch: `git checkout -b feature/your-feature`
3. Make changes and add tests
4. Submit pull request to frontend repository

### Contributing Database Migrations
1. Fork this repository (main)
2. Create migration in `supabase/migrations/`
3. Test locally with `supabase db push`
4. Submit pull request

### General Guidelines
- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Use semantic commit messages (feat:, fix:, docs:, etc.)

## License

MIT License - see LICENSE file for details
