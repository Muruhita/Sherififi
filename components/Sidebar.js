import Link from 'next/link';
import { useRouter } from 'next/router';
import { getAvatarUrl } from '@/lib/session';

const NAV = [
  { href: '/',        label: 'Home',    icon: '⌂' },
  { href: '/profile', label: 'Profile', icon: '◉' },
  { href: '/forms',   label: 'Forms',   icon: '✎' },
];

function Badge() {
  return (
    <svg viewBox="0 0 100 100">
      <polygon points="50,4 92,26 92,74 50,96 8,74 8,26"
               fill="#08120c" stroke="#4aff8a" strokeWidth="2" />
      <polygon points="50,14 84,32 84,68 50,86 16,68 16,32"
               fill="none" stroke="#ffb02e" strokeWidth="1.5" opacity=".8" />
      <path d="M50 30 L56 46 L73 46 L59 56 L64 72 L50 62 L36 72 L41 56 L27 46 L44 46 Z"
            fill="#4aff8a" opacity=".9" />
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
          <b>SHERIFF</b>
          <span>DEPT. TERMINAL</span>
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
          style={{ transform: `translateY(${Math.max(activeIndex, 0) * 46}px)` }}
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
        <span>SYS.ONLINE</span>
        <span className="cursor-blink" />
      </div>
    </aside>
  );
}
