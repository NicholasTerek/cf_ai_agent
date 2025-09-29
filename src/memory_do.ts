import type { DurableObjectState } from '@cloudflare/workers-types'

export interface ChatMessage { role: 'system' | 'user' | 'assistant'; content: string }

export class MemoryDO {
  state: DurableObjectState

  constructor(state: DurableObjectState, env: any) {
    this.state = state
  }

  async fetch(request: Request) {
    const url = new URL(request.url)
    const key = 'history'

    if (request.method === 'POST' && url.pathname.endsWith('/append')) {
      const msg = (await request.json()) as ChatMessage
      const history: ChatMessage[] = (await this.state.storage.get(key)) || []
      history.push(msg)
      // Keep only last 20 interactions to control context size
      const pruned = history.slice(-20)
      await this.state.storage.put(key, pruned)
      return new Response(null, { status: 204 })
    }

    if (request.method === 'GET' && url.pathname.endsWith('/history')) {
      const history: ChatMessage[] = (await this.state.storage.get(key)) || []
      return Response.json(history)
    }

    if (request.method === 'DELETE' && url.pathname.endsWith('/reset')) {
      await this.state.storage.delete(key)
      return new Response(null, { status: 204 })
    }

    return new Response('Not found', { status: 404 })
  }
}
