#!/usr/bin/env node

// Temporary OAuth callback server on port 1455
// Matches the Codex CLI's registered redirect_uri with OpenAI's auth server.
// 
// Usage: node scripts/auth-helper.mjs <state> <mainAppPort>
// 
// Flow:
// 1. Starts HTTP server on 127.0.0.1:1455
// 2. Waits for OpenAI to redirect to /auth/callback?code=XXX&state=YYY
// 3. Validates state, then redirects browser to main app with the code
// 4. Shuts down after receiving the callback or after 5 minutes timeout

import http from 'node:http';

const [,, expectedState, mainAppPort = '3000'] = process.argv;

if (!expectedState) {
  console.error('Usage: node scripts/auth-helper.mjs <state> <mainAppPort>');
  process.exit(1);
}

const PORT = 1455;
const TIMEOUT = 5 * 60 * 1000; // 5 minutes

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  
  if (url.pathname === '/auth/callback') {
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    if (error) {
      const desc = url.searchParams.get('error_description') || error;
      res.writeHead(302, { 
        Location: `http://localhost:${mainAppPort}/?auth_error=${encodeURIComponent(desc)}` 
      });
      res.end();
      shutdown();
      return;
    }

    if (!code || state !== expectedState) {
      res.writeHead(302, { 
        Location: `http://localhost:${mainAppPort}/?auth_error=invalid_state_or_code` 
      });
      res.end();
      shutdown();
      return;
    }

    // Redirect to main app with the authorization code
    res.writeHead(302, { 
      Location: `http://localhost:${mainAppPort}/api/auth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}` 
    });
    res.end();
    shutdown();
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, '127.0.0.1', () => {
  // Signal to parent process that we're ready
  console.log(`AUTH_HELPER_READY`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`AUTH_HELPER_ERROR:Port ${PORT} is already in use`);
  } else {
    console.error(`AUTH_HELPER_ERROR:${err.message}`);
  }
  process.exit(1);
});

const timeout = setTimeout(() => {
  console.error('AUTH_HELPER_ERROR:Timeout - no callback received');
  shutdown();
}, TIMEOUT);

function shutdown() {
  clearTimeout(timeout);
  server.close(() => process.exit(0));
  // Force exit after 2s if server doesn't close
  setTimeout(() => process.exit(0), 2000);
}
