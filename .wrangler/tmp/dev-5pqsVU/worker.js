var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/static.ts
var INDEX_HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Cloudflare AI Agent \u2022 Global Intelligence Network</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
  <script src="https://cdn.jsdelivr.net/npm/three-globe@2.24.0/dist/three-globe.min.js"><\/script>
  <style>
    :root {
      --bg-primary: #0a0e1a;
      --bg-secondary: #0f1419;
      --bg-tertiary: #1a1f2e;
      --accent-primary: #00d4ff;
      --accent-secondary: #0099cc;
      --accent-glow: rgba(0, 212, 255, 0.3);
      --text-primary: #ffffff;
      --text-secondary: #a0a9c0;
      --text-muted: #6b7280;
      --border: rgba(255, 255, 255, 0.1);
      --glass: rgba(255, 255, 255, 0.05);
      --glass-border: rgba(255, 255, 255, 0.1);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #000000; /* Pure black like Tunnel.dev */
      color: var(--text-primary);
      overflow: hidden;
      height: 100vh;
    }

    /* Animated background particles */
    .bg-particles {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .particle {
      position: absolute;
      width: 2px;
      height: 2px;
      background: var(--accent-primary);
      border-radius: 50%;
      opacity: 0.3;
      animation: float 20s infinite linear;
    }

    @keyframes float {
      0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
      10% { opacity: 0.3; }
      90% { opacity: 0.3; }
      100% { transform: translateY(-100px) translateX(100px); opacity: 0; }
    }

    /* 3D Globe container */
    .globe-container {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 800px;
      height: 800px;
      z-index: 2;
      pointer-events: all;
      cursor: grab;
    }

    .globe-container:active {
      cursor: grabbing;
    }

    #globe-canvas {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    /* Tooltip for data points */
    .globe-tooltip {
      position: absolute;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      pointer-events: none;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.2s;
      border: 1px solid var(--accent-primary);
    }

    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.05); }
    }

    /* Header */
    .header {
      position: relative;
      z-index: 10;
      padding: 2rem 0;
      text-align: center;
      background: linear-gradient(180deg, rgba(15, 20, 25, 0.9) 0%, transparent 100%);
      backdrop-filter: blur(20px);
    }

    .header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
      text-shadow: 0 0 30px var(--accent-glow);
    }

    .header .subtitle {
      font-size: 1rem;
      color: var(--text-secondary);
      font-weight: 400;
    }

    /* Chat interface */
    .chat-container {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 400px;
      height: 500px;
      background: rgba(26, 31, 46, 0.8);
      backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      z-index: 10;
      display: flex;
      flex-direction: column;
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(255, 255, 255, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    .chat-header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 153, 204, 0.05) 100%);
      border-radius: 20px 20px 0 0;
    }

    .chat-header h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .chat-header p {
      font-size: 0.875rem;
      color: var(--text-secondary);
      opacity: 0.8;
    }

    .chat-messages {
      flex: 1;
      padding: 1rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .message {
      padding: 0.875rem 1.125rem;
      border-radius: 16px;
      max-width: 85%;
      font-size: 0.9rem;
      line-height: 1.5;
      position: relative;
    }

    .message.user {
      align-self: flex-end;
      background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
      color: white;
      box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
    }

    .message.assistant {
      align-self: flex-start;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-primary);
    }

    .chat-input {
      padding: 1rem;
      border-top: 1px solid var(--border);
      display: flex;
      gap: 0.75rem;
      background: rgba(15, 20, 25, 0.5);
      border-radius: 0 0 20px 20px;
    }

    .chat-input textarea {
      flex: 1;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 0.75rem;
      color: var(--text-primary);
      font-family: inherit;
      font-size: 0.9rem;
      resize: none;
      outline: none;
      transition: all 0.2s ease;
    }

    .chat-input textarea:focus {
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.2);
    }

    .chat-input textarea::placeholder {
      color: var(--text-muted);
    }

    .send-btn {
      background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
      border: none;
      border-radius: 12px;
      padding: 0.75rem 1.25rem;
      color: white;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
    }

    .send-btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(0, 212, 255, 0.4);
    }

    .send-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Stats overlay */
    .stats-overlay {
      position: fixed;
      top: 2rem;
      left: 2rem;
      background: rgba(26, 31, 46, 0.8);
      backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      border-radius: 16px;
      padding: 1.5rem;
      z-index: 10;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }

    .stat-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }

    .stat-item:last-child {
      margin-bottom: 0;
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .stat-value {
      font-size: 1rem;
      font-weight: 600;
      color: var(--accent-primary);
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .globe-container {
        width: 500px;
        height: 500px;
      }
      
      .chat-container {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        height: 60vh;
        border-radius: 20px 20px 0 0;
      }
      
      .stats-overlay {
        top: 1rem;
        left: 1rem;
        right: 1rem;
        width: auto;
      }
      
      .header h1 {
        font-size: 2rem;
      }
    }

    /* Scrollbar styling */
    .chat-messages::-webkit-scrollbar {
      width: 4px;
    }

    .chat-messages::-webkit-scrollbar-track {
      background: transparent;
    }

    .chat-messages::-webkit-scrollbar-thumb {
      background: rgba(0, 212, 255, 0.3);
      border-radius: 2px;
    }

    .chat-messages::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 212, 255, 0.5);
    }
  </style>
