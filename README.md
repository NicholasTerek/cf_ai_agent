# cf_ai_agents_demo

AI-powered chat app on Cloudflare using:

- Workers AI with Llama 3.3
- Durable Object memory (conversation state)
- Workers as orchestration layer (workflow/coordination)
- Simple chat UI served from the Worker

This satisfies the assignment requirements: LLM, workflow/coordination (Workers + Durable Object), user input via chat UI, and memory/state.

## Demo

<div align="center">
  <video src="public/demo.gif" controls width="800" style="max-width:100%;">
    Your browser does not support the video tag.
  </video>
</div>

## Features

## Live Demo / Deploy

You can run locally with Wrangler, or deploy to your Cloudflare account.

- If you prefer Cloudflare Pages for the UI, you can later extract the front-end into a Pages project; the Worker already exposes `/api/*` endpoints.

## Prerequisites

- Node 18+
- Cloudflare account
- Wrangler CLI: `npm i -g wrangler` (or use local devDependency script)
- Access to Workers AI (Llama 3.3); ensure your account has Workers AI enabled

## Setup

```bash
# Install dependencies
npm install

# Authenticate Wrangler
npx wrangler login

# Optional: choose a model; default is @cf/meta/llama-3.3-70b-instruct
# You can override by setting an environment var in wrangler or dashboard
```

## Testing

### Quick Test (No Dependencies)
```bash
# Test basic functionality without installing anything
node test-runner.js
```

### Unit Tests (With Vitest)
```bash
# Install dependencies first
npm install

# Run tests
npm test

# Run tests once
npm run test:run
```

## Run locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then open the printed local URL (usually http://127.0.0.1:8787). You will see the chat UI. Ask your question in the textbox. The worker calls Workers AI and stores conversation turns in a Durable Object.

### Manual Testing Checklist
- [ ] UI loads at `/`
- [ ] Can type and send messages
- [ ] AI responds (requires Workers AI access)
- [ ] Conversation history persists in session
- [ ] Multiple browser tabs have separate sessions

## Deploy

```bash
npm run deploy
```

This will deploy:

- A Worker that serves the UI at `/` and the API under `/api/*`
- A Durable Object class `MemoryDO` for per-session memory

Wrangler will create the Durable Object based on the migration in `wrangler.toml`.

## Endpoints

- `GET /` — Chat UI
- `GET /app.js` — Front-end script
- `POST /api/chat` — Send a user message: `{ "message": "..." }`
- `GET /api/history` — Get conversation history for the current session
- `POST /api/reset` — Clear session memory

## Configuration

- `wrangler.toml` binds Workers AI to `env.AI` and Durable Object to `env.MEMORY_DO`.
- Default model: `@cf/meta/llama-3.3-70b-instruct`. You can change it by setting an environment variable `MODEL` in your Worker (dashboard) or extend `wrangler.toml` with environments.

## Notes

- This project uses a cookie `session` to key the Durable Object instance per user. It keeps the last 20 messages to control context length.
- The Agent/Workflow role is provided by the Worker itself, coordinating calls between the UI, memory store, and LLM. You can extend this by adding tool-use or multiple models.

## Testing Architecture

The tests cover:
- **Worker routes**: HTML serving, API endpoints, error handling
- **Durable Object**: Message storage, history retrieval, pruning

## Next steps (optional enhancements)

- Add voice input with the Cloudflare Realtime API.
- Split UI to a dedicated Cloudflare Pages project and point it to the Worker API.
- Use Cloudflare Agents SDK to compose tools and routes as they become available in your account.

# CF AI Financial Markets Globe

A modern financial markets visualization dashboard with AI-powered analysis, featuring a 3D globe showing real-time market data flows between global exchanges.

## Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:8787 to see the financial dashboard.

## Features

- **Interactive 3D Globe**: Financial data streams visualized as animated arcs between global exchanges
- **Modern Dashboard**: Trading terminal-inspired UI with collapsible panels and technical analysis
- **AI Financial Advisor**: Chat interface for market analysis and investment insights
- **Real-time Market Data**: Live market simulation with price updates and volume tracking
- **Technical Analysis**: RSI, MACD, moving averages, and sector performance charts
- **Responsive Design**: Mobile-first design with glassmorphism effects

## Architecture

- **Frontend**: Modern dashboard with collapsible panels, technical analysis charts, and AI chat
- **3D Globe**: Interactive globe showing financial data streams as animated arcs
- **AI Agent**: Cloudflare Workers AI providing market analysis and insights
- **Real-time Data**: Mock financial data with live updates and market simulation
- **Static Assets**: JavaScript code served from `/public/app.js` for better organization

## Recent Changes

### JavaScript Asset Extraction
We moved the embedded JavaScript code from a template literal in `src/static.ts` into a separate static asset at `public/app.js` to avoid nested template literal parse errors and improve code organization.

**Changes Made:**
- Created `/public/app.js` with all dashboard JavaScript functionality
- Updated `src/static.ts` to only export the HTML template
- Configured `wrangler.toml` to serve static assets from the `public` directory
- Removed duplicate JavaScript code and consolidated financial data handling
- Updated DOM element IDs to use consistent naming (`#input`, `#send`, `#chat`)
- Added CSS variables for new accent colors: `--accent-primary: #00D4FF`, `--accent-secondary: #7C3AED`, `--accent-glow: rgba(0,212,255,0.35)`

This separation improves maintainability and eliminates TypeScript/ESBuild parsing issues that occurred with complex template literals containing HTML and JavaScript.

## File Structure

```
src/
├── worker.ts          # Main Worker with routes and AI logic
├── static.ts          # HTML/CSS template for the dashboard
├── memory_do.ts       # Durable Object for message storage
└── worker.test.ts     # Tests for Worker functionality

public/
└── app.js             # Dashboard JavaScript functionality

test-basic.mjs         # Basic integration test
wrangler.toml          # Cloudflare configuration
```

## API Endpoints

- `GET /` - Serves the main financial dashboard
- `POST /api/chat` - Chat with the AI financial advisor
- `GET /api/financial-data` - Mock financial data endpoint
- Static assets served from `/public/` directory

## Development

### Prerequisites
- Node.js 18+
- Cloudflare account (for deployment)

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Type checking
npm run typecheck
```

### Deployment
```bash
# Deploy to Cloudflare
npm run deploy
```

## Configuration

The app uses several Cloudflare services:

- **Workers AI**: For financial analysis and chat responses (Llama 3.3 70B model)
- **Durable Objects**: For persistent conversation storage
- **Workers**: For serving the app and API endpoints
- **Static Assets**: For serving JavaScript and other static files

## Design System

The dashboard uses a modern financial terminal aesthetic with:

- **Color Palette**: Dark theme (`#0B0E14` background) with blue/orange accents
- **Typography**: Inter font family for clean, readable text
- **Layout**: CSS Grid with collapsible panels and responsive breakpoints
- **Effects**: Glassmorphism, subtle shadows, and smooth transitions
- **Icons**: Minimalistic style with emoji accents

## Notes

- This project uses a cookie `session` to key the Durable Object instance per user
- The AI provides financial analysis and market insights in plain English
- Market data is currently simulated but designed for easy integration with real APIs
- The globe shows animated arcs representing trade flows between major exchanges
