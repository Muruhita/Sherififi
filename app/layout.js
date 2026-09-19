import './globals.css';

export const metadata = {
  title: 'Sheriff Dept. // Application Portal',
  description: 'Официальный портал подачи заявок на службу в Департаменте Шерифа',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <div className="bg-grid" />
        <div className="bg-glow" />
        <div className="scanlines" />
        {children}
      </body>
    </html>
  );
}