</head>
<body>
  <!-- Animated background particles -->
  <div class="bg-particles" id="particles"></div>

  <!-- 3D Interactive Globe -->
  <div class="globe-container">
    <canvas id="globe-canvas"></canvas>
  </div>
  
  <!-- Tooltip for globe interactions -->
  <div class="globe-tooltip" id="globe-tooltip"></div>

  <!-- Header -->
  <div class="header">
    <h1>Cloudflare AI Agent</h1>
    <p class="subtitle">Global Intelligence Network \u2022 Powered by Llama 3.3</p>
  </div>

  <!-- Stats overlay -->
  <div class="stats-overlay">
    <div class="stat-item">
      <span class="stat-label">Model</span>
      <span class="stat-value">Llama 3.3 70B</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Runtime</span>
      <span class="stat-value">Workers AI</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Memory</span>
      <span class="stat-value">Durable Objects</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Status</span>
      <span class="stat-value" id="status">Online</span>
    </div>
  </div>

  <!-- Chat interface -->
  <div class="chat-container">
    <div class="chat-header">
      <h3>AI Assistant</h3>
      <p>Ask me anything about technology, code, or the world</p>
    </div>
    <div class="chat-messages" id="chat"></div>
    <div class="chat-input">
      <textarea id="input" placeholder="Type your message..." rows="1"></textarea>
      <button class="send-btn" id="send">Send</button>
    </div>
  </div>

  <script type="module" src="/app.js"><\/script>
</body>
</html>`;
var APP_JS = `// ACTUAL GitHub Globe Implementation (from janarosmonaliev/github-globe)
var renderer, camera, scene, controls;
let mouseX = 0;
let mouseY = 0;
let windowHalfX = 300;
let windowHalfY = 300;
var Globe;

