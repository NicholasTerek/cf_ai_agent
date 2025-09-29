// Edge Terminal - Markets Globe
let appState = {
  indices: [],
  sectors: [],
  watchlist: [],
  symbolData: {},
  events: [],
  selectedSymbol: null,
  demoMode: true
};

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  initializeEdgeTerminal();
});

// Main initialization
function initializeEdgeTerminal() {
  showSkeletons();
  setTimeout(() => {
    generateMockData();
    initializeComponents();
    initializeGlobe();
    hideSkeletons();
  }, 1000);
}

// Show loading skeletons
function showSkeletons() {
  const sectors = document.getElementById('sector-heatmap');
  if (sectors) {
    sectors.innerHTML = Array(12).fill(0).map(() => 
      '<div class="skeleton" style="aspect-ratio: 1; border-radius: 4px;"></div>'
    ).join('');
  }
}

// Hide skeletons and show real data
function hideSkeletons() {
  document.querySelectorAll('.skeleton').forEach(el => {
    el.classList.remove('skeleton');
  });
}

// Generate comprehensive mock data
function generateMockData() {
  // Market indices
  appState.indices = [
    { symbol: 'SPX', name: 'S&P 500', value: 4567.89, change: 1.23, spark: generateSparkData() },
    { symbol: 'IXIC', name: 'NASDAQ', value: 14234.56, change: -0.45, spark: generateSparkData() },
    { symbol: 'DJI', name: 'DOW', value: 34567.12, change: 0.78, spark: generateSparkData() },
    { symbol: 'VIX', name: 'VIX', value: 18.45, change: -2.1, spark: generateSparkData() },
    { symbol: 'VOL', name: 'VOL', value: 2.1, change: 15.0, spark: generateSparkData() }
  ];

  // Sectors
  appState.sectors = [
    { name: 'TECH', change: 2.1, color: getSectorColor(2.1) },
    { name: 'FINL', change: -0.8, color: getSectorColor(-0.8) },
    { name: 'HLTH', change: 1.5, color: getSectorColor(1.5) },
    { name: 'ENGY', change: -2.3, color: getSectorColor(-2.3) },
    { name: 'CONS', change: 0.7, color: getSectorColor(0.7) },
    { name: 'UTIL', change: -0.2, color: getSectorColor(-0.2) },
    { name: 'INDU', change: 1.2, color: getSectorColor(1.2) },
    { name: 'MATL', change: -1.1, color: getSectorColor(-1.1) },
    { name: 'REAL', change: 0.3, color: getSectorColor(0.3) },
    { name: 'TELE', change: -0.5, color: getSectorColor(-0.5) },
    { name: 'TRAN', change: 1.8, color: getSectorColor(1.8) },
    { name: 'RETL', change: -1.5, color: getSectorColor(-1.5) }
  ];

  // Expanded Watchlist with more symbols
  const symbols = [
    'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX', 'ADBE', 'CRM',
    'ORCL', 'IBM', 'INTC', 'AMD', 'QCOM', 'CSCO', 'NOW', 'SNOW', 'PLTR', 'UBER',
    'LYFT', 'SPOT', 'ROKU', 'ZM', 'DOCU', 'OKTA', 'TWLO', 'SHOP', 'SQ', 'PYPL',
    'JPM', 'BAC', 'WFC', 'GS', 'MS', 'C', 'USB', 'PNC', 'TFC', 'COF',
    'JNJ', 'PFE', 'UNH', 'ABBV', 'BMY', 'MRK', 'LLY', 'GILD', 'AMGN', 'BIIB'
  ];
  
  const companies = {
    'AAPL': 'Apple Inc.', 'GOOGL': 'Alphabet Inc.', 'MSFT': 'Microsoft Corp.',
    'AMZN': 'Amazon.com Inc.', 'TSLA': 'Tesla Inc.', 'META': 'Meta Platforms',
    'NVDA': 'NVIDIA Corp.', 'NFLX': 'Netflix Inc.', 'ADBE': 'Adobe Inc.',
    'CRM': 'Salesforce Inc.', 'ORCL': 'Oracle Corp.', 'IBM': 'IBM Corp.',
    'INTC': 'Intel Corp.', 'AMD': 'Advanced Micro Devices', 'QCOM': 'Qualcomm Inc.',
    'CSCO': 'Cisco Systems', 'NOW': 'ServiceNow Inc.', 'SNOW': 'Snowflake Inc.',
    'PLTR': 'Palantir Technologies', 'UBER': 'Uber Technologies', 'LYFT': 'Lyft Inc.',
    'SPOT': 'Spotify Technology', 'ROKU': 'Roku Inc.', 'ZM': 'Zoom Video',
    'DOCU': 'DocuSign Inc.', 'OKTA': 'Okta Inc.', 'TWLO': 'Twilio Inc.',
    'SHOP': 'Shopify Inc.', 'SQ': 'Block Inc.', 'PYPL': 'PayPal Holdings',
    'JPM': 'JPMorgan Chase', 'BAC': 'Bank of America', 'WFC': 'Wells Fargo',
    'GS': 'Goldman Sachs', 'MS': 'Morgan Stanley', 'C': 'Citigroup Inc.',
    'USB': 'U.S. Bancorp', 'PNC': 'PNC Financial', 'TFC': 'Truist Financial',
    'COF': 'Capital One Financial', 'JNJ': 'Johnson & Johnson', 'PFE': 'Pfizer Inc.',
    'UNH': 'UnitedHealth Group', 'ABBV': 'AbbVie Inc.', 'BMY': 'Bristol Myers',
    'MRK': 'Merck & Co.', 'LLY': 'Eli Lilly', 'GILD': 'Gilead Sciences',
    'AMGN': 'Amgen Inc.', 'BIIB': 'Biogen Inc.'
  };

  // Create full dataset for ticker tape
  const allStocks = symbols.map(symbol => {
    const price = 50 + Math.random() * 400;
    const change = (Math.random() - 0.5) * 10;
    const changePercent = (change / price) * 100;
    
    appState.symbolData[symbol] = {
      price,
      changePct: changePercent,
      spark: generateSparkData()
    };

    return {
      symbol,
      name: companies[symbol] || symbol,
      price,
      change: changePercent,
      spark: generateSparkData()
    };
  });

  // Store all stocks for ticker tape
  appState.allStocks = allStocks;
  
  // Only show top 12 stocks in right panel watchlist
  appState.watchlist = allStocks.slice(0, 12);
}

