<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SHERIFF DEPT. // APPLICATION PORTAL</title>

<!-- React + Babel (всё рендерится из JS) -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<style>
  :root{
    --navy-900:#050b1a;
    --navy-800:#0a1730;
    --navy-700:#0f2447;
    --navy-600:#14315e;
    --blue-glow:#2a6fd6;
    --gold:#d4af37;
    --gold-soft:#f0d878;
    --gold-dark:#8a6d1f;
    --steel:#8fa8c8;
    --white:#eaf2ff;
    --danger:#e14b4b;
    --ok:#3ddc84;
  }
  *{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{
    font-family:'Segoe UI','Roboto',sans-serif;
    background:var(--navy-900);
    color:var(--white);
    overflow-x:hidden;
    line-height:1.6;
  }
  #root{position:relative;z-index:1}

  /* ---------- ФОН ---------- */
  .bg-grid{
    position:fixed;inset:0;z-index:-2;
    background-image:
      linear-gradient(rgba(42,111,214,.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(42,111,214,.07) 1px, transparent 1px);
    background-size:50px 50px;
    animation:gridMove 20s linear infinite;
  }
  @keyframes gridMove{0%{background-position:0 0}100%{background-position:50px 50px}}
  .bg-glow{
    position:fixed;inset:0;z-index:-1;pointer-events:none;
    background:
      radial-gradient(circle at 15% 10%, rgba(42,111,214,.18), transparent 45%),
      radial-gradient(circle at 85% 80%, rgba(212,175,55,.12), transparent 45%);
  }
  .scanlines{
    position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:.6;
    background:repeating-linear-gradient(to bottom,
      rgba(255,255,255,.015) 0px, rgba(255,255,255,.015) 1px,
      transparent 1px, transparent 3px);
  }

  /* ---------- HEADER ---------- */
  header{
    position:sticky;top:0;z-index:100;
    background:rgba(5,11,26,.82);
    backdrop-filter:blur(14px);
    border-bottom:1px solid rgba(212,175,55,.25);
  }
  .nav{
    max-width:1280px;margin:0 auto;padding:14px 24px;
    display:flex;align-items:center;justify-content:space-between;gap:20px;
  }
  .brand{display:flex;align-items:center;gap:14px;text-decoration:none;color:inherit}
  .badge-logo{width:46px;height:46px;flex-shrink:0;animation:badgePulse 3s ease-in-out infinite}
  @keyframes badgePulse{
    0%,100%{filter:drop-shadow(0 0 8px rgba(212,175,55,.4))}
    50%{filter:drop-shadow(0 0 18px rgba(212,175,55,.8))}
  }
  .brand-text b{
    display:block;font-family:'Courier New',monospace;letter-spacing:2px;
    font-size:15px;color:var(--gold-soft);text-transform:uppercase;
  }
  .brand-text span{
    font-size:11px;letter-spacing:3px;color:var(--steel);
    text-transform:uppercase;font-family:'Courier New',monospace;
  }
  .nav-right{display:flex;align-items:center;gap:26px}
  nav ul{display:flex;gap:30px;list-style:none}
  nav a{
    color:var(--steel);text-decoration:none;font-size:13px;letter-spacing:1.6px;
    text-transform:uppercase;font-family:'Courier New',monospace;
    position:relative;transition:.3s;
  }
  nav a::after{
    content:'';position:absolute;left:0;bottom:-6px;width:0;height:1px;
    background:var(--gold);transition:.3s;box-shadow:0 0 8px var(--gold);
  }
  nav a:hover{color:var(--gold-soft)}
  nav a:hover::after{width:100%}

  .clock{
    font-family:'Courier New',monospace;font-size:12px;letter-spacing:1.5px;
    color:var(--ok);border:1px solid rgba(61,220,132,.3);
    padding:6px 12px;background:rgba(61,220,132,.05);white-space:nowrap;
  }
  .nav-cta{
    padding:10px 22px;border:1px solid var(--gold);color:var(--gold-soft);
    font-family:'Courier New',monospace;font-size:12px;letter-spacing:2px;
    text-transform:uppercase;text-decoration:none;background:transparent;
    transition:.3s;cursor:pointer;
    clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);
  }
  .nav-cta:hover{background:var(--gold);color:var(--navy-900);box-shadow:0 0 24px rgba(212,175,55,.6)}

  /* ---------- HERO ---------- */
  .hero{
    max-width:1280px;margin:0 auto;padding:80px 24px 60px;
    display:grid;grid-template-columns:1.15fr .85fr;gap:60px;align-items:center;
  }
  .tagline{
    display:inline-flex;align-items:center;gap:10px;
    font-family:'Courier New',monospace;font-size:11px;letter-spacing:3px;
    text-transform:uppercase;color:var(--gold);
    border:1px solid rgba(212,175,55,.35);padding:7px 16px;margin-bottom:26px;
    background:rgba(212,175,55,.06);
  }
  .dot-live{width:7px;height:7px;border-radius:50%;background:var(--ok);
    box-shadow:0 0 10px var(--ok);animation:blink 1.4s infinite}
  @keyframes blink{50%{opacity:.25}}
  .hero h1{font-size:clamp(34px,5vw,62px);line-height:1.05;font-weight:800;
    letter-spacing:-1px;margin-bottom:22px}
  .hero h1 .gold{color:var(--gold);text-shadow:0 0 30px rgba(212,175,55,.45)}
  .hero h1 .thin{font-weight:300;color:var(--steel)}
  .hero p{color:var(--steel);font-size:17px;max-width:560px;margin-bottom:36px}
  .hero-btns{display:flex;gap:16px;flex-wrap:wrap}

  .btn-primary{
    padding:15px 34px;background:linear-gradient(135deg,var(--gold),var(--gold-dark));
    color:var(--navy-900);border:none;font-weight:800;font-size:13px;
    letter-spacing:2px;text-transform:uppercase;cursor:pointer;text-decoration:none;
    display:inline-block;font-family:'Courier New',monospace;transition:.25s;
    clip-path:polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px);
  }
  .btn-primary:hover{transform:translateY(-3px);box-shadow:0 12px 34px rgba(212,175,55,.45)}
  .btn-primary:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}

  .btn-ghost{
    padding:15px 34px;background:transparent;color:var(--steel);
    border:1px solid rgba(143,168,200,.35);font-size:13px;letter-spacing:2px;
    text-transform:uppercase;cursor:pointer;text-decoration:none;display:inline-block;
    font-family:'Courier New',monospace;transition:.25s;
    clip-path:polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px);
  }
  .btn-ghost:hover{border-color:var(--blue-glow);color:var(--white);
    box-shadow:0 0 24px rgba(42,111,214,.35) inset}

  /* ---------- ЗНАЧОК ---------- */
  .badge-stage{position:relative;display:flex;justify-content:center;align-items:center;min-height:380px}
  .badge-stage::before{
    content:'';position:absolute;width:320px;height:320px;border-radius:50%;
    border:1px dashed rgba(212,175,55,.28);animation:spin 26s linear infinite;
  }
  .badge-stage::after{
    content:'';position:absolute;width:400px;height:400px;border-radius:50%;
    border:1px solid rgba(42,111,214,.18);animation:spin 40s linear infinite reverse;
  }
  @keyframes spin{to{transform:rotate(360deg)}}
  .badge-svg{width:250px;position:relative;z-index:2;
    filter:drop-shadow(0 0 40px rgba(212,175,55,.35))}
  .hex-frame{
    position:absolute;inset:0;margin:auto;width:340px;height:340px;
    border:2px solid rgba(212,175,55,.4);
    clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);
    background:linear-gradient(160deg, rgba(15,36,71,.7), rgba(5,11,26,.9));
    z-index:1;
  }

  /* ---------- СТАТИСТИКА ---------- */
  .stats{
    max-width:1280px;margin:0 auto 90px;padding:0 24px;
    display:grid;grid-template-columns:repeat(4,1fr);gap:1px;
    background:rgba(143,168,200,.14);border:1px solid rgba(143,168,200,.14);
  }
  .stat{background:var(--navy-900);padding:30px 22px;text-align:center;transition:.3s}
  .stat:hover{background:rgba(15,36,71,.7)}
  .stat b{display:block;font-size:34px;font-family:'Courier New',monospace;
    color:var(--gold);text-shadow:0 0 20px rgba(212,175,55,.4)}
  .stat span{font-size:11px;letter-spacing:2.4px;text-transform:uppercase;
    color:var(--steel);font-family:'Courier New',monospace}

  /* ---------- ЗАГОЛОВКИ СЕКЦИЙ ---------- */
  .sec-head{text-align:center;margin-bottom:50px}
  .sec-head .kicker{font-family:'Courier New',monospace;font-size:11px;
    letter-spacing:4px;color:var(--blue-glow);text-transform:uppercase;
    display:block;margin-bottom:12px}
  .sec-head h2{font-size:clamp(26px,3.4vw,40px);letter-spacing:-.5px}
  .sec-head h2 em{font-style:normal;color:var(--gold)}
  .sec-head .bar{width:70px;height:2px;background:var(--gold);margin:20px auto 0;
    box-shadow:0 0 14px var(--gold)}

  /* ---------- ФОРМА ---------- */
  .form-wrap{max-width:1100px;margin:0 auto 100px;padding:0 24px}
  .panel{
    background:linear-gradient(160deg, rgba(15,36,71,.75), rgba(5,11,26,.9));
    border:1px solid rgba(42,111,214,.28);backdrop-filter:blur(10px);
    padding:44px;position:relative;
    clip-path:polygon(22px 0,100% 0,100% calc(100% - 22px),calc(100% - 22px) 100%,0 100%,0 22px);
  }
  .panel::before{content:'';position:absolute;top:0;left:0;width:60%;height:2px;
    background:linear-gradient(90deg,var(--gold),transparent)}
  .panel-title{font-family:'Courier New',monospace;font-size:13px;letter-spacing:3px;
    color:var(--gold-soft);text-transform:uppercase;margin-bottom:6px}
  .panel-sub{font-size:13px;color:var(--steel);margin-bottom:34px}

  .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px}
  .field{display:flex;flex-direction:column;gap:8px}
  .field.full{grid-column:1/-1}
  .field label{font-family:'Courier New',monospace;font-size:11px;letter-spacing:2px;
    text-transform:uppercase;color:var(--steel)}
  .field label i{color:var(--gold);font-style:normal}
  .field input,.field select,.field textarea{
    background:rgba(5,11,26,.75);border:1px solid rgba(143,168,200,.25);
    color:var(--white);padding:13px 15px;font-size:14px;font-family:inherit;
    outline:none;transition:.25s;width:100%;
  }
  .field textarea{resize:vertical;min-height:110px}
  .field input:focus,.field select:focus,.field textarea:focus{
    border-color:var(--gold);
    box-shadow:0 0 0 3px rgba(212,175,55,.12), 0 0 22px rgba(212,175,55,.18);
    background:rgba(5,11,26,.95);
  }
  .field select option{background:var(--navy-800)}
  .field.err input,.field.err select,.field.err textarea{border-color:var(--danger);
    box-shadow:0 0 0 3px rgba(225,75,75,.12)}
  .err-msg{font-family:'Courier New',monospace;font-size:10.5px;color:var(--danger);
    letter-spacing:1px}

  .checks{display:flex;flex-direction:column;gap:12px;margin:26px 0 30px}
  .check{display:flex;gap:12px;align-items:flex-start;font-size:13px;
    color:var(--steel);cursor:pointer}
  .check input{
    appearance:none;width:18px;height:18px;flex-shrink:0;margin-top:2px;
    border:1px solid rgba(143,168,200,.4);background:rgba(5,11,26,.8);
    cursor:pointer;position:relative;transition:.2s;
  }
  .check input:checked{background:var(--gold);border-color:var(--gold);
    box-shadow:0 0 14px rgba(212,175,55,.5)}
  .check input:checked::after{
    content:'✓';position:absolute;inset:0;display:flex;align-items:center;
    justify-content:center;color:var(--navy-900);font-weight:900;font-size:12px;
  }

  .submit-row{display:flex;align-items:center;gap:22px;flex-wrap:wrap;
    border-top:1px solid rgba(143,168,200,.15);padding-top:28px}
  .submit-row small{font-family:'Courier New',monospace;font-size:11px;
    color:var(--steel);letter-spacing:1px}
  .submit-row small.bad{color:var(--danger)}

  /* ---------- ТРЕБОВАНИЯ ---------- */
  .reqs{max-width:1280px;margin:0 auto 100px;padding:0 24px;
    display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
  .req-card{
    background:rgba(10,23,48,.6);border:1px solid rgba(42,111,214,.2);
    padding:32px 26px;position:relative;transition:.35s;overflow:hidden;
  }
  .req-card::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;
    background:linear-gradient(90deg,var(--blue-glow),var(--gold));
    transform:scaleX(0);transform-origin:left;transition:.4s}
  .req-card:hover{transform:translateY(-6px);border-color:rgba(212,175,55,.45);
    background:rgba(15,36,71,.75)}
  .req-card:hover::after{transform:scaleX(1)}
  .req-num{font-family:'Courier New',monospace;font-size:12px;color:var(--gold);
    letter-spacing:3px;margin-bottom:16px;display:block}
  .req-card h3{font-size:17px;margin-bottom:10px;letter-spacing:.4px}
  .req-card p{font-size:13.5px;color:var(--steel)}

  /* ---------- ТРЕКЕР ---------- */
  .tracker{max-width:1100px;margin:0 auto 100px;padding:0 24px}
  .track-line{display:flex;justify-content:space-between;position:relative;
    margin-top:40px;gap:10px}
  .track-line::before{content:'';position:absolute;top:19px;left:6%;right:6%;
    height:2px;background:rgba(143,168,200,.2)}
  .track-fill{position:absolute;top:19px;left:6%;height:2px;
    background:linear-gradient(90deg,var(--ok),var(--gold));
    box-shadow:0 0 12px rgba(212,175,55,.6);transition:width .7s cubic-bezier(.2,.9,.3,1)}
  .step{position:relative;z-index:2;text-align:center;flex:1}
  .step .node{
    width:40px;height:40px;margin:0 auto 14px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    font-family:'Courier New',monospace;font-size:13px;font-weight:700;
    background:var(--navy-900);border:2px solid rgba(143,168,200,.3);
    color:var(--steel);transition:.3s;
  }
  .step.done .node{border-color:var(--ok);color:var(--ok);
    box-shadow:0 0 20px rgba(61,220,132,.45)}
  .step.active .node{border-color:var(--gold);color:var(--gold);
    animation:nodePulse 1.8s infinite}
  @keyframes nodePulse{
    0%,100%{box-shadow:0 0 14px rgba(212,175,55,.4)}
    50%{box-shadow:0 0 30px rgba(212,175,55,.9)}
  }
  .step span{font-family:'Courier New',monospace;font-size:11px;letter-spacing:1.6px;
    text-transform:uppercase;color:var(--steel)}
  .step.done span{color:var(--ok)}
  .step.active span{color:var(--gold-soft)}

  /* ---------- FOOTER ---------- */
  footer{border-top:1px solid rgba(212,175,55,.2);background:rgba(5,11,26,.9);
    padding:50px 24px 30px}
  .foot-inner{max-width:1280px;margin:0 auto;display:grid;
    grid-template-columns:1.4fr 1fr 1fr;gap:40px;margin-bottom:36px}
  .foot-inner h4{font-family:'Courier New',monospace;font-size:12px;letter-spacing:3px;
    text-transform:uppercase;color:var(--gold);margin-bottom:18px}
  .foot-inner p,.foot-inner a{font-size:13.5px;color:var(--steel);
    text-decoration:none;display:block;margin-bottom:9px;transition:.25s}
  .foot-inner a:hover{color:var(--gold-soft);padding-left:5px}
  .copy{max-width:1280px;margin:0 auto;border-top:1px solid rgba(143,168,200,.12);
    padding-top:22px;text-align:center;font-family:'Courier New',monospace;
    font-size:11px;letter-spacing:1.5px;color:rgba(143,168,200,.6)}

  /* ---------- TOAST ---------- */
  .toast{
    position:fixed;bottom:30px;right:30px;z-index:10000;max-width:340px;
    background:linear-gradient(135deg, rgba(15,36,71,.98), rgba(5,11,26,.98));
    border:1px solid var(--ok);border-left:3px solid var(--ok);
    padding:18px 26px;font-family:'Courier New',monospace;font-size:13px;
    letter-spacing:1px;color:var(--white);
    box-shadow:0 0 40px rgba(61,220,132,.3);
    transform:translateX(140%);
    transition:.45s cubic-bezier(.2,.9,.3,1.4);
  }
  .toast.show{transform:translateX(0)}
  .toast b{color:var(--ok);display:block;margin-bottom:4px;letter-spacing:2px}

  /* ---------- АДАПТИВ ---------- */
  @media (max-width:980px){
    .hero{grid-template-columns:1fr;padding-top:50px}
    .badge-stage{min-height:300px;order:-1}
    .badge-svg{width:180px}
    .hex-frame{width:260px;height:260px}
    .badge-stage::before{width:240px;height:240px}
    .badge-stage::after{width:300px;height:300px}
    .stats{grid-template-columns:repeat(2,1fr)}
    .reqs{grid-template-columns:1fr}
    .form-grid{grid-template-columns:1fr}
    .foot-inner{grid-template-columns:1fr;gap:28px}
    nav ul{display:none}
    .track-line{flex-direction:column;gap:26px}
    .track-line::before,.track-fill{display:none}
    .panel{padding:28px 22px}
    .clock{display:none}
  }
  @media (max-width:520px){
    .stats{grid-template-columns:1fr}
    .nav{padding:12px 16px}
    .brand-text b{font-size:13px}
    .toast{right:16px;left:16px;max-width:none}
  }