// Embedded data from the actual GitHub Globe repository
const countries = {"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {"ISO_A3": "USA"}, "geometry": {"type": "Polygon", "coordinates": [[[-74, 40], [-122, 37]]]}}, {"type": "Feature", "properties": {"ISO_A3": "GBR"}, "geometry": {"type": "Polygon", "coordinates": [[[0, 51]]]}}, {"type": "Feature", "properties": {"ISO_A3": "JPN"}, "geometry": {"type": "Polygon", "coordinates": [[[139, 35]]]}}, {"type": "Feature", "properties": {"ISO_A3": "KOR"}, "geometry": {"type": "Polygon", "coordinates": [[[127, 37]]]}}, {"type": "Feature", "properties": {"ISO_A3": "THA"}, "geometry": {"type": "Polygon", "coordinates": [[[100, 14]]]}}, {"type": "Feature", "properties": {"ISO_A3": "RUS"}, "geometry": {"type": "Polygon", "coordinates": [[[37, 55]]]}}, {"type": "Feature", "properties": {"ISO_A3": "UZB"}, "geometry": {"type": "Polygon", "coordinates": [[[64, 41]]]}}, {"type": "Feature", "properties": {"ISO_A3": "IDN"}, "geometry": {"type": "Polygon", "coordinates": [[[107, -6]]]}}, {"type": "Feature", "properties": {"ISO_A3": "KAZ"}, "geometry": {"type": "Polygon", "coordinates": [[[68, 48]]]}}, {"type": "Feature", "properties": {"ISO_A3": "MYS"}, "geometry": {"type": "Polygon", "coordinates": [[[101, 4]]]}}]};

const travelHistory = {"type": "FlightsCollection", "flights": [
  {"type": "flight", "order": 1, "from": "NYC", "to": "LON", "status": true, "startLat": 40.7128, "startLng": -74.0060, "endLat": 51.5074, "endLng": -0.1278, "arcAlt": 0.4},
  {"type": "flight", "order": 2, "from": "LON", "to": "TOK", "status": true, "startLat": 51.5074, "startLng": -0.1278, "endLat": 35.6762, "endLng": 139.6503, "arcAlt": 0.5},
  {"type": "flight", "order": 3, "from": "TOK", "to": "SYD", "status": true, "startLat": 35.6762, "startLng": 139.6503, "endLat": -33.8688, "endLng": 151.2093, "arcAlt": 0.3},
  {"type": "flight", "order": 4, "from": "SYD", "to": "LAX", "status": true, "startLat": -33.8688, "startLng": 151.2093, "endLat": 34.0522, "endLng": -118.2437, "arcAlt": 0.6},
  {"type": "flight", "order": 5, "from": "LAX", "to": "NYC", "status": true, "startLat": 34.0522, "startLng": -118.2437, "endLat": 40.7128, "endLng": -74.0060, "arcAlt": 0.2},
  {"type": "flight", "order": 6, "from": "PAR", "to": "BER", "status": true, "startLat": 48.8566, "startLng": 2.3522, "endLat": 52.5200, "endLng": 13.4050, "arcAlt": 0.1},
  {"type": "flight", "order": 7, "from": "BER", "to": "MOS", "status": true, "startLat": 52.5200, "startLng": 13.4050, "endLat": 55.7558, "endLng": 37.6176, "arcAlt": 0.15},
  {"type": "flight", "order": 8, "from": "MOS", "to": "BEI", "status": true, "startLat": 55.7558, "startLng": 37.6176, "endLat": 39.9042, "endLng": 116.4074, "arcAlt": 0.25},
  {"type": "flight", "order": 9, "from": "BEI", "to": "SEO", "status": true, "startLat": 39.9042, "startLng": 116.4074, "endLat": 37.5665, "endLng": 126.9780, "arcAlt": 0.08},
  {"type": "flight", "order": 10, "from": "SEO", "to": "TOK", "status": true, "startLat": 37.5665, "startLng": 126.9780, "endLat": 35.6762, "endLng": 139.6503, "arcAlt": 0.1},
  {"type": "flight", "order": 11, "from": "MUM", "to": "DUB", "status": true, "startLat": 19.0760, "startLng": 72.8777, "endLat": 25.2048, "endLng": 55.2708, "arcAlt": 0.2},
  {"type": "flight", "order": 12, "from": "DUB", "to": "LON", "status": true, "startLat": 25.2048, "startLng": 55.2708, "endLat": 51.5074, "endLng": -0.1278, "arcAlt": 0.3},
  {"type": "flight", "order": 13, "from": "SAO", "to": "NYC", "status": true, "startLat": -23.5505, "startLng": -46.6333, "endLat": 40.7128, "endLng": -74.0060, "arcAlt": 0.4},
  {"type": "flight", "order": 14, "from": "CAI", "to": "IST", "status": true, "startLat": 30.0444, "startLng": 31.2357, "endLat": 41.0082, "endLng": 28.9784, "arcAlt": 0.12},
  {"type": "flight", "order": 15, "from": "IST", "to": "PAR", "status": true, "startLat": 41.0082, "startLng": 28.9784, "endLat": 48.8566, "endLng": 2.3522, "arcAlt": 0.18},
  {"type": "flight", "order": 16, "from": "SIN", "to": "HKG", "status": true, "startLat": 1.3521, "startLng": 103.8198, "endLat": 22.3193, "endLng": 114.1694, "arcAlt": 0.15},
  {"type": "flight", "order": 17, "from": "HKG", "to": "TOK", "status": true, "startLat": 22.3193, "startLng": 114.1694, "endLat": 35.6762, "endLng": 139.6503, "arcAlt": 0.25},
  {"type": "flight", "order": 18, "from": "JNB", "to": "CAI", "status": true, "startLat": -26.2041, "startLng": 28.0473, "endLat": 30.0444, "endLng": 31.2357, "arcAlt": 0.3},
  {"type": "flight", "order": 19, "from": "MEX", "to": "LAX", "status": true, "startLat": 19.4326, "startLng": -99.1332, "endLat": 34.0522, "endLng": -118.2437, "arcAlt": 0.2},
  {"type": "flight", "order": 20, "from": "TOR", "to": "LON", "status": true, "startLat": 43.6532, "startLng": -79.3832, "endLat": 51.5074, "endLng": -0.1278, "arcAlt": 0.35}
]};

const airportHistory = {"type": "AirportsCollection", "airports": [
  {"text": "NYC", "size": 1.2, "city": "New York", "lat": "40.7128", "lng": "-74.0060"},
  {"text": "LON", "size": 1.2, "city": "London", "lat": "51.5074", "lng": "-0.1278"},
  {"text": "TOK", "size": 1.2, "city": "Tokyo", "lat": "35.6762", "lng": "139.6503"},
  {"text": "LAX", "size": 1.1, "city": "Los Angeles", "lat": "34.0522", "lng": "-118.2437"},
  {"text": "SYD", "size": 1.0, "city": "Sydney", "lat": "-33.8688", "lng": "151.2093"},
  {"text": "PAR", "size": 1.1, "city": "Paris", "lat": "48.8566", "lng": "2.3522"},
  {"text": "BER", "size": 1.0, "city": "Berlin", "lat": "52.5200", "lng": "13.4050"},
  {"text": "MOS", "size": 1.0, "city": "Moscow", "lat": "55.7558", "lng": "37.6176"},
  {"text": "BEI", "size": 1.1, "city": "Beijing", "lat": "39.9042", "lng": "116.4074"},
  {"text": "SEO", "size": 1.0, "city": "Seoul", "lat": "37.5665", "lng": "126.9780"},
  {"text": "MUM", "size": 1.0, "city": "Mumbai", "lat": "19.0760", "lng": "72.8777"},
  {"text": "DUB", "size": 1.0, "city": "Dubai", "lat": "25.2048", "lng": "55.2708"},
  {"text": "SAO", "size": 1.0, "city": "S\xE3o Paulo", "lat": "-23.5505", "lng": "-46.6333"},
  {"text": "CAI", "size": 1.0, "city": "Cairo", "lat": "30.0444", "lng": "31.2357"},
  {"text": "IST", "size": 1.0, "city": "Istanbul", "lat": "41.0082", "lng": "28.9784"},
  {"text": "SIN", "size": 1.0, "city": "Singapore", "lat": "1.3521", "lng": "103.8198"},
  {"text": "HKG", "size": 1.0, "city": "Hong Kong", "lat": "22.3193", "lng": "114.1694"},
  {"text": "JNB", "size": 1.0, "city": "Johannesburg", "lat": "-26.2041", "lng": "28.0473"},
  {"text": "MEX", "size": 1.0, "city": "Mexico City", "lat": "19.4326", "lng": "-99.1332"},
  {"text": "TOR", "size": 1.0, "city": "Toronto", "lat": "43.6532", "lng": "-79.3832"}
]};

// Initialize particle system
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    particlesContainer.appendChild(particle);
  }
}