// Generate sector color based on performance
function getSectorColor(change) {
  const intensity = Math.min(Math.abs(change) / 4, 1);
  if (change > 0) {
    return `rgba(22, 199, 132, ${0.3 + intensity * 0.7})`;
  } else {
    return `rgba(255, 93, 93, ${0.3 + intensity * 0.7})`;
  }
}

// Generate sparkline data
function generateSparkData() {
  const points = [];
  let value = 100;
  for (let i = 0; i < 60; i++) {
    value += (Math.random() - 0.5) * 3;
    points.push(value);
  }
  return points;
}

// Initialize all components
function initializeComponents() {
  updateIndexTiles();
  updateSectorHeatmap();
  updateWatchlist();
  updateTickerTape();
  updateCharts();
  initializeAI();
  startDataUpdates();
}

// Update index tiles in top bar
function updateIndexTiles() {
  const symbolMap = {
    'SPX': 'sp500',
    'IXIC': 'nasdaq', 
    'DJI': 'dow',
    'VIX': 'vix',
    'VOL': 'vol'
  };

  appState.indices.forEach((index, i) => {
    const mappedSymbol = symbolMap[index.symbol] || index.symbol.toLowerCase();
    const valueEl = document.getElementById(`${mappedSymbol}-value`);
    const changeEl = document.getElementById(`${mappedSymbol}-change`);
    const sparkEl = document.getElementById(`${mappedSymbol}-sparkline`);

    if (valueEl) {
      valueEl.textContent = index.symbol === 'VOL' ? `${index.value}B` : index.value.toLocaleString();
    }

    if (changeEl) {
      const changeText = `${index.change > 0 ? '+' : ''}${index.change.toFixed(2)}%`;
      changeEl.textContent = changeText;
      changeEl.className = `index-change ${getChangeClass(index.change)}`;
    }

    if (sparkEl) {
      drawSparkline(sparkEl, index.spark, getChangeClass(index.change));
    }
  });
}

