import { useState } from 'react';

const DEPARTMENTS = ['SAI', 'K-9', 'BFG', 'DSN'];

const EMPTY = { nameStatic: '', reason: '', department: '' };

export default function TestForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | ok | error

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: null }));
  };

  const validate = () => {
    const er = {};
    if (!form.nameStatic.trim()) er.nameStatic = 'Укажите имя, фамилию и статик';
    if (!form.reason.trim())     er.reason     = 'Опишите причину или дайте ссылку';
    if (!form.department)        er.department = 'Выберите отдел';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      const r = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'test', data: form }),
      });
      if (!r.ok) throw new Error('failed');
      setStatus('ok');
      setForm(EMPTY);
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <form className="form-panel" onSubmit={onSubmit} noValidate>
      <div className="form-title">Форма SHR-TEST</div>
      <div className="form-sub">Заполните все поля. Данные уходят в Discord напрямую.</div>

      <div className={`form-field${errors.nameStatic ? ' err' : ''}`}>
        <label>Имя Фамилия | Статик <i>*</i></label>
        <input
          type="text"
          value={form.nameStatic}
          onChange={set('nameStatic')}
          placeholder="Иван Иванов | 12345"
        />
        {errors.nameStatic && <span className="err-msg">⚠ {errors.nameStatic}</span>}
      </div>

      <div className={`form-field${errors.reason ? ' err' : ''}`}>
        <label>Причина / Ссылка на работу <i>*</i></label>
        <textarea
          value={form.reason}
          onChange={set('reason')}
          placeholder="Опишите причину или вставьте ссылку на вашу работу..."
        />
        {errors.reason && <span className="err-msg">⚠ {errors.reason}</span>}
      </div>

      <div className={`form-field${errors.department ? ' err' : ''}`}>
        <label>Ваш отдел <i>*</i></label>
        <select value={form.department} onChange={set('department')}>
          <option value="">— Выберите отдел —</option>
          {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        {errors.department && <span className="err-msg">⚠ {errors.department}</span>}
      </div>

      <button type="submit" className="btn-submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Отправка...' : 'Отправить заявку →'}
      </button>

      {status === 'ok'    && <div className="status-msg ok">✓ Заявка успешно отправлена</div>}
      {status === 'error' && <div className="status-msg bad">✕ Не удалось отправить, попробуйте снова</div>}
    </form>
  );
}
