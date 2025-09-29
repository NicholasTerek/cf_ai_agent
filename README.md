# cf_ai_agents_demo

AI-powered chat app on Cloudflare using:

- Workers AI with Llama 3.3
- Durable Object memory (conversation state)
- Workers as orchestration layer (workflow/coordination)
- Simple chat UI served from the Worker

This satisfies the assignment requirements: LLM, workflow/coordination (Workers + Durable Object), user input via chat UI, and memory/state.

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
- **Integration**: End-to-end message flow with mocked AI

## Next steps (optional enhancements)

- Add voice input with the Cloudflare Realtime API.
- Split UI to a dedicated Cloudflare Pages project and point it to the Worker API.
- Use Cloudflare Agents SDK to compose tools and routes as they become available in your account.
