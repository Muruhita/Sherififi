import Head from 'next/head';
import { getSessionFromReq } from '@/lib/session';

const ERRORS = {
  denied:      'ACCESS DENIED :: авторизация отклонена',
  state_error: 'SECURITY ERROR :: проверка state не пройдена',
  token_error: 'TOKEN ERROR :: Discord не выдал токен',
  user_error:  'USER ERROR :: не удалось получить профиль',
  error:       'AUTH ERROR :: попробуйте ещё раз',
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
               fill="#08120c" stroke="#4aff8a" strokeWidth="2" />
      <polygon points="50,14 84,32 84,68 50,86 16,68 16,32"
               fill="none" stroke="#ffb02e" strokeWidth="1.5" opacity=".8" />
      <polygon points="50,22 78,36 78,64 50,78 22,64 22,36"
               fill="none" stroke="#4aff8a" strokeWidth="1" opacity=".5" />
      <path d="M50 28 L57 46 L76 46 L61 57 L67 75 L50 64 L33 75 L39 57 L24 46 L43 46 Z"
            fill="#4aff8a" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="#ffb02e"
              strokeWidth="0.6" strokeDasharray="2 6" opacity=".6" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

export default function LoginPage({ error }) {
  return (
    <>
      <Head>
        <title>Login · Sheriff Dept. Terminal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="bg-grid" />
      <div className="bg-glow" />

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
            <span>TERMINAL ACCESS · EST. 2026</span>
          </div>
        </div>

        <div className="login-card">
          <span className="kicker">
            <span className="dot-live" /> AUTH REQUIRED
          </span>
          <h1>Вход в <em>терминал</em></h1>
          <p>
            Идентификация через Discord OAuth2. Доступ только для
            авторизованных сотрудников департамента.
          </p>

          {error && (
            <div className="login-error">{error}</div>
          )}

          <a href="/api/auth" className="btn-discord">
            <DiscordIcon />
            <span>Authenticate via Discord</span>
          </a>

          <div className="login-foot">
            <span className="status-dot" />
            <span>ENCRYPTED · JWT · SECURE</span>
            <span className="cursor-blink" />
          </div>
        </div>
      </div>
    </>
  );
}
