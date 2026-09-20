import Layout from '@/components/Layout';
import Link from 'next/link';
import { getSessionFromReq } from '@/lib/session';
import { FORMS } from '@/lib/forms-config';

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
          <span className="dot-live" /> FORMS MODULE · {FORMS.length} AVAILABLE
        </span>
        <h1>Доступные <em>формы</em></h1>
        <p>
          Выберите форму для подачи заявки. Все заявки моментально уходят
          в Discord соответствующих подразделений.
          <span className="cursor-blink" />
        </p>
      </div>

      <div className="forms-grid">
        {FORMS.map((f) => (
          <Link key={f.slug} href={`/forms/${f.slug}`} className="form-card">
            <span className="tag">// {f.webhook.replace('WEBHOOK_', '')}</span>
            <h3>{f.title}</h3>
            <p>{f.description || `${f.fields.length} полей · подать заявку`}</p>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
