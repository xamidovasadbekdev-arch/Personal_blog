// POST /api/setup { code, email, password }
// Sets the first password, or resets a forgotten one, using the recovery code
// stored in the ADMIN_SETUP_CODE environment variable. Disabled if that
// variable is empty.
import bcrypt from 'bcryptjs';
import {
  MIN_PASSWORD_LENGTH, adminEmail, clearFailures, clientIp, isLocked, json, readJson, recordFailure,
  safeEqual, saveAccount,
} from './_lib.js';

export async function POST(request) {
  const setupCode = process.env.ADMIN_SETUP_CODE || '';
  if (!setupCode) return json({ error: 'Setup is turned off (ADMIN_SETUP_CODE is not set).' }, 403);

  const ip = clientIp(request);
  if (await isLocked(ip)) {
    return json({ error: 'Too many attempts. Try again in 15 minutes.' }, 429);
  }

  const { code = '', email = '', password = '' } = await readJson(request);
  const emailOk = adminEmail() && String(email).trim().toLowerCase() === adminEmail();
  if (!emailOk || !safeEqual(code, setupCode)) {
    await recordFailure(ip);
    return json({ error: 'Wrong email or recovery code.' }, 401);
  }
  if (String(password).length < MIN_PASSWORD_LENGTH) {
    return json({ error: `The password must be at least ${MIN_PASSWORD_LENGTH} characters.` }, 400);
  }

  await saveAccount(await bcrypt.hash(String(password), 12));
  await clearFailures(ip);
  return json({ ok: true });
}
