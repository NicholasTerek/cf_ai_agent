var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/static.ts
var INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markets Globe - Edge Terminal</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    :root {
      /* Dark theme tokens - AA+ contrast */
      --bg: #0B0E14;
      --panel: #121720;
      --panel-2: #0F131B;
      --text: #E6EEF8;
      --muted: #8A93A3;
      --pos: #16C784;
      --neg: #FF5D5D;
      --warn: #F8B84E;
      --info: #4DA3FF;
      --stroke: rgba(230,238,248,0.08);
      --stroke-2: rgba(230,238,248,0.16);
      --glow: rgba(77,163,255,0.25);

      /* Typography scale */
      --text-xs: 12px;
      --text-sm: 14px;
      --text-base: 16px;
      --text-lg: 20px;
      --text-xl: 28px;

      /* Spacing grid */
      --space-1: 8px;
      --space-2: 12px;
      --space-3: 16px;
      --space-4: 24px;

      /* Animation */
      --ease: cubic-bezier(0.2, 0.7, 0.2, 1);
      --duration-fast: 120ms;
      --duration-normal: 200ms;
      --duration-slow: 220ms;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: var(--bg);
      color: var(--text);
      font-size: var(--text-sm);
      line-height: 1.4;
      overflow-x: hidden;
      height: 100vh;
    }

    /* 12-column grid system */
    .container {
      max-width: 100vw;
      margin: 0 auto;
      padding: 0 var(--space-4);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: var(--space-4);
    }

    .col-3 { grid-column: span 3; }
    .col-6 { grid-column: span 6; }
    .col-12 { grid-column: span 12; }

    /* Focus styles */
    *:focus {
      outline: 2px solid var(--info);
      outline-offset: 2px;
    }

    /* Reduce motion */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    /* Top Bar - Fixed 64px */
    .top-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 64px;
      background: var(--panel);
      border-bottom: 1px solid var(--stroke);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--space-4);
      z-index: 100;
    }

    .brand-section {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    .brand {
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--text);
    }

    .live-status {
      display: flex;
      align-items: center;
      gap: var(--space-1);
      font-size: var(--text-xs);
      color: var(--muted);
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--pos);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .indices-section {
      display: flex;
      gap: var(--space-3);
      align-items: center;
      flex: 1;
      justify-content: center;
      max-width: 800px;
    }

    .search-section {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .search-trigger {
      background: var(--panel-2);
      border: 1px solid var(--stroke);
      border-radius: 6px;
      padding: var(--space-1) var(--space-2);
      color: var(--muted);
      font-size: var(--text-xs);
      cursor: pointer;
      transition: all var(--duration-fast) var(--ease);
    }

    .search-trigger:hover {
      border-color: var(--stroke-2);
      background: var(--bg);
    }

    /* Main Layout */
    .main-layout {
      margin-top: 64px;
      height: calc(100vh - 64px - 60px);
      padding: var(--space-4);
      padding-bottom: 80px;
      display: grid;
      grid-template-columns: 300px 1fr 300px;
      gap: var(--space-4);
      width: 100%;
      max-width: 100vw;
      box-sizing: border-box;
    }

    /* Index Tile Component */
    .index-tile {
      background: var(--panel);
      border: 1px solid var(--stroke);
      border-radius: 8px;
      padding: var(--space-2) var(--space-3);
      min-width: 110px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transition: all var(--duration-fast) var(--ease);
      box-shadow: inset 0 1px 0 rgba(230,238,248,0.05);
    }

    .index-tile:hover {
      border-color: var(--stroke-2);
      box-shadow: 0 0 0 1px var(--glow), inset 0 1px 0 rgba(230,238,248,0.05);
      transform: translateY(-1px);
    }

    .index-symbol {
      font-size: var(--text-xs);
      color: var(--muted);
      font-weight: 500;
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .index-value {
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--text);
      margin-bottom: 6px;
      line-height: 1;
    }

    .index-change {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: var(--text-xs);
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 6px;
      margin-bottom: 6px;
    }

    .index-change.positive {
      color: var(--pos);
      background: rgba(22, 199, 132, 0.15);
    }

    .index-change.negative {
      color: var(--neg);
      background: rgba(255, 93, 93, 0.15);
    }

    .index-change.neutral {
      color: var(--muted);
      background: rgba(138, 147, 163, 0.15);
    }

    .index-sparkline {
      width: 40px;
      height: 20px;
    }

    /* Panel Components */
    .panel {
      background: var(--panel);
      border: 1px solid var(--stroke);
      border-radius: 12px;
      overflow: hidden;
    }

    .panel-header {
      padding: var(--space-3);
      border-bottom: 1px solid var(--stroke);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .panel-title {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--text);
    }

    .panel-content {
      padding: var(--space-3);
    }

    /* Left Column - Technicals */
    .left-column {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      overflow-y: auto;
      width: 300px;
      min-width: 300px;
      max-width: 300px;
    }

    .card {
      background: var(--panel);
      border: 1px solid var(--stroke);
      border-radius: 8px;
      overflow: hidden;
    }

    .card-header {
      padding: var(--space-2) var(--space-3);
      border-bottom: 1px solid var(--stroke);
      background: var(--panel-2);
    }

    .card-title {
      font-size: var(--text-xs);
      font-weight: 500;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .card-content {
      padding: var(--space-3);
    }

    /* Center Panel - Focus Area */
    .center-panel {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      position: relative;
      width: 100%;
      min-width: 0;
    }

    .tape-strip {
      background: var(--panel);
      border: 1px solid var(--stroke);
      border-radius: 8px;
      padding: var(--space-2) var(--space-3);
      display: flex;
      gap: var(--space-4);
    }

    .tape-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .tape-label {
      font-size: var(--text-xs);
      color: var(--muted);
    }

    .tape-value {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--text);
    }

    .globe-area {
      height: 600px;
      width: 100%;
      position: relative;
      background: var(--bg);
      border-radius: 12px;
      overflow: visible;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    /* Bottom Ticker Tape */
    .bottom-ticker {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--panel);
      border-top: 1px solid var(--stroke);
      height: 60px;
      overflow: hidden;
      z-index: 50;
    }

    .ticker-content {
      display: flex;
      align-items: center;
      height: 100%;
      animation: scroll-ticker 90s linear infinite;
      padding: 0 var(--space-3);
      gap: var(--space-4);
      white-space: nowrap;
    }

    @keyframes scroll-ticker {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }

    .ticker-content:hover {
      animation-play-state: paused;
    }

    /* Right Column - Advisor & Watchlist */
    .right-column {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      width: 300px;
      min-width: 300px;
      max-width: 300px;
    }

    .advisor-card {
      background: var(--panel);
      border: 1px solid var(--stroke);
      border-radius: 8px;
      overflow: hidden;
    }

    .advisor-header {
      padding: var(--space-3);
      border-bottom: 1px solid var(--stroke);
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .advisor-status {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--pos);
    }

    .advisor-title {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--text);
    }

    .advisor-content {
      padding: var(--space-3);
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .last-insight {
      font-size: var(--text-sm);
      color: var(--text);
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .insight-chips {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-1);
    }

    .chip {
      background: var(--panel-2);
      border: 1px solid var(--stroke);
      border-radius: 16px;
      padding: 4px var(--space-2);
      font-size: var(--text-xs);
      color: var(--muted);
      cursor: pointer;
      transition: all var(--duration-fast) var(--ease);
    }

    .chip:hover {
      background: var(--info);
      color: white;
      border-color: var(--info);
    }

    .chat-input {
      display: flex;
      gap: var(--space-1);
    }

    .input-field {
      flex: 1;
      background: var(--panel-2);
      border: 1px solid var(--stroke);
      border-radius: 6px;
      padding: var(--space-1) var(--space-2);
      color: var(--text);
      font-size: var(--text-sm);
      resize: none;
      outline: none;
      transition: border-color var(--duration-fast) var(--ease);
    }

    .input-field:focus {
      border-color: var(--info);
    }

    .send-btn {
      background: var(--info);
      border: none;
      border-radius: 6px;
      padding: var(--space-1) var(--space-2);
      color: white;
      cursor: pointer;
      font-size: var(--text-sm);
      transition: all var(--duration-fast) var(--ease);
    }

    .send-btn:hover {
      background: #3B8EE5;
    }

    /* Watchlist */
    .watchlist-card {
      flex: 1;
      background: var(--panel);
      border: 1px solid var(--stroke);
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .watchlist-header {
      padding: var(--space-3);
      border-bottom: 1px solid var(--stroke);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .watchlist-content {
      flex: 1;
      overflow-y: auto;
    }

    .watchlist-row {
      padding: var(--space-2) var(--space-3);
      border-bottom: 1px solid var(--stroke);
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: all var(--duration-fast) var(--ease);
    }

    .watchlist-row:hover {
      background: var(--panel-2);
      box-shadow: inset 0 0 0 1px var(--glow);
    }

    .watchlist-row.selected {
      background: rgba(77, 163, 255, 0.1);
      border-color: var(--info);
    }

    .symbol-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .symbol-name {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--text);
    }

    .symbol-desc {
      font-size: var(--text-xs);
      color: var(--muted);
    }

    .symbol-data {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
    }

    .symbol-price {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--text);
    }

    .symbol-change {
      font-size: var(--text-xs);
      font-weight: 500;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .symbol-change.positive {
      color: var(--pos);
      background: rgba(22, 199, 132, 0.1);
    }

    .symbol-change.negative {
      color: var(--neg);
      background: rgba(255, 93, 93, 0.1);
    }

    .symbol-sparkline {
      width: 28px;
      height: 16px;
      margin-left: var(--space-1);
    }

    /* Globe as background */
    #globe-canvas {
      position: absolute;
      top: calc(50% + 50px);
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.8;
      width: 600px;
      height: 600px;
      pointer-events: none;
      z-index: 1;
    }

    .globe-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.35;
      z-index: 1;
    }

    /* Sector Heatmap */
    .sector-heatmap {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4px;
    }

    .sector-cell {
      aspect-ratio: 1;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: var(--text-xs);
      font-weight: 500;
      text-align: center;
      transition: all var(--duration-fast) var(--ease);
    }

    .sector-cell:hover {
      transform: scale(1.05);
    }

    .sector-label {
      font-size: 10px;
      opacity: 0.9;
    }

    .sector-value {
      font-weight: 600;
      margin-top: 2px;
    }

    /* Mini Chart */
    .mini-chart {
      width: 100%;
      height: 120px;
      background: var(--panel-2);
      border-radius: 6px;
      padding: var(--space-2);
      position: relative;
    }

    .chart-canvas {
      width: 100%;
      height: 100%;
    }

    /* Skeleton loading */
    .skeleton {
      background: linear-gradient(90deg, var(--panel-2) 25%, var(--stroke) 50%, var(--panel-2) 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
      border-radius: 4px;
    }

    @keyframes skeleton-loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Responsive */
    @media (max-width: 1200px) {
      .main-layout {
        grid-template-columns: 250px 1fr 250px;
      }
    }

    @media (max-width: 768px) {
      .main-layout {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
      }
      
      .indices-section {
        flex-wrap: wrap;
        gap: var(--space-2);
      }
      
      .index-tile {
        min-width: 100px;
      }
    }
    .market-bar {
      background: var(--glass);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.5rem;
      z-index: 100;
    }

    .market-indices {
      display: flex;
      gap: 2rem;
    }

    .index-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .index-symbol {
      font-weight: 600;
      font-size: 0.875rem;
      color: var(--text-primary);
    }

    .index-value {
      font-weight: 500;
      color: var(--text-secondary);
    }

    .index-change {
      font-weight: 600;
      font-size: 0.75rem;
      padding: 0.125rem 0.375rem;
      border-radius: 4px;
    }

    .index-change.positive {
      color: var(--success);
      background: rgba(16, 185, 129, 0.1);
    }

    .index-change.negative {
      color: var(--error);
      background: rgba(239, 68, 68, 0.1);
    }

    .index-change.neutral {
      color: var(--neutral);
      background: rgba(107, 114, 128, 0.1);
    }

    .index-sparkline {
      width: 60px;
      height: 24px;
    }

    .market-time {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-secondary);
      font-size: 0.875rem;
    }

    .status-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--success);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    /* Main Content */
    .main-content {
      display: grid;
      grid-template-columns: 320px 1fr 400px;
      gap: 0;
      height: calc(100vh - 60px);
    }

    /* Left Panel */
    .left-panel {
      background: var(--glass);
      backdrop-filter: blur(20px);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease;
    }

    .left-panel.collapsed {
      transform: translateX(-100%);
    }

    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--border);
    }

    .panel-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .panel-toggle {
      background: none;
      border: none;
      color: var(--text-secondary);
      font-size: 1.25rem;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 4px;
      transition: all 0.2s ease;
    }

    .panel-toggle:hover {
      background: var(--bg-tertiary);
      color: var(--text-primary);
    }

    .technicals-container {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }

    .technical-section {
      margin-bottom: 1.5rem;
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 0;
      cursor: pointer;
      border-bottom: 1px solid var(--border);
    }

    .section-title {
      font-weight: 500;
      color: var(--text-primary);
    }

    .section-toggle {
      color: var(--text-secondary);
      transition: transform 0.2s ease;
    }

    .section-content {
      padding: 1rem 0;
      display: none;
    }

    .mini-chart-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem;
      background: var(--bg-tertiary);
      border-radius: 6px;
      margin-bottom: 0.75rem;
    }

    .chart-label {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .chart-name {
      font-size: 0.875rem;
      color: var(--text-primary);
    }

    .chart-value {
      font-size: 0.75rem;
      font-weight: 600;
    }

    .chart-value.positive {
      color: var(--success);
    }

    .chart-value.negative {
      color: var(--error);
    }

    .chart-value.neutral {
      color: var(--neutral);
    }

    .mini-sparkline {
      width: 80px;
      height: 30px;
    }

    .mini-sparkline canvas {
      width: 100%;
      height: 100%;
    }

    /* Globe Container */
    .globe-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-primary);
      padding: 2rem;
      overflow: hidden;
    }

    #globe-canvas {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      box-shadow: var(--shadow-xl);
      max-width: 100%;
      max-height: 100%;
    }

    .globe-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, var(--bg-secondary) 0%, var(--bg-primary) 100%);
      border: 1px solid var(--border);
      max-width: 100%;
      max-height: 100%;
    }

    .loading-spinner {
      width: 60px;
      height: 60px;
      border: 3px solid var(--border);
      border-top: 3px solid var(--accent-primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }

    .loading-text {
      color: var(--text-secondary);
      font-size: 0.875rem;
      text-align: center;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Right Panel */
    .right-panel {
      background: var(--glass);
      backdrop-filter: blur(20px);
      border-left: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease;
    }

    .right-panel.collapsed {
      transform: translateX(100%);
    }

    .ai-header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--border);
    }

    .ai-header h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .ai-header p {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-bottom: 1rem;
    }

    .suggested-questions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .question-chip {
      background: var(--bg-tertiary);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 0.375rem 0.75rem;
      font-size: 0.75rem;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .question-chip:hover {
      background: var(--accent-blue);
      color: white;
      border-color: var(--accent-blue);
    }

    .ai-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .watchlist-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 1rem;
    }

    .watchlist-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .watchlist-title {
      font-weight: 600;
      color: var(--text-primary);
    }

    .search-container {
      position: relative;
      margin-bottom: 1rem;
    }

    .search-input {
      width: 100%;
      background: var(--bg-tertiary);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 0.5rem 0.75rem;
      color: var(--text-primary);
      font-size: 0.875rem;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--accent-blue);
    }

    .watchlist-container {
      flex: 1;
      overflow-y: auto;
    }

    .watchlist-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-bottom: 0.5rem;
    }

    .watchlist-item:hover {
      background: var(--bg-tertiary);
    }

    .watchlist-item.selected {
      background: var(--accent-blue);
      color: white;
    }

    .stock-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .stock-symbol {
      font-weight: 600;
      font-size: 0.875rem;
    }

    .stock-name {
      font-size: 0.75rem;
      color: var(--text-secondary);
    }

    .watchlist-item.selected .stock-name {
      color: rgba(255, 255, 255, 0.8);
    }

    .stock-data {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.25rem;
    }

    .stock-price {
      font-weight: 600;
      font-size: 0.875rem;
    }

    .stock-change {
      font-size: 0.75rem;
      font-weight: 500;
      padding: 0.125rem 0.375rem;
      border-radius: 4px;
    }

    .stock-change.positive {
      color: var(--success);
      background: rgba(16, 185, 129, 0.1);
    }

    .stock-change.negative {
      color: var(--error);
      background: rgba(239, 68, 68, 0.1);
    }

    .charts-panel {
      border-top: 1px solid var(--border);
      padding: 1rem;
    }

    .chart-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }

    .chart-title {
      font-weight: 600;
      color: var(--text-primary);
    }

    .chart-value {
      font-size: 0.875rem;
      font-weight: 500;
    }

    .chart-canvas {
      width: 100%;
      height: 120px;
      background: var(--bg-tertiary);
      border-radius: 6px;
    }

    /* Chat Panel */
    .chat-panel {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      width: 400px;
      height: 500px;
      background: var(--glass);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-xl);
      z-index: 200;
    }

    .chat-container {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .chat-header {
      padding: 1rem;
      border-bottom: 1px solid var(--border);
    }

    .chat-header h3 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .chat-header p {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-bottom: 1rem;
    }

    .ai-input {
      display: flex;
      gap: 0.5rem;
    }

    .input-container {
      display: flex;
      flex: 1;
      background: var(--bg-tertiary);
      border: 1px solid var(--border);
      border-radius: 6px;
      overflow: hidden;
    }

    .input-field {
      flex: 1;
      background: none;
      border: none;
      padding: 0.5rem 0.75rem;
      color: var(--text-primary);
      font-size: 0.875rem;
      resize: none;
      outline: none;
    }

    .input-field::placeholder {
      color: var(--text-muted);
    }

    .send-button {
      background: var(--accent-blue);
      border: none;
      color: white;
      padding: 0.5rem 0.75rem;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.2s ease;
    }

    .send-button:hover {
      background: var(--accent-blue-light);
    }

    .send-button:disabled {
      background: var(--neutral);
      cursor: not-allowed;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .ai-message {
      display: flex;
      gap: 0.75rem;
      max-width: 90%;
    }

    .ai-message.user {
      align-self: flex-end;
      flex-direction: row-reverse;
    }

    .message-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 600;
      flex-shrink: 0;
    }

    .ai-message.user .message-avatar {
      background: var(--accent-blue);
      color: white;
    }

    .ai-message.assistant .message-avatar {
      background: var(--accent-orange);
      color: white;
    }

    .message-content {
      flex: 1;
    }

    .message-text {
      background: var(--bg-tertiary);
      padding: 0.75rem;
      border-radius: 8px;
      font-size: 0.875rem;
      line-height: 1.4;
    }

    .ai-message.user .message-text {
      background: var(--accent-blue);
      color: white;
    }

    /* Responsive Design */
    @media (max-width: 1200px) {
      .main-content {
        grid-template-columns: 280px 1fr 350px;
      }
    }

    @media (max-width: 768px) {
      .main-content {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
      }

      .left-panel,
      .right-panel {
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 150;
      }

      .left-panel {
        left: 0;
        width: 280px;
      }

      .right-panel {
        right: 0;
        width: 350px;
      }

      .globe-container {
        padding: 1rem;
      }

      #globe-canvas,
      .globe-loading {
        width: 300px;
        height: 300px;
      }

      .chat-panel {
        position: relative;
        bottom: auto;
        right: auto;
        width: 100%;
        height: auto;
        border-radius: 0;
        border: none;
        border-top: 1px solid var(--border);
      }

      .market-indices {
        gap: 1rem;
      }

      .index-item {
        flex-direction: column;
        gap: 0.25rem;
        text-align: center;
      }
    }
  </style>
</head>
<body>
  <!-- Top Bar -->
  <div class="top-bar">
    <div class="brand-section">
      <div class="brand">Markets Globe</div>
      <div class="live-status">
        <div class="status-dot"></div>
        <span>LIVE</span>
        <span>\u2022</span>
        <span id="market-session">NYSE 14:30 ET</span>
      </div>
    </div>

    <div class="indices-section">
      <!-- Clean header without tiles -->
    </div>

    <div class="search-section">
      <div class="search-trigger" onclick="openSearch()">
        <span>Search</span>
        <span style="opacity: 0.6;">\u2318K</span>
      </div>
    </div>
  </div>

  <!-- Main Layout -->
  <div class="main-layout">
    <!-- Left Column - Technicals -->
    <div class="left-column">
      <!-- Sector Heatmap Card -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Sector Heatmap</div>
        </div>
        <div class="card-content">
          <div class="sector-heatmap" id="sector-heatmap">
            <!-- Will be populated by JavaScript -->
          </div>
        </div>
      </div>

      <!-- RSI Card -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">RSI (14)</div>
        </div>
        <div class="card-content">
          <div class="mini-chart">
            <canvas class="chart-canvas" id="rsi-chart"></canvas>
          </div>
        </div>
      </div>

      <!-- MACD Card -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">MACD</div>
        </div>
        <div class="card-content">
          <div class="mini-chart">
            <canvas class="chart-canvas" id="macd-chart"></canvas>
          </div>
        </div>
      </div>

      <!-- Moving Averages Card -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Moving Averages</div>
        </div>
        <div class="card-content">
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: var(--text-xs);">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--pos);">MA20</span>
              <span>$172.45</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--info);">MA50</span>
              <span>$168.90</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--neg);">MA200</span>
              <span>$155.20</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bollinger Bands Card -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Bollinger Bands</div>
        </div>
        <div class="card-content">
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: var(--text-xs);">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--muted);">Upper</span>
              <span>$178.20</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--muted);">Middle</span>
              <span>$175.50</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--muted);">Lower</span>
              <span>$172.80</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Center Panel - Focus Area -->
    <div class="center-panel">
      <!-- Today's Tape Strip -->
      <div class="tape-strip">
        <div class="tape-item">
          <div class="tape-label">Top Movers \u2191</div>
          <div class="tape-value" style="color: var(--pos);">NVDA +5.2%</div>
        </div>
        <div class="tape-item">
          <div class="tape-label">Top Movers \u2193</div>
          <div class="tape-value" style="color: var(--neg);">TSLA -3.1%</div>
        </div>
        <div class="tape-item">
          <div class="tape-label">Sector Breadth</div>
          <div class="tape-value">7/11 \u2191</div>
        </div>
        <div class="tape-item">
          <div class="tape-label">Net Advancers</div>
          <div class="tape-value" style="color: var(--pos);">+1,247</div>
        </div>
      </div>

      <!-- Globe Area -->
      <div class="globe-area">
        <div class="globe-loading" id="globe-loading">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 16px; opacity: 0.5;">
            <div style="width: 40px; height: 40px; border: 2px solid var(--stroke); border-top: 2px solid var(--info); border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <div style="color: var(--muted); font-size: var(--text-xs);">Initializing Globe...</div>
          </div>
        </div>
        <canvas id="globe-canvas" style="display: none;"></canvas>
      </div>

    </div>

    <!-- Right Column - Advisor & Watchlist -->
    <div class="right-column">
      <!-- AI Advisor Card -->
      <div class="advisor-card">
        <div class="advisor-header">
          <div class="advisor-status"></div>
          <div class="advisor-title">AI Financial Advisor</div>
        </div>
        <div class="advisor-content">
          <div class="last-insight" id="last-insight">
            Markets showing mixed signals today with tech leading gains while energy lags. Volume spike in semiconductors suggests institutional accumulation.
          </div>
          <div class="insight-chips">
            <div class="chip" onclick="askQuestion('Top sectors now')">Top sectors now</div>
            <div class="chip" onclick="askQuestion('Why is NVDA moving?')">Why is NVDA moving?</div>
            <div class="chip" onclick="askQuestion('Build a watchlist')">Build a watchlist</div>
          </div>
          <div class="chat-input">
            <textarea class="input-field" id="input" placeholder="Ask about markets..." rows="1"></textarea>
            <button class="send-btn" id="send">\u2192</button>
          </div>
        </div>
      </div>

      <!-- Watchlist Card -->
      <div class="watchlist-card">
        <div class="watchlist-header">
          <div class="panel-title">Watchlist</div>
          <div style="font-size: var(--text-xs); color: var(--muted);" id="total-volume">2.1B vol</div>
        </div>
        <div class="watchlist-content" id="watchlist-container">
          <!-- Will be populated by JavaScript -->
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom Ticker Tape -->
  <div class="bottom-ticker">
    <div class="ticker-content" id="ticker-content">
      <!-- Will be populated by JavaScript with extensive market data -->
    </div>
  </div>

  <!-- Optimized Three.js libraries with faster CDN -->
  <script src="https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.min.js"><\/script>
  <script src="https://cdn.jsdelivr.net/npm/three-globe@2.31.0/dist/three-globe.min.js"><\/script>
  <script type="module" src="/app.js"><\/script>
