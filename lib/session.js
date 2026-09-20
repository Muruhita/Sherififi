import jwt from 'jsonwebtoken';

const COOKIE_NAME = 'session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 дней

export function signSession(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export function verifySession(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

export function parseCookies(header = '') {
  const out = {};
  header.split(';').forEach((part) => {
    const [k, ...v] = part.trim().split('=');
    if (k) out[k] = decodeURIComponent(v.join('='));
  });
  return out;
}

export function getSessionFromReq(req) {
  const token = parseCookies(req.headers.cookie || '')[COOKIE_NAME];
  if (!token) return null;
  return verifySession(token);
}

export function getSessionCookie(token) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}${secure}`;
}

export function clearSessionCookie() {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
}

export function getAvatarUrl(user) {
  if (user.avatar) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
  }
  // Встроенные аватары Discord
  let idx = 0;
  try {
    idx = Number(BigInt(user.id) >> 22n) % 6;
  } catch {
    idx = 0;
  }
  return `https://cdn.discordapp.com/embed/avatars/${idx}.png`;
}