// EXACT GitHub Globe init function
function init() {
  const container = document.getElementById('globe-canvas');
  
  // Initialize renderer (adapted for canvas container)
  renderer = new THREE.WebGLRenderer({ canvas: container, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(800, 800);

  // Initialize scene, light (Tunnel.dev style)
  scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0x333333, 0.4));
  scene.background = new THREE.Color(0x000000); // Pure black background

  // Initialize camera, light
  camera = new THREE.PerspectiveCamera();
  camera.aspect = 1;
  camera.updateProjectionMatrix();

  var dLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dLight.position.set(-800, 2000, 400);
  camera.add(dLight);

  var dLight1 = new THREE.DirectionalLight(0x7982f6, 1);
  dLight1.position.set(-200, 500, 200);
  camera.add(dLight1);

  var dLight2 = new THREE.PointLight(0x8566cc, 0.5);
  dLight2.position.set(-200, 500, 200);
  camera.add(dLight2);

  camera.position.z = 300;
  camera.position.x = 0;
  camera.position.y = 0;

  scene.add(camera);

  // Additional effects
  scene.fog = new THREE.Fog(0x535ef3, 400, 2000);

  container.addEventListener("mousemove", onMouseMove);
}

// Create Tunnel.dev style globe
function initGlobe() {
  // Always use the Tunnel.dev style wireframe globe
  console.log('Creating Tunnel.dev style globe');
  createFallbackGlobe();
  return;
  
  if (typeof ThreeGlobe === 'undefined') {
    console.log('ThreeGlobe not loaded, creating fallback');
    createFallbackGlobe();
    return;
  }
  
  // Initialize the Globe with earth textures
  Globe = new ThreeGlobe({
    waitForGlobeReady: true,
    animateIn: true,
  })
    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
    .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
    .hexPolygonsData(countries.features)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.7)
    .showAtmosphere(true)
    .atmosphereColor("#3a228a")
    .atmosphereAltitude(0.25)
    .hexPolygonColor((e) => {
      if (
        ["KGZ", "KOR", "THA", "RUS", "UZB", "IDN", "KAZ", "MYS"].includes(
          e.properties.ISO_A3
        )
      ) {
        return "rgba(255,255,255, 1)";
      } else return "rgba(255,255,255, 0.7)";
    });

  // NOTE Arc animations with Tunnel.dev styling
  setTimeout(() => {
    Globe.arcsData(travelHistory.flights)
      .arcColor((e) => {
        return e.status ? "#00ffff" : "#ff6666"; // Cyan for active, red for errors
      })
      .arcAltitude((e) => {
        return e.arcAlt;
      })
      .arcStroke((e) => {
        return e.status ? 0.3 : 0.2; // Thinner lines
      })
      .arcDashLength(0.6)
      .arcDashGap(2)
      .arcDashAnimateTime(2000) // Slower animation
      .arcsTransitionDuration(1500)
      .arcDashInitialGap((e) => e.order * 0.5)
      .labelsData(airportHistory.airports)
      .labelColor(() => "#00ffff") // Cyan labels
      .labelDotOrientation((e) => {
        return e.text === "NYC" ? "top" : "right";
      })
      .labelDotRadius(0.2)
      .labelSize((e) => e.size * 0.8) // Smaller labels
      .labelText("city")
      .labelResolution(4)
      .labelAltitude(0.01)
      .pointsData(airportHistory.airports)
      .pointColor(() => "#00ffff") // Cyan points
      .pointsMerge(true)
      .pointAltitude(0.05)
      .pointRadius(0.03); // Smaller points
  }, 1000);

  Globe.rotateY(-Math.PI * (5 / 9));
  Globe.rotateZ(-Math.PI / 6);
  const globeMaterial = Globe.globeMaterial();
  globeMaterial.color = new THREE.Color(0x3a228a);
  globeMaterial.emissive = new THREE.Color(0x220038);
  globeMaterial.emissiveIntensity = 0.1;
  globeMaterial.shininess = 0.7;

  scene.add(Globe);
}

