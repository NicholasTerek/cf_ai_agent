#!/usr/bin/env node

/**
 * Simple test runner to verify the Worker functionality
 * Run with: node test-runner.js
 */

import worker from './src/worker.js'

console.log('🧪 Running basic Worker tests...\n')

// Mock environment for testing
const mockEnv = {
  AI: {
    run: async (model, params) => {
      console.log(`🤖 AI.run called with model: ${model}`)
      console.log(`📝 Messages: ${params.messages.length} messages`)
      return { response: 'Hello! This is a test response from the AI.' }
    }
  },
  MEMORY_DO: {
    idFromName: (name) => `mock-id-${name}`,
    get: (id) => ({
      fetch: async (url) => {
        const pathname = new URL(url).pathname
        if (pathname.endsWith('/history')) {
          return new Response(JSON.stringify([]))
        }
        if (pathname.endsWith('/append')) {
          return new Response(null, { status: 204 })
        }
        return new Response('Not found', { status: 404 })
      }
    })
  }
}

const mockCtx = {}

async function runTests() {
  let passed = 0
  let failed = 0

  async function test(name, fn) {
    try {
      console.log(`🔍 Testing: ${name}`)
      await fn()
      console.log(`✅ PASS: ${name}\n`)
      passed++
    } catch (error) {
      console.log(`❌ FAIL: ${name}`)
      console.log(`   Error: ${error.message}\n`)
      failed++
    }
  }

  // Test 1: Root route serves HTML
  await test('Root route serves HTML', async () => {
    const request = new Request('http://localhost/')
    const response = await worker.default.fetch(request, mockEnv, mockCtx)
    
    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`)
    }
    
    const html = await response.text()
    if (!html.includes('Cloudflare AI Chat')) {
      throw new Error('HTML does not contain expected title')
    }
  })

  // Test 2: App.js route serves JavaScript
  await test('App.js route serves JavaScript', async () => {
    const request = new Request('http://localhost/app.js')
    const response = await worker.default.fetch(request, mockEnv, mockCtx)
    
    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`)
    }
    
    const js = await response.text()
    if (!js.includes('sendMessage')) {
      throw new Error('JavaScript does not contain expected function')
    }
  })

  // Test 3: Chat API validates input
  await test('Chat API validates input', async () => {
    const request = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}) // Missing message
    })
    
    const response = await worker.default.fetch(request, mockEnv, mockCtx)
    
    if (response.status !== 400) {
      throw new Error(`Expected status 400, got ${response.status}`)
    }
  })

  // Test 4: Chat API processes valid message
  await test('Chat API processes valid message', async () => {
    const request = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello, AI!' })
    })
    
    const response = await worker.default.fetch(request, mockEnv, mockCtx)
    
    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`)
    }
    
    const json = await response.json()
    if (!json.reply) {
      throw new Error('Response missing reply field')
    }
  })

  // Test 5: Unknown routes return 404
  await test('Unknown routes return 404', async () => {
    const request = new Request('http://localhost/unknown')
    const response = await worker.default.fetch(request, mockEnv, mockCtx)
    
    if (response.status !== 404) {
      throw new Error(`Expected status 404, got ${response.status}`)
    }
  })

  console.log('📊 Test Results:')
  console.log(`✅ Passed: ${passed}`)
  console.log(`❌ Failed: ${failed}`)
  console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`)
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! Your Worker is ready to run.')
  } else {
    console.log('\n⚠️  Some tests failed. Check the errors above.')
    process.exit(1)
  }
}

runTests().catch(console.error)
