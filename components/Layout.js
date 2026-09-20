import Head from 'next/head';
import Sidebar from './Sidebar';

export default function Layout({ children, title, user }) {
  return (
    <>
      <Head>
        <title>{title ? `${title} · Sheriff Dept.` : 'Sheriff Dept. · Terminal'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="bg-grid" />
      <div className="bg-glow" />

      {/* CRT-эффекты */}
      <div className="crt-scanlines" />
      <div className="crt-vignette" />
      <div className="crt-flicker" />
      <div className="crt-sweep" />

      <div className="app-shell">
        <main className="app-main" key={title}>{children}</main>
        <Sidebar user={user} />
      </div>
    </>
  );
}
