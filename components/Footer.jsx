export default function Footer({ onNav }) {
  return (
    <footer>
      <div className="foot-inner">
        <div>
          <h4>Sheriff Department</h4>
          <p>Официальный портал подачи заявок на службу.</p>
          <p>Лицензия № SHR-2026-0087</p>
          <p>Шифрование: AES-256 / TLS 1.3</p>
        </div>
        <div>
          <h4>Навигация</h4>
          <a onClick={() => onNav('form')}>Подать заявку</a>
          <a onClick={() => onNav('reqs')}>Требования</a>
          <a onClick={() => onNav('status')}>Статус отбора</a>
        </div>
        <div>
          <h4>Контакты</h4>
          <a href="mailto:hotline@sheriff.gov">hotline@sheriff.gov</a>
          <a href="tel:+18005550199">+1 (800) 555-0199</a>
          <a href="tel:911">Экстренно: 911</a>
        </div>
      </div>
      <div className="copy">
        © 2026 SHERIFF DEPARTMENT — ALL RIGHTS RESERVED · IN LAW WE TRUST
      </div>
    </footer>
  );
}
