# Setup Guide

Complete installation and configuration guide for M-OBS.

## Quick Start (5 minutes)

### Using the Hosted Version (Recommended)

**Easiest way to get started:**

1. **Visit:** https://m-obs-project.vercel.app/
2. **Add your contract:** Settings → Contracts → Add Contract
3. **Set up alerts:** Alerts → Create Alert
4. **Done!** Start monitoring immediately

**No installation required!**

---

## Self-Hosting (Advanced)

### Prerequisites

**Required:**
- Node.js 18+ (for frontend)
- Python 3.10+ (for backend/worker)
- PostgreSQL 15+ (database)
- Git

**Optional:**
- Docker & Docker Compose (for containerized deployment)
- pnpm (preferred over npm)

---

## Architecture Overview

```
┌─────────────────┐
│    Frontend     │  SvelteKit (Port 5173)
│   (Vercel)      │
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────┐
│   Backend API   │  FastAPI (Port 8000)
│   (Render)      │
└────────┬────────┘
         │ PostgreSQL
         ▼
┌─────────────────┐
│    Database     │  PostgreSQL (Port 5432/6543)
│   (Supabase)    │
└────────▲────────┘
         │ SQL
┌─────────────────┐
│     Worker      │  Python Async Pipelines
│   (Render)      │
└─────────────────┘
```

---

## Installation Steps

### Option 1: Using Docker Compose (Easiest)

**1. Clone the repository:**
```bash
git clone https://github.com/hackonteam/m-obs.git
cd m-obs
```

**2. Create `.env` file:**
```bash
# Copy from example
cp .env.example .env

# Edit with your values
nano .env
```

**3. Start all services:**
```bash
docker-compose up -d
```

**4. Access the application:**
- Frontend: http://localhost:5173
- API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

### Option 2: Manual Installation

#### Step 1: Setup Database

**Using PostgreSQL locally:**
```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt-get install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE mobs;
CREATE USER mobsuser WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE mobs TO mobsuser;
\q
```

**Using Supabase (Recommended):**
1. Create account: https://supabase.com
2. Create new project
3. Get connection string from Settings → Database
4. Note down: `postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres`

**Run migrations:**
```bash
cd supabase/migrations
psql $DATABASE_URL < 00001_create_rpc_endpoints.sql
psql $DATABASE_URL < 00002_create_rpc_health_samples.sql
# ... run all migrations in order
```

---

#### Step 2: Setup Backend API

**Install dependencies:**
```bash
cd backend/api

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install packages
pip install -r requirements.txt
# OR if using pyproject.toml:
pip install -e .
```

**Configure environment:**
```bash
# Create .env file
cat > .env << EOF
DATABASE_URL=postgresql://user:pass@host:5432/database
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=your_service_key
API_PORT=8000
API_HOST=0.0.0.0
CORS_ORIGINS=http://localhost:5173
LOG_LEVEL=INFO
EOF
```

**Start API server:**
```bash
# Development
uvicorn src.main:app --reload --port 8000

# Production
uvicorn src.main:app --host 0.0.0.0 --port 8000 --workers 4
```

**Verify:**
```bash
curl http://localhost:8000/health
# Should return: {"status":"ok","timestamp":...}
```

---

#### Step 3: Setup Worker

**Install dependencies:**
```bash
cd backend/worker

# Use same venv as API or create new one
python3 -m venv venv
source venv/bin/activate

# Install packages
pip install -e .
```

**Configure environment:**
```bash
# Create .env file
cat > .env << EOF
DATABASE_URL=postgresql://user:pass@host:5432/database
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=your_service_key
RPC_TIMEOUT=10
RPC_TIMEOUT_TRACE=30
POLL_INTERVAL_SCANNER=5
BLOCK_BATCH_SIZE=10
LOG_LEVEL=INFO
EOF
```

**Start worker:**
```bash
# Development
python src/main.py

# Production (with restart on failure)
while true; do
    python src/main.py
    echo "Worker crashed, restarting in 5s..."
    sleep 5
done
```

**Verify:**
```bash
# Check logs for:
# "Starting M-OBS Worker"
# "Database connection pool created"
# "Starting block scanner pipeline"
# "Scanning blocks X to Y"
```

---

#### Step 4: Setup Frontend

