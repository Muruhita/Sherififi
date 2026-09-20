import Layout from '@/components/Layout';

export default function ProfilePage() {
  return (
    <Layout title="Профиль">
      <div className="page-head">
        <span className="kicker">// Личный кабинет</span>
        <h1>Профиль <em>бойца</em></h1>
        <p>Данные появятся после авторизации через Discord OAuth2.</p>
      </div>

      <div className="profile-card">
        <div className="avatar">?</div>
        <div className="profile-info">
          <h2>Гость</h2>
          <p>Войдите через Discord, чтобы увидеть свой профиль.</p>
          <div className="row">
            <span>Отдел: <b>—</b></span>
            <span>Статик: <b>—</b></span>
            <span>Ранг: <b>—</b></span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
