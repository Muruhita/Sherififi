import crypto from 'crypto';
import { signSession, getSessionCookie, parseCookies } from '@/lib/session';

export default async function handler(req, res) {
  const { code, error, state } = req.query;

  if (error) return res.redirect('/login?auth=denied');
  if (code)  return handleCallback(req, res, code, state);
  return initiateLogin(req, res);
}

function initiateLogin(req, res) {
  const state = crypto.randomBytes(16).toString('hex');
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader(
    'Set-Cookie',
    `oauth_state=${state}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600${secure}`
  );

  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    redirect_uri: process.env.DISCORD_REDIRECT_URI,
    response_type: 'code',
    scope: 'identify',
    state,
    prompt: 'consent',
  });

  res.redirect(`https://discord.com/oauth2/authorize?${params}`);
}

async function handleCallback(req, res, code, state) {
  const cookies = parseCookies(req.headers.cookie || '');
  if (!state || !cookies.oauth_state || state !== cookies.oauth_state) {
    return res.redirect('/login?auth=state_error');
  }

  try {
    // 1. Обмениваем code на access_token
    const body = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI,
    });

    const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    if (!tokenRes.ok) {
      console.error('Discord token error:', await tokenRes.text());
      return res.redirect('/login?auth=token_error');
    }
    const { access_token } = await tokenRes.json();

    // 2. Получаем профиль пользователя
    const userRes = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!userRes.ok) {
      console.error('Discord user error:', await userRes.text());
      return res.redirect('/login?auth=user_error');
    }
    const user = await userRes.json();

    // 3. Сохраняем в сессию
    const session = {
      id: user.id,
      username: user.username,
      globalName: user.global_name || user.username,
      avatar: user.avatar,
      discriminator: user.discriminator,
    };

    const token = signSession(session);
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';

    res.setHeader('Set-Cookie', [
      getSessionCookie(token),
      `oauth_state=; Path=/; Max-Age=0${secure}`,
    ]);

    res.redirect('/');
  } catch (err) {
    console.error('Discord OAuth error:', err);
    res.redirect('/login?auth=error');
  }
}