// Update ticker tape with all stock data
function updateTickerTape() {
  const container = document.getElementById('ticker-content');
  if (!container) return;

  // Create ticker content with ALL stocks (not just watchlist)
  const stocksToShow = appState.allStocks || appState.watchlist;
  const tickerItems = stocksToShow.map(stock => {
    const changeSymbol = stock.change > 0 ? '+' : '';
    const changeClass = getChangeClass(stock.change);
    const color = changeClass === 'positive' ? '#16C784' : 
                 changeClass === 'negative' ? '#FF5D5D' : '#8A93A3';
    
    return `<span style="color: ${color}; margin-right: 32px;">${stock.symbol} $${stock.price.toFixed(2)} ${changeSymbol}${stock.change.toFixed(2)}%</span>`;
  }).join('');

  container.innerHTML = tickerItems;
}

// Update sector heatmap
function updateSectorHeatmap() {
  const container = document.getElementById('sector-heatmap');
  if (!container) return;

  container.innerHTML = appState.sectors.map(sector => `
    <div class="sector-cell" style="background: ${sector.color};" onclick="selectSector('${sector.name}')">
      <div class="sector-label">${sector.name}</div>
      <div class="sector-value">${sector.change > 0 ? '+' : ''}${sector.change.toFixed(1)}%</div>
    </div>
  `).join('');
}

// Update watchlist
function updateWatchlist() {
  const container = document.getElementById('watchlist-container');
  if (!container) return;

  container.innerHTML = appState.watchlist.map((stock, index) => `
    <div class="watchlist-row ${index === 0 ? 'selected' : ''}" onclick="selectSymbol('${stock.symbol}', this)">
      <div class="symbol-info">
        <div class="symbol-name">${stock.symbol}</div>
        <div class="symbol-desc">${stock.name}</div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div class="symbol-data">
          <div class="symbol-price">$${stock.price.toFixed(2)}</div>
          <div class="symbol-change ${getChangeClass(stock.change)}">
            ${stock.change > 0 ? '+' : ''}${stock.change.toFixed(2)}%
          </div>
        </div>
        <canvas class="symbol-sparkline" data-symbol="${stock.symbol}"></canvas>
      </div>
    </div>
  `).join('');

  // Draw sparklines
  setTimeout(() => {
    appState.watchlist.forEach(stock => {
      const canvas = document.querySelector(`[data-symbol="${stock.symbol}"]`);
      if (canvas) {
        drawSparkline(canvas, stock.spark, getChangeClass(stock.change));
      }
    });
  }, 100);
}

// Get CSS class for change direction
function getChangeClass(change) {
  if (Math.abs(change) < 0.1) return 'neutral';
  return change > 0 ? 'positive' : 'negative';
}

