const STEPS = ['Заявка','Скрининг','Проверка','Интервью','Полиграф','Академия'];

export default function Tracker({ stage }) {
  const pct = STEPS.length > 1 ? (stage / (STEPS.length - 1)) * 88 : 0;

  return (
    <section className="tracker" id="status">
      <div className="sec-head">
        <span className="kicker">// Live Tracking</span>
        <h2>Этапы <em>отбора</em></h2>
        <div className="bar"></div>
      </div>

      <div className="track-line">
        <div className="track-fill" style={{ width: `${pct}%` }}></div>
        {STEPS.map((label, i) => {
          const cls = i < stage ? 'done' : i === stage ? 'active' : '';
          return (
            <div className={`step ${cls}`} key={label}>
              <div className="node">{String(i + 1).padStart(2, '0')}</div>
              <span>{label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
