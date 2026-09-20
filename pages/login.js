import Head from 'next/head';
import { getSessionFromReq } from '@/lib/session';

const ERRORS = {
  denied:      'Вы отклонили авторизацию в Discord.',
  state_error: 'Ошибка безопасности сессии. Попробуйте снова.',
  token_error: 'Discord не выдал токен доступа.',
  user_error:  'Не удалось получить профиль Discord.',
  error:       'Не удалось войти. Попробуйте ещё раз.',
};

export async function getServerSideProps(ctx) {
  const session = getSessionFromReq(ctx.req);
  if (session) {
    return { redirect: { destination: '/', permanent: false } };
  }
  const err = ctx.query.auth;
  return { props: { error: err ? ERRORS[err] || ERRORS.error : null } };
}

function Badge() {
  return (
    <svg viewBox="0 0 100 100">
      <polygon points="50,4 92,26 92,74 50,96 8,74 8,26"
               fill="#0f2447" stroke="#d4af37" strokeWidth="2.5" />
      <polygon points="50,12 85,30 85,70 50,88 15,70 15,30"
               fill="none" stroke="#2ecc71" strokeWidth="1.5" />
      <polygon points="50,20 78,34 78,66 50,80 22,66 22,34"
               fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.55" />
      <path d="M50 28 L57 46 L76 46 L61 57 L67 75 L50 64 L33 75 L39 57 L24 46 L43 46 Z"
            fill="#d4af37" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="#d4af37"
              strokeWidth="0.8" strokeDasharray="3 6" opacity="0.7" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

export default function LoginPage({ error }) {
  return (
    <>
      <Head>
        <title>Вход · Sheriff Dept.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="bg-grid" />
      <div className="bg-glow" />
      <div className="scanlines" />

      <div className="login-shell">
        <div className="login-visual">
          <div className="login-badge-wrap">
            <div className="ring ring-1" />
            <div className="ring ring-2" />
            <div className="ring ring-3" />
            <Badge />
          </div>
          <div className="login-brand">
            <b>SHERIFF DEPT.</b>
            <span>APPLICATION PORTAL · 2026</span>
          </div>
        </div>

        <div className="login-card">
          <span className="kicker">
            <span className="dot-live" /> SECURE AUTH
          </span>
          <h1>Вход в <em>систему</em></h1>
          <p>
            Авторизуйтесь через Discord, чтобы получить доступ к формам
            и личному кабинету департамента.
          </p>

          {error && (
            <div className="login-error">⚠ {error}</div>
          )}

          <a href="/api/auth" className="btn-discord">
            <DiscordIcon />
            <span>Войти через Discord</span>
          </a>

          <div className="login-foot">
            <span className="status-dot" />
            <span>ENCRYPTED · OAuth2 · JWT</span>
          </div>
        </div>
      </div>
    </>
  );
}