</body>
</html>`;

// src/memory_do.ts
var MemoryDO = class {
  static {
    __name(this, "MemoryDO");
  }
  state;
  constructor(state, env) {
    this.state = state;
  }
  async fetch(request) {
    const url = new URL(request.url);
    const key = "history";
    if (request.method === "POST" && url.pathname.endsWith("/append")) {
      const msg = await request.json();
      const history = await this.state.storage.get(key) || [];
      history.push(msg);
      const pruned = history.slice(-20);
      await this.state.storage.put(key, pruned);
      return new Response(null, { status: 204 });
    }
    if (request.method === "GET" && url.pathname.endsWith("/history")) {
      const history = await this.state.storage.get(key) || [];
      return Response.json(history);
    }
    if (request.method === "DELETE" && url.pathname.endsWith("/reset")) {
      await this.state.storage.delete(key);
      return new Response(null, { status: 204 });
    }
    return new Response("Not found", { status: 404 });
  }
};

// src/worker.ts
var DEFAULT_MODEL = "@cf/meta/llama-3.3-70b-instruct";
var worker_default = {
  fetch: /* @__PURE__ */ __name(async (request, env, ctx) => {
    const url = new URL(request.url);
    const { pathname } = url;
    if (request.method === "GET" && pathname === "/") {
      return new Response(INDEX_HTML, { headers: { "content-type": "text/html; charset=utf-8" } });
    }
    if (pathname === "/api/chat" && request.method === "POST") {
      const { message } = await request.json();
      if (!message || typeof message !== "string") {
        return Response.json({ error: "Missing message" }, { status: 400 });
      }
      const cookies = request.headers.get("cookie") || "";
      const m = /session=([^;]+)/.exec(cookies);
      const sessionId = m?.[1] || crypto.randomUUID();
      const id = env.MEMORY_DO.idFromName(sessionId);
      const stub = env.MEMORY_DO.get(id);
      const historyRes = await stub.fetch(`${new URL("/history", request.url)}`);
      const history = await historyRes.json();
      await stub.fetch(`${new URL("/append", request.url)}`, { method: "POST", body: JSON.stringify({ role: "user", content: message }) });
      const systemPrompt = {
        role: "system",
        content: `You are a professional AI financial advisor running on Cloudflare Workers AI with Llama 3.3. You help users understand market movements, analyze stocks, and provide investment insights. 

