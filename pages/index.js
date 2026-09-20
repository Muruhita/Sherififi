import Layout from '@/components/Layout';
import Link from 'next/link';
import { getSessionFromReq } from '@/lib/session';

export async function getServerSideProps(ctx) {
  const session = getSessionFromReq(ctx.req);
  if (!session) {
    return { redirect: { destination: '/login', permanent: false } };
  }
  return { props: { user: session } };
}

export default function HomePage({ user }) {
  return (
    <Layout title="Главная" user={user}>
      <div className="page-head">
        <span className="kicker">◉ Система активна</span>
        <h1>Привет, <em>{user.globalName}</em></h1>
        <p>
          Внутренний портал Департамента Шерифа. Все отправленные заявки
          мгновенно уходят в Discord соответствующих подразделений.
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
          <p>Данные Discord-аккаунта, статистика и история заявок.</p>
        </Link>
      </div>
    </Layout>
  );
}
