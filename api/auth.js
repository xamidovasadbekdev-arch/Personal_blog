// GET /api/auth — the sign-in window the CMS opens when you click "Sign In".
// It asks for email + password, gets a session from /api/login, and hands it
// to the CMS using the standard Decap/Sveltia popup handshake:
//   popup → CMS:  "authorizing:github"
//   CMS → popup:  "authorizing:github"   (confirms the CMS is listening)
//   popup → CMS:  "authorization:github:success:{"token":"…","provider":"github"}"
const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Sign in · xamidov.dev</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #14120f; color: #c4baa9;
         font: 15px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif; padding: 24px; }
  form { width: 100%; max-width: 340px; display: grid; gap: 14px; }
  h1 { margin: 0 0 4px; color: #f2ebdf; font-size: 22px; font-weight: 600; }
  p { margin: 0; font-size: 13px; color: #8b8272; }
  label { display: grid; gap: 6px; font-size: 13px; color: #f2ebdf; }
  input { width: 100%; padding: 11px 13px; border-radius: 10px; border: 1px solid rgba(240,228,206,.2);
          background: #1b1814; color: #f2ebdf; font: inherit; outline: none; }
  input:focus { border-color: #e4ac48; }
  button { margin-top: 6px; padding: 11px; border: 0; border-radius: 999px; background: #f2ebdf; color: #14120f;
           font: inherit; font-weight: 600; cursor: pointer; }
  button:disabled { opacity: .6; cursor: default; }
  .error { color: #f0a58a; min-height: 20px; font-size: 13px; }
  a { color: #e4ac48; }
</style>
</head>
<body>
<form id="form">
  <h1>Admin sign in</h1>
  <p>xamidov.dev</p>
  <label>Email <input name="email" type="email" autocomplete="username" required autofocus></label>
  <label>Password <input name="password" type="password" autocomplete="current-password" required></label>
  <div class="error" id="error" role="alert"></div>
  <button id="submit">Sign in</button>
  <p><a href="/admin/account" target="_blank" rel="noopener">Change or reset password</a></p>
</form>
<script>
  const form = document.getElementById('form');
  const errorBox = document.getElementById('error');
  const button = document.getElementById('submit');
  const provider = 'github';

  function handOver(token) {
    const message = 'authorization:' + provider + ':success:' + JSON.stringify({ token, provider });
    window.addEventListener('message', function onMessage(event) {
      if (event.origin !== location.origin || event.data !== 'authorizing:' + provider) return;
      window.removeEventListener('message', onMessage);
      window.opener.postMessage(message, event.origin);
    });
    window.opener.postMessage('authorizing:' + provider, location.origin);
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorBox.textContent = '';
    if (!window.opener) {
      errorBox.textContent = 'Open this from the admin page (/admin) and click Sign In.';
      return;
    }
    button.disabled = true;
    button.textContent = 'Signing in…';
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email.value, password: form.password.value }),
      });
      const result = await response.json();
      if (!response.ok || !result.token) throw new Error(result.error || 'Sign-in failed.');
      button.textContent = 'Opening admin…';
      handOver(result.token);
    } catch (error) {
      errorBox.textContent = error.message;
      button.disabled = false;
      button.textContent = 'Sign in';
    }
  });
</script>
</body>
</html>`;

export function GET() {
  return new Response(page, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'no-referrer',
    },
  });
}
