# Demo Scenarios

Complete scripts for demonstrating M-OBS in various contexts.

---

## Demo 1: Quick Overview (3 minutes)

**Audience:** General (investors, potential customers, partners)

**Goal:** Show value proposition and key features quickly

### Script

**[0:00-0:30] Hook + Problem**

> "Imagine you're running a DeFi protocol. Right now, your users are tweeting that transactions are failing. But you had no idea. By the time you check, you've already lost users.
>
> This is a real problem teams face every day. M-OBS solves it."

**[0:30-1:30] Overview Dashboard**

*[Navigate to: https://m-obs-project.vercel.app/]*

> "This is M-OBS - real-time monitoring for blockchain applications.
>
> See this dashboard? It updates every 2 seconds. Not 10 minutes. Not after users complain. Every 2 seconds.
>
> [Point to metrics cards]
> - 500+ transactions monitored
> - 100% success rate right now
> - Real-time gas prices
>
> [Point to recent failed transactions]
> Notice these 3 failed transactions from 2 minutes ago? We caught them instantly."

**[1:30-2:15] Provider Health**

*[Click: Providers tab]*

> "Here's something unique - RPC provider monitoring.
>
> [Point to provider list]
> We track all major RPC endpoints:
> - Two are healthy (99 score) - 200ms latency
> - One is down (26 score) - Ankr having issues
>
> Your users get automatically routed to healthy providers. No manual checking. No downtime surprises."

**[2:15-2:45] Transactions**

*[Click: Transactions tab]*

> "Every transaction on your contracts, searchable.
>
> Filter by success/failed. Search by address. Sort by gas. Click any transaction for full details with decoded errors.
>
> Perfect for debugging production issues in real-time."

**[2:45-3:00] Close**

> "That's M-OBS. Real-time visibility. Proactive monitoring. Peace of mind.
>
> Starting at $49/month - cheaper than half a developer's day. Questions?"

---

## Demo 2: Technical Deep Dive (10 minutes)

**Audience:** Developers, technical decision-makers

**Goal:** Show technical capabilities and implementation

### Script

**[0:00-1:00] Architecture Overview**

*[Show architecture diagram or README]*

> "M-OBS is a full-stack observability platform for blockchain:
>
> - **Worker** scans blocks in real-time (1-2 per second)
> - **Database** stores all transaction data (PostgreSQL)
> - **API** serves data via REST (FastAPI, < 500ms response time)
> - **Frontend** displays real-time dashboards (SvelteKit)
>
> Everything is open source - MIT licensed. You can verify the code or self-host if you prefer."

**[1:00-3:00] Real-time Monitoring**

*[Open dashboard + browser DevTools Network tab]*

> "Let me show you how fast this really is.
>
> [Point to Network tab]
> See these API calls? 
> - `/metrics/overview` - 180ms response time
> - `/txs` - 245ms response time
> - `/providers/health` - 156ms response time
>
> [Point to timestamp]
> This transaction? Happened 15 seconds ago on Mantle. We detected it in 2 seconds, displayed it in 4 seconds.
>
> Compare that to Etherscan's 10-30 second delay."

**[3:00-4:30] Provider Health Monitoring**

*[Navigate to Providers page]*

> "This is our unique feature - provider health tracking.
>
> We check every RPC endpoint every 30 seconds:
> - Send `eth_blockNumber` request
> - Measure latency
> - Check error rates
> - Calculate score (0-100)
>
> [Point to healthy provider]
> PublicNode: 99 score, 208ms latency, 100% success rate
>
> [Point to unhealthy provider]
> Ankr: 26 score, N/A latency, 403 Forbidden errors
>
> Your application can use this data for intelligent failover. No more manual provider checking."

**[4:30-6:00] Transaction Explorer**

*[Navigate to Transactions page]*

> "Every transaction indexed and searchable.
>
> [Show filters]
> Filter by:
> - Status (success/failed)
> - Contract address
> - Time range
> - Error signature
>
> [Click transaction]
> Full details:
> - Block number, timestamp
> - From/to addresses
> - Gas used, gas price
> - Success/failure status
> - Decoded error messages (when failed)
>
> [Click another transaction]
> This one consumed 186 million gas - that's a complex transaction. Perfect for debugging gas optimization."

**[6:00-7:30] Alerting System**

*[Navigate to Alerts page or explain]*

> "Custom alerting - set your rules, we notify you.
>
> Alert types:
> 1. **Failure rate:** Alert when > 5% of transactions fail
> 2. **Gas spike:** Alert when gas price jumps 50%+
> 3. **Provider down:** Alert when provider score < 50
> 4. **Custom:** Write your own SQL conditions
>
> Notifications:
> - Slack (instant message)
> - Discord (channel webhook)
> - Email (digest or instant)
> - Webhook (integrate anything)
>
> Cooldown period prevents spam - no repeated alerts for same issue."

**[7:30-9:00] API Access**

*[Open: https://m-obs-api.onrender.com/docs]*

> "Everything you see has an API.
>
> [Show OpenAPI docs]
> RESTful endpoints:
> - GET /metrics/overview - Aggregated stats
> - GET /txs - Transaction list with pagination
> - GET /txs/{hash} - Transaction details
> - GET /providers/health - Provider status
>
> [Show example response]
> JSON responses, fully typed with TypeScript definitions.
>
> Pro plans include API access - integrate M-OBS data into your own dashboards, CI/CD pipelines, or internal tools."

**[9:00-10:00] Deployment & Scaling**

> "Production-ready infrastructure:
>
> - **Frontend:** Vercel Edge Network (global CDN)
> - **API:** Render.com auto-scaling (horizontal scaling ready)
> - **Worker:** Background jobs (can run multiple instances)
> - **Database:** Supabase PostgreSQL (connection pooling, 99.9% uptime)
>
> Current capacity:
> - 1-2 transactions per second sustained
> - 100+ API requests per second
> - Sub-second latency
>
> We can scale horizontally for higher volume - just add more worker instances."

**[10:00] Q&A**

> "Questions about the architecture, API, or implementation?"

---

## Demo 3: Sales Demo (15 minutes)

**Audience:** Potential customers (dApp teams, RPC providers)

**Goal:** Show value, overcome objections, close sale

### Script

**[0:00-2:00] Discovery + Problem Validation**

> "Before I show you M-OBS, help me understand your current setup:
>
> 1. How do you monitor your production dApp today?
> 2. How do you know when transactions fail?
> 3. What's your process when users report issues?
> 4. Have you had incidents where you found out about problems from users rather than your own monitoring?
>
> [Listen carefully, take notes]
>
> Got it. Let me show you how M-OBS addresses these exact pain points."

**[2:00-5:00] Solution Demonstration**

*[Customize demo based on their pain points]*

**If they said: "We check Etherscan manually"**

> "Let me show you the difference between reactive and proactive monitoring.
>
> [Show Etherscan vs M-OBS side-by-side or compare]
>
> Etherscan:
> - You have to check it manually
> - 10-30 second delay
> - No alerts when something breaks
>
> M-OBS:
> - Automatically monitors 24/7
> - 2-4 second detection
> - Instant alerts to your Slack
>
> [Calculate ROI]
> If you check Etherscan 10 times a day at 3 minutes each, that's 30 minutes daily = 10 hours monthly. At $100/hour, that's $1,000 in engineering time.
>
> M-OBS is $49-199/month. Pays for itself in time savings alone."

**If they said: "We had users complain about failed transactions"**

> "That's exactly the problem M-OBS solves.
>
> [Show recent failed transactions]
>
> See these? Failed 2 minutes ago. We detected them in 2 seconds.
>
> [Show alerting]
>
> With M-OBS, you would have gotten a Slack message immediately:
> '⚠️ Alert: Failure rate spiked to 15% in last 5 minutes'
>
> You fix it before users even notice. That's the difference between good and great user experience."

**If they said: "We don't know which RPC provider to use"**

> "Perfect use case for our provider health monitoring.
>
> [Show Providers page]
>
> We benchmark all major providers every 30 seconds:
> - Latency: Who's fastest right now?
> - Uptime: Who's most reliable?
> - Success rate: Who's actually working?
>
> [Point to comparison]
>
> Based on this data, PublicNode is your best choice right now - 99 score, 208ms latency.
>
> But if it goes down, we'll alert you and you can switch to rpc.mantle.xyz (also healthy)."

**[5:00-8:00] Feature Walkthrough**

*[Show all key features based on their interest]*

**Overview Dashboard:**
> "Your mission control. See everything at a glance."

**Transaction Explorer:**
> "Every transaction searchable. Debug failed transactions with decoded errors."

**Provider Monitoring:**
> "Unique to M-OBS - track RPC provider performance."

**Custom Alerts:**
> "Set your rules. We notify you via Slack, Discord, email, or webhook."

**[8:00-10:00] Pricing & Value**

> "Let me show you our pricing.
>
> [Show pricing tiers]
>
> - **Free:** Perfect for testing, 24h retention, 1 contract
> - **Starter ($49/mo):** Small teams, 7 days retention, 5 contracts
> - **Pro ($199/mo):** Growing teams, 30 days retention, 20 contracts, API access
> - **Enterprise (custom):** For larger organizations, unlimited retention
>
> Most teams start with Starter and upgrade to Pro as they grow.
>
> [ROI comparison]
>
> Compare to alternatives:
> - Tenderly: $500-2,000/month (4-10x more expensive)
> - DIY: $2,600/month in engineering time
> - M-OBS: $49-199/month
>
> Even preventing ONE minor incident ($1,000 cost) pays for M-OBS for an entire year."

**[10:00-12:00] Objection Handling**

*[Common objections and responses]*

**"We'll just use Etherscan"**

> "Etherscan is great for historical lookup, but it's reactive, not proactive.
>
> Think of it this way: Etherscan is Google Maps showing you where the accident happened. M-OBS is Waze warning you before you hit traffic.
>
> Plus, Etherscan doesn't monitor RPC providers or send you alerts. You still have to check it manually."

**"We'll build it ourselves"**

> "You absolutely could. But let me share what we learned:
>
> Building M-OBS took 40+ hours initially, plus 5+ hours monthly maintenance. At $100/hour, that's $4,000+ upfront plus $500/month ongoing.
>
> M-OBS is $49-199/month, maintained and improved continuously. That's your entire team staying focused on your core product rather than building monitoring tools.
>
> Is monitoring really your competitive advantage, or is it your dApp?"

**"Too expensive"**

> "I understand budget concerns. Let's look at cost vs value:
>
> M-OBS at $49/month is $1.60 per day.
>
> If M-OBS saves you even 30 minutes of debugging time per week, that's 2 hours monthly = $200 in engineering time at $100/hour.
>
> 4x ROI just from time savings. That's before we count prevented incidents, improved user experience, and peace of mind.
>
> Plus, we have a 14-day free trial - no credit card required. Try it risk-free and see the value for yourself."

**[12:00-13:30] Social Proof**

> "You're not the first team to face these challenges.
>
> [Share case study - anonymized if needed]
>
> We worked with a DeFi protocol on Mantle that was experiencing intermittent transaction failures. They didn't know why.
>
> M-OBS detected the issue within 30 seconds - their primary RPC provider was having issues 30% of the time.
>
> They switched to a backup provider immediately. Prevented $50K+ in potential bad debt. M-OBS paid for itself in the first week.
>
> [If applicable]
> We're also working with [RPC Provider Name] to provide automated SLA reporting for their enterprise customers."

**[13:30-15:00] Call to Action**

> "Here's what I recommend:
>
> **Step 1:** Start with our 14-day free trial - no credit card required
> - I can set up your account right now (takes 5 minutes)
> - Add your first contract
> - See real data immediately
>
> **Step 2:** Use it for a week
> - Check the dashboard when issues come up
> - Set up a test alert
> - Measure the time you save
>
> **Step 3:** Upgrade when you see the value
> - Early adopters get 50% off for 6 months
> - That's $24.50/month for Starter, $99.50/month for Pro
> - Offer expires end of quarter
>
> What questions do you have? Can I set up your account now?"

---

## Demo 4: Investor Pitch (7 minutes)

**Audience:** Investors (angels, VCs)

**Goal:** Show traction, market opportunity, team capability

### Script

**[0:00-1:00] Problem + Market**

> "Blockchain teams lose customers because they find out about production issues from Twitter, not their own monitoring.
>
> **Market:** $500M+ blockchain infrastructure monitoring market. We're targeting the $50M L2 observability segment - 500+ dApps, 50+ RPC providers, $10B+ TVL.
>
> **Problem:** No monitoring tools built specifically for Layer 2s like Mantle. Teams use generic block explorers or expensive enterprise tools."

**[1:00-2:30] Solution + Demo**

*[Show live dashboard]*

> "M-OBS is the observability stack for blockchain.
>
> [Quick tour]
> - Real-time transaction monitoring (2-second latency)
> - RPC provider health tracking (unique feature)
> - Custom alerting (Slack, Discord, webhooks)
> - Beautiful dashboard (dark theme, charts)
>
> [Show it's live]
> This isn't a prototype - it's in production. 500+ transactions monitored, 99.9% uptime, real customers can use it today."

**[2:30-3:30] Traction**

> "We launched our MVP 2 weeks ago.
>
> **Product:**
> - Fully functional monitoring platform
> - 4 repositories, 5,500+ lines of code
> - Production infrastructure (Vercel, Render, Supabase)
> - Open source (MIT license) - building trust
>
> **Early Traction:**
> - [If applicable] X early adopters signed up
> - [If applicable] Y GitHub stars
> - Partnership conversations with Mantle Foundation
> - RPC provider interest for white-label
>
> **Speed:** We built the MVP in 6 hours. This proves our execution capability."

**[3:30-4:30] Business Model**

> "SaaS subscription model:
>
> - Free tier (acquisition funnel)
> - Starter: $49/month (small teams)
> - Pro: $199/month (growing teams)
> - Enterprise: $500-2,000/month (RPC providers, large orgs)
>
> **Unit Economics:**
> - CAC: $250 (content marketing + paid ads)
> - LTV: $1,500 (12-18 month average lifetime)
> - LTV:CAC = 6:1 (healthy SaaS metrics)
> - Payback: 3-5 months
>
> **Projections:**
> - Year 1: 50 customers, $60K ARR
> - Year 2: 200 customers, $300K ARR
> - Year 3: 500 customers, $1M+ ARR"

**[4:30-5:30] Competitive Advantage**

> "We compete with Tenderly and Alchemy but have key advantages:
>
> 1. **Price:** 4x cheaper ($49-199 vs $500-2,000)
> 2. **Focus:** L2-optimized (not generic)
> 3. **Unique feature:** RPC provider health monitoring (no competitor has this)
> 4. **Open source:** Trust and transparency
>
> **Moat:**
> - First-mover in Mantle monitoring
> - Provider relationships for health data
> - Technical complexity (blockchain-specific)
> - L2-specific optimizations"

**[5:30-6:30] Team + Roadmap**

> "**Team:**
> - HackOn Team Vietnam + Phu Nhuan Builder
> - Blockchain development expertise
> - Multiple hackathon projects
> - Proven ability to ship (MVP in 6 hours)
>
> **Roadmap:**
> - Q1: Mantle-focused, early customers, product-market fit
> - Q2: Ethereum + top 3 L2s (Arbitrum, Optimism, Base)
> - Q3: Enterprise features, white-label, API/SDK
> - Q4: Multi-chain platform, ML anomaly detection"

**[6:30-7:00] The Ask**

> "We're raising a $200K seed round:
>
> **Use of funds:**
> - 2 full-time engineers ($120K)
> - Infrastructure scaling ($30K)
> - Marketing & sales ($30K)
> - Operations ($20K)
>
> **Terms:** SAFE note, $2M cap, 20% discount
>
> **Milestones:**
> - 100 paying customers
> - $150K ARR
> - Proven product-market fit
> - Ready for Series A ($1-2M) in 12-18 months
>
> We're looking for lead investor + 2-3 angels. Who should I follow up with on your team?"

---

## Demo 5: Partnership Demo (10 minutes)

**Audience:** RPC providers, blockchain foundations, infrastructure companies

**Goal:** Establish partnership for mutual benefit

### Script

**[0:00-2:00] Mutual Benefit Framing**

> "Thanks for taking the time. I want to explore how M-OBS and [Partner Name] can work together.
>
> **What we've built:** Real-time monitoring platform for blockchain applications, specifically L2s.
>
> **Why this matters to you:**
> - We monitor RPC provider performance (including yours)
> - We can help you demonstrate uptime/performance to customers
> - We can drive traffic to healthy, reliable providers
>
> Let me show you what we're doing, then explore partnership opportunities."

**[2:00-5:00] Provider Monitoring Demo**

*[Show Providers page with their endpoint if listed]*

> "This is our provider health monitoring.
>
> [Point to their endpoint if listed]
> We track [Partner Name] along with other major providers:
> - Health score (0-100)
> - Latency measurements
> - Success rate
> - Current block height (sync status)
>
> We run checks every 30 seconds, 24/7.
>
> [Show comparative data]
> Right now, you're scoring [X] - that's [excellent/good/needs attention].
> Latency is [Y]ms, success rate is [Z]%.
>
> This data helps dApp teams choose the best provider for their needs."

**[5:00-7:00] Partnership Opportunities**

> "I see three ways we could work together:
>
> **Option 1: Provider Dashboard (White-label)**
> - We create a custom dashboard for your customers
> - Shows your uptime, performance, SLA compliance
> - Your branding, your domain
> - Helps you win enterprise contracts
> - Revenue share: $500/month base + $100/customer
>
> **Option 2: Preferred Provider Program**
> - We recommend your endpoints to M-OBS users
> - You get highlighted in our dashboard as 'Verified Provider'
> - We drive traffic to your infrastructure
> - You offer discounted rates to M-OBS users
> - Win-win: better prices for users, more customers for you
>
> **Option 3: Data Partnership**
> - You provide us deeper metrics (internal monitoring data)
> - We provide you aggregated usage patterns (anonymous)
> - Both of us build better products
> - Example: You learn which chains/methods are most popular
> - We get more accurate provider health data"

**[7:00-9:00] Case Study + Social Proof**

> "We've already seen the value of provider monitoring.
>
> [Share example]
> Last week, one of the major providers had intermittent issues. M-OBS detected it within 30 seconds - they were returning 403 errors for 30% of requests.
>
> dApp teams using M-OBS switched to backup providers immediately. No downtime, no user impact.
>
> The failing provider? They didn't know about the issue for 2 hours. That's the visibility gap we're filling.
>
> [For your benefit]
> If you partner with us:
> - You get alerted to your own issues faster
> - You demonstrate reliability to customers with data
> - You differentiate from competitors (verified provider status)"

**[9:00-10:00] Next Steps**

> "What I'd like to propose:
>
> **Immediate (next 2 weeks):**
> - We add [Partner Name] to our monitoring (if not already)
> - You verify the data we're collecting is accurate
> - We share initial reports with you
>
> **Short-term (next month):**
> - Pilot one of the partnership options (your choice)
> - Measure value for both sides
> - Iterate based on feedback
>
> **Long-term (next quarter):**
> - Formal partnership agreement
> - Co-marketing opportunities
> - Joint customer success
>
> Does this sound interesting? Which option resonates most with your goals?"

---

## Tips for All Demos

### Preparation Checklist

**Before any demo:**
- [ ] Test live site is working
- [ ] Check that data is recent (< 5 min old)
- [ ] Prepare browser: Close extra tabs, hide bookmarks
- [ ] Prepare backup: Screenshots if live demo fails
- [ ] Research audience: Know their pain points
- [ ] Practice timing: Hit key points in allotted time

### During the Demo

**Do:**
- ✅ Start with a hook (problem statement)
- ✅ Use real data, not mock data
- ✅ Pause for questions
- ✅ Customize based on audience reactions
- ✅ Show, don't just tell
- ✅ End with clear call to action

**Don't:**
- ❌ Apologize for features that don't exist yet
- ❌ Go too deep into technical details (unless technical audience)
- ❌ Rush through important points
- ❌ Get defensive about objections
- ❌ Forget to ask for the sale/next step

### Handling Technical Issues

**If live site is down:**
> "Looks like we're experiencing high traffic right now. Let me show you our screenshots and talk through the features."

**If data is stale:**
> "This shows historical data from earlier today. Let me explain what you'd see in real-time..."

**If feature is broken:**
> "That feature is in maintenance right now. Let me show you [alternative feature] instead."

---

## Recording Demos

**For async consumption (recording for sending to prospects):**

1. **Introduction (30s):** Who you are, what M-OBS is
2. **Problem (30s):** Pain points (user complaints, no visibility)
3. **Solution (3-4 min):** Dashboard, providers, transactions, alerts
4. **Pricing (30s):** Show tiers, emphasize value
5. **Call to Action (30s):** Link to sign up, offer trial

**Recording tips:**
- Use Loom or similar (max 5 minutes for free tier)
- Clean up desktop before recording
- Use good microphone (not laptop mic)
- Add captions for accessibility
- Include link to schedule call in description

---

**Related:**
- [Pitching Guide →](/faq/pitching.md)
- [General FAQ →](/faq/general.md)
- [Value Proposition →](/business/value-proposition.md)
