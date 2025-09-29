/**
 * Basic functionality test - checks if files exist and have expected content
 */

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

console.log('🧪 Running basic file structure tests...\n')

const tests = [
  {
    name: 'package.json exists and has correct scripts',
    test: () => {
      const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
      if (!pkg.scripts.dev) throw new Error('Missing dev script')
      if (!pkg.scripts.deploy) throw new Error('Missing deploy script')
      if (!pkg.devDependencies.wrangler) throw new Error('Missing wrangler dependency')
    }
  },
  {
    name: 'wrangler.toml exists and has AI binding',
    test: () => {
      const config = readFileSync('wrangler.toml', 'utf8')
      if (!config.includes('binding = "AI"')) throw new Error('Missing AI binding')
      if (!config.includes('MemoryDO')) throw new Error('Missing Durable Object config')
    }
  },
  {
    name: 'Worker source exists and exports default',
    test: () => {
      const worker = readFileSync('src/worker.ts', 'utf8')
      if (!worker.includes('export default')) throw new Error('Missing default export')
      if (!worker.includes('fetch:')) throw new Error('Missing fetch handler')
      if (!worker.includes('Workers AI')) throw new Error('Missing AI integration')
    }
  },
  {
    name: 'Durable Object exists and has required methods',
    test: () => {
      const memoryDO = readFileSync('src/memory_do.ts', 'utf8')
      if (!memoryDO.includes('class MemoryDO')) throw new Error('Missing MemoryDO class')
      if (!memoryDO.includes('async fetch')) throw new Error('Missing fetch method')
    }
  },
  {
    name: 'Static files contain UI components',
    test: () => {
      const staticFile = readFileSync('src/static.ts', 'utf8')
      if (!staticFile.includes('INDEX_HTML')) throw new Error('Missing INDEX_HTML')
      if (!staticFile.includes('APP_JS')) throw new Error('Missing APP_JS')
      if (!staticFile.includes('Cloudflare AI Chat')) throw new Error('Missing UI title')
    }
  },
  {
    name: 'README has setup instructions',
    test: () => {
      const readme = readFileSync('README.md', 'utf8')
      if (!readme.includes('npm run dev')) throw new Error('Missing dev instructions')
      if (!readme.includes('wrangler')) throw new Error('Missing wrangler info')
    }
  },
  {
    name: 'PROMPTS.md documents AI usage',
    test: () => {
      if (!existsSync('PROMPTS.md')) throw new Error('PROMPTS.md missing')
      const prompts = readFileSync('PROMPTS.md', 'utf8')
      if (!prompts.includes('AI assistant')) throw new Error('Missing AI prompt documentation')
    }
  }
]

let passed = 0
let failed = 0

for (const { name, test } of tests) {
  try {
    console.log(`🔍 Testing: ${name}`)
    test()
    console.log(`✅ PASS: ${name}\n`)
    passed++
  } catch (error) {
    console.log(`❌ FAIL: ${name}`)
    console.log(`   Error: ${error.message}\n`)
    failed++
  }
}

console.log('📊 Test Results:')
console.log(`✅ Passed: ${passed}`)
console.log(`❌ Failed: ${failed}`)
console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`)

if (failed === 0) {
  console.log('\n🎉 All structure tests passed!')
  console.log('\n📋 Next steps to run the app:')
  console.log('1. npm install')
  console.log('2. npx wrangler login')
  console.log('3. npm run dev')
  console.log('\nThen open the URL that Wrangler prints (usually http://127.0.0.1:8787)')
} else {
  console.log('\n⚠️  Some tests failed. Check the errors above.')
  process.exit(1)
}
