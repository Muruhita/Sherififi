import Layout from '@/components/Layout';
import FormRenderer from '@/components/FormRenderer';
import Link from 'next/link';
import { getSessionFromReq } from '@/lib/session';
import { getFormBySlug } from '@/lib/forms-config';

export async function getServerSideProps(ctx) {
  const session = getSessionFromReq(ctx.req);
  if (!session) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  const { slug } = ctx.params;
  const form = getFormBySlug(slug);
  if (!form) return { notFound: true };

  return { props: { user: session, form } };
}

export default function FormPage({ user, form }) {
  return (
    <Layout title={form.title} user={user}>
      <div className="page-head">
        <Link href="/forms" className="back-link">← К списку форм</Link>
        <span className="kicker">
          <span className="dot-live" /> {form.webhook.replace('WEBHOOK_', '')}
        </span>
        <h1><em>{form.title}</em></h1>
        <p>
          {form.description || 'Заполните поля. Заявка уйдёт в Discord департамента.'}
          <span className="cursor-blink" />
        </p>
      </div>

      <FormRenderer form={form} />
    </Layout>
  );
}
