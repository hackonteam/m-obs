# Architecture Overview

## System Architecture

M-OBS follows a microservices architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                     USERS                                │
└────────────────────────┬────────────────────────────────┘
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────┐
│              FRONTEND (Vercel)                           │
│  - SvelteKit SSR                                         │
│  - TailwindCSS + DaisyUI                                 │
│  - Real-time charts (uPlot)                              │
│  - Responsive design                                     │
└────────────────────────┬────────────────────────────────┘
                         │ REST API (HTTPS)
                         ▼
┌─────────────────────────────────────────────────────────┐
│              BACKEND API (Render)                        │
│  - FastAPI + Python 3.10                                 │
│  - RESTful endpoints                                     │
│  - Data aggregation                                      │
│  - Pydantic validation                                   │
└────────────────────────┬────────────────────────────────┘
                         │ PostgreSQL (SSL)
                         ▼
┌─────────────────────────────────────────────────────────┐
│              DATABASE (Supabase)                         │
│  - PostgreSQL 15                                         │
│  - Connection pooling (pgBouncer)                        │
│  - SSL required                                          │
│  - TimescaleDB for time-series                           │
└────────────────────────▲────────────────────────────────┘
                         │ SQL Inserts/Updates
                         │
┌─────────────────────────────────────────────────────────┐
│              WORKER (Render)                             │
│  - Async Python pipelines                                │
│  - Block scanner                                         │
│  - Provider health probe                                 │
│  - Metrics aggregation                                   │
│  - Alert evaluator                                       │
└────────────────────────┬────────────────────────────────┘
                         │ JSON-RPC
                         ▼
┌─────────────────────────────────────────────────────────┐
│              MANTLE RPC NODES                            │
│  - mantle-publicnode.com                                 │
│  - rpc.mantle.xyz                                        │
│  - rpc.ankr.com/mantle                                   │
└─────────────────────────────────────────────────────────┘
```

---

## Component Details

### 1. Frontend (SvelteKit)

**Purpose:** User interface for monitoring and analytics

**Technology:**
- **Framework:** SvelteKit 4.x
- **Styling:** TailwindCSS 3.x + DaisyUI 4.x
- **Charts:** uPlot (high-performance time-series)
- **Deployment:** Vercel (Edge Network)

**Key Features:**
- Server-Side Rendering (SSR)
- Real-time data refresh
- Responsive design
- Dark theme optimized
- Progressive Web App (PWA) ready

**Pages:**
- `/` - Overview dashboard with metrics
- `/providers` - RPC provider health monitoring
- `/transactions` - Transaction explorer with filters
- `/alerts` - Alert configuration and history
- `/settings` - System configuration

---

### 2. Backend API (FastAPI)

**Purpose:** RESTful API for data access and aggregation

**Technology:**
- **Framework:** FastAPI 0.104+
- **Database Driver:** asyncpg
- **Validation:** Pydantic v2
- **Deployment:** Render.com

**Endpoints:**
```
GET  /health                    - Health check
GET  /metrics/overview          - Aggregated metrics
GET  /txs                       - Transaction list with filters
GET  /txs/{hash}                - Transaction details
GET  /providers/health          - Provider health status
GET  /contracts                 - Watched contracts
POST /contracts                 - Add contract
GET  /alerts                    - Alert configurations
POST /alerts                    - Create alert
```

**Features:**
- Async I/O for high performance
- Connection pooling (2-20 connections)
- CORS support for frontend
- Request validation with Pydantic
- Auto-generated OpenAPI docs

---

### 3. Worker (Python Async)

**Purpose:** Background data ingestion and processing

**Technology:**
- **Language:** Python 3.10+
- **Async:** asyncio + asyncpg
- **RPC Client:** httpx
- **Deployment:** Render.com

**Pipelines:**

#### 3.1 Block Scanner
```python
- Scans new blocks from Mantle RPC
- Fetches transaction receipts
- Decodes error messages
- Stores in database
- Handles blockchain reorgs
```

**Performance:**
- Scan speed: 1-2 blocks/second
- Batch size: 1-10 blocks (adaptive)
- RPC failover: Automatic provider switching

#### 3.2 Provider Probe
```python
- Health checks every 30 seconds
- Tests: eth_blockNumber, eth_chainId
- Measures latency
- Calculates health scores (0-100)
- Updates provider status
```

**Scoring Algorithm:**
```
Base score: 50
+ Response time bonus: 0-25 points
+ Success rate bonus: 0-25 points
- Failure penalty: -10 per failure
```

#### 3.3 Metrics Rollup
```python
- Aggregates transaction data
- Time buckets: minute, hour, day
- Calculates: tx_count, failure_rate, gas_avg
- Stores in metrics_minute table
```

#### 3.4 Alert Evaluator
```python
- Evaluates alert conditions
- Types: failure_rate, gas_spike, provider_down
- Sends notifications (ready to integrate)
- Cooldown period: Prevents spam
```

---

### 4. Database (PostgreSQL + Supabase)

**Purpose:** Persistent storage for all application data

**Technology:**
- **Database:** PostgreSQL 15
- **Hosting:** Supabase (managed)
- **Pooler:** pgBouncer (connection pooling)
- **Extensions:** TimescaleDB (time-series optimization)

**Tables:**

#### Core Tables
```sql
rpc_endpoints          - RPC provider configurations
rpc_health_samples     - Provider health time-series
contracts              - Watched smart contracts
txs                    - All transactions
tx_traces              - Execution traces (optional)
metrics_minute         - Aggregated metrics
alerts                 - Alert configurations
alert_events           - Alert trigger history
worker_state           - Worker state persistence
```

**Indexes:**
- `txs(block_timestamp)` - Time-based queries
- `txs(status)` - Filter by success/failed
- `txs(contract_id)` - Contract-specific queries
- `txs(from_address)`, `txs(to_address)` - Address lookups
- `metrics_minute(bucket)` - Time-series queries

**Data Retention:**
```
rpc_health_samples: 7 days
metrics_minute: 30 days
txs: Unlimited (or configurable)
```

---

## Data Flow

### Transaction Ingestion Flow

```
1. Worker fetches latest block number from RPC
   ↓
