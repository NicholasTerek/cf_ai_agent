import { describe, it, expect, vi, beforeEach } from 'vitest'
import worker from './worker'
import { MemoryDO } from './memory_do'

// Mock environment
const mockEnv = {
  AI: {
    run: vi.fn()
  },
  MEMORY_DO: {
    idFromName: vi.fn(),
    get: vi.fn()
  }
}

const mockCtx = {
  waitUntil: vi.fn(),
  passThroughOnException: vi.fn()
}

describe('Worker Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should serve HTML at root path', async () => {
    const request = new Request('http://localhost/')
    const response = await worker.fetch(request, mockEnv as any, mockCtx as any)
    
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('text/html; charset=utf-8')
    
    const html = await response.text()
    expect(html).toContain('Cloudflare AI Chat')
    expect(html).toContain('Workers AI (Llama 3.3)')
  })

  it('should serve JavaScript at /app.js', async () => {
    const request = new Request('http://localhost/app.js')
    const response = await worker.fetch(request, mockEnv as any, mockCtx as any)
    
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('text/javascript; charset=utf-8')
    
    const js = await response.text()
    expect(js).toContain('sendMessage')
    expect(js).toContain('/api/chat')
  })

  it('should return 404 for unknown routes', async () => {
    const request = new Request('http://localhost/unknown')
    const response = await worker.fetch(request, mockEnv as any, mockCtx as any)
    
    expect(response.status).toBe(404)
    const text = await response.text()
    expect(text).toBe('Not found')
  })

  it('should validate chat message input', async () => {
    const request = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}) // Missing message
    })
    
    const response = await worker.fetch(request, mockEnv as any, mockCtx as any)
    
    expect(response.status).toBe(400)
    const json = await response.json()
    expect(json.error).toBe('Missing message')
  })

  it('should handle chat requests with mocked AI response', async () => {
    // Mock Durable Object stub
    const mockStub = {
      fetch: vi.fn()
    }
    
    // Mock DO methods
    mockStub.fetch
      .mockResolvedValueOnce(new Response(JSON.stringify([]))) // history
      .mockResolvedValueOnce(new Response(null, { status: 204 })) // append user
      .mockResolvedValueOnce(new Response(null, { status: 204 })) // append assistant
    
    mockEnv.MEMORY_DO.idFromName.mockReturnValue('test-id')
    mockEnv.MEMORY_DO.get.mockReturnValue(mockStub)
    
    // Mock AI response
    mockEnv.AI.run.mockResolvedValue({
      response: 'Hello! I am running on Cloudflare Workers AI.'
    })
    
    const request = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello' })
    })
    
    const response = await worker.fetch(request, mockEnv as any, mockCtx as any)
    
    expect(response.status).toBe(200)
    const json = await response.json()
    expect(json.reply).toBe('Hello! I am running on Cloudflare Workers AI.')
    expect(json.model).toBe('@cf/meta/llama-3.3-70b-instruct')
    
    // Verify AI was called with correct parameters
    expect(mockEnv.AI.run).toHaveBeenCalledWith(
      '@cf/meta/llama-3.3-70b-instruct',
      expect.objectContaining({
        messages: expect.arrayContaining([
          expect.objectContaining({ role: 'system' }),
          expect.objectContaining({ role: 'user', content: 'Hello' })
        ])
      })
    )
  })
})