**Install dependencies:**
```bash
cd frontend

# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

**Configure environment:**
```bash
# Create .env file
cat > .env << EOF
PUBLIC_API_URL=http://localhost:8000
EOF
```

**Start development server:**
```bash
# Using pnpm
pnpm dev

# Using npm
npm run dev
```

**Build for production:**
```bash
# Build
pnpm build  # or npm run build

# Preview production build
pnpm preview  # or npm run preview
```

**Verify:**
```bash
# Open browser: http://localhost:5173
# Should see M-OBS dashboard
```

---

## Configuration

### Environment Variables

#### Backend API

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | - | PostgreSQL connection string |
| `SUPABASE_URL` | No | "" | Supabase project URL |
| `SUPABASE_SERVICE_KEY` | No | "" | Supabase service role key |
| `API_PORT` | No | 8000 | API server port |
| `API_HOST` | No | 0.0.0.0 | API bind address |
| `CORS_ORIGINS` | No | localhost | Comma-separated allowed origins |
| `LOG_LEVEL` | No | INFO | Logging level |

#### Worker

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | - | PostgreSQL connection string |
| `RPC_TIMEOUT` | No | 10 | RPC request timeout (seconds) |
| `RPC_TIMEOUT_TRACE` | No | 30 | Trace request timeout (seconds) |
| `POLL_INTERVAL_SCANNER` | No | 5 | Block scan interval (seconds) |
| `BLOCK_BATCH_SIZE` | No | 10 | Max blocks per batch |
| `LOG_LEVEL` | No | INFO | Logging level |

#### Frontend

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PUBLIC_API_URL` | Yes | localhost:8000 | Backend API URL |

---

## Production Deployment

### Vercel (Frontend)

**1. Install Vercel CLI:**
```bash
npm install -g vercel
```

**2. Deploy:**
```bash
cd frontend
vercel --prod
```

**3. Set environment variables:**
```bash
vercel env add PUBLIC_API_URL
# Enter: https://your-api.com
```

**Or via Vercel Dashboard:**
- Go to: https://vercel.com/dashboard
- Select project → Settings → Environment Variables
- Add: `PUBLIC_API_URL` = `https://your-api.com`

---

### Render.com (Backend & Worker)

**Backend API:**

1. Create Web Service:
   - GitHub: Connect `m-obs-backend` repo
   - Build Command: `cd api && pip install -e .`
   - Start Command: `cd api && uvicorn src.main:app --host 0.0.0.0 --port $PORT`
   - Environment: Python 3.10

2. Environment Variables:
   ```
   DATABASE_URL=postgresql://...
   CORS_ORIGINS=https://your-frontend.vercel.app
   ```

**Worker:**

1. Create Background Worker:
   - GitHub: Connect `m-obs-backend` repo
   - Build Command: `cd worker && pip install -e .`
   - Start Command: `cd worker && python src/main.py`
   - Environment: Python 3.10

2. Environment Variables:
   ```
   DATABASE_URL=postgresql://...
   LOG_LEVEL=INFO
   ```

---

### Supabase (Database)

**1. Create project:**
- Go to: https://supabase.com/dashboard
- Click "New Project"
- Choose region (closest to your users)
- Set strong database password

**2. Run migrations:**
```bash
# Get connection string
# Settings → Database → Connection string (Transaction mode)

# Run migrations
cd supabase/migrations
for file in *.sql; do
    psql "$DATABASE_URL" < "$file"
    echo "Applied: $file"
done
```

**3. Seed data:**
```bash
psql "$DATABASE_URL" < 00010_seed_rpc_endpoints.sql
```

**4. Configure connection pooling:**
- Use Transaction mode for API (port 6543)
- Use Session mode for migrations (port 5432)

---

## Verification

### Health Checks

**1. Database:**
```bash
psql $DATABASE_URL -c "SELECT COUNT(*) FROM rpc_endpoints;"
# Should return 3 (or number of providers)
```

**2. API:**
```bash
curl http://localhost:8000/health
# {"status":"ok","timestamp":1768460000}

curl http://localhost:8000/providers/health
# Should return 3 providers with health scores
```

**3. Worker:**
```bash
# Check logs for:
# "Scanned block X with Y transactions"
# "Inserted Z transactions"

# Query database:
psql $DATABASE_URL -c "SELECT COUNT(*) FROM txs;"
# Should be increasing
```

