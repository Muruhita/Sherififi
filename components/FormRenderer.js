import { useState } from 'react';

export default function FormRenderer({ form }) {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');

  const set = (name) => (e) => {
    setData((d) => ({ ...d, [name]: e.target.value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: null }));
  };

  const validate = () => {
    const er = {};
    for (const f of form.fields) {
      if (!f.required) continue;
      const v = data[f.name];
      if (!v || !String(v).trim()) er[f.name] = 'Обязательное поле';
    }
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    setServerError('');
    try {
      const r = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: form.slug, data }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error || `HTTP ${r.status}`);
      }
      setStatus('ok');
      setData({});
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error('Submit failed:', err);
      setServerError(err.message);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <form className="form-panel" onSubmit={onSubmit} noValidate>
      <div className="form-title">Форма SHR-{form.slug.toUpperCase()}</div>
      <div className="form-sub">{form.description || 'Заполните поля. Данные уходят в Discord напрямую.'}</div>

      {form.fields.map((f) => (
        <div key={f.name} className={`form-field${errors[f.name] ? ' err' : ''}`}>
          <label>
            {f.label} {f.required && <i>*</i>}
          </label>

          {f.type === 'textarea' && (
            <textarea
              value={data[f.name] || ''}
              onChange={set(f.name)}
              placeholder={f.placeholder || ''}
            />
          )}

          {f.type === 'select' && (
            <select value={data[f.name] || ''} onChange={set(f.name)}>
              <option value="">— Выберите —</option>
              {f.options.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          )}

          {f.type === 'text' && (
            <input
              type="text"
              value={data[f.name] || ''}
              onChange={set(f.name)}
              placeholder={f.placeholder || ''}
            />
          )}

          {f.hint && !errors[f.name] && <span className="hint">{f.hint}</span>}
          {errors[f.name] && <span className="err-msg">{errors[f.name]}</span>}
        </div>
      ))}

      <button type="submit" className="btn-submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Отправка...' : 'Отправить заявку'}
      </button>

      {status === 'ok' && (
        <div className="status-msg ok">OK :: заявка отправлена</div>
      )}
      {status === 'error' && (
        <div className="status-msg bad">ERR :: {serverError || 'не удалось отправить'}</div>
      )}
    </form>
  );
}
