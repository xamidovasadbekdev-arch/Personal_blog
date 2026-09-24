// Shared helpers for the admin login functions. Files starting with "_" in
// api/ are not exposed as routes by Vercel.
//
// Environment variables (set in Vercel → Project → Settings → Environment Variables):
//   GITHUB_TOKEN        GitHub token that can write to the repo. Never sent to the browser.
//   ADMIN_EMAIL         The only email allowed to sign in.
//   ADMIN_SETUP_CODE    Recovery code for setting the first password or resetting a forgotten one.
//   KV_REST_API_URL / KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL / _TOKEN)
//                       Added automatically by the Upstash integration.
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { Redis } from '@upstash/redis';

export const ADMIN_KEY = 'admin';
const SESSION_HOURS = 12;
const MAX_FAILS_PER_IP = 5;
const MAX_FAILS_TOTAL = 30;
const LOCK_SECONDS = 15 * 60;

let redisClient;
export function redis() {
  // Tests inject an in-memory stand-in through globalThis.__adminRedis.
  if (globalThis.__adminRedis) return globalThis.__adminRedis;
  redisClient ??= new Redis({
    url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  return redisClient;
}

export const adminEmail = () => (process.env.ADMIN_EMAIL || '').trim().toLowerCase();

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

export function safeEqual(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}

export const clientIp = request =>
  (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';

// Failed-attempt limiter: 5 wrong tries per IP, or 30 overall, locks for 15 minutes.
export async function isLocked(ip) {
  const [perIp, total] = await Promise.all([
    redis().get(`${ADMIN_KEY}:fail:${ip}`),
    redis().get(`${ADMIN_KEY}:fail:all`),
  ]);
  return Number(perIp) >= MAX_FAILS_PER_IP || Number(total) >= MAX_FAILS_TOTAL;
}

export async function recordFailure(ip) {
  for (const key of [`${ADMIN_KEY}:fail:${ip}`, `${ADMIN_KEY}:fail:all`]) {
    const count = await redis().incr(key);
    if (count === 1) await redis().expire(key, LOCK_SECONDS);
  }
}

export const clearFailures = ip => redis().del(`${ADMIN_KEY}:fail:${ip}`);

// Stored account: { hash, secret, version }. `secret` signs session tokens and
// `version` changes on every password change, which signs out old sessions.
export async function getAccount() {
  const account = await redis().hgetall(ADMIN_KEY);
  return account && account.hash ? account : null;
}

export async function saveAccount(hash) {
  const previous = await getAccount();
  await redis().hset(ADMIN_KEY, {
    hash,
    // Prefixed so the Upstash client never auto-parses it as a number.
    secret: `s_${randomBytes(32).toString('hex')}`,
    version: String(Number(previous?.version || 0) + 1),
  });
}

const b64url = value => Buffer.from(value).toString('base64url');

export function createSession(account) {
  const payload = b64url(JSON.stringify({
    exp: Date.now() + SESSION_HOURS * 3600 * 1000,
    v: String(account.version),
  }));
  const signature = createHmac('sha256', account.secret).update(payload).digest('base64url');
  return `sess.${payload}.${signature}`;
}

export async function verifySession(token) {
  const [prefix, payload, signature] = String(token || '').split('.');
  if (prefix !== 'sess' || !payload || !signature) return false;
  const account = await getAccount();
  if (!account) return false;
  const expected = createHmac('sha256', account.secret).update(payload).digest('base64url');
  if (!safeEqual(signature, expected)) return false;
  try {
    const { exp, v } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return exp > Date.now() && String(v) === String(account.version);
  } catch {
    return false;
  }
}

export const MIN_PASSWORD_LENGTH = 10;
