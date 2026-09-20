import Layout from '@/components/Layout';
import { getSessionFromReq, getAvatarUrl } from '@/lib/session';

export async function getServerSideProps(ctx) {
  const session = getSessionFromReq(ctx.req);
  if (!session) {
    return { redirect: { destination: '/login', permanent: false } };
  }
  return {
    props: {
      user: session,
      avatar: getAvatarUrl(session),
    },
  };
}

export default function ProfilePage({ user, avatar }) {
  return (
    <Layout title="Профиль" user={user}>
      <div className="page-head">
        <span className="kicker">// Личный кабинет</span>
        <h1>Профиль <em>бойца</em></h1>
        <p>Данные получены напрямую из Discord OAuth2.</p>
      </div>

      <div className="profile-card">
        <img className="avatar-img" src={avatar} alt={user.username} />
        <div className="profile-info">
          <h2>{user.globalName}</h2>
          <p>@{user.username}</p>
          <div className="row">
            <span>Discord ID: <b>{user.id}</b></span>
            <span>Отдел: <b>—</b></span>
            <span>Ранг: <b>—</b></span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
