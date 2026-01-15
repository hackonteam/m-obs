# General FAQ

## Product Questions

### What is M-OBS?

M-OBS (Mantle Observability Stack) is a real-time monitoring and analytics platform specifically built for the Mantle blockchain. It tracks transactions, monitors RPC provider health, and sends proactive alerts about issues before they impact your users.

### Who is M-OBS for?

**Primary users:**
- dApp developers and teams building on Mantle
- RPC node operators
- DevOps/SRE teams managing blockchain infrastructure
- Protocol teams needing production monitoring

**Use cases:**
- Monitor production transaction success rates
- Track gas price trends
- Detect and debug failed transactions
- Monitor RPC provider uptime and performance
- Get alerted to anomalies and issues

### How is M-OBS different from Etherscan?

| Feature | M-OBS | Etherscan |
|---------|-------|-----------|
| **Speed** | 2-second latency | 10-30 second latency |
| **Alerts** | Custom, real-time alerts | No alerts (or very basic) |
| **Provider Health** | Yes, continuous monitoring | No |
| **Focus** | Mantle-optimized | Generic for all chains |
| **Analytics** | Time-series charts, trends | Basic transaction history |
| **Monitoring** | Proactive (alerts before issues) | Reactive (look up after) |

**Summary:** Etherscan is great for historical lookup. M-OBS is for real-time monitoring and alerting.

### How is M-OBS different from Tenderly?

