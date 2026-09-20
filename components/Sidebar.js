import Link from 'next/link';
import { useRouter } from 'next/router';
import { getAvatarUrl } from '@/lib/session';

const NAV = [
  { href: '/',        label: 'Главная', icon: '⌂' },
  { href: '/profile', label: 'Профиль', icon: '◉' },
  { href: '/forms',   label: 'Формы',   icon: '✎' },
];

function Badge() {
  return (
    <svg viewBox="0 0 100 100">
      <polygon points="50,4 92,26 92,74 50,96 8,74 8,26"
               fill="#0f2447" stroke="#d4af37" strokeWidth="3" />
      <polygon points="50,16 82,33 82,67 50,84 18,67 18,33"
               fill="none" stroke="#2ecc71" strokeWidth="2" />
      <path d="M50 30 L56 46 L73 46 L59 56 L64 72 L50 62 L36 72 L41 56 L27 46 L44 46 Z"
            fill="#d4af37" />
    </svg>
  );
}

export default function Sidebar({ user }) {
  const router = useRouter();
  const activeIndex = NAV.findIndex(n =>
    n.href === '/' ? router.pathname === '/' : router.pathname.startsWith(n.href)
  );
  const avatar = user ? getAvatarUrl(user) : null;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Badge />
        <div>
          <b>Sheriff</b>
          <span>Dept. Portal</span>
        </div>
      </div>

      {user && (
        <div className="user-chip">
          <img className="user-avatar" src={avatar} alt={user.username} />
          <div className="user-meta">
            <b>{user.globalName}</b>
            <span>@{user.username}</span>
          </div>
          <a href="/api/logout" className="logout-btn" title="Выйти">⏻</a>
        </div>
      )}

      <nav className="sidebar-nav">
        <div
          className="nav-indicator"
          style={{ transform: `translateY(${Math.max(activeIndex, 0) * 54}px)` }}
        />
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item${router.pathname === item.href ? ' active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="status-dot" />
        <span>System Online</span>
      </div>
    </aside>
  );
}
