Prompt #1: Project Bootstrap

Tool: Windsurf AI IDE
Context: Needed a clean Cloudflare Workers setup with real-time streaming support for market data.

Prompt Given:

Generate a Cloudflare Workers project scaffold with the following:
- A Durable Object to handle WebSocket connections and manage broadcasting market data
- Workers AI integration for Llama 3.3
- Static Pages hosting for the frontend
- Separate API endpoints for mock vs. real market data sources
- Environment config for MODE = synthetic | replay | live
Include boilerplate TypeScript and deployment config via wrangler.toml.


Prompt #2: Synthetic Market Data Engine

Tool: Windsurf AI IDE
Context: Needed realistic, streaming market data without relying on external APIs.

Prompt Given:

Write a TypeScript module that generates:
- Price ticks with drift, volatility, and occasional jumps
- Synthetic news headlines tied to symbols or sectors
- Adjustable replay speed and deterministic seeds for demos
Broadcast events to all connected clients via Durable Objects at 1s intervals.

Prompt #3: Interactive 3D Globe Visualization

Tool: Windsurf AI IDE
Context: Needed a visually compelling globe that responds to live market data.

Prompt Given:

Using React + Three.js (react-three-fiber):
- Render a 3D Earth with arcs representing trades or market flows
- Animate arcs in real time based on incoming WebSocket events
- Support dynamic zoom on regions when specific symbols are clicked
- Keep rendering efficient for large numbers of events


Prompt #4: AI Financial Advisor Integration

Tool: Windsurf AI IDE
Context: Wanted natural language Q&A about market movements using Workers AI.

Prompt Given:

Integrate Llama 3.3 via Workers AI:
- User enters a query (e.g., "Why is TSLA down today?")
- Fetch last N minutes of events for relevant symbols
- Summarize causes, biggest movers, and sector impacts in <120 words
- Fallback: "No recent data available" if insufficient context


Prompt #5: UI Redesign and Dark Theme

Tool: Windsurf AI IDE
Context: Original UI looked flat and cluttered. Needed a modern, clean aesthetic.

Prompt Given:

Redesign the dashboard with:
- Dark theme (#0B0E14 background, blue/orange highlights)
- Collapsible panels for technical analysis, watchlist, and AI chat
- Sparklines for top indices in the header bar
- Smooth hover states and panel transitions
- Responsive layout for mobile and desktop

