import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryDO } from './memory_do'

// Mock DurableObjectState
const createMockState = () => ({
  storage: {
    get: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
})

describe('MemoryDO', () => {
  let memoryDO: MemoryDO
  let mockState: any

  beforeEach(() => {
    mockState = createMockState()
    memoryDO = new MemoryDO(mockState, {})
    vi.clearAllMocks()
  })

  describe('POST /append', () => {
    it('should append message to history', async () => {
      const existingHistory = [
        { role: 'user', content: 'Hello' },
        { role: 'assistant', content: 'Hi there!' }
      ]
      
      mockState.storage.get.mockResolvedValue(existingHistory)
      
      const request = new Request('http://localhost/append', {
        method: 'POST',
        body: JSON.stringify({ role: 'user', content: 'How are you?' })
      })
      
      const response = await memoryDO.fetch(request)
      
      expect(response.status).toBe(204)
      expect(mockState.storage.put).toHaveBeenCalledWith('history', [
        { role: 'user', content: 'Hello' },
        { role: 'assistant', content: 'Hi there!' },
        { role: 'user', content: 'How are you?' }
      ])
    })

    it('should prune history to last 20 messages', async () => {
      // Create 21 messages
      const longHistory = Array.from({ length: 21 }, (_, i) => ({
        role: i % 2 === 0 ? 'user' : 'assistant',
        content: `Message ${i}`
      }))
      
      mockState.storage.get.mockResolvedValue(longHistory)
      
      const request = new Request('http://localhost/append', {
        method: 'POST',
        body: JSON.stringify({ role: 'user', content: 'New message' })
      })
      
      await memoryDO.fetch(request)
      
      // Should keep only last 20 messages
      const savedHistory = mockState.storage.put.mock.calls[0][1]
      expect(savedHistory).toHaveLength(20)
      expect(savedHistory[19]).toEqual({ role: 'user', content: 'New message' })
    })

    it('should handle empty history', async () => {
      mockState.storage.get.mockResolvedValue(null)
      
      const request = new Request('http://localhost/append', {
        method: 'POST',
        body: JSON.stringify({ role: 'user', content: 'First message' })
      })
      
      await memoryDO.fetch(request)
      
      expect(mockState.storage.put).toHaveBeenCalledWith('history', [
        { role: 'user', content: 'First message' }
      ])
    })
  })

  describe('GET /history', () => {
    it('should return existing history', async () => {
      const history = [
        { role: 'user', content: 'Hello' },
        { role: 'assistant', content: 'Hi!' }
      ]
      
      mockState.storage.get.mockResolvedValue(history)
      
      const request = new Request('http://localhost/history')
      const response = await memoryDO.fetch(request)
      
      expect(response.status).toBe(200)
      const json = await response.json()
      expect(json).toEqual(history)
    })

    it('should return empty array for no history', async () => {
      mockState.storage.get.mockResolvedValue(null)
      
      const request = new Request('http://localhost/history')
      const response = await memoryDO.fetch(request)
      
      const json = await response.json()
      expect(json).toEqual([])
    })
  })

  describe('DELETE /reset', () => {
    it('should clear history', async () => {
      const request = new Request('http://localhost/reset', { method: 'DELETE' })
      const response = await memoryDO.fetch(request)
      
      expect(response.status).toBe(204)
      expect(mockState.storage.delete).toHaveBeenCalledWith('history')
    })
  })

  describe('unknown routes', () => {
    it('should return 404 for unknown routes', async () => {
      const request = new Request('http://localhost/unknown')
      const response = await memoryDO.fetch(request)
      
      expect(response.status).toBe(404)
      const text = await response.text()
      expect(text).toBe('Not found')
    })
  })
})
