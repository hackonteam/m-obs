# M-OBS Frontend

Frontend web application for M-OBS (Mantle Observability Stack) - built with SvelteKit.

## Repository

**GitHub:** https://github.com/hackonteam/m-obs-frontend  
**Main Repository:** https://github.com/hackonteam/m-obs

## Overview

Modern, responsive web application for monitoring and analyzing Mantle blockchain transactions in real-time.

### Features

- **📊 Dashboard** - Real-time metrics with interactive charts
- **🔍 Transaction Explorer** - Search, filter, and analyze transactions
- **🏥 Provider Health** - Monitor RPC provider performance
- **🔔 Alert Management** - Configure and manage custom alerts
- **📝 Contract Watchlist** - Track specific contracts
- **⚙️ Settings** - Configure application preferences

## Stack

- **Framework:** SvelteKit 2.x
- **Language:** TypeScript
- **Styling:** Tailwind CSS + DaisyUI
- **Charts:** uPlot (high-performance time-series)
- **Build Tool:** Vite
- **Package Manager:** pnpm

## Prerequisites

- Node.js 20+ (LTS)
- pnpm 8+ (`npm install -g pnpm`)
- M-OBS Backend API running

## Environment Variables

Create `.env` file in the frontend directory:

```bash
# Backend API URL
PUBLIC_API_URL=http://localhost:8000

# Optional: Application name/branding
PUBLIC_APP_NAME=M-OBS
```

For production deployment on Vercel:

```bash
PUBLIC_API_URL=https://m-obs-api.onrender.com
```

## Local Development

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Run Development Server

```bash
pnpm dev

# Or specify host/port
pnpm dev --host 0.0.0.0 --port 5173
```

Application will be available at: **http://localhost:5173**

### 3. Build for Production

```bash
pnpm build
```

### 4. Preview Production Build

```bash
pnpm preview
```

### 5. Run Linting

```bash
pnpm lint
```

### 6. Run Type Checking

```bash
pnpm check
```

## Project Structure

```
frontend/
├── src/
│   ├── routes/                    # SvelteKit pages
│   │   ├── +layout.svelte        # Root layout with sidebar
│   │   ├── +page.svelte          # Dashboard (overview)
│   │   ├── providers/
│   │   │   └── +page.svelte      # Provider health page
│   │   ├── transactions/
│   │   │   ├── +page.svelte      # Transaction list
│   │   │   └── [hash]/
│   │   │       └── +page.svelte  # Transaction detail
│   │   ├── alerts/
│   │   │   └── +page.svelte      # Alert management
│   │   └── settings/
│   │       └── +page.svelte      # Settings page
│   ├── lib/
│   │   ├── api/
│   │   │   └── client.ts         # API client with typed methods
│   │   └── components/
│   │       └── charts/
│   │           └── LineChart.svelte  # uPlot chart wrapper
│   ├── app.html                  # HTML template
│   └── app.css                   # Global styles
├── static/
│   └── favicon.svg               # Application icon
├── package.json
├── svelte.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Deployment on Vercel

### Prerequisites

1. **Backend API:** Deployed and accessible (see backend README)
2. **GitHub Account:** Repository pushed to GitHub
3. **Vercel Account:** Sign up at https://vercel.com

### Step 1: Import Project

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import from GitHub: `https://github.com/hackonteam/m-obs-frontend`
4. Click **"Import"**

### Step 2: Configure Project

Vercel will auto-detect SvelteKit. Configure:

- **Project Name:** `m-obs` (or your preferred name)
- **Framework Preset:** SvelteKit
- **Root Directory:** `./` (if deploying from root) or leave empty
- **Build Command:** `pnpm build` (auto-detected)
- **Output Directory:** `.svelte-kit` (auto-detected)
- **Install Command:** `pnpm install` (auto-detected)

### Step 3: Environment Variables

Add environment variable:

```
PUBLIC_API_URL=https://m-obs-api.onrender.com
```

Replace with your actual backend API URL from Render.

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build and deployment
3. **Note your deployment URL:** `https://m-obs.vercel.app` (or custom domain)

### Step 5: Update Backend CORS

Update your backend API's `CORS_ORIGINS` environment variable on Render to include your Vercel URL:

```bash
CORS_ORIGINS=https://m-obs.vercel.app
```

Restart the backend API service on Render.

### Step 6: Verify Deployment

Visit your Vercel URL and verify:
- ✅ Dashboard loads with metrics
- ✅ Transactions page works
- ✅ Provider health shows data
- ✅ Charts render correctly
- ✅ No CORS errors in browser console

## Custom Domain Setup

### On Vercel