</style>
</head>
<body>

<div class="bg-grid"></div>
<div class="bg-glow"></div>
<div class="scanlines"></div>

<div id="root"></div>

<script type="text/babel" data-presets="react">
const { useState, useEffect, useRef } = React;

/* ============================================================
   ДАННЫЕ
   ============================================================ */
const STATS = [
  { value: 1248,  decimals: 0, suffix: '',   label: 'Действующих офицеров' },
  { value: 24,    decimals: 0, suffix: '/7', label: 'Приём заявок' },
  { value: 98.4,  decimals: 1, suffix: '%',  label: 'Точность отбора' },
  { value: 12,    decimals: 0, suffix: '',   label: 'Этапов проверки' },
];

const REQUIREMENTS = [
  { num:'01 / BASE',     title:'Возраст и гражданство',
    text:'Минимум 21 год на момент подачи. Гражданство США либо постоянный вид на жительство.' },
  { num:'02 / PHYSICAL', title:'Физическая форма',
    text:'Сдача нормативов: бег, силовые упражнения, тест на выносливость. Медкомиссия обязательна.' },
  { num:'03 / CLEAN',    title:'Чистая биография',
    text:'Отсутствие судимостей, положительные характеристики, успешное прохождение полиграфа.' },
  { num:'04 / EDU',      title:'Образование',
    text:'Диплом средней школы или эквивалент. Приветствуется юридическое или военное образование.' },
  { num:'05 / PSYCH',    title:'Психологическая устойчивость',
    text:'Обязательное тестирование и собеседование с профильным психологом департамента.' },
  { num:'06 / ACADEMY',  title:'Академия',
    text:'Успешное окончание 16-недельного курса подготовки и стажировки под наставничеством.' },
];

