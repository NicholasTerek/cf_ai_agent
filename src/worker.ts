import { INDEX_HTML } from './static';
import { MemoryDO, type ChatMessage } from './memory_do'
import type { Ai, DurableObjectNamespace, ExecutionContext } from '@cloudflare/workers-types'

export interface Env {
  AI: Ai
  MEMORY_DO: DurableObjectNamespace<MemoryDO>
  MODEL?: string
}

// Market data interface for the demo
export interface MarketData {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: number
  timestamp: number
  exchange: string
  lat?: number
  lng?: number
}

const DEFAULT_MODEL = '@cf/meta/llama-3.3-70b-instruct'

export default {
  fetch: async (request: Request, env: Env, ctx: ExecutionContext) => {
    const url = new URL(request.url)
    const { pathname } = url

    if (request.method === 'GET' && pathname === '/') {
      return new Response(INDEX_HTML, { headers: { 'content-type': 'text/html; charset=utf-8' } })
    }
    
    

    if (pathname === '/api/chat' && request.method === 'POST') {
      const { message } = await request.json() as { message?: string }
      if (!message || typeof message !== 'string') {
        return Response.json({ error: 'Missing message' }, { status: 400 })
      }

      // Session via cookie; generate one if absent.
      const cookies = request.headers.get('cookie') || ''
      const m = /session=([^;]+)/.exec(cookies)
      const sessionId = m?.[1] || crypto.randomUUID()

      const id = env.MEMORY_DO.idFromName(sessionId)
      const stub = env.MEMORY_DO.get(id)

      // Load history
      const historyRes = await stub.fetch(`${new URL('/history', request.url)}`)
      const history = await historyRes.json() as ChatMessage[]

      // Append the user message now
      await stub.fetch(`${new URL('/append', request.url)}`, { method: 'POST', body: JSON.stringify({ role: 'user', content: message }) })

      const systemPrompt: ChatMessage = {
        role: 'system',
        content: `You are a professional AI financial advisor running on Cloudflare Workers AI with Llama 3.3. You help users understand market movements, analyze stocks, and provide investment insights. 

Key capabilities:
- Explain market trends in plain English
- Analyze stock performance and sectors
- Generate watchlists based on market activity
- Provide risk assessments and investment strategies
- Interpret financial news and its market impact

Current market context: You can see live trading flows on the globe visualization between major exchanges (NYSE, NASDAQ, LSE, TSE, SSE, BSE, ASX, TSX, etc.). 

Be professional, data-driven, but accessible. Always include risk disclaimers for investment advice. Focus on education and analysis rather than specific buy/sell recommendations.`
      }

      const messages: ChatMessage[] = [systemPrompt, ...history, { role: 'user', content: message }]

      // Call Workers AI
      const model = env.MODEL || DEFAULT_MODEL

      let reply = ''
      try {
        // Try Workers AI first
        const aiRes = await env.AI.run(model as any, { messages }) as any
        reply = aiRes?.response || aiRes?.result || aiRes?.output || ''
      } catch (error) {
        // Fallback to mock response for local development
        console.log('AI call failed, using mock response:', error)
        const errorMsg = error instanceof Error ? error.message : String(error)
        reply = `Hello! I'm a mock AI response running on Cloudflare Workers. You asked: "${message}". In production, this would be powered by Llama 3.3 on Workers AI. The error was: ${errorMsg}`
      }

      // Store assistant reply in memory
      await stub.fetch(`${new URL('/append', request.url)}`, { method: 'POST', body: JSON.stringify({ role: 'assistant', content: String(reply) }) })

      const headers = new Headers({ 'content-type': 'application/json; charset=utf-8' })
      if (!m) headers.append('Set-Cookie', `session=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`)

      return new Response(JSON.stringify({ reply: String(reply), model }), { headers })
    }

    if (pathname === '/api/history' && request.method === 'GET') {
      const cookies = request.headers.get('cookie') || ''
      const m = /session=([^;]+)/.exec(cookies)
      if (!m) return Response.json([])
      const id = env.MEMORY_DO.idFromName(m[1])
      const stub = env.MEMORY_DO.get(id)
      const res = await stub.fetch(`${new URL('/history', request.url)}`)
      return new Response(res.body, { headers: { 'content-type': 'application/json; charset=utf-8' } })
    }

    if (pathname === '/api/reset' && request.method === 'POST') {
      const cookies = request.headers.get('cookie') || ''
      const m = /session=([^;]+)/.exec(cookies)
      if (m) {
        const id = env.MEMORY_DO.idFromName(m[1])
        const stub = env.MEMORY_DO.get(id)
        await stub.fetch(`${new URL('/reset', request.url)}`, { method: 'DELETE' })
      }
      return new Response(null, { status: 204 })
    }

    // Market data endpoint for the financial globe
    if (pathname === '/api/financial-data' && request.method === 'GET') {
      // Generate demo financial data with geographic coordinates
      const financialCenters = [
        { name: 'NYSE', lat: 40.7128, lng: -74.0060, symbols: ['AAPL', 'GOOGL', 'MSFT'] },
        { name: 'LSE', lat: 51.5074, lng: -0.1278, symbols: ['BP', 'SHEL', 'AZN'] },
        { name: 'TSE', lat: 35.6762, lng: 139.6503, symbols: ['7203', '6758', '9984'] },
        { name: 'SSE', lat: 31.2304, lng: 121.4737, symbols: ['000001', '000002', '600036'] },
        { name: 'BSE', lat: 19.0760, lng: 72.8777, symbols: ['RELIANCE', 'TCS', 'INFY'] }
      ]

      const marketData: MarketData[] = []
      
      financialCenters.forEach(center => {
        center.symbols.forEach(symbol => {
          marketData.push({
            symbol,
            price: 50 + Math.random() * 200,
            change: (Math.random() - 0.5) * 10,
            changePercent: (Math.random() - 0.5) * 5,
            volume: Math.floor(Math.random() * 10000000),
            timestamp: Date.now(),
            exchange: center.name,
            lat: center.lat,
            lng: center.lng
          })
        })
      })

      return Response.json(marketData)
    }

    // Free market data proxy (Alpha Vantage demo)
    if (pathname === '/api/market-data' && request.method === 'GET') {
      // Demo endpoint - in production, you'd fetch from Alpha Vantage or Yahoo Finance
      const demoData: MarketData[] = [
        {
          symbol: 'AAPL',
          price: 175.50 + (Math.random() - 0.5) * 5,
          change: (Math.random() - 0.5) * 3,
          changePercent: (Math.random() - 0.5) * 2,
          volume: Math.floor(Math.random() * 1000000),
          timestamp: Date.now(),
          exchange: 'NASDAQ',
          lat: 40.7128,
          lng: -74.0060
        }
      ]
      
      return Response.json(demoData)
    }

    return new Response('Not found', { status: 404 })
  },
}

// Re-export the Durable Object class so Wrangler can bind it by name
export { MemoryDO } from './memory_do'
