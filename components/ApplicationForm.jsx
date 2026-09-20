'use client';

import { useState } from 'react';

const POSITIONS = [
  'Deputy Sheriff — Patrol',
  'Detective / Investigator',
  'Corrections Officer',
  'K-9 Unit',
  'SWAT / Special Operations',
  'Dispatch / Communications',
];

const EMPTY_FORM = {
  first: '', last: '', email: '', phone: '', dob: '',
  citizen: '', position: '', education: '',
  experience: '', motivation: ''
};

function Field({ label, full, error, children }) {
  return (
    <div className={`field${full ? ' full' : ''}${error ? ' err' : ''}`}>
      <label>{label}</label>
      {children}
      {error && <span className="err-msg">⚠ {error}</span>}
    </div>
  );
}

export default function ApplicationForm({ onSubmitted }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [checks, setChecks] = useState([false, false, false]);
  const [errors, setErrors] = useState({});
  const [note, setNote] = useState('ID заявки будет присвоен автоматически');

  const set = (name) => (e) => {
    setForm(f => ({ ...f, [name]: e.target.value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: null }));
  };

  const toggleCheck = (i) => (e) => {
    const next = [...checks];
    next[i] = e.target.checked;
    setChecks(next);
  };

  const validate = () => {
    const er = {};
    if (!form.first.trim())  er.first = 'Укажите имя';
    if (!form.last.trim())   er.last  = 'Укажите фамилию';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'Некорректный email';
    if (form.phone.replace(/\D/g, '').length < 7) er.phone = 'Некорректный телефон';
    if (!form.dob)           er.dob = 'Укажите дату рождения';
    if (!form.citizen)       er.citizen = 'Выберите вариант';
    if (!form.position)      er.position = 'Выберите должность';
    if (!form.education)     er.education = 'Выберите образование';
    if (form.experience.trim().length < 20) er.experience = 'Минимум 20 символов';
    if (form.motivation.trim().length < 20) er.motivation = 'Минимум 20 символов';
    setErrors(er);

    if (Object.keys(er).length) {
      setNote('⚠ Исправьте выделенные поля');
      return false;
    }
    if (!checks.every(Boolean)) {
      setNote('⚠ Подтвердите все три пункта ниже');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const id = 'SHR-' + Math.floor(100000 + Math.random() * 900000);

    onSubmitted({
      id,
      name: `${form.first} ${form.last}`,
      position: form.position,
    });

    setForm(EMPTY_FORM);
    setChecks([false, false, false]);
    setErrors({});
    setNote('ID заявки будет присвоен автоматически');
  };

  return (
    <section className="form-wrap" id="form">
      <div className="sec-head">
        <span className="kicker">// Secure Form v3.2</span>
        <h2>Заявка на <em>службу</em></h2>
        <div className="bar"></div>
      </div>

      <div className="panel">
        <div className="panel-title">Форма SHR-101</div>
        <div className="panel-sub">Все поля обязательны. Данные передаются по шифрованному каналу.</div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">

            <Field label={<>Имя <i>*</i></>} error={errors.first}>
              <input type="text" value={form.first} onChange={set('first')} placeholder="Джон" />
            </Field>

            <Field label={<>Фамилия <i>*</i></>} error={errors.last}>
              <input type="text" value={form.last} onChange={set('last')} placeholder="Уэйн" />
            </Field>

            <Field label={<>Email <i>*</i></>} error={errors.email}>
              <input type="email" value={form.email} onChange={set('email')} placeholder="john@example.com" />
            </Field>

            <Field label={<>Телефон <i>*</i></>} error={errors.phone}>
              <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 (555) 000-0000" />
            </Field>

            <Field label={<>Дата рождения <i>*</i></>} error={errors.dob}>
              <input type="date" value={form.dob} onChange={set('dob')} />
            </Field>

            <Field label={<>Гражданство <i>*</i></>} error={errors.citizen}>
              <select value={form.citizen} onChange={set('citizen')}>
                <option value="">— Выберите —</option>
                <option>Гражданин США</option>
                <option>Постоянный резидент</option>
                <option>Иное (требуется проверка)</option>
              </select>
            </Field>

            <Field label={<>Желаемая должность <i>*</i></>} error={errors.position}>
              <select value={form.position} onChange={set('position')}>
                <option value="">— Выберите —</option>
                {POSITIONS.map(p => <option key={p}>{p}</option>)}
              </select>
            </Field>

            <Field label={<>Образование <i>*</i></>} error={errors.education}>
              <select value={form.education} onChange={set('education')}>
                <option value="">— Выберите —</option>
                <option>Среднее</option>
                <option>Среднее специальное</option>
                <option>Бакалавр</option>
                <option>Магистр и выше</option>
              </select>
            </Field>

            <Field label={<>Опыт службы / работы <i>*</i></>} full error={errors.experience}>
              <textarea value={form.experience} onChange={set('experience')}
                placeholder="Опишите военную службу, работу в правоохранительных органах..." />
            </Field>

            <Field label={<>Мотивация <i>*</i></>} full error={errors.motivation}>
              <textarea value={form.motivation} onChange={set('motivation')}
                placeholder="Почему вы хотите служить в Департаменте Шерифа?" />
            </Field>

          </div>

          <div className="checks">
            <label className="check">
              <input type="checkbox" checked={checks[0]} onChange={toggleCheck(0)} />
              <span>Подтверждаю отсутствие судимостей и согласен(на) на полную биографическую проверку.</span>
            </label>
            <label className="check">
              <input type="checkbox" checked={checks[1]} onChange={toggleCheck(1)} />
              <span>Согласен(на) на прохождение медицинского осмотра, психологического теста и полиграфа.</span>
            </label>
            <label className="check">
              <input type="checkbox" checked={checks[2]} onChange={toggleCheck(2)} />
              <span>Подтверждаю достоверность предоставленных данных.</span>
            </label>
          </div>

          <div className="submit-row">
            <button type="submit" className="btn-primary">Отправить заявку →</button>
            <small className={note.startsWith('⚠') ? 'bad' : ''}>{note}</small>
          </div>
        </form>
      </div>
    </section>
  );
}