Tenderly is excellent but:
- **Cost:** Tenderly is $500-2,000/month; M-OBS is $49-199/month
- **Focus:** Tenderly is multi-chain and simulation-focused; M-OBS is Mantle-focused and monitoring-focused
- **Features:** M-OBS includes RPC provider health monitoring (Tenderly doesn't)
- **Target:** Tenderly targets enterprises; M-OBS serves teams of all sizes

### Is M-OBS open source?

Yes! M-OBS is MIT licensed and available on GitHub:
- Main: https://github.com/hackonteam/m-obs
- Backend: https://github.com/hackonteam/m-obs-backend
- Frontend: https://github.com/hackonteam/m-obs-frontend
- Database: https://github.com/hackonteam/m-obs-database

You can self-host the entire stack if you prefer.

### What blockchains does M-OBS support?

Currently: **Mantle only**

**Roadmap:**
- Q2 2026: Ethereum mainnet
- Q3 2026: Arbitrum, Optimism
- Q4 2026: Base, Polygon, other L2s

We're starting Mantle-focused to provide the best possible experience, then expanding to other chains.

---

## Technical Questions

### How does M-OBS work?

**Architecture:**
1. **Worker** continuously scans new blocks from Mantle RPC nodes
2. **Database** stores all transaction data with PostgreSQL
3. **Backend API** aggregates and serves data via REST endpoints
4. **Frontend** displays real-time dashboards and analytics

**Data flow:**
```
Mantle RPC → Worker (scan) → Database (store) → API (serve) → Frontend (display)
```

### What data does M-OBS collect?

**Public blockchain data only:**
- Transaction hashes, block numbers, timestamps
- From/to addresses
- Gas used, gas prices
- Success/failure status
- Error messages (when transactions fail)
- RPC provider response times

**We do NOT collect:**
- Private keys or wallet credentials
- Personal identifiable information (PII)
- Off-chain data
- User behavior outside the blockchain

### How real-time is M-OBS?

**Latency:**
- Transaction detection: 2-4 seconds after block confirmation
- Provider health checks: Every 30 seconds
- Dashboard updates: Live (WebSocket/polling)
- Alerts: Within seconds of detection

**Comparison:**
- Etherscan: 10-30 second delay
- Tenderly: 5-10 second delay  
- M-OBS: 2-4 second delay

### Can I self-host M-OBS?

Yes! M-OBS is fully open source. You can:
1. Clone all 4 repositories
2. Set up your own PostgreSQL database
3. Deploy backend and worker on your infrastructure
4. Deploy frontend on Vercel or your own hosting

**Documentation:** See [Setup Guide](/technical/setup.md)

**Considerations:**
- Requires DevOps expertise
- You manage uptime and scaling
- No official support for self-hosted instances
- Managed service ($49-199/month) is simpler for most teams

### What infrastructure does M-OBS use?

**Production stack:**
- **Frontend:** Vercel (Edge Network, global CDN)
- **Backend API:** Render.com (US region, auto-scaling)
- **Worker:** Render.com (background jobs)
- **Database:** Supabase (PostgreSQL with pgBouncer)
- **RPC:** Mantle public nodes (with failover)

**Why these choices:**
- High uptime (99.9%+)
- Auto-scaling
- Cost-effective
- Proven for blockchain applications

### Can M-OBS handle high traffic?

**Current capacity:**
- 1-2 transactions per second (sustained)
- 100+ API requests per second
- 1,000+ concurrent dashboard users

**Scaling strategy:**
- Horizontal: Add more worker instances
- Vertical: Increase database resources
- Caching: Redis for frequently accessed data
- CDN: Static assets on Vercel Edge

For most dApps on Mantle, current capacity is more than sufficient.

### Does M-OBS support private RPC endpoints?

**Current:** No, M-OBS uses public RPC endpoints

**Roadmap:** Yes, coming in Q2 2026
- Bring Your Own RPC (BYOR) feature
- Monitor your private nodes
- Compare against public endpoints
- Track your SLA compliance

---

## Pricing & Plans

### How much does M-OBS cost?

| Plan | Price | Best For |
|------|-------|----------|
| **Free** | $0/month | Individual developers, testing |
| **Starter** | $49/month | Small teams, 1-2 dApps |
| **Pro** | $199/month | Growing teams, 3-5 dApps |
| **Enterprise** | Custom | Large organizations, 10+ dApps |

**Early adopter offer:** 50% off for first 6 months

### What's included in the Free plan?

**Features:**
- ✅ 24-hour data retention
- ✅ 1 watched contract
- ✅ Basic alerts (email only)
- ✅ Provider health monitoring
- ✅ Dashboard access
- ✅ Community support (Discord)

**Limitations:**
- ⚠️ Data older than 24h is deleted
- ⚠️ No API access
- ⚠️ No advanced analytics
- ⚠️ No Slack/webhook integrations

**Perfect for:** Learning, testing, personal projects

### Can I upgrade/downgrade plans?

Yes, anytime:
- **Upgrade:** Takes effect immediately, prorated billing
- **Downgrade:** Takes effect at next billing cycle
- **Cancel:** No lock-in, cancel anytime

**Data retention:**
- When downgrading, data beyond new plan's retention is deleted
- When upgrading, you keep all data going forward

### Do you offer discounts?

**Yes!**
- **Early adopters:** 50% off for 6 months
- **Annual plans:** 20% off (2 months free)
- **Nonprofits:** 50% off (verify via email)
- **Students:** Free Pro plan (verify with .edu email)
- **Open source projects:** Free Pro plan (case-by-case)

**Contact:** hello@m-obs.io for discount codes

### What payment methods do you accept?

- Credit cards (Visa, MasterCard, Amex)
- Crypto (USDC, USDT, ETH) - coming Q2 2026
- Wire transfer (Enterprise plans only)

### Is there a free trial?

**Yes!** All paid plans include:
- 14-day free trial
- No credit card required
- Full feature access
- Easy upgrade/cancel

---

## Support & Reliability

### What's your uptime SLA?

**Current:**
- Target: 99.9% uptime
- Monitoring: Public status page
- Incidents: Transparent post-mortems

**Enterprise plans:**
- 99.95% SLA with credits
- 24/7 phone support
- Dedicated success manager

### How do I get support?

**Free plan:**
- Discord community (response within 24h)
- Documentation & FAQ

**Starter plan:**
- Email support (response within 12h)
- Discord priority channel

**Pro plan:**
- Email support (response within 4h)
- Video call onboarding
- Priority bug fixes

**Enterprise plan:**
- 24/7 phone & email support
- Dedicated Slack channel
- Quarterly business reviews
- Custom SLA

### What if I find a bug?

**Report it:**
- GitHub Issues (preferred): https://github.com/hackonteam/m-obs/issues
- Email: bugs@m-obs.io
- Discord: #bug-reports channel

**Bug bounty:**
- Security issues: Up to $1,000
- Critical bugs: $100-500
- Minor bugs: $50-100
- Feature requests: Free Pro plan for 3 months if implemented

### Do you have a status page?

**Yes:** https://status.m-obs.io (coming soon)

**Currently:**
- Check GitHub: https://github.com/hackonteam/m-obs
- Join Discord for real-time updates
- Follow Twitter: @MantleOBS

---

## Privacy & Security

### What data do you store?

**Only public blockchain data:**
- Transaction hashes and metadata
- Block numbers and timestamps  
- Contract addresses (public)
- Error messages (on-chain)
- RPC provider metrics

**We do NOT store:**
- Private keys
- Wallet credentials
- Personal information
- Off-chain transaction data

### Is my data secure?

**Security measures:**
- ✅ All connections over HTTPS/TLS
- ✅ Database encryption at rest
- ✅ No sensitive data stored
- ✅ Regular security audits
- ✅ Open source code (community reviewed)

**Compliance:**
- GDPR compliant (no PII)
- SOC 2 Type II (Enterprise plans)
- Regular penetration testing

### Who has access to my data?

**Your data:**
- Your team only (role-based access control)
- M-OBS admins (for support, with permission)
- No third parties

**Public blockchain data:**
- Already public on Mantle blockchain
- We just index and present it better

### Can I delete my data?

**Yes:**
- Self-service: Settings → Delete account
- Deletes all your configurations and alerts
- Public blockchain data remains (it's already public)
- Complete within 30 days

**Data retention after deletion:**
- 30 days backup for recovery
- Then permanently deleted

---

## Getting Started

### How do I sign up?

1. Go to https://m-obs-project.vercel.app
2. Click "Sign Up" (or start with dashboard)
3. Add your first contract to watch
4. Set up alerts
5. Start monitoring!

**Time to value:** < 5 minutes

### Do I need to install anything?

**No!** M-OBS is 100% cloud-based:
- No npm packages
- No SDKs required
- No on-premise installation
- Just a web browser

**Optional:**
- API access (Pro+ plans)
- Webhook integrations
- Self-hosting (open source)

### How do I add my dApp to M-OBS?

**Simple:**
1. Get your contract address (e.g., from Etherscan)
2. Go to Settings → Contracts
3. Click "Add Contract"
4. Paste address and give it a name
5. Done! Transactions start tracking immediately

**Advanced:**
- Upload contract ABI for better error decoding
- Add multiple contracts
- Tag contracts for organization

### What should I monitor first?

**Recommended setup (5 minutes):**

1. **Add your main contract** (1 min)
   - Your dApp's primary smart contract

2. **Set failure rate alert** (2 min)
   - Alert when failure rate > 5%
   - Notification to Slack or email

3. **Check provider health** (1 min)
   - Verify your RPC providers are healthy
   - Note which have best latency

4. **Review recent transactions** (1 min)
   - Make sure everything looks correct
   - Check for any failed transactions

### Where can I learn more?

**Documentation:**
- Technical docs: [/technical](/technical)
- Business docs: [/business](/business)  
- This FAQ: [/faq](/faq)

**Community:**
- Discord: https://discord.gg/m-obs
- Twitter: @MantleOBS
- GitHub: https://github.com/hackonteam/m-obs

**Contact:**
- Email: hello@m-obs.io
- Schedule demo: https://cal.com/m-obs

---

## Roadmap & Future

### What's on the roadmap?

**Q1 2026 (Current):**
- ✅ Core monitoring (transactions, providers)
- ✅ Basic alerting
- ✅ Dashboard UI
- 🚧 Slack/Discord integrations
- 🚧 API access

**Q2 2026:**
- Advanced analytics (cohort analysis, funnels)
- Custom metrics and dashboards
- Ethereum mainnet support
- BYOR (Bring Your Own RPC)
- Mobile app

**Q3 2026:**
- Multi-chain support (Arbitrum, Optimism)
- Machine learning anomaly detection
- Gas optimization recommendations
- Team collaboration features

**Q4 2026:**
- Cross-chain transaction tracking
- Smart contract simulation
- Incident management tools
- Enterprise SSO

**Vote on features:** https://feedback.m-obs.io

### Will M-OBS support other chains?

**Yes!** Roadmap:
- Q2: Ethereum mainnet
- Q3: Arbitrum, Optimism, Base
- Q4: Polygon, other L2s
- 2027: All major EVM chains

**Cross-chain features:**
- Unified dashboard
- Cross-chain transaction tracking
- Multi-chain alerts

### Can I request features?

**Absolutely!**
- Feature requests: https://feedback.m-obs.io
- Vote on existing requests
- Comment with your use case

**Most requested features get prioritized:**
- 100+ votes: Next quarter
- 50+ votes: Within 6 months
- Custom requests: Enterprise plans

### Are you hiring?

**Yes!** We're looking for:
- Full-stack developers (TypeScript, Python)
- DevOps engineers (Kubernetes, cloud)
- Developer advocates (blockchain experience)
- Sales/BD (SaaS or blockchain)

**Apply:** careers@m-obs.io

---

**More Questions?**

- [Technical FAQ →](/faq/technical.md)
- [Business FAQ →](/faq/business.md)
- [Pitching Guide →](/faq/pitching.md)

**Can't find your answer?**
- Email: hello@m-obs.io
- Discord: https://discord.gg/m-obs
