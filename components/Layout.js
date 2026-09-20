import Head from 'next/head';
import Sidebar from './Sidebar';

export default function Layout({ children, title, user }) {
  return (
    <>
      <Head>
        <title>{title ? `${title} · Sheriff Dept.` : 'Sheriff Dept. · Portal'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="bg-grid" />
      <div className="bg-glow" />
      <div className="scanlines" />

      <div className="app-shell">
        <main className="app-main" key={title}>{children}</main>
        <Sidebar user={user} />
      </div>
    </>
  );
}