// Draw sparkline on canvas
function drawSparkline(canvas, data, trend = 'neutral') {
  if (!canvas || !data) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.offsetWidth * 2;
  const height = canvas.height = canvas.offsetHeight * 2;
  ctx.scale(2, 2);

  const w = width / 2;
  const h = height / 2;
  const padding = 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = trend === 'positive' ? '#16C784' : 
                   trend === 'negative' ? '#FF5D5D' : '#8A93A3';
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';

  if (Math.abs(max - min) < 0.1) {
    // Flat line for near-zero change
    ctx.setLineDash([2, 2]);
  } else {
    ctx.setLineDash([]);
  }

  ctx.beginPath();
  data.forEach((point, i) => {
    const x = (i / (data.length - 1)) * (w - padding * 2) + padding;
    const y = ((max - point) / range) * (h - padding * 2) + padding;
    
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

// Select symbol from watchlist
function selectSymbol(symbol, element) {
  appState.selectedSymbol = symbol;
  
  // Update selected state
  document.querySelectorAll('.watchlist-row').forEach(row => {
    row.classList.remove('selected');
  });
  if (element) {
    element.classList.add('selected');
  }

  // Update charts for selected symbol
  updateChartsForSymbol(symbol);
  
  // Trigger globe highlight
  if (typeof highlightGlobeArcs === 'function') {
    highlightGlobeArcs(symbol);
  }
}

// Select sector from heatmap
function selectSector(sectorName) {
  console.log(`Selected sector: ${sectorName}`);
  // Could trigger sector-specific globe highlights
}

// Update charts for selected symbol
function updateChartsForSymbol(symbol) {
  const data = appState.symbolData[symbol];
  if (!data) return;

  // Update RSI chart
  const rsiCanvas = document.getElementById('rsi-chart');
  if (rsiCanvas) {
    drawMiniChart(rsiCanvas, generateRSIData(), 'RSI');
  }

  // Update MACD chart
  const macdCanvas = document.getElementById('macd-chart');
  if (macdCanvas) {
    drawMiniChart(macdCanvas, generateMACDData(), 'MACD');
  }
}

// Draw mini chart
function drawMiniChart(canvas, data, type) {
  if (!canvas || !data) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.offsetWidth * 2;
  const height = canvas.height = canvas.offsetHeight * 2;
  ctx.scale(2, 2);

  const w = width / 2;
  const h = height / 2;
  const padding = 20;

  ctx.clearRect(0, 0, w, h);

  if (type === 'MACD') {
    // Draw MACD and signal lines
    drawLine(ctx, data.macd, w, h, padding, '#4DA3FF', 1);
    drawLine(ctx, data.signal, w, h, padding, '#F8B84E', 1);
  } else {
    // Draw single line for RSI
    drawLine(ctx, data, w, h, padding, '#16C784', 1.5);
  }
}

// Draw line on chart
function drawLine(ctx, data, width, height, padding, color, lineWidth) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();

  data.forEach((point, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y = ((max - point) / range) * (height - padding * 2) + padding;
    
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  
  ctx.stroke();
}

// Generate RSI data
function generateRSIData() {
  const data = [];
  let rsi = 50;
  for (let i = 0; i < 30; i++) {
    rsi += (Math.random() - 0.5) * 10;
    rsi = Math.max(0, Math.min(100, rsi));
    data.push(rsi);
  }
  return data;
}

// Generate MACD data
function generateMACDData() {
  const macd = [];
  const signal = [];
  let macdVal = 0;
  let signalVal = 0;

  for (let i = 0; i < 30; i++) {
    macdVal += (Math.random() - 0.5) * 0.5;
    signalVal += (Math.random() - 0.5) * 0.3;
    macd.push(macdVal);
    signal.push(signalVal);
  }

  return { macd, signal };
}

// Update all charts
function updateCharts() {
  if (appState.selectedSymbol) {
    updateChartsForSymbol(appState.selectedSymbol);
  }
}

// Initialize AI functionality
function initializeAI() {
  const input = document.getElementById('input');
  const sendBtn = document.getElementById('send');

  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }

  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // Initialize chips
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const question = chip.textContent;
      if (input) {
        input.value = question;
        sendMessage();
      }
    });
  });
}

// Send AI message
async function sendMessage() {
  const input = document.getElementById('input');
  const lastInsight = document.getElementById('last-insight');
  
  if (!input || !input.value.trim()) return;

  const message = input.value.trim();
  input.value = '';

  // Update last insight immediately with loading state
  if (lastInsight) {
    lastInsight.textContent = 'Analyzing market data...';
    lastInsight.style.opacity = '0.6';
  }

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message: message + getMarketContext()
      })
    });

    const data = await response.json();
    
    if (data.reply && lastInsight) {
      lastInsight.textContent = data.reply;
      lastInsight.style.opacity = '1';
      
      // Brief shimmer effect
      lastInsight.style.boxShadow = '0 0 0 1px var(--glow)';
      setTimeout(() => {
        lastInsight.style.boxShadow = 'none';
      }, 500);
    }
  } catch (error) {
    if (lastInsight) {
      lastInsight.textContent = 'Unable to connect to AI advisor. Please try again.';
      lastInsight.style.opacity = '1';
    }
  }
}

// Get market context for AI
function getMarketContext() {
  const gainers = appState.watchlist.filter(s => s.change > 0).length;
  const losers = appState.watchlist.filter(s => s.change < 0).length;
  const topSector = appState.sectors.reduce((a, b) => a.change > b.change ? a : b);
  
  return `\n\nMarket context: ${gainers} gainers, ${losers} losers. Top sector: ${topSector.name} ${topSector.change > 0 ? '+' : ''}${topSector.change.toFixed(1)}%. Selected: ${appState.selectedSymbol || 'None'}.`;
}

// Ask predefined question
function askQuestion(question) {
  const input = document.getElementById('input');
  if (input) {
    input.value = question;
    sendMessage();
  }
}

