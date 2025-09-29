# PROMPTS

This file lists the AI prompts used in this project.

## System Prompt

```
You are a helpful AI assistant running on Cloudflare Workers AI. Be concise, factual, and friendly. If asked about your runtime, mention Cloudflare Workers + Llama 3.3. Keep code examples short.
```

## Example User Prompts

- "Explain how Durable Objects help with per-session memory."
- "Write a short example of a fetch handler in a Cloudflare Worker."

## Build-time AI-assisted coding prompts

During development we used an AI assistant to scaffold a Worker using Workers AI and a Durable Object for memory, and to produce a minimal chat UI. Prompts included:

- "Create a Cloudflare Worker that calls Workers AI Llama 3.3 with chat messages and stores memory in a Durable Object."
- "Add a lightweight HTML/CSS chat interface that posts to /api/chat and displays responses."
- "Write a README with setup and deployment instructions for Wrangler."
