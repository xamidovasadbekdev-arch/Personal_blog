// POST /api/login { email, password } → { token }
// The token is a signed session used only by the /api/gh proxy; it expires
// after 12 hours and stops working as soon as the password changes.
import bcrypt from 'bcryptjs';
import {
  adminEmail, clearFailures, clientIp, createSession, getAccount, isLocked, json, readJson, recordFailure,
} from './_lib.js';

export async function POST(request) {
  const ip = clientIp(request);
  if (await isLocked(ip)) {
    return json({ error: 'Too many attempts. Try again in 15 minutes.' }, 429);
  }

  const { email = '', password = '' } = await readJson(request);
  const account = await getAccount();
  if (!account) {
    return json({ error: 'No password has been set yet. Open /admin/account to set one.' }, 409);
  }

  const emailOk = adminEmail() && String(email).trim().toLowerCase() === adminEmail();
  // Always run bcrypt so a wrong email takes as long as a wrong password.
  const passwordOk = await bcrypt.compare(String(password), account.hash);
  if (!emailOk || !passwordOk) {
    await recordFailure(ip);
    return json({ error: 'Wrong email or password.' }, 401);
  }

  await clearFailures(ip);
  return json({ token: createSession(account) });
}
