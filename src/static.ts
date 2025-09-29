export const INDEX_HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Cloudflare AI Chat (Llama 3.3 + Durable Object Memory)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    :root { --bg: #0b0f17; --panel:#101826; --text:#e6eefc; --muted:#93a4c4; --accent:#7c9cff; --border:#1b2a44; }
    * { box-sizing: border-box; }
    body { margin:0; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Apple Color Emoji", "Segoe UI Emoji"; background:linear-gradient(180deg, #0b0f17, #0b0f17 60%, #0e1420); color:var(--text); }
    header { padding: 24px; border-bottom: 1px solid var(--border); background: rgba(16, 24, 38, 0.8); position: sticky; top:0; backdrop-filter: blur(6px); }
    .container { max-width: 900px; margin: 0 auto; padding: 16px; }
    h1 { margin:0; font-size: 20px; letter-spacing: 0.2px; }
    .badge { font-size: 12px; color: var(--muted); margin-top: 4px; }

    .chat { display:flex; flex-direction:column; gap:12px; margin-top: 16px; }
    .message { padding: 12px 14px; border: 1px solid var(--border); border-radius: 12px; max-width: 80%; line-height: 1.4; white-space: pre-wrap; }
    .user { align-self:flex-end; background: #14213a; border-color:#203056; }
    .assistant { align-self:flex-start; background: #0f1725; border-color:#1b2a44; }

    .input-row { position: sticky; bottom: 0; background: rgba(11, 15, 23, 0.9); backdrop-filter: blur(6px); padding: 12px 16px; border-top: 1px solid var(--border); display:flex; gap: 10px; }
    textarea { flex:1; resize: vertical; min-height: 48px; max-height: 180px; border-radius: 12px; border:1px solid var(--border); background: #0f1624; color: var(--text); padding: 12px; outline:none; }
    button { background: var(--accent); color:#0b0f17; border: none; border-radius: 10px; padding: 12px 16px; font-weight: 700; cursor: pointer; }
    button:disabled { opacity: .6; cursor:not-allowed; }

    .footer { text-align:center; color: var(--muted); font-size: 12px; padding: 16px; }
    a { color: var(--accent); text-decoration: none; }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <h1>Cloudflare AI Chat</h1>
      <div class="badge">Workers AI (Llama 3.3) • Durable Object Memory • Workers Orchestration</div>
    </div>
  </header>

  <main class="container">
    <div id="chat" class="chat"></div>
  </main>

  <div class="input-row">
    <div class="container" style="display:flex; gap:10px;">
      <textarea id="input" placeholder="Ask something… (Shift+Enter for newline)"></textarea>
      <button id="send">Send</button>
    </div>
  </div>

  <div class="footer">Built for the Cloudflare AI optional assignment. <a href="https://developers.cloudflare.com/workers-ai/" target="_blank">Docs</a></div>

  <script type="module">${`\n${""}`}</script>
  <script type="module" src="/app.js"></script>
</body>
</html>`;

export const APP_JS = `const chatEl = document.getElementById('chat');
const inputEl = document.getElementById('input');
const sendBtn = document.getElementById('send');

function appendMessage(role, content) {
  const el = document.createElement('div');
  el.className = 'message ' + (role === 'user' ? 'user' : 'assistant');
  el.textContent = content;
  chatEl.appendChild(el);
  chatEl.scrollTop = chatEl.scrollHeight;
}

async function sendMessage() {
  const content = inputEl.value.trim();
  if (!content) return;
  inputEl.value = '';
  appendMessage('user', content);
  sendBtn.disabled = true;

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: content })
    });
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    appendMessage('assistant', data.reply || '[No response]');
  } catch (err) {
    appendMessage('assistant', 'Error: ' + (err?.message || err));
  } finally {
    sendBtn.disabled = false;
  }
}

sendBtn.addEventListener('click', sendMessage);
inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
`;
