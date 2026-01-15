# Technical Documentation

Complete technical reference for M-OBS.

## Quick Start

- [Architecture Overview](architecture.md) - System design and components
- [Setup Guide](setup.md) - Installation and configuration _(coming soon)_
- [API Reference](api-reference.md) - REST API documentation _(coming soon)_
- [Database Schema](database-schema.md) - Data models _(coming soon)_
- [Deployment Guide](deployment.md) - Production deployment _(coming soon)_

## Stack

**Frontend:**
- SvelteKit 4 + TypeScript
- TailwindCSS 3 + DaisyUI 4
- uPlot (charts)
- Vercel (deployment)

**Backend:**
- Python 3.10 + FastAPI
- asyncpg + PostgreSQL
- Pydantic v2
- Render.com (deployment)

**Database:**
- PostgreSQL 15
- Supabase (managed)
- TimescaleDB extension

## Performance

- API Response: < 500ms p95
- Worker Scan: 1-2 blocks/second
- Data Freshness: 2-4 seconds
- Uptime: 99.9% target

## Contributing

See main repo: https://github.com/hackonteam/m-obs