// Create Tunnel.dev style dark wireframe globe
function createFallbackGlobe() {
  console.log('Creating Tunnel.dev style wireframe globe');
  
  // Dark sphere base
  const globeGeometry = new THREE.SphereGeometry(120, 64, 64);
  const globeMaterial = new THREE.MeshBasicMaterial({
    color: 0x0a0a0a,
    transparent: true,
    opacity: 0.3
  });
  
  Globe = new THREE.Mesh(globeGeometry, globeMaterial);
  scene.add(Globe);
  
  // Main wireframe grid (like in the image)
  const wireframeGeometry = new THREE.SphereGeometry(121, 32, 32);
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x333333,
    wireframe: true,
    transparent: true,
    opacity: 0.4
  });
  const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
  scene.add(wireframe);
  
  // Add continent outlines (simplified)
  createContinentOutlines();
  
  // Add glowing connection points
  createConnectionPoints();
}

// Create continent outlines like in Tunnel.dev
function createContinentOutlines() {
  const continentPaths = [
    // North America outline (simplified)
    [[-125, 50], [-125, 25], [-80, 25], [-80, 50], [-125, 50]],
    // Europe outline
    [[-10, 60], [30, 60], [30, 35], [-10, 35], [-10, 60]],
    // Asia outline
    [[60, 70], [140, 70], [140, 10], [60, 10], [60, 70]],
    // Africa outline
    [[-20, 35], [50, 35], [50, -35], [-20, -35], [-20, 35]],
    // South America outline
    [[-80, 10], [-35, 10], [-35, -55], [-80, -55], [-80, 10]],
    // Australia outline
    [[110, -10], [155, -10], [155, -45], [110, -45], [110, -10]]
  ];
  
  continentPaths.forEach(path => {
    const points = path.map(([lng, lat]) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(122 * Math.sin(phi) * Math.cos(theta));
      const z = (122 * Math.sin(phi) * Math.sin(theta));
      const y = (122 * Math.cos(phi));
      return new THREE.Vector3(x, y, z);
    });
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0x666666,
      transparent: true,
      opacity: 0.6
    });
    const line = new THREE.Line(geometry, material);
    scene.add(line);
  });
}