Key capabilities:
- Explain market trends in plain English
- Analyze stock performance and sectors
- Generate watchlists based on market activity
- Provide risk assessments and investment strategies
- Interpret financial news and its market impact

Current market context: You can see live trading flows on the globe visualization between major exchanges (NYSE, NASDAQ, LSE, TSE, SSE, BSE, ASX, TSX, etc.). 

Be professional, data-driven, but accessible. Always include risk disclaimers for investment advice. Focus on education and analysis rather than specific buy/sell recommendations.`
      };
      const messages = [systemPrompt, ...history, { role: "user", content: message }];
      const model = env.MODEL || DEFAULT_MODEL;
      let reply = "";
      try {
        const aiRes = await env.AI.run(model, { messages });
        reply = aiRes?.response || aiRes?.result || aiRes?.output || "";
      } catch (error) {
        console.log("AI call failed, using mock response:", error);
        const errorMsg = error instanceof Error ? error.message : String(error);
        reply = `Hello! I'm a mock AI response running on Cloudflare Workers. You asked: "${message}". In production, this would be powered by Llama 3.3 on Workers AI. The error was: ${errorMsg}`;
      }
      await stub.fetch(`${new URL("/append", request.url)}`, { method: "POST", body: JSON.stringify({ role: "assistant", content: String(reply) }) });
      const headers = new Headers({ "content-type": "application/json; charset=utf-8" });
      if (!m) headers.append("Set-Cookie", `session=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`);
      return new Response(JSON.stringify({ reply: String(reply), model }), { headers });
    }
    if (pathname === "/api/history" && request.method === "GET") {
      const cookies = request.headers.get("cookie") || "";
      const m = /session=([^;]+)/.exec(cookies);
      if (!m) return Response.json([]);
      const id = env.MEMORY_DO.idFromName(m[1]);
      const stub = env.MEMORY_DO.get(id);
      const res = await stub.fetch(`${new URL("/history", request.url)}`);
      return new Response(res.body, { headers: { "content-type": "application/json; charset=utf-8" } });
    }
    if (pathname === "/api/reset" && request.method === "POST") {
      const cookies = request.headers.get("cookie") || "";
      const m = /session=([^;]+)/.exec(cookies);
      if (m) {
        const id = env.MEMORY_DO.idFromName(m[1]);
        const stub = env.MEMORY_DO.get(id);
        await stub.fetch(`${new URL("/reset", request.url)}`, { method: "DELETE" });
      }
      return new Response(null, { status: 204 });
    }
    if (pathname === "/api/financial-data" && request.method === "GET") {
      const financialCenters = [
        { name: "NYSE", lat: 40.7128, lng: -74.006, symbols: ["AAPL", "GOOGL", "MSFT"] },
        { name: "LSE", lat: 51.5074, lng: -0.1278, symbols: ["BP", "SHEL", "AZN"] },
        { name: "TSE", lat: 35.6762, lng: 139.6503, symbols: ["7203", "6758", "9984"] },
        { name: "SSE", lat: 31.2304, lng: 121.4737, symbols: ["000001", "000002", "600036"] },
        { name: "BSE", lat: 19.076, lng: 72.8777, symbols: ["RELIANCE", "TCS", "INFY"] }
      ];
      const marketData = [];
      financialCenters.forEach((center) => {
        center.symbols.forEach((symbol) => {
          marketData.push({
            symbol,
            price: 50 + Math.random() * 200,
            change: (Math.random() - 0.5) * 10,
            changePercent: (Math.random() - 0.5) * 5,
            volume: Math.floor(Math.random() * 1e7),
            timestamp: Date.now(),
            exchange: center.name,
            lat: center.lat,
            lng: center.lng
          });
        });
      });
      return Response.json(marketData);
    }
    if (pathname === "/api/market-data" && request.method === "GET") {
      const demoData = [
        {
          symbol: "AAPL",
          price: 175.5 + (Math.random() - 0.5) * 5,
          change: (Math.random() - 0.5) * 3,
          changePercent: (Math.random() - 0.5) * 2,
          volume: Math.floor(Math.random() * 1e6),
          timestamp: Date.now(),
          exchange: "NASDAQ",
          lat: 40.7128,
          lng: -74.006
        }
      ];
      return Response.json(demoData);
    }
    return new Response("Not found", { status: 404 });
  }, "fetch")
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-uCW9SR/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-uCW9SR/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  MemoryDO,
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=worker.js.map