const STEPS = ['Заявка','Скрининг','Проверка','Интервью','Полиграф','Академия'];

const POSITIONS = [
  'Deputy Sheriff — Patrol',
  'Detective / Investigator',
  'Corrections Officer',
  'K-9 Unit',
  'SWAT / Special Operations',
  'Dispatch / Communications',
];

const EMPTY_FORM = {
  first:'', last:'', email:'', phone:'', dob:'',
  citizen:'', position:'', education:'',
  experience:'', motivation:''
};

/* ============================================================
   ХУКИ
   ============================================================ */

/* Плавный счётчик для блока статистики */
function useCountUp(target, decimals = 0, duration = 1500) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let raf, t0;
        const tick = (t) => {
          if (!t0) t0 = t;
          const p = Math.min((t - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(target * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  const formatted = decimals
    ? val.toFixed(decimals)
    : Math.round(val).toLocaleString('ru-RU').replace(/\u00A0/g, ' ');

  return [ref, formatted];
}

/* Живые часы в шапке */
function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = n => String(n).padStart(2, '0');
  return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

/* ============================================================
   КОМПОНЕНТЫ
   ============================================================ */
function BadgeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100">
      <polygon points="50,4 92,26 92,74 50,96 8,74 8,26"
               fill="#0f2447" stroke="#d4af37" strokeWidth="3" />
      <polygon points="50,16 82,33 82,67 50,84 18,67 18,33"
               fill="none" stroke="#2a6fd6" strokeWidth="2" />
      <path d="M50 30 L56 46 L73 46 L59 56 L64 72 L50 62 L36 72 L41 56 L27 46 L44 46 Z"
            fill="#d4af37" />
    </svg>
  );
}

function HeroBadge() {
  return (
    <svg className="badge-svg" viewBox="0 0 100 100">
      <polygon points="50,4 92,26 92,74 50,96 8,74 8,26"
               fill="#0a1730" stroke="#d4af37" strokeWidth="2.5" />
      <polygon points="50,12 85,30 85,70 50,88 15,70 15,30"
               fill="none" stroke="#2a6fd6" strokeWidth="1.5" />
      <polygon points="50,20 78,34 78,66 50,80 22,66 22,34"
               fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.6" />
      <path d="M50 28 L57 46 L76 46 L61 57 L67 75 L50 64 L33 75 L39 57 L24 46 L43 46 Z"
            fill="#d4af37" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="#d4af37"
              strokeWidth="0.8" strokeDasharray="3 6" opacity="0.7" />
    </svg>
  );
}

function Header({ onNav }) {
  const time = useClock();
  return (
    <header>
      <div className="nav">
        <a href="#" className="brand" onClick={e => { e.preventDefault(); onNav('top'); }}>
          <BadgeIcon className="badge-logo" />
          <div className="brand-text">
            <b>Sheriff Dept.</b>
            <span>Application Portal</span>
          </div>
        </a>

        <div className="nav-right">
          <nav>
            <ul>
              <li><a href="#form" onClick={e => { e.preventDefault(); onNav('form'); }}>Заявка</a></li>
              <li><a href="#reqs" onClick={e => { e.preventDefault(); onNav('reqs'); }}>Требования</a></li>
              <li><a href="#status" onClick={e => { e.preventDefault(); onNav('status'); }}>Статус</a></li>
            </ul>
          </nav>
          <div className="clock">◉ SECURE {time}</div>
          <button className="nav-cta" onClick={() => onNav('form')}>Подать заявку</button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onNav }) {
  return (
    <section className="hero">
      <div>
        <div className="tagline"><span className="dot-live"></span> Набор открыт · 2026</div>
        <h1>
          Служи <span className="gold">Закону.</span><br />
          <span className="thin">Защищай округ.</span>
        </h1>
        <p>
          Официальный портал подачи заявок на службу в Департаменте Шерифа.
          Прозрачный отбор, шифрование данных, отслеживание статуса в реальном времени.
        </p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => onNav('form')}>Начать заявку</button>
          <button className="btn-ghost" onClick={() => onNav('reqs')}>Требования</button>
        </div>
      </div>

      <div className="badge-stage">
        <div className="hex-frame"></div>
        <HeroBadge />
      </div>
    </section>
  );
}