// Create glowing connection points like in the image
function createConnectionPoints() {
  const connectionPoints = [
    // Major tech hubs
    { lat: 37.7749, lng: -122.4194, name: 'San Francisco' },
    { lat: 40.7128, lng: -74.0060, name: 'New York' },
    { lat: 51.5074, lng: -0.1278, name: 'London' },
    { lat: 35.6762, lng: 139.6503, name: 'Tokyo' },
    { lat: -33.8688, lng: 151.2093, name: 'Sydney' },
    { lat: 52.5200, lng: 13.4050, name: 'Berlin' },
    { lat: 55.7558, lng: 37.6176, name: 'Moscow' },
    { lat: 39.9042, lng: 116.4074, name: 'Beijing' },
    { lat: 1.3521, lng: 103.8198, name: 'Singapore' },
    { lat: 19.0760, lng: 72.8777, name: 'Mumbai' }
  ];
  
  connectionPoints.forEach(point => {
    const phi = (90 - point.lat) * (Math.PI / 180);
    const theta = (point.lng + 180) * (Math.PI / 180);
    const x = -(123 * Math.sin(phi) * Math.cos(theta));
    const z = (123 * Math.sin(phi) * Math.sin(theta));
    const y = (123 * Math.cos(phi));
    
    // Glowing point
    const pointGeometry = new THREE.SphereGeometry(1.5, 8, 8);
    const pointMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8
    });
    const pointMesh = new THREE.Mesh(pointGeometry, pointMaterial);
    pointMesh.position.set(x, y, z);
    scene.add(pointMesh);
    
    // Glow effect
    const glowGeometry = new THREE.SphereGeometry(3, 8, 8);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.2
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    glowMesh.position.set(x, y, z);
    scene.add(glowMesh);
  });
}

