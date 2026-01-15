# M-OBS (Mantle Observability Stack)

A Mantle-focused observability and transaction triage console for developers and non-technical stakeholders.

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
- **Deployment**: Railway (api + worker), Supabase

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 20+
- pnpm 8+
- Supabase account
- Railway account (for deployment)

### Local Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <repo-url>
   cd m-obs
   ```

2. **Set up database:**
   ```bash
   # Install Supabase CLI
   npm install -g supabase
   
   # Link to your project
   cd supabase
   supabase link --project-ref <your-project-ref>
   
   # Run migrations
   supabase db push
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. **Run services:**
   ```bash
   # Terminal 1: Worker
   cd apps/worker
   python -m venv venv
   source venv/bin/activate
   pip install -e .
   python -m src.main
   
   # Terminal 2: API
   cd apps/api
   python -m venv venv
   source venv/bin/activate
   pip install -e .
   uvicorn src.main:app --reload
   
   # Terminal 3: Frontend
   cd apps/web
   pnpm install
   pnpm dev
   ```

5. **Access:**
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

### Project Structure

```
m-obs/
├── apps/
│   ├── api/          # FastAPI REST API
│   ├── worker/       # Async ingestion worker
│   └── web/          # SvelteKit frontend
├── supabase/
│   └── migrations/   # SQL migrations
├── packages/
│   └── shared/       # Shared TypeScript types
└── docs/             # Documentation
```

### Adding a Migration

```bash
cd supabase
supabase migration new <migration_name>
# Edit the created file
supabase db push
```

### Running Tests

```bash
# API tests
cd apps/api
pytest

# Worker tests
cd apps/worker
pytest

# Frontend tests
cd apps/web
pnpm test
```

## Deployment

### Railway

1. **Create services:**
   - `m-obs-api` (apps/api)
   - `m-obs-worker` (apps/worker)
   - `m-obs-web` (apps/web)

2. **Set environment variables** for each service

3. **Deploy:**
   ```bash
   # Using Railway CLI
   railway up
   ```

### Supabase

1. Create project at https://supabase.com
2. Link locally: `supabase link --project-ref <ref>`
3. Push migrations: `supabase db push`

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

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details
