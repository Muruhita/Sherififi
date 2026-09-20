'use client';

import { useEffect, useState } from 'react';

export default function Toast({ data }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!data) return;
    setVisible(true);
    const id = setTimeout(() => setVisible(false), 5200);
    return () => clearTimeout(id);
  }, [data]);

  if (!data) return null;

  return (
    <div className={`toast${visible ? ' show' : ''}`}>
      <b>✓ ЗАЯВКА ПРИНЯТА</b>
      <span>{data.id} · {data.name}</span>
    </div>
  );
}