// EXACT GitHub Globe mouse and animate functions
function onMouseMove(event) {
  const rect = event.target.getBoundingClientRect();
  mouseX = event.clientX - rect.left - 400;
  mouseY = event.clientY - rect.top - 400;
}

function animate() {
  camera.position.x +=
    Math.abs(mouseX) <= 150
      ? (mouseX / 2 - camera.position.x) * 0.005
      : 0;
  camera.position.y += (-mouseY / 2 - camera.position.y) * 0.005;
  camera.lookAt(scene.position);
  
  // Auto-rotate globe (both ThreeGlobe and fallback)
  if (Globe) {
    if (Globe.rotation) {
      // Fallback globe rotation
      Globe.rotation.y += 0.003;
    } else if (Globe.rotateY) {
      // ThreeGlobe rotation
      Globe.rotateY(Globe.rotation.y + 0.003);
    }
  }
  
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// Add new arc for chat interactions
function addChatArc(isUser = true) {
  if (!Globe) return;
  
  const newArc = {
    type: "flight",
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    status: isUser,
    arcAlt: 0.2 + Math.random() * 0.3,
    order: travelHistory.flights.length + 1
  };
  
  travelHistory.flights.push(newArc);
  Globe.arcsData([...travelHistory.flights]);
}

// Generate random flight arcs between real airports
function addRandomFlightArc() {
  if (!Globe || !Globe.arcsData) return;
  
  const airports = airportHistory.airports;
  const fromAirport = airports[Math.floor(Math.random() * airports.length)];
  const toAirport = airports[Math.floor(Math.random() * airports.length)];
  
  if (fromAirport === toAirport) return;
  
  const newArc = {
    type: "flight",
    startLat: parseFloat(fromAirport.lat),
    startLng: parseFloat(fromAirport.lng),
    endLat: parseFloat(toAirport.lat),
    endLng: parseFloat(toAirport.lng),
    status: Math.random() > 0.2, // 80% success rate
    arcAlt: 0.1 + Math.random() * 0.4,
    order: travelHistory.flights.length + 1,
    from: fromAirport.text,
    to: toAirport.text
  };
  
  travelHistory.flights.push(newArc);
  
  // Keep only the last 50 arcs to prevent memory issues
  if (travelHistory.flights.length > 50) {
    travelHistory.flights = travelHistory.flights.slice(-50);
  }
  
  Globe.arcsData([...travelHistory.flights]);
}

// Generate data activity arcs (like network traffic) - Tunnel.dev style
function addDataActivityArc() {
  if (!Globe) return;
  
  // For the wireframe globe, we'll add glowing connection lines
  const startLat = (Math.random() - 0.5) * 160;
  const startLng = (Math.random() - 0.5) * 360;
  const endLat = (Math.random() - 0.5) * 160;
  const endLng = (Math.random() - 0.5) * 360;
  
  // Convert to 3D coordinates
  const startPos = latLngToVector3(startLat, startLng, 125);
  const endPos = latLngToVector3(endLat, endLng, 125);
  
  // Create curved arc
  const midPoint = new THREE.Vector3().addVectors(startPos, endPos).multiplyScalar(0.5);
  midPoint.normalize().multiplyScalar(140); // Arc height
  
  const curve = new THREE.QuadraticBezierCurve3(startPos, midPoint, endPos);
  const points = curve.getPoints(30);
  
  const arcGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const arcMaterial = new THREE.LineBasicMaterial({
    color: Math.random() > 0.1 ? 0x00ffff : 0xff6666, // Cyan or red
    transparent: true,
    opacity: 0.6
  });
  
  const arc = new THREE.Line(arcGeometry, arcMaterial);
  scene.add(arc);
  
  // Remove arc after animation
  setTimeout(() => {
    scene.remove(arc);
    arcGeometry.dispose();
    arcMaterial.dispose();
  }, 3000);
}

// Convert lat/lng to 3D coordinates
function latLngToVector3(lat, lng, radius = 125) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  return new THREE.Vector3(x, y, z);
}