// Search functionality
function openSearch() {
  // Could implement search modal
  console.log('Search opened');
}

// Start periodic data updates
function startDataUpdates() {
  setInterval(() => {
    updateMarketData();
  }, 3000);
}

// Update market data
function updateMarketData() {
  // Update indices
  appState.indices.forEach(index => {
    const volatility = 0.01;
    const change = (Math.random() - 0.5) * volatility;
    index.value *= (1 + change);
    index.change += change * 100;
    
    // Add new point to spark data
    index.spark.push(index.value);
    if (index.spark.length > 60) {
      index.spark.shift();
    }
  });

  // Update all stocks (for ticker tape)
  const allStocks = appState.allStocks || appState.watchlist;
  allStocks.forEach(stock => {
    const volatility = 0.02;
    const change = (Math.random() - 0.5) * volatility;
    stock.price *= (1 + change);
    stock.change += change * 100;
    
    // Update spark data
    stock.spark.push(stock.price);
    if (stock.spark.length > 60) {
      stock.spark.shift();
    }
  });

  // Update UI
  updateIndexTiles();
  updateWatchlist();
  updateTickerTape();
}

// ============================================================================
// GLOBE IMPLEMENTATION (Background Layer)
// ============================================================================

var renderer, camera, scene, Globe;

function initializeGlobe() {
  setTimeout(() => {
    initGlobe();
  }, 500);
}

function initGlobe() {
  const container = document.getElementById('globe-canvas');
  const loadingDiv = document.getElementById('globe-loading');
  
  if (!container) return;

  // Initialize renderer (larger, positioned background layer)
  renderer = new THREE.WebGLRenderer({ canvas: container, antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(600, 600);
  renderer.setClearColor(0x0B0E14, 0);

  // Initialize scene
  scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  // Initialize camera
  camera = new THREE.PerspectiveCamera(50, 1, 1, 2000);
  camera.position.z = 250;

  // Add brighter lighting for better visibility
  const dLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dLight.position.set(-800, 2000, 400);
  camera.add(dLight);

  const dLight2 = new THREE.DirectionalLight(0x4DA3FF, 0.6);
  dLight2.position.set(200, -500, 200);
  camera.add(dLight2);

  scene.add(camera);

  // Initialize Globe with enhanced visuals
  if (typeof ThreeGlobe !== 'undefined') {
    Globe = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
    })
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
      .showAtmosphere(true)
      .atmosphereColor('#4DA3FF')
      .atmosphereAltitude(0.15);

    // Add dynamic financial arcs with proper animation
    setTimeout(() => {
      const arcs = generateFinancialArcs();
      Globe.arcsData(arcs)
        .arcColor((d) => {
          const colors = ['#00D4FF', '#16C784', '#F8B84E', '#FF5D5D'];
          return colors[Math.floor(Math.random() * colors.length)];
        })
        .arcAltitude((d) => 0.1 + Math.random() * 0.3)
        .arcStroke((d) => 0.3 + Math.random() * 0.3)
        .arcDashLength(0.4)
        .arcDashGap(2)
        .arcDashAnimateTime(2000)
        .arcsTransitionDuration(1000)
        .arcDashInitialGap((d, i) => i * 0.1);
    }, 1000);

    // Enhance globe material
    Globe.rotateY(-Math.PI * (5 / 9));
    Globe.rotateZ(-Math.PI / 6);
    
    scene.add(Globe);
  } else {
    // Simple fallback sphere
    const geometry = new THREE.SphereGeometry(80, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0x4DA3FF,
      transparent: true,
      opacity: 0.6
    });
    Globe = new THREE.Mesh(geometry, material);
    scene.add(Globe);
  }

  // Hide loading and show globe
  setTimeout(() => {
    if (loadingDiv) loadingDiv.style.display = 'none';
    container.style.display = 'block';
    animate();
  }, 1500);
}

