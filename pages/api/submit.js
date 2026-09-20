import { getSessionFromReq, getAvatarUrl } from '@/lib/session';
import { getFormBySlug } from '@/lib/forms-config';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = getSessionFromReq(req);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized — войдите заново' });
  }

  const { slug, data } = req.body || {};

  if (!slug) {
    return res.status(400).json({ error: 'Missing slug' });
  }

  const form = getFormBySlug(slug);
  if (!form) {
    return res.status(400).json({ error: `Unknown form: ${slug}` });
  }

  const webhookUrl = process.env[form.webhook];
  if (!webhookUrl) {
    return res.status(500).json({
      error: `Env variable ${form.webhook} is not configured on the server`,
    });
  }

  if (!data || typeof data !== 'object') {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  // Экранируем упоминания @everyone / @here
  const safe = (v) =>
    String(v ?? '').slice(0, 1000).replace(/@(everyone|here)/g, '@\u200b$1');

  // Собираем поля embed по конфигу формы
  const fields = form.fields.map((f) => {
    let value = data[f.name];

    if (value === undefined || value === null || String(value).trim() === '') {
      // Для поля «Причина увольнения» — специальный fallback
      if (f.name === 'reason') value = 'не указана';
      else value = '—';
    }

    return {
      name: f.label,
      value: safe(value),
      inline: false,
    };
  });

  const embed = {
    title: `📋 Заявка :: ${form.title}`,
    color: form.color || 0x4aff8a,
    author: {
      name: `${session.globalName} (@${session.username})`,
      icon_url: getAvatarUrl(session),
    },
    description: `**Отправитель:** <@${session.id}>\n**Discord ID:** \`${session.id}\``,
    fields,
    timestamp: new Date().toISOString(),
    footer: { text: 'Sheriff Department · Application Portal' },
  };

  try {
    const r = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'Sheriff Portal',
        embeds: [embed],
        allowed_mentions: { parse: [], users: [session.id] },
      }),
    });

    if (!r.ok) {
      const txt = await r.text().catch(() => '');
      console.error('Discord rejected webhook:', r.status, txt);
      return res.status(502).json({
        error: 'Discord rejected the webhook',
        status: r.status,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Webhook send failed:', err);
    return res.status(500).json({ error: 'Failed to reach Discord' });
  }
}