function StatItem({ value, decimals, suffix, label }) {
  const [ref, formatted] = useCountUp(value, decimals);
  return (
    <div className="stat" ref={ref}>
      <b>{formatted}{suffix}</b>
      <span>{label}</span>
    </div>
  );
}

function Stats() {
  return (
    <div className="stats">
      {STATS.map((s, i) => <StatItem key={i} {...s} />)}
    </div>
  );
}

/* ---------- ФОРМА ---------- */
function Field({ label, full, error, children }) {
  return (
    <div className={`field${full ? ' full' : ''}${error ? ' err' : ''}`}>
      <label>{label}</label>
      {children}
      {error && <span className="err-msg">⚠ {error}</span>}
    </div>
  );
}

function ApplicationForm({ onSubmitted }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [checks, setChecks] = useState([false, false, false]);
  const [errors, setErrors] = useState({});
  const [note, setNote] = useState('ID заявки будет присвоен автоматически');

  const set = (name) => (e) => {
    setForm(f => ({ ...f, [name]: e.target.value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: null }));
  };

  const toggleCheck = (i) => (e) => {
    const next = [...checks];
    next[i] = e.target.checked;
    setChecks(next);
  };

  const validate = () => {
    const er = {};
    if (!form.first.trim())  er.first = 'Укажите имя';
    if (!form.last.trim())   er.last  = 'Укажите фамилию';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'Некорректный email';
    if (form.phone.replace(/\D/g, '').length < 7) er.phone = 'Некорректный телефон';
    if (!form.dob)           er.dob   = 'Укажите дату рождения';
    if (!form.citizen)       er.citizen = 'Выберите вариант';
    if (!form.position)      er.position = 'Выберите должность';
    if (!form.education)     er.education = 'Выберите образование';
    if (form.experience.trim().length < 20) er.experience = 'Минимум 20 символов';
    if (form.motivation.trim().length < 20) er.motivation = 'Минимум 20 символов';
    setErrors(er);

    if (Object.keys(er).length) {
      setNote('⚠ Исправьте выделенные поля');
      return false;
    }
    if (!checks.every(Boolean)) {
      setNote('⚠ Подтвердите все три пункта ниже');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const id = 'SHR-' + Math.floor(100000 + Math.random() * 900000);

    onSubmitted({
      id,
      name: `${form.first} ${form.last}`,
      position: form.position,
    });

    setForm(EMPTY_FORM);
    setChecks([false, false, false]);
    setErrors({});
    setNote('ID заявки будет присвоен автоматически');
  };

  return (
    <section className="form-wrap" id="form">
      <div className="sec-head">
        <span className="kicker">// Secure Form v3.2</span>
        <h2>Заявка на <em>службу</em></h2>
        <div className="bar"></div>
      </div>

      <div className="panel">
        <div className="panel-title">Форма SHR-101</div>
        <div className="panel-sub">Все поля обязательны. Данные передаются по шифрованному каналу.</div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">

            <Field label={<>Имя <i>*</i></>} error={errors.first}>
              <input type="text" value={form.first} onChange={set('first')} placeholder="Джон" />
            </Field>

            <Field label={<>Фамилия <i>*</i></>} error={errors.last}>
              <input type="text" value={form.last} onChange={set('last')} placeholder="Уэйн" />
            </Field>

            <Field label={<>Email <i>*</i></>} error={errors.email}>
              <input type="email" value={form.email} onChange={set('email')} placeholder="john@example.com" />
            </Field>

            <Field label={<>Телефон <i>*</i></>} error={errors.phone}>
              <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 (555) 000-0000" />
            </Field>

            <Field label={<>Дата рождения <i>*</i></>} error={errors.dob}>
              <input type="date" value={form.dob} onChange={set('dob')} />
            </Field>

            <Field label={<>Гражданство <i>*</i></>} error={errors.citizen}>
              <select value={form.citizen} onChange={set('citizen')}>
                <option value="">— Выберите —</option>
                <option>Гражданин США</option>
                <option>Постоянный резидент</option>
                <option>Иное (требуется проверка)</option>
              </select>
            </Field>

            <Field label={<>Желаемая должность <i>*</i></>} error={errors.position}>
              <select value={form.position} onChange={set('position')}>
                <option value="">— Выберите —</option>
                {POSITIONS.map(p => <option key={p}>{p}</option>)}
              </select>
            </Field>

            <Field label={<>Образование <i>*</i></>} error={errors.education}>
              <select value={form.education} onChange={set('education')}>
                <option value="">— Выберите —</option>
                <option>Среднее</option>
                <option>Среднее специальное</option>
                <option>Бакалавр</option>
                <option>Магистр и выше</option>
              </select>
            </Field>

            <Field label={<>Опыт службы / работы <i>*</i></>} full error={errors.experience}>
              <textarea value={form.experience} onChange={set('experience')}
                placeholder="Опишите военную службу, работу в правоохранительных органах, охране или иной релевантный опыт..." />
            </Field>

            <Field label={<>Мотивация <i>*</i></>} full error={errors.motivation}>
              <textarea value={form.motivation} onChange={set('motivation')}
                placeholder="Почему вы хотите служить в Департаменте Шерифа?" />
            </Field>

          </div>

          <div className="checks">
            <label className="check">
              <input type="checkbox" checked={checks[0]} onChange={toggleCheck(0)} />
              <span>Подтверждаю отсутствие судимостей и согласен(на) на полную биографическую проверку.</span>
            </label>
            <label className="check">
              <input type="checkbox" checked={checks[1]} onChange={toggleCheck(1)} />
              <span>Согласен(на) на прохождение медицинского осмотра, психологического теста и полиграфа.</span>
            </label>
            <label className="check">
              <input type="checkbox" checked={checks[2]} onChange={toggleCheck(2)} />
              <span>Подтверждаю достоверность предоставленных данных.</span>
            </label>
          </div>

          <div className="submit-row">
            <button type="submit" className="btn-primary">Отправить заявку →</button>
            <small className={note.startsWith('⚠') ? 'bad' : ''}>{note}</small>
          </div>
        </form>
      </div>
    </section>
  );
}

function Requirements() {
  return (
    <section className="reqs" id="reqs">
      {REQUIREMENTS.map(r => (
        <div className="req-card" key={r.num}>
          <span className="req-num">{r.num}</span>
          <h3>{r.title}</h3>
          <p>{r.text}</p>
        </div>
      ))}
    </section>
  );
}

function Tracker({ stage }) {
  const pct = STEPS.length > 1 ? (stage / (STEPS.length - 1)) * 88 : 0;
  return (
    <section className="tracker" id="status">
      <div className="sec-head">
        <span className="kicker">// Live Tracking</span>
        <h2>Этапы <em>отбора</em></h2>
        <div className="bar"></div>
      </div>

      <div className="track-line">
        <div className="track-fill" style={{ width: `${pct}%` }}></div>
        {STEPS.map((label, i) => {
          const cls = i < stage ? 'done' : i === stage ? 'active' : '';
          return (
            <div className={`step ${cls}`} key={label}>
              <div className="node">{String(i + 1).padStart(2, '0')}</div>
              <span>{label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="foot-inner">
        <div>
          <h4>Sheriff Department</h4>
          <p>Официальный портал подачи заявок на службу.</p>
          <p>Лицензия № SHR-2026-0087</p>
          <p>Шифрование: AES-256 / TLS 1.3</p>
        </div>
        <div>
          <h4>Навигация</h4>
          <a href="#form">Подать заявку</a>
          <a href="#reqs">Требования</a>
          <a href="#status">Статус отбора</a>
        </div>
        <div>
          <h4>Контакты</h4>
          <a href="#">hotline@sheriff.gov</a>
          <a href="#">+1 (800) 555-0199</a>
          <a href="#">Экстренно: 911</a>
        </div>
      </div>
      <div className="copy">
        © 2026 SHERIFF DEPARTMENT — ALL RIGHTS RESERVED · IN LAW WE TRUST
      </div>
    </footer>
  );
}

function Toast({ data }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!data) return;
    setVisible(true);
    const id = setTimeout(() => setVisible(false), 5200);
    return () => clearTimeout(id);
  }, [data]);

  if (!data) return null;

  return (
    <div className={`toast${visible ? ' show' : ''}`}>
      <b>✓ ЗАЯВКА ПРИНЯТА</b>
      <span>{data.id} · {data.name}</span>
    </div>
  );
}

/* ============================================================
   ПРИЛОЖЕНИЕ
   ============================================================ */
function App() {
  const [stage, setStage] = useState(2);      // активный этап трекера
  const [toast, setToast] = useState(null);

  const scrollTo = (id) => {
    if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmitted = (payload) => {
    setToast(payload);
    setStage(3); // сдвигаем прогресс на «Интервью»
  };

  return (
    <>
      <Header onNav={scrollTo} />
      <Hero onNav={scrollTo} />
      <Stats />
      <ApplicationForm onSubmitted={handleSubmitted} />
      <Requirements />
      <Tracker stage={stage} />
      <Footer />
      <Toast data={toast} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
</script>
</body>
</html>