2. Compares with last scanned block (worker_state)
   ↓
3. If behind, fetches blocks in batch
   ↓
4. For each block:
   - Fetch full block with transactions
   - Fetch receipts for all transactions
   - Parse status, gas, errors
   - Match contracts if watched
   ↓
5. Insert transactions into database (batch)
   ↓
6. Update worker_state with new block number
```

### Metrics Aggregation Flow

```
1. Metrics rollup runs every minute
   ↓
2. Query transactions in last minute bucket
   ↓
3. Calculate aggregates:
   - COUNT(*) for tx_total
   - COUNT(CASE status=0) for tx_failed
   - AVG(gas_price) for gas_price_avg
   - SUM(gas_used) for gas_used_total
   ↓
4. Insert into metrics_minute table
```

### API Query Flow

```
1. Frontend sends API request
   ↓
2. API validates request (Pydantic)
   ↓
3. Constructs SQL query with filters
   ↓
4. Execute query via connection pool
   ↓
5. Transform results to JSON
   ↓
6. Return response with pagination
```

---

## Scalability Considerations

### Current Capacity
- **Transactions:** 1-2 per second sustained
- **API Requests:** ~100 req/second
- **Database:** ~1000 concurrent connections (pooled)
- **Worker:** Single instance (can scale horizontally)

### Scaling Strategies

**Horizontal Scaling:**
```
- Multiple worker instances (shard by block range)
- API load balancer (Render auto-scaling)
- Database read replicas (Supabase)
- CDN for frontend (Vercel Edge)
```

**Vertical Scaling:**
```
- Increase worker batch size (1 → 50 blocks)
- Database upgrade (shared → dedicated)
- Optimize queries with materialized views
```

**Optimization:**
```
- Cache frequently accessed data (Redis)
- Compress historical data
- Archive old transactions
- Use database partitioning by time
```

---

## Security

### Network Security
- ✅ All connections over HTTPS/TLS
- ✅ Database SSL required
- ✅ CORS configured for frontend domain
- ✅ Environment variables for secrets

### Data Security
- ✅ No private keys stored
- ✅ No PII collected
- ✅ Public blockchain data only
- ✅ SQL injection protection (parameterized queries)

### Access Control
- ✅ Database: Service role key (Supabase)
- ✅ API: Ready for JWT authentication
- ✅ Worker: Internal service (not exposed)

---

## Monitoring

### Health Checks
```
Frontend: Vercel edge health checks
API: GET /health endpoint
Worker: Process monitoring (Render)
Database: Supabase dashboard
```

### Metrics
```
API Response Time: < 500ms p95
Worker Scan Rate: 1-2 blocks/second
Provider Latency: 200-400ms
Database Connections: 2-10 active
```

### Alerting (Ready)
```
- Alert on high failure rate
- Alert on provider down
- Alert on worker stopped
- Alert on database connection issues
```

---

## Technology Choices Rationale

### Why SvelteKit?
- **Performance:** Fastest framework benchmarks
- **DX:** Simple, less boilerplate than React
- **SSR:** Built-in server-side rendering
- **Size:** Smallest bundle size (~30KB)

### Why FastAPI?
- **Speed:** Fastest Python web framework
- **Async:** Native async/await support
- **Docs:** Auto-generated OpenAPI/Swagger
- **Validation:** Pydantic integration

### Why PostgreSQL?
- **Reliability:** ACID compliant
- **Performance:** Excellent for time-series with TimescaleDB
- **Features:** Rich query capabilities, JSON support
- **Ecosystem:** Mature, well-supported

### Why Supabase?
- **Managed:** Database as a service
- **Performance:** Connection pooling built-in
- **Cost:** Free tier sufficient for MVP
- **Realtime:** Built-in realtime features (future use)

---

## Future Architecture Considerations

### Potential Additions

**Caching Layer (Redis):**
```
- Cache provider health status
- Cache aggregated metrics
- Reduce database load
```

**Message Queue (RabbitMQ/SQS):**
```
- Decouple block scanning from processing
- Handle bursts of transactions
- Retry failed operations
```

**Trace Analysis:**
```
- Deep transaction analysis
- Call tree visualization
- Gas profiling
```

**Multi-chain Support:**
```
- Abstract RPC client
- Chain-specific configurations
- Unified dashboard
```

---

**Next:** [Setup Guide →](/technical/setup.md)