**4. Frontend:**
```bash
# Open: http://localhost:5173
# Should see dashboard with data
# Check browser console for errors
```

---

## Troubleshooting

### Common Issues

#### 1. "Failed to connect to database"

**Symptom:** API/Worker can't connect to PostgreSQL

**Solutions:**
```bash
# Check connection string format
echo $DATABASE_URL
# Should be: postgresql://user:pass@host:port/database

# Test connection manually
psql $DATABASE_URL -c "SELECT 1;"

# Check SSL requirement (Supabase needs SSL)
# Add to connection string: ?sslmode=require
```

#### 2. "Frontend shows 'Failed to load metrics'"

**Symptom:** Dashboard shows loading errors

**Solutions:**
```bash
# Check PUBLIC_API_URL
echo $PUBLIC_API_URL
# Should match backend API URL

# Check CORS in backend
# CORS_ORIGINS should include frontend URL

# Test API manually
curl https://your-api.com/health
```

#### 3. "Worker not scanning blocks"

**Symptom:** Worker running but no transactions in database

**Solutions:**
```bash
# Check worker state
psql $DATABASE_URL -c "SELECT * FROM worker_state WHERE key = 'last_scanned_block';"

# Update to recent block (skip old blocks)
psql $DATABASE_URL << EOF
UPDATE worker_state 
SET value = '{"block_number": 90000000, "block_hash": "0x0", "timestamp": 1768460000}'
WHERE key = 'last_scanned_block';
EOF

# Restart worker
```

#### 4. "High latency / slow responses"

**Symptom:** Dashboard loads slowly

**Solutions:**
```bash
# Check database indexes
psql $DATABASE_URL -c "\d+ txs"
# Should have indexes on: block_timestamp, status, contract_id

# Add missing indexes
psql $DATABASE_URL << EOF
CREATE INDEX IF NOT EXISTS idx_txs_block_timestamp ON txs(block_timestamp);
CREATE INDEX IF NOT EXISTS idx_txs_status ON txs(status);
CREATE INDEX IF NOT EXISTS idx_txs_contract_id ON txs(contract_id);
EOF

# Check connection pool size
# Increase max_size in database.py from 20 to 50
```

---

## Monitoring

### Logs

**API Logs:**
```bash
# Development
# Stdout automatically

# Production (Render)
# Dashboard → Logs tab
```

**Worker Logs:**
```bash
# Development
# Stdout automatically

# Production (Render)
# Dashboard → Logs tab
```

**Database Logs:**
```bash
# Supabase Dashboard
# Logs → Database Logs
```

### Metrics

**System Health:**
```bash
# API response time
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:8000/health

# Worker scan rate
psql $DATABASE_URL -c "
SELECT MAX(block_number), 
       NOW() - TO_TIMESTAMP(MAX(block_timestamp))::timestamp AS lag
FROM txs;
"

# Database size
psql $DATABASE_URL -c "
SELECT pg_size_pretty(pg_database_size(current_database()));
"
```

---

## Maintenance

### Database Cleanup

**Remove old data:**
```sql
-- Delete health samples older than 7 days
DELETE FROM rpc_health_samples 
WHERE created_at < NOW() - INTERVAL '7 days';

-- Delete metrics older than 30 days
DELETE FROM metrics_minute 
WHERE bucket < NOW() - INTERVAL '30 days';
```

### Backups

**Database backup:**
```bash
# Backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Restore
psql $DATABASE_URL < backup_20260115.sql
```

---

## Scaling

### Horizontal Scaling

**Multiple Workers:**
```bash
# Shard by block range
BLOCK_START=0 BLOCK_END=10000000 python src/main.py &
BLOCK_START=10000001 BLOCK_END=20000000 python src/main.py &
```

**Multiple API Instances:**
```bash
# Render auto-scaling
# Dashboard → Settings → Scaling → Set min/max instances
```

### Vertical Scaling

**Database:**
- Supabase: Upgrade to Pro ($25/mo) or higher tier
- More CPU/RAM for complex queries

**API/Worker:**
- Render: Increase instance type
- Add Redis for caching

---

## Next Steps

- [Deployment Guide →](/technical/deployment.md)
- [API Reference →](/technical/api-reference.md)
- [Architecture →](/technical/architecture.md)
