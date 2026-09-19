'use client';

import { useEffect, useState } from 'react';
import { BadgeIcon } from './Badge';

export default function Header({ onNav }) {
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      const pad = (x) => String(x).padStart(2, '0');
      setTime(`${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header>
      <div className="nav">
        <button className="brand" onClick={() => onNav('top')}>
          <BadgeIcon className="badge-logo" />
          <div className="brand-text">
            <b>Sheriff Dept.</b>
            <span>Application Portal</span>
          </div>
        </button>

        <div className="nav-right">
          <nav>
            <ul>
              <li><a onClick={() => onNav('form')}>Заявка</a></li>
              <li><a onClick={() => onNav('reqs')}>Требования</a></li>
              <li><a onClick={() => onNav('status')}>Статус</a></li>
            </ul>
          </nav>
          <div className="clock">◉ SECURE {time}</div>
          <button className="nav-cta" onClick={() => onNav('form')}>Подать заявку</button>
        </div>
      </div>
    </header>
  );
}
