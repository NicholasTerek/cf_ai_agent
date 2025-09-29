import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'miniflare',
    environmentOptions: {
      // Miniflare options for Cloudflare Workers testing
      bindings: {
        AI: {},
        MEMORY_DO: {}
      }
    }
  }
})
