import type { DurableObjectState } from '@cloudflare/workers-types'

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

export interface NewsItem {
  title: string
  summary: string
  symbol: string
  sentiment: 'positive' | 'negative' | 'neutral'
  timestamp: number
  source: string
}

export class FinancialDO {
  state: DurableObjectState
  sessions: Set<WebSocket>
  marketData: Map<string, MarketData>
  recentNews: NewsItem[]

  constructor(state: DurableObjectState, env: any) {
    this.state = state
    this.sessions = new Set()
    this.marketData = new Map()
    this.recentNews = []
    
    // Initialize with some demo data
    this.initializeDemoData()
  }

  async fetch(request: Request) {
    const url = new URL(request.url)
    
    if (url.pathname === '/websocket') {
      const upgradeHeader = request.headers.get('Upgrade')
      if (upgradeHeader !== 'websocket') {
        return new Response('Expected websocket', { status: 400 })
      }

      const webSocketPair = new WebSocketPair()
      const [client, server] = Object.values(webSocketPair)

      this.sessions.add(server)
      
      server.addEventListener('close', () => {
        this.sessions.delete(server)
      })

      server.addEventListener('message', (event) => {
        // Handle client messages if needed
        console.log('Received:', event.data)
      })

      // Send initial data
      server.send(JSON.stringify({
        type: 'initial',
        marketData: Array.from(this.marketData.values()),
        news: this.recentNews
      }))

      return new Response(null, { status: 101, webSocket: client })
    }

    if (url.pathname === '/update' && request.method === 'POST') {
      const data = await request.json() as { marketData?: MarketData[], news?: NewsItem[] }
      
      if (data.marketData) {
        data.marketData.forEach(item => {
          this.marketData.set(item.symbol, item)
        })
      }
      
      if (data.news) {
        this.recentNews = [...data.news, ...this.recentNews].slice(0, 50)
      }

      // Broadcast to all connected clients
      this.broadcast({
        type: 'update',
        marketData: data.marketData,
        news: data.news
      })

      return new Response('OK')
    }

    return new Response('Not found', { status: 404 })
  }

  broadcast(message: any) {
    const messageStr = JSON.stringify(message)
    this.sessions.forEach(session => {
      try {
        session.send(messageStr)
      } catch (error) {
        // Remove broken connections
        this.sessions.delete(session)
      }
    })
  }

  initializeDemoData() {
    // Major financial centers with coordinates
    const exchanges = [
      { name: 'NYSE', lat: 40.7128, lng: -74.0060 },
      { name: 'NASDAQ', lat: 40.7128, lng: -74.0060 },
      { name: 'LSE', lat: 51.5074, lng: -0.1278 },
      { name: 'TSE', lat: 35.6762, lng: 139.6503 },
      { name: 'SSE', lat: 31.2304, lng: 121.4737 },
      { name: 'FSE', lat: 50.1109, lng: 8.6821 },
      { name: 'BSE', lat: 19.0760, lng: 72.8777 }
    ]

    // Demo market data
    const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'NVDA', 'META']
    symbols.forEach((symbol, i) => {
      const exchange = exchanges[i % exchanges.length]
      this.marketData.set(symbol, {
        symbol,
        price: 100 + Math.random() * 200,
        change: (Math.random() - 0.5) * 10,
        changePercent: (Math.random() - 0.5) * 5,
        volume: Math.floor(Math.random() * 1000000),
        timestamp: Date.now(),
        exchange: exchange.name,
        lat: exchange.lat,
        lng: exchange.lng
      })
    })

    // Demo news
    this.recentNews = [
      {
        title: 'Tech stocks rally on AI optimism',
        summary: 'Major technology companies see gains as AI adoption accelerates',
        symbol: 'AAPL',
        sentiment: 'positive',
        timestamp: Date.now(),
        source: 'MarketWatch'
      },
      {
        title: 'Energy sector faces headwinds',
        summary: 'Oil prices decline amid global economic concerns',
        symbol: 'XOM',
        sentiment: 'negative',
        timestamp: Date.now() - 300000,
        source: 'Reuters'
      }
    ]
  }
}
