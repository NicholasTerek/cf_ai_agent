import { INDEX_HTML, APP_JS } from './static'
import { MemoryDO, type ChatMessage } from './memory_do'
import type { Ai, DurableObjectNamespace, ExecutionContext } from '@cloudflare/workers-types'

export interface Env {
  AI: Ai
  MEMORY_DO: DurableObjectNamespace<MemoryDO>
  MODEL?: string
}

const DEFAULT_MODEL = '@cf/meta/llama-3.3-70b-instruct'

export default {
  fetch: async (request: Request, env: Env, ctx: ExecutionContext) => {
    const url = new URL(request.url)
    const { pathname } = url

    if (request.method === 'GET' && pathname === '/') {
      return new Response(INDEX_HTML, { headers: { 'content-type': 'text/html; charset=utf-8' } })
    }
    if (request.method === 'GET' && pathname === '/app.js') {
      return new Response(APP_JS, { headers: { 'content-type': 'text/javascript; charset=utf-8' } })
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
        content: 'You are a helpful AI assistant running on Cloudflare Workers AI. Be concise, factual, and friendly. If asked about your runtime, mention Cloudflare Workers + Llama 3.3. Keep code examples short.'
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

    return new Response('Not found', { status: 404 })
  },
}

// Re-export the Durable Object class so Wrangler can bind it by name
export { MemoryDO } from './memory_do'
