'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 1248,  decimals: 0, suffix: '',   label: 'Действующих офицеров' },
  { value: 24,    decimals: 0, suffix: '/7', label: 'Приём заявок' },
  { value: 98.4,  decimals: 1, suffix: '%',  label: 'Точность отбора' },
  { value: 12,    decimals: 0, suffix: '',   label: 'Этапов проверки' },
];

function StatItem({ value, decimals, suffix, label }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let raf, t0;
        const tick = (t) => {
          if (!t0) t0 = t;
          const p = Math.min((t - t0) / 1500, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(value * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  const formatted = decimals
    ? val.toFixed(decimals)
    : Math.round(val).toLocaleString('ru-RU').replace(/\u00A0/g, ' ');

  return (
    <div className="stat" ref={ref}>
      <b>{formatted}{suffix}</b>
      <span>{label}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <div className="stats">
      {STATS.map((s, i) => <StatItem key={i} {...s} />)}
    </div>
  );
}
