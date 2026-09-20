import Layout from '@/components/Layout';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Layout title="Главная">
      <div className="page-head">
        <span className="kicker">◉ System Online</span>
        <h1>Портал <em>Департамента Шерифа</em></h1>
        <p>
          Внутренняя система приёма заявок. Слева — рабочая зона, справа — навигация.
          Все отправленные формы попадают в Discord соответствующих подразделений.
        </p>
      </div>

      <div className="forms-grid">
        <Link href="/forms" className="form-card">
          <span className="tag">// Заявки</span>
          <h3>Перейти к формам</h3>
          <p>Список доступных форм: тестовая заявка и другие (скоро).</p>
        </Link>
        <Link href="/profile" className="form-card">
          <span className="tag">// Личный кабинет</span>
          <h3>Мой профиль</h3>
          <p>Данные бойца, статистика и история поданных заявок.</p>
        </Link>
      </div>
    </Layout>
  );
}