1. Go to your project → **"Settings"** → **"Domains"**
2. Add your custom domain (e.g., `monitor.yourdomain.com`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (5-60 minutes)

### Update Backend CORS

Add your custom domain to backend's `CORS_ORIGINS`:

```bash
CORS_ORIGINS=https://monitor.yourdomain.com
```

## Advanced Configuration

### Auto-Deploy on Git Push

Vercel automatically deploys:
- **Production:** Pushes to `main` branch
- **Preview:** Pull requests and other branches

### Environment Variables per Environment

In Vercel project settings → **"Environment Variables"**:
- **Production:** API URL for production backend
- **Preview:** API URL for staging backend (optional)
- **Development:** Local API URL

### Build Performance

Optimize build times:
- Use pnpm workspace caching (auto-configured)
- Minimize dependencies
- Use `pnpm install --frozen-lockfile` in CI

### Preview Deployments

Every pull request gets a preview URL:
- Test changes before merging
- Share with team for review
- Automatic cleanup after merge

## Troubleshooting

### CORS Errors

**Symptoms:** Browser console shows CORS errors, API calls fail

**Solution:**
1. Check `PUBLIC_API_URL` in Vercel environment variables
2. Verify backend's `CORS_ORIGINS` includes your Vercel URL
3. Restart backend API service after CORS changes

### API Not Reachable

**Symptoms:** "Failed to fetch" errors, 500 errors

**Solution:**
1. Verify backend API is running: `curl https://your-api-url.onrender.com/health`
2. Check `PUBLIC_API_URL` environment variable
3. Check browser Network tab for actual error

### Build Failures

**Symptoms:** Vercel build fails

**Solution:**
1. Check build logs in Vercel dashboard
2. Run `pnpm build` locally to reproduce
3. Verify `package.json` dependencies
4. Check Node.js version compatibility

### Blank Page After Deploy

**Symptoms:** White screen, no content

**Solution:**
1. Check browser console for JavaScript errors
2. Verify `PUBLIC_API_URL` is set correctly
3. Check API health endpoint
4. Review Vercel function logs

### Charts Not Rendering

**Symptoms:** Dashboard shows layout but no charts

**Solution:**
1. Check browser console for uPlot errors
2. Verify API returns data: `/metrics/overview`
3. Check network tab for failed requests
4. Verify metrics data format matches chart expectations

## Performance Optimization

### Image Optimization

SvelteKit + Vercel automatically optimizes images. Use:

```svelte
<img src="/image.png" alt="Description" />
```

### Code Splitting

SvelteKit automatically code-splits by route.

### Lazy Loading

Use dynamic imports for heavy components:

```typescript
const HeavyComponent = await import('$lib/components/Heavy.svelte');
```

### Caching

Configure in `svelte.config.js`:

```javascript
export default {
  kit: {
    csp: {
      mode: 'auto'
    }
  }
};
```

## Monitoring

### Vercel Analytics

Enable in project settings:
1. Go to **"Analytics"** tab
2. Enable Web Analytics
3. View real-time metrics

### Error Tracking

Consider adding Sentry:

```bash
pnpm add @sentry/sveltekit
```

Configure in `hooks.client.ts` and `hooks.server.ts`.

## Development Tips

### API Client Usage

```typescript
import { apiClient } from '$lib/api/client';

// In your Svelte component
let transactions = [];

onMount(async () => {
  const result = await apiClient.getTransactions({
    status: 'failed',
    limit: 10
  });
  transactions = result.items;
});
```

### Adding New Page

1. Create `src/routes/your-page/+page.svelte`
2. Add navigation in `src/routes/+layout.svelte`
3. Implement page logic and UI

### Creating Reusable Components

```svelte
<!-- src/lib/components/MetricCard.svelte -->
<script lang="ts">
  export let title: string;
  export let value: number;
  export let trend: 'up' | 'down' | 'neutral' = 'neutral';
</script>

<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">{title}</h2>
    <p class="text-3xl">{value}</p>
  </div>
</div>
```

### Styling with Tailwind + DaisyUI

```svelte
<button class="btn btn-primary">
  Primary Button
</button>

<div class="alert alert-warning">
  Warning message
</div>
```

## Scripts

```bash
# Development
pnpm dev          # Start dev server
pnpm dev --open   # Start and open browser

# Production
pnpm build        # Build for production
pnpm preview      # Preview production build

# Quality
pnpm lint         # Run ESLint
pnpm check        # Type check
pnpm format       # Format code with Prettier

# Package management
pnpm add <pkg>           # Add dependency
pnpm add -D <pkg>        # Add dev dependency
pnpm remove <pkg>        # Remove dependency
pnpm update              # Update dependencies
```

## Tech Stack Details

### SvelteKit Benefits
- ⚡ Fast HMR (Hot Module Replacement)
- 📦 Automatic code splitting
- 🎨 CSS scoped by default
- 🔧 Simple, minimal API
- 🚀 Server-side rendering support

### Tailwind CSS Benefits
- 🎨 Utility-first styling
- 📱 Responsive by default
- 🎯 Small production bundle (PurgeCSS)
- 🔧 Highly customizable

### DaisyUI Benefits
- 🎨 Pre-built UI components
- 🌈 Multiple themes
- ♿ Accessible by default
- 📦 Works with Tailwind

### uPlot Benefits
- ⚡ Extremely fast rendering
- 📊 Time-series optimized
- 📉 Small bundle size (~45KB)
- 🎯 Perfect for real-time charts

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Make changes and test locally
4. Run type checking: `pnpm check`
5. Commit: `git commit -m "feat: your feature"`
6. Push: `git push origin feature/your-feature`
7. Create Pull Request

## Team

**HackOn Team Vietnam**

- **Bernie Nguyen** - Founder/Leader/Full-stack/Main developer
- **Thien Vo** - Front-end developer intern
- **Canh Trinh** - Researcher, Back-end developer intern
- **Sharkyz Duong Pham** - Business developer lead
- **Hieu Tran** - Business developer

**Collaboration:** Phu Nhuan Builder

**Contact:**
- Email: work.hackonteam@gmail.com
- Telegram: https://t.me/hackonteam

## License

MIT License - see LICENSE file in main repository

## Links

- **Main Repository:** https://github.com/hackonteam/m-obs
- **Backend Repository:** https://github.com/hackonteam/m-obs-backend
- **Frontend Repository:** https://github.com/hackonteam/m-obs-frontend
- **Live Demo:** https://m-obs.vercel.app (your URL)
- **Backend API:** https://m-obs-api.onrender.com (your URL)
