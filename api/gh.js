// /api/gh/* → GitHub API, for the CMS.
//
// The CMS sends our session token; this function checks it and forwards the
// request with the real GITHUB_TOKEN, which never leaves the server.
// vercel.json rewrites /api/gh/<path> to /api/gh?path=<path>.
//   <path> = api/v3/...  → https://api.github.com/...   (REST)
//   <path> = graphql     → https://api.github.com/graphql
import { json, verifySession } from './_lib.js';

const REPO = 'xamidovasadbekdev-arch/Personal_blog';
const PASS_THROUGH_HEADERS = ['content-type', 'etag', 'last-modified', 'link', 'x-ratelimit-remaining', 'x-ratelimit-reset'];

function targetUrl(requestUrl) {
  const url = new URL(requestUrl);
  const path = (url.searchParams.get('path') || '').replace(/^\/+/, '');
  url.searchParams.delete('path');
  const query = url.searchParams.toString();

  if (path === 'graphql') return 'https://api.github.com/graphql';

  const rest = path.replace(/^api\/v3\/?/, '');
  if (rest === path) return null;
  // Only the signed-in user and this one repository are reachable.
  const allowed =
    rest === 'user' || rest === `repos/${REPO}` || rest.startsWith(`repos/${REPO}/`);
  if (!allowed) return null;
  return `https://api.github.com/${rest}${query ? `?${query}` : ''}`;
}

async function proxy(request) {
  const auth = request.headers.get('authorization') || '';
  const session = auth.replace(/^(token|bearer)\s+/i, '');
  if (!(await verifySession(session))) {
    return json({ message: 'Bad credentials' }, 401);
  }

  const target = targetUrl(request.url);
  if (!target) return json({ message: 'Not Found' }, 404);

  const headers = {
    Accept: request.headers.get('accept') || 'application/vnd.github+json',
    'User-Agent': 'xamidovasadbek.dev-cms',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const contentType = request.headers.get('content-type');
  if (contentType) headers['Content-Type'] = contentType;

  const hasBody = !['GET', 'HEAD'].includes(request.method);
  const upstream = await fetch(target, {
    method: request.method,
    headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
  });

  const responseHeaders = new Headers({ 'Cache-Control': 'no-store' });
  for (const name of PASS_THROUGH_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }
  return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
