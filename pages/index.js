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
        <span className="kicker">
          <span className="dot-live" /> SYSTEM READY
        </span>
        <h1>
          Welcome, <em>{user.globalName}</em>
        </h1>
        <p>
          Sheriff Department Internal Terminal. Все действия логируются.
          Выберите раздел для продолжения работы.
          <span className="cursor-blink" />
        </p>
      </div>

      <div className="forms-grid">
        <Link href="/forms" className="form-card">
          <span className="tag">// FORMS</span>
          <h3>Формы подачи</h3>
          <p>Список доступных форм. Тестовая заявка и другие (скоро).</p>
        </Link>
        <Link href="/profile" className="form-card">
          <span className="tag">// PROFILE</span>
          <h3>Личный профиль</h3>
          <p>Данные Discord-аккаунта, статистика и история заявок.</p>
        </Link>
      </div>
    </Layout>
  );
}
