// POST /api/password { email, current, next } → changes the admin password.
// Changing it signs out every existing admin session.
import bcrypt from 'bcryptjs';
import {
  MIN_PASSWORD_LENGTH, adminEmail, clearFailures, clientIp, getAccount, isLocked, json, readJson,
  recordFailure, saveAccount,
} from './_lib.js';

export async function POST(request) {
  const ip = clientIp(request);
  if (await isLocked(ip)) {
    return json({ error: 'Too many attempts. Try again in 15 minutes.' }, 429);
  }

  const { email = '', current = '', next = '' } = await readJson(request);
  const account = await getAccount();
  if (!account) return json({ error: 'No password has been set yet.' }, 409);

  const emailOk = adminEmail() && String(email).trim().toLowerCase() === adminEmail();
  const passwordOk = await bcrypt.compare(String(current), account.hash);
  if (!emailOk || !passwordOk) {
    await recordFailure(ip);
    return json({ error: 'Wrong email or current password.' }, 401);
  }
  if (String(next).length < MIN_PASSWORD_LENGTH) {
    return json({ error: `The new password must be at least ${MIN_PASSWORD_LENGTH} characters.` }, 400);
  }

  await saveAccount(await bcrypt.hash(String(next), 12));
  await clearFailures(ip);
  return json({ ok: true });
}
