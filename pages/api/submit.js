export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { formType, data } = req.body || {};

  const webhooks = {
    test: process.env.WEBHOOK_TEST,
  };

  const url = webhooks[formType];
  if (!url) return res.status(400).json({ error: 'Unknown form type' });

  if (!data || typeof data !== 'object') {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  // Экранируем чтобы никто не вставил @everyone
  const safe = (v) =>
    String(v ?? '—')
      .slice(0, 1000)
      .replace(/@(everyone|here)/g, '@\u200b$1');

  const embed = {
    title: '📋 Новая заявка · Тест',
    color: 0x2ecc71,
    fields: [
      { name: '👤 Имя Фамилия | Статик',   value: safe(data.nameStatic), inline: false },
      { name: '📝 Причина / Ссылка',       value: safe(data.reason),     inline: false },
      { name: '🏛 Отдел',                  value: safe(data.department), inline: true  },
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
      const txt = await r.text().catch(() => '');
      console.error('Discord error:', r.status, txt);
      return res.status(502).json({ error: 'Discord rejected webhook' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Webhook send failed:', err);
    return res.status(500).json({ error: 'Failed to send' });
  }
}
