import { getSessionFromReq, getAvatarUrl } from '@/lib/session';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const session = getSessionFromReq(req);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const { formType, data } = req.body || {};

  const webhooks = { test: process.env.WEBHOOK_TEST };
  const url = webhooks[formType];
  if (!url) return res.status(400).json({ error: 'Unknown form type' });
  if (!data || typeof data !== 'object') {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const safe = (v) =>
    String(v ?? '—').slice(0, 1000).replace(/@(everyone|here)/g, '@\u200b$1');

  const embed = {
    title: '📋 Новая заявка · Тест',
    color: 0x2ecc71,
    author: {
      name: `${session.globalName} (@${session.username})`,
      icon_url: getAvatarUrl(session),
    },
    fields: [
      { name: '👤 Имя Фамилия | Статик', value: safe(data.nameStatic), inline: false },
      { name: '📝 Причина / Ссылка',     value: safe(data.reason),     inline: false },
      { name: '🏛 Отдел',                value: safe(data.department), inline: true  },
      { name: '🆔 Discord',              value: `<@${session.id}>`,    inline: true  },
    ],
    timestamp: new Date().toISOString(),
    footer: { text: 'Sheriff Department · Application Portal' },
  };

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'Sheriff Portal',
        embeds: [embed],
        allowed_mentions: { parse: [] },
      }),
    });

    if (!r.ok) {
      console.error('Discord error:', r.status, await r.text());
      return res.status(502).json({ error: 'Discord rejected webhook' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Webhook failed:', err);
    return res.status(500).json({ error: 'Failed to send' });
  }
}
