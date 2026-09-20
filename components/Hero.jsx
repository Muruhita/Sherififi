import { HeroBadge } from './Badge';

export default function Hero({ onNav }) {
  return (
    <section className="hero">
      <div>
        <div className="tagline"><span className="dot-live"></span> Набор открыт · 2026</div>
        <h1>
          Служи <span className="gold">Закону.</span><br />
          <span className="thin">Защищай округ.</span>
        </h1>
        <p>
          Официальный портал подачи заявок на службу в Департаменте Шерифа.
          Прозрачный отбор, шифрование данных, отслеживание статуса в реальном времени.
        </p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => onNav('form')}>Начать заявку</button>
          <button className="btn-ghost" onClick={() => onNav('reqs')}>Требования</button>
        </div>
      </div>

      <div className="badge-stage">
        <div className="hex-frame"></div>
        <HeroBadge />
      </div>
    </section>
  );
}
