# M-OBS Implementation Tasks

## P0 - Core Infrastructure (Week 1-2)

### Database
- [x] Set up Supabase project structure
- [x] Create migration files for all tables
- [x] Seed RPC endpoints
- [x] Define retention policy functions
- [ ] Test migrations locally
- [ ] Deploy to Supabase

### Worker - Foundation
- [x] Project scaffold with async runtime
- [x] Database connection pool
- [x] Configuration management
- [x] Provider manager with failover
- [x] RPC client with error handling
- [x] Provider scoring algorithm
- [x] Provider probe pipeline
- [ ] Test worker locally

### API - Foundation
- [x] Project scaffold with FastAPI
- [x] Database connection
- [x] Health check endpoint
- [x] CORS configuration
- [x] Provider health endpoint
- [ ] Test API locally

## P0 - Core Features (Week 2-3)

### Worker - Ingestion
- [ ] Block scanner pipeline
- [ ] Receipt parsing
- [ ] Error signature extraction
- [ ] Basic error decoding (standard errors)
- [ ] State checkpoint persistence
- [ ] Reorg detection

### API - Endpoints
- [ ] GET /txs (transaction list with filters)
- [ ] GET /txs/{hash} (transaction detail)
- [ ] GET /contracts (contract list)
- [ ] POST /contracts (add contract)

### Frontend - Foundation
- [ ] SvelteKit project setup
- [ ] Tailwind + DaisyUI configuration
- [ ] API client
- [ ] Layout with sidebar
- [ ] Basic routing structure

## P1 - Dashboard (Week 3-4)

### Worker - Metrics
- [ ] Metrics rollup pipeline
- [ ] Top errors aggregation
- [ ] Unique sender tracking

### API - Metrics
- [ ] GET /metrics/overview
- [ ] Query optimization for metrics
- [ ] Time range validation

### Frontend - Overview
- [ ] Metric cards component
- [ ] Failure rate chart (uPlot)
- [ ] Gas price chart
- [ ] Top errors table
- [ ] Recent failed txs list
- [ ] Provider status badges
- [ ] Time range selector

## P1 - Transaction Explorer (Week 4-5)

### Worker - Enhanced
- [ ] ABI-based error decoding
- [ ] Method name decoding
- [ ] Trace fetcher (best-effort)
- [ ] Trace queue management

### API - Enhanced
- [ ] Transaction filtering (status, contract, address)
- [ ] Cursor-based pagination
- [ ] Sort options
- [ ] Error signature filtering

### Frontend - Transactions
- [ ] Filter bar component
- [ ] Transaction table with sorting
- [ ] Pagination controls
- [ ] Transaction detail page
- [ ] Error detail panel
- [ ] Trace viewer component
- [ ] Address/hash copy buttons

## P1 - Provider & Alerts (Week 5-6)

### Worker - Alerts
- [ ] Alert evaluation pipeline
- [ ] Alert event creation
- [ ] Cooldown enforcement
- [ ] Condition evaluators (failure_rate, gas_spike, provider_down)

### API - Alerts
- [ ] GET /alerts
- [ ] POST /alerts
- [ ] PATCH /alerts/{id}
- [ ] DELETE /alerts/{id}
- [ ] Alert validation

### Frontend - Complete
- [ ] Provider comparison page
- [ ] Latency chart
- [ ] Uptime chart
- [ ] Block height comparison
- [ ] Alerts page
- [ ] Alert rules table
- [ ] Alert event timeline
- [ ] Create alert modal
- [ ] Alert detail drawer
- [ ] Settings page
- [ ] Contract management UI

## P1 - Polish (Week 6)

### States & Error Handling
- [ ] Loading skeletons for all pages
- [ ] Error states with retry
- [ ] Empty states with CTAs
- [ ] Toast notifications
- [ ] Form validation feedback

### Accessibility
- [ ] WCAG 2.1 AA audit
- [ ] Keyboard navigation testing
- [ ] Screen reader testing
- [ ] Color contrast verification
- [ ] Focus indicators

### Performance
- [ ] API response caching
- [ ] Database query optimization
- [ ] Frontend bundle optimization
- [ ] Chart performance tuning
- [ ] Lazy loading for heavy components

### Documentation
- [ ] API documentation (OpenAPI)
- [ ] Deployment guide
- [ ] Local development guide
- [ ] Environment variable documentation
- [ ] Troubleshooting guide

## Future Enhancements (Post-P1)

- [ ] Multi-chain support
- [ ] User authentication
- [ ] Custom dashboard widgets
- [ ] Export functionality (CSV/JSON)
- [ ] Webhook notifications
- [ ] Advanced trace analysis
- [ ] Contract ABI auto-fetch
- [ ] Real-time WebSocket updates