// Generate financial arcs between major exchanges
function generateFinancialArcs() {
  const exchanges = [
    { lat: 40.7128, lng: -74.0060, name: 'NYSE' }, // New York
    { lat: 51.5074, lng: -0.1278, name: 'LSE' },   // London
    { lat: 35.6762, lng: 139.6503, name: 'TSE' },  // Tokyo
    { lat: 31.2304, lng: 121.4737, name: 'SSE' },  // Shanghai
    { lat: 19.0760, lng: 72.8777, name: 'BSE' },   // Mumbai
    { lat: 49.2827, lng: -123.1207, name: 'TSX' }, // Toronto
    { lat: 52.5200, lng: 13.4050, name: 'FRA' },   // Frankfurt
    { lat: -33.8688, lng: 151.2093, name: 'ASX' }, // Sydney
    { lat: 22.3193, lng: 114.1694, name: 'HKE' },  // Hong Kong
    { lat: -23.5505, lng: -46.6333, name: 'B3' }   // São Paulo
  ];

  const arcs = [];
  
  // Create more arcs with higher probability
  for (let i = 0; i < exchanges.length; i++) {
    for (let j = i + 1; j < exchanges.length; j++) {
      if (Math.random() > 0.4) { // 60% chance instead of 30%
        arcs.push({
          startLat: exchanges[i].lat,
          startLng: exchanges[i].lng,
          endLat: exchanges[j].lat,
          endLng: exchanges[j].lng,
          from: exchanges[i].name,
          to: exchanges[j].name
        });
      }
    }
  }
  
  return arcs;
}

// Add periodic arc updates for live feel
let currentArcs = [];

function addNewShootingArc() {
  if (!Globe || !Globe.arcsData || typeof ThreeGlobe === 'undefined') return;
  
  const exchanges = [
    { lat: 40.7128, lng: -74.0060, name: 'NYSE' },
    { lat: 51.5074, lng: -0.1278, name: 'LSE' },
    { lat: 35.6762, lng: 139.6503, name: 'TSE' },
    { lat: 31.2304, lng: 121.4737, name: 'SSE' },
    { lat: 19.0760, lng: 72.8777, name: 'BSE' },
    { lat: 49.2827, lng: -123.1207, name: 'TSX' },
    { lat: 52.5200, lng: 13.4050, name: 'FRA' },
    { lat: -33.8688, lng: 151.2093, name: 'ASX' },
    { lat: 22.3193, lng: 114.1694, name: 'HKE' },
    { lat: -23.5505, lng: -46.6333, name: 'B3' }
  ];
  
  // Pick two random exchanges
  const from = exchanges[Math.floor(Math.random() * exchanges.length)];
  const to = exchanges[Math.floor(Math.random() * exchanges.length)];
  
  if (from === to) return;
  
  const newArc = {
    startLat: from.lat,
    startLng: from.lng,
    endLat: to.lat,
    endLng: to.lng,
    from: from.name,
    to: to.name,
    id: Date.now() + Math.random()
  };
  
  // Add new arc
  currentArcs.push(newArc);
  
  // Keep only last 15 arcs to prevent too many
  if (currentArcs.length > 15) {
    currentArcs = currentArcs.slice(-15);
  }
  
  // Update globe with current arcs
  Globe.arcsData([...currentArcs])
    .arcColor((d) => {
      const colors = ['#00D4FF', '#16C784', '#F8B84E', '#FF5D5D'];
      return colors[Math.floor(Math.random() * colors.length)];
    })
    .arcAltitude((d) => 0.1 + Math.random() * 0.3)
    .arcStroke((d) => 0.2 + Math.random() * 0.4)
    .arcDashLength(0.3)
    .arcDashGap(1.5)
    .arcDashAnimateTime(2500)
    .arcsTransitionDuration(800)
    .arcDashInitialGap((d, i) => i * 0.05);
}

// Add new shooting arcs every 2-4 seconds
setInterval(() => {
  addNewShootingArc();
}, 2000 + Math.random() * 2000);

// Animation loop
function animate() {
  if (Globe && Globe.rotation) {
    Globe.rotation.y += 0.003; // Slow rotation
  }
  
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// Highlight globe arcs for symbol
function highlightGlobeArcs(symbol) {
  // Could implement arc highlighting based on symbol's exchange
  console.log(`Highlighting arcs for ${symbol}`);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    openSearch();
  }
});

// Initialize everything
setTimeout(() => {
  if (appState.watchlist.length > 0) {
    selectSymbol(appState.watchlist[0].symbol, document.querySelector('.watchlist-row'));
  }
}, 1500);