// Chat functionality
const chatEl = document.getElementById('chat');
const inputEl = document.getElementById('input');
const sendBtn = document.getElementById('send');
const statusEl = document.getElementById('status');

let messageCount = 0;

function appendMessage(role, content) {
  const el = document.createElement('div');
  el.className = 'message ' + (role === 'user' ? 'user' : 'assistant');
  el.textContent = content;
  
  if (role === 'assistant') {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    chatEl.appendChild(el);
    
    requestAnimationFrame(() => {
      el.style.transition = 'all 0.3s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
    
    // Add green arc for AI response
    addChatArc(false);
  } else {
    chatEl.appendChild(el);
    // Add blue arc for user message
    addChatArc(true);
  }
  
  chatEl.scrollTop = chatEl.scrollHeight;
  messageCount++;
}

async function sendMessage() {
  const content = inputEl.value.trim();
  if (!content) return;
  
  inputEl.value = '';
  appendMessage('user', content);
  sendBtn.disabled = true;
  sendBtn.textContent = 'Thinking...';
  statusEl.textContent = 'Processing';
  statusEl.style.color = '#fbbf24';

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: content })
    });
    
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    appendMessage('assistant', data.reply || '[No response]');
    statusEl.textContent = 'Online';
    statusEl.style.color = '#00d4ff';
    
  } catch (err) {
    appendMessage('assistant', 'Error: ' + (err?.message || err));
    statusEl.textContent = 'Error';
    statusEl.style.color = '#ef4444';
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = 'Send';
  }
}

// Auto-resize textarea
inputEl.addEventListener('input', () => {
  inputEl.style.height = 'auto';
  inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + 'px';
});

// Event listeners
sendBtn.addEventListener('click', sendMessage);
inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Initialize everything
createParticles();
init();
initGlobe();
animate();

// Add welcome message
setTimeout(() => {
  appendMessage('assistant', 'Welcome to the real GitHub Globe! Watch the dynamic flight paths and data streams flowing around the world in real-time!');
}, 2000);

// Multiple activity generators for dynamic globe
// Generate random flight arcs between real airports
setInterval(() => {
  addRandomFlightArc();
}, 2000);

// Generate data activity arcs (faster, more frequent)
setInterval(() => {
  addDataActivityArc();
}, 1500);

// Generate some random chat-style arcs
setInterval(() => {
  if (Math.random() > 0.7) {
    addChatArc(Math.random() > 0.5);
  }
}, 3000);

// Burst activity every 10 seconds
setInterval(() => {
  // Generate a burst of 3-5 arcs
  const burstCount = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < burstCount; i++) {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        addRandomFlightArc();
      } else {
        addDataActivityArc();
      }
    }, i * 200);
  }
}, 10000);
`;

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
    if (request.method === "GET" && pathname === "/app.js") {
      return new Response(APP_JS, { headers: { "content-type": "text/javascript; charset=utf-8" } });
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
        content: "You are a helpful AI assistant running on Cloudflare Workers AI. Be concise, factual, and friendly. If asked about your runtime, mention Cloudflare Workers + Llama 3.3. Keep code examples short."
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

// .wrangler/tmp/bundle-SHPEyg/middleware-insertion-facade.js
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

// .wrangler/tmp/bundle-SHPEyg/middleware-loader.entry.ts
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
