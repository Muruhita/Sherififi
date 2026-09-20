import Layout from '@/components/Layout';
import TestForm from '@/components/TestForm';
import { getSessionFromReq } from '@/lib/session';

export async function getServerSideProps(ctx) {
  const session = getSessionFromReq(ctx.req);
  if (!session) {
    return { redirect: { destination: '/login', permanent: false } };
  }
  return { props: { user: session } };
}

export default function FormsPage({ user }) {
  return (
    <Layout title="Forms" user={user}>
      <div className="page-head">
        <span className="kicker">
          <span className="dot-live" /> FORMS MODULE · ACTIVE
        </span>
        <h1>Форма <em>«Тест»</em></h1>
        <p>
          Заполните поля ниже — заявка моментально уйдёт в Discord департамента.
          Все действия логируются в системе.
          <span className="cursor-blink" />
        </p>
      </div>

      <TestForm />
    </Layout>
  );
}
