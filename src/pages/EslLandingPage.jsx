import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const TRANSLATIONS = {
  en: {
    navLinks: ['Courses', 'Pricing', 'About', 'Testimonials', 'Contact'],
    navLogin: 'Login', navBook: 'Start Free',
    heroLabel: 'Online English Learning Platform',
    heroTitle1: 'Speak English', heroTitle2: 'With Confidence.',
    heroSub: 'Live 1-on-1 lessons with certified ESL teachers from the Philippines. Flexible scheduling, proven methods, and real results — from beginner to fluent.',
    heroCta1: 'Book Free Trial ↗', heroCta2: 'View Courses',
    coursesLabel: 'What We Offer', coursesTitle1: 'Courses Built for', coursesTitle2: 'Every Learner',
    coursesSub: 'Structured programs taught by experienced ESL teachers, designed to get you speaking naturally.',
    aboutLabel: 'About Speakora', aboutTitle1: 'Trusted by Thousands', aboutTitle2: 'of English Learners',
    aboutP1: 'Speakora is a live online English school connecting students worldwide with certified Filipino ESL teachers. We combine structured curriculum with real conversation practice to accelerate fluency.',
    aboutP2: "Founded with a mission to make quality English education accessible and affordable, we've helped thousands of students gain the confidence to speak English in work, travel, and daily life.",
    aboutTags: ['Certified ESL Teachers', 'Live 1-on-1 Lessons', 'Flexible Scheduling', 'Progress Tracking'],
    pricingLabel: 'Pricing Plans', pricingTitle1: 'Simple, Transparent', pricingTitle2: 'Pricing',
    pricingSub: 'No hidden fees. Choose a plan that fits your learning goals and schedule.', pricingPopular: 'Most Popular',
    testimonialsLabel: 'Student Stories', testimonialsTitle1: 'What Our Students', testimonialsTitle2: 'Are Saying',
    contactLabel: 'Get In Touch', contactTitle1: 'Book Your Free', contactTitle2: 'Trial Lesson',
    contactSub: 'Fill out the form and a teacher will reach out within 2 hours to schedule your free trial.',
    formName: 'Full Name', formNamePh: 'Your full name',
    formEmail: 'Email Address', formEmailPh: 'you@email.com',
    formPhone: 'Phone / WhatsApp', formPhonePh: '+63 9XX XXX XXXX',
    formLevel: 'English Level', formLevelPh: 'Select your level',
    formMessage: 'Goals / Message', formMessagePh: 'What do you want to achieve with English?',
    formSubmit: 'Book Free Trial Lesson ↗',
    successTitle: "You're In!", successSub: "We'll contact you within 2 hours to confirm your free trial lesson.",
    footerRights: '© 2026 Speakora. All rights reserved.',
    footerLinks: ['Courses', 'Pricing', 'About', 'Contact'],
    quoteOpen: '"', quoteClose: '"',
  },
  fil: {
    navLinks: ['Mga Kurso', 'Presyo', 'Tungkol', 'Testimonya', 'Makipag-ugnayan'],
    navLogin: 'Mag-login', navBook: 'Magsimula Libre',
    heroLabel: 'Online na Plataporma sa Pag-aaral ng Ingles',
    heroTitle1: 'Mag-Ingles nang', heroTitle2: 'May Kumpiyansa.',
    heroSub: 'Live na 1-on-1 na leksyon kasama ang mga sertipikadong guro ng ESL mula Pilipinas. Flexible na iskedyul, napatunayang pamamaraan, at tunay na resulta.',
    heroCta1: 'Mag-book ng Libreng Trial ↗', heroCta2: 'Tingnan ang Kurso',
    coursesLabel: 'Aming Inaalok', coursesTitle1: 'Mga Kursong Para sa', coursesTitle2: 'Bawat Mag-aaral',
    coursesSub: 'Mga nakaistraktura na programa na itinuro ng mga may karanasang guro ng ESL.',
    aboutLabel: 'Tungkol sa Speakora', aboutTitle1: 'Pinagkakatiwalaan ng Libo-libo', aboutTitle2: 'na Mag-aaral ng Ingles',
    aboutP1: 'Ang Speakora ay isang live online na paaralan ng Ingles na nagkokonekta sa mga mag-aaral sa buong mundo sa mga sertipikadong guro ng ESL mula Pilipinas.',
    aboutP2: 'Itinatag na may misyon na gawing accessible at abot-kaya ang kalidad na edukasyon sa Ingles, nakatulong na kami sa libu-libong mag-aaral.',
    aboutTags: ['Sertipikadong Guro', 'Live na Leksyon', 'Flexible na Iskedyul', 'Pagsubaybay ng Progreso'],
    pricingLabel: 'Mga Plano', pricingTitle1: 'Simple at Malinaw', pricingTitle2: 'na Presyo',
    pricingSub: 'Walang nakatagong bayarin. Pumili ng plano na angkop sa iyong mga layunin.', pricingPopular: 'Pinakasikat',
    testimonialsLabel: 'Mga Kwento ng Mag-aaral', testimonialsTitle1: 'Sinabi ng', testimonialsTitle2: 'Aming mga Mag-aaral',
    contactLabel: 'Makipag-ugnayan', contactTitle1: 'I-book ang Iyong Libreng', contactTitle2: 'Trial na Leksyon',
    contactSub: 'Punan ang form at makikipag-ugnayan sa inyo ang isang guro sa loob ng 2 oras.',
    formName: 'Buong Pangalan', formNamePh: 'Iyong pangalan',
    formEmail: 'Email', formEmailPh: 'ikaw@email.com',
    formPhone: 'Telepono / WhatsApp', formPhonePh: '+63 9XX XXX XXXX',
    formLevel: 'Antas ng Ingles', formLevelPh: 'Piliin ang iyong antas',
    formMessage: 'Mga Layunin / Mensahe', formMessagePh: 'Ano ang gusto mong makamit sa Ingles?',
    formSubmit: 'Mag-book ng Libreng Trial ↗',
    successTitle: 'Naka-book Na!', successSub: 'Makikipag-ugnayan kami sa inyo sa loob ng 2 oras.',
    footerRights: '© 2026 Speakora. Lahat ng karapatan ay nakalaan.',
    footerLinks: ['Mga Kurso', 'Presyo', 'Tungkol', 'Makipag-ugnayan'],
    quoteOpen: '"', quoteClose: '"',
  },
  ja: {
    navLinks: ['コース', '料金', '私たちについて', 'お客様の声', 'お問い合わせ'],
    navLogin: 'ログイン', navBook: '無料で始める',
    heroLabel: 'オンライン英語学習プラットフォーム',
    heroTitle1: '自信を持って', heroTitle2: '英語を話そう。',
    heroSub: 'フィリピン人認定ESL講師とのライブ1対1レッスン。柔軟なスケジュール、実証済みの学習法で、初心者から流暢なレベルまで。',
    heroCta1: '無料体験を予約 ↗', heroCta2: 'コースを見る',
    coursesLabel: '提供コース', coursesTitle1: 'すべての学習者のための', coursesTitle2: 'コース',
    coursesSub: '経験豊富なESL講師が教える体系的なプログラムで、自然な英会話力を養います。',
    aboutLabel: 'Speakoraについて', aboutTitle1: '何千人もの', aboutTitle2: '英語学習者に信頼される',
    aboutP1: 'Speakoraは、世界中の学習者とフィリピン人認定ESL講師をつなぐライブオンライン英語スクールです。',
    aboutP2: '質の高い英語教育をアクセスしやすく手頃な価格で提供するという使命のもと、多くの学習者が仕事・旅行・日常生活で英語を話せるようになりました。',
    aboutTags: ['認定ESL講師', 'ライブ1対1レッスン', '柔軟なスケジュール', '進捗管理'],
    pricingLabel: '料金プラン', pricingTitle1: 'シンプルで透明な', pricingTitle2: '料金体系',
    pricingSub: '隠れた費用は一切なし。学習目標とスケジュールに合ったプランをお選びください。', pricingPopular: '人気No.1',
    testimonialsLabel: '生徒の声', testimonialsTitle1: '生徒さんたちの', testimonialsTitle2: 'リアルな感想',
    contactLabel: 'お問い合わせ', contactTitle1: '無料体験レッスンを', contactTitle2: '予約する',
    contactSub: 'フォームにご記入いただくと、2時間以内に講師よりご連絡いたします。',
    formName: 'お名前', formNamePh: '山田 太郎',
    formEmail: 'メールアドレス', formEmailPh: 'taro@example.com',
    formPhone: '電話 / WhatsApp', formPhonePh: '090-XXXX-XXXX',
    formLevel: '英語レベル', formLevelPh: 'レベルを選択',
    formMessage: '目標 / メッセージ', formMessagePh: '英語で達成したいことを教えてください',
    formSubmit: '無料体験レッスンを予約 ↗',
    successTitle: '予約完了！', successSub: '2時間以内に無料体験レッスンの確認のためご連絡いたします。',
    footerRights: '© 2026 Speakora. All rights reserved.',
    footerLinks: ['コース', '料金', '私たちについて', 'お問い合わせ'],
    quoteOpen: '「', quoteClose: '」',
  },
};

const NAV_IDS = ['courses', 'pricing', 'about', 'testimonials', 'contact'];
const L = (en, fil, ja) => ({ en, fil, ja });

const COURSES = [
  { icon: '🗣️', title: L('Conversational English','Conversational English','英会話'), desc: L('Build real speaking confidence through daily conversation practice with a certified teacher.','Bumuo ng totoong kumpiyansa sa pagsasalita.','認定講師との毎日の会話練習で話す自信をつけます。'), badge: 'Most Popular', color: '#0ea5e9' },
  { icon: '💼', title: L('Business English','Business English','ビジネス英語'), desc: L('Emails, presentations, meetings and negotiations — master professional English for the workplace.','Emails, presentations, meetings — master professional English para sa trabaho.','メール・プレゼン・会議など職場の英語をマスター。'), badge: 'Career Focus', color: '#6366f1' },
  { icon: '📝', title: L('IELTS / TOEIC Prep','IELTS / TOEIC Prep','IELTS / TOEIC対策'), desc: L('Targeted exam preparation with practice tests, strategies, and personalized coaching.','Targeted na paghahanda sa exam kasama ang practice tests at coaching.','模擬試験・戦略・個別指導による的を絞った試験対策。'), badge: 'Exam Ready', color: '#8b5cf6' },
  { icon: '👶', title: L('Kids English','Kids English','キッズ英語'), desc: L('Fun, engaging lessons designed for children ages 5–15 with games, songs, and stories.','Masaya at engaging na leksyon para sa mga bata edad 5–15.','5〜15歳向けのゲーム・歌・物語を使った楽しいレッスン。'), badge: 'Ages 5–15', color: '#34d399' },
  { icon: '✈️', title: L('Travel English','Travel English','旅行英語'), desc: L('Essential phrases for airports, hotels, restaurants, and navigating any English-speaking country.','Mahahalagang parirala para sa paliparan, hotel, at paglalakbay.','空港・ホテル・レストランなど旅行に必要な英語フレーズ。'), badge: 'For Travelers', color: '#f59e0b' },
  { icon: '🎯', title: L('Pronunciation & Accent','Pronunciation & Accent','発音・アクセント'), desc: L('Reduce your accent, sharpen clarity, and speak with a natural, confident English flow.','Bawasan ang accent at magsalita nang natural at may kumpiyansa.','アクセントを改善し自然な英語を身につけます。'), badge: 'Clarity Focus', color: '#ec4899' },
];

const PRICING = [
  {
    name: L('Starter','Starter','スターター'), price: '₱1,499', period: '/month',
    desc: L('Perfect for beginners','Para sa mga baguhan','初心者に最適'),
    features: L(
      ['8 lessons per month (25 min)', 'Certified ESL teacher', 'Basic study materials', 'Email support', 'Progress report'],
      ['8 leksyon bawat buwan (25 min)', 'Sertipikadong guro', 'Pangunahing materyales', 'Email support', 'Ulat ng progreso'],
      ['月8レッスン（25分）', '認定ESL講師', '基本教材', 'メールサポート', '進捗レポート']
    ),
    cta: L('Get Started','Magsimula Na','始める'), highlight: false,
  },
  {
    name: L('Fluency','Fluency','フルエンシー'), price: '₱2,799', period: '/month',
    desc: L('Most popular for fast results','Pinakasikat para sa mabilis na resulta','最速上達に人気No.1'),
    features: L(
      ['20 lessons per month (50 min)', 'Choose your teacher', 'Full curriculum access', 'WhatsApp teacher access', 'Weekly progress review', 'Free rescheduling'],
      ['20 leksyon bawat buwan (50 min)', 'Pumili ng guro', 'Buong curriculum', 'WhatsApp access sa guro', 'Lingguhang review', 'Libreng rescheduling'],
      ['月20レッスン（50分）', '講師選択可', 'カリキュラム全アクセス', 'WhatsApp講師アクセス', '週次進捗レビュー', '無料振替']
    ),
    cta: L('Start Learning','Magsimulang Matuto','学習を始める'), highlight: true,
  },
  {
    name: L('Intensive','Intensive','インテンシブ'), price: '₱4,999', period: '/month',
    desc: L('Maximum results, fastest fluency','Maximum na resulta, pinakamabilis na fluency','最大の成果、最速の流暢さ'),
    features: L(
      ['Unlimited lessons (50 min)', 'Dedicated teacher', 'Custom learning plan', '24/7 teacher messaging', 'Exam prep included', 'Priority scheduling', 'Certificate on completion'],
      ['Walang limitasyong leksyon', 'Dedikadong guro', 'Custom na plano', '24/7 messaging sa guro', 'Kasama ang exam prep', 'Priority scheduling', 'Sertipiko'],
      ['レッスン無制限（50分）', '専任講師', 'カスタム学習プラン', '24時間講師メッセージ', '試験対策込み', '優先スケジュール', '修了証書']
    ),
    cta: L('Go Intensive','Maging Intensive','集中コースへ'), highlight: false,
  },
];

const TESTIMONIALS = [
  { name: 'Yuki Tanaka', role: 'Software Engineer, Tokyo', text: L('After 3 months with Speakora I passed my TOEIC with 890 points. My teacher was incredibly patient and always pushed me to do better.','Pagkatapos ng 3 buwan sa Speakora, pumasa ako sa TOEIC na may 890 puntos!','Speakoraで3ヶ月学び、TOEICで890点を取得。先生がとても丁寧でした。'), rating: 5, avatar: 'YT', country: '🇯🇵' },
  { name: 'Marco Bianchi', role: 'Marketing Manager, Milan', text: L('My business English improved dramatically. I can now lead international meetings with confidence. Worth every peso.','Malaki ang pagbabago ng aking Business English. Kayang-kaya ko na ang mga international meetings.','ビジネス英語が劇的に向上。今では国際会議をリードできます。'), rating: 5, avatar: 'MB', country: '🇮🇹' },
  { name: 'Priya Sharma', role: 'Nurse, Dubai', text: L('Speakora helped me prepare for my nursing licensure interview in the UK. I got the job! The teachers here are world-class.','Tinulungan ako ng Speakora para sa aking UK nursing interview. Natanggap ako!','SpreakoraのおかげでUKの面接を突破。採用されました！'), rating: 5, avatar: 'PS', country: '🇮🇳' },
  { name: 'Ana Gonzalez', role: 'Student, Mexico City', text: L('I tried many apps but nothing worked until Speakora. Real teachers, real conversations. My English went from broken to confident in 4 months.','Subukan ko ang maraming apps pero Speakora lang ang nagtrabaho. Totoong guro, totoong conversation.','多くのアプリを試しましたが、Speakoraだけが効果的でした。4ヶ月で上達しました。'), rating: 5, avatar: 'AG', country: '🇲🇽' },
];

const STATS = [
  { value: '12,000+', label: L('Students Taught','Mga Natuturuan','指導した学生数') },
  { value: '98%',     label: L('Satisfaction Rate','Satisfaction Rate','満足度') },
  { value: '200+',    label: L('Certified Teachers','Mga Sertipikadong Guro','認定講師数') },
  { value: '40+',     label: L('Countries Served','Mga Bansang Pinaglilingkuran','対応国数') },
];

const LANG_CYCLE  = { en: 'fil', fil: 'ja', ja: 'en' };
const LANG_FLAGS  = { en: '🇬🇧', fil: '🇵🇭', ja: '🇯🇵' };
const LANG_TITLES = { en: 'Switch to Filipino', fil: '日本語に切り替える', ja: 'Switch to English' };
const LEVELS = ['Beginner', 'Elementary', 'Intermediate', 'Upper-Intermediate', 'Advanced'];

// ── SCROLL REVEAL HOOK ────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── ANIMATED STAT COUNTER ─────────────────────────────────────────────────────
function StatCounter({ value, label, color }) {
  const [ref, visible] = useReveal(0.2);
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    if (!visible) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ''));
    const suffix = value.replace(/[0-9.,]/g, '');
    if (isNaN(num)) { setDisplay(value); return; }
    let frame = 0;
    const total = 45;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / total;
      const eased = 1 - Math.pow(1 - progress, 3);
      const cur = num * eased;
      if (frame >= total) { clearInterval(timer); setDisplay(value); }
      else setDisplay((num >= 100 ? Math.floor(cur).toLocaleString() : cur.toFixed(0)) + suffix);
    }, 28);
    return () => clearInterval(timer);
  }, [visible, value]);
  return (
    <div ref={ref}>
      <div style={{ fontSize:'clamp(20px,3.5vw,30px)', fontWeight:800, fontFamily:"'Fraunces',serif", lineHeight:1.1, color: color || 'inherit' }}>{display}</div>
      <div style={{ fontSize:'clamp(10px,1.5vw,12px)', marginTop:4, letterSpacing:'0.5px', opacity:0.6, fontWeight:500 }}>{label}</div>
    </div>
  );
}

// ── REVEAL WRAPPER ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, from = 'bottom' }) {
  const [ref, visible] = useReveal();
  const transforms = { bottom:'translateY(36px)', left:'translateX(-36px)', right:'translateX(36px)', scale:'scale(0.92)' };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : (transforms[from] || transforms.bottom),
      transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ── CURSOR GLOW ───────────────────────────────────────────────────────────────
function CursorGlow({ isLight }) {
  const glowRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 250}px,${e.clientY - 250}px)`;
      }
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div ref={glowRef} style={{
      position:'fixed', top:0, left:0, width:500, height:500,
      borderRadius:'50%', pointerEvents:'none', zIndex:0,
      background: isLight
        ? 'radial-gradient(circle,rgba(14,165,233,0.055) 0%,transparent 68%)'
        : 'radial-gradient(circle,rgba(14,165,233,0.09) 0%,transparent 68%)',
      transition:'transform 0.12s linear',
      willChange:'transform',
    }}/>
  );
}

// ── GRID BACKGROUND ───────────────────────────────────────────────────────────
function GridBackground({ isLight }) {
  return (
    <div style={{ position:'fixed',inset:0,zIndex:0,pointerEvents:'none',overflow:'hidden' }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ opacity: isLight ? 0.25 : 0.1 }}>
        <defs>
          <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#0ea5e9" strokeWidth="0.4"/>
          </pattern>
          <radialGradient id="gf" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="1"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </radialGradient>
          <mask id="gm"><rect width="100%" height="100%" fill="url(#gf)"/></mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" mask="url(#gm)"/>
      </svg>
    </div>
  );
}

// ── FLOATING PARTICLES ────────────────────────────────────────────────────────
function Particles({ isLight }) {
  const pts = useRef(Array.from({length:20},(_,i)=>({
    id:i, x:Math.random()*100, y:Math.random()*100,
    size:Math.random()*2.5+1, delay:Math.random()*8,
    dur:Math.random()*10+14, op:Math.random()*0.45+0.1,
  }))).current;
  return (
    <div style={{ position:'fixed',inset:0,zIndex:0,pointerEvents:'none',overflow:'hidden' }}>
      {pts.map(p=>(
        <div key={p.id} style={{
          position:'absolute', left:`${p.x}%`, top:`${p.y}%`,
          width:p.size, height:p.size, borderRadius:'50%',
          background:'#38bdf8', opacity:isLight?p.op*0.4:p.op,
          animation:`ptFloat ${p.dur}s ease-in-out infinite ${p.delay}s`,
          willChange:'transform,opacity',
        }}/>
      ))}
    </div>
  );
}

// ── TOGGLES ───────────────────────────────────────────────────────────────────
function LangToggle({ lang, setLang, isLight }) {
  const bg = isLight?'rgba(0,0,0,0.05)':'rgba(255,255,255,0.06)';
  const border = isLight?'rgba(0,0,0,0.12)':'rgba(255,255,255,0.12)';
  const color = isLight?'rgba(17,24,39,0.75)':'rgba(232,237,245,0.85)';
  return (
    <div onClick={()=>setLang(l=>LANG_CYCLE[l])} title={LANG_TITLES[lang]}
      style={{ display:'flex',alignItems:'center',gap:6,background:bg,border:`1px solid ${border}`,borderRadius:100,padding:'5px 12px 5px 8px',cursor:'pointer',userSelect:'none',fontSize:13,fontWeight:600,color,flexShrink:0,transition:'all 0.2s' }}
      onMouseEnter={e=>e.currentTarget.style.background=isLight?'rgba(0,0,0,0.08)':'rgba(255,255,255,0.1)'}
      onMouseLeave={e=>e.currentTarget.style.background=bg}
    >
      <div style={{ display:'flex',background:isLight?'rgba(0,0,0,0.06)':'rgba(255,255,255,0.08)',borderRadius:100,padding:'2px',gap:2 }}>
        {['en','fil','ja'].map(c=>(
          <span key={c} style={{ padding:'2px 7px',borderRadius:100,fontSize:11,fontWeight:700,
            background:lang===c?'linear-gradient(135deg,#0ea5e9,#6366f1)':'transparent',
            color:lang===c?'#fff':isLight?'rgba(17,24,39,0.4)':'rgba(232,237,245,0.4)',transition:'all 0.2s' }}>
            {c==='en'?'EN':c==='fil'?'FIL':'JA'}
          </span>
        ))}
      </div>
      <span style={{ fontSize:14 }}>{LANG_FLAGS[lang]}</span>
    </div>
  );
}

function ThemeToggle({ theme, setTheme, isLight }) {
  const bg = isLight?'rgba(0,0,0,0.05)':'rgba(255,255,255,0.06)';
  const border = isLight?'rgba(0,0,0,0.12)':'rgba(255,255,255,0.12)';
  return (
    <div onClick={()=>setTheme(t=>t==='dark'?'light':'dark')}
      style={{ display:'flex',alignItems:'center',justifyContent:'center',width:36,height:36,background:bg,border:`1px solid ${border}`,borderRadius:'50%',cursor:'pointer',transition:'all 0.2s',userSelect:'none',fontSize:15,flexShrink:0 }}
      onMouseEnter={e=>e.currentTarget.style.background=isLight?'rgba(0,0,0,0.08)':'rgba(255,255,255,0.1)'}
      onMouseLeave={e=>e.currentTarget.style.background=bg}
    >{isLight?'🌙':'☀️'}</div>
  );
}

// ── SECTION HEADER ────────────────────────────────────────────────────────────
function SectionHeader({ label, title1, title2, sub, center=true }) {
  return (
    <Reveal>
      <div style={{ textAlign:center?'center':'left', marginBottom:52 }}>
        <div className="sec-label">{label}</div>
        <h2 className="sec-title">{title1}<br/><span className="grad-text">{title2}</span></h2>
        {sub && <p className="sec-sub" style={{ margin:center?'0 auto':0 }}>{sub}</p>}
      </div>
    </Reveal>
  );
}

// ── AI CHAT WIDGET ────────────────────────────────────────────────────────────
function AIChatWidget({ th, isLight }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role:'assistant', content:"Hi! 👋 I'm the Speakora assistant. Ask me anything about our English courses, pricing, or teachers!" }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(()=>endRef.current?.scrollIntoView({behavior:'smooth'}),100);
      setTimeout(()=>inputRef.current?.focus(),150);
    }
  }, [open, messages]);

  const send = async () => {
    const text = input.trim();
    if (!text||loading) return;
    const next = [...messages,{role:'user',content:text}];
    setMessages(next); setInput(''); setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/chat/support`,{
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({messages:next.map(m=>({role:m.role,content:m.content}))}),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMessages(p=>[...p,{role:'assistant',content:data.reply||'Sorry, try again.'}]);
    } catch {
      setMessages(p=>[...p,{role:'assistant',content:'⚠️ Something went wrong. Please try again.'}]);
    } finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        @keyframes chatPop{from{opacity:0;transform:scale(0.85) translateY(24px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes fabPulse{0%,100%{box-shadow:0 0 0 0 rgba(14,165,233,0.5)}60%{box-shadow:0 0 0 16px rgba(14,165,233,0)}}
        @keyframes dot{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-5px);opacity:1}}
        .chat-fab{position:fixed;bottom:24px;right:20px;z-index:1000;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#0ea5e9,#6366f1);border:none;cursor:pointer;color:#fff;font-size:22px;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 28px rgba(14,165,233,0.4);transition:transform 0.25s cubic-bezier(.34,1.56,.64,1);animation:fabPulse 2.5s ease-in-out infinite}
        .chat-fab:hover{transform:scale(1.14) rotate(-10deg)}
        .chat-win{position:fixed;bottom:92px;right:20px;z-index:1000;width:min(370px,calc(100vw - 24px));border-radius:22px;overflow:hidden;animation:chatPop 0.28s cubic-bezier(.34,1.56,.64,1) both;box-shadow:0 24px 70px rgba(0,0,0,0.3)}
        .chat-msgs::-webkit-scrollbar{width:3px}
        .chat-msgs::-webkit-scrollbar-thumb{background:rgba(14,165,233,0.25);border-radius:2px}
        .tdot{width:6px;height:6px;border-radius:50%;background:#38bdf8;display:inline-block;margin:0 2px}
        .tdot:nth-child(1){animation:dot 1.2s ease-in-out infinite 0s}
        .tdot:nth-child(2){animation:dot 1.2s ease-in-out infinite .2s}
        .tdot:nth-child(3){animation:dot 1.2s ease-in-out infinite .4s}
        @media(max-width:480px){.chat-win{bottom:84px;right:12px;left:12px;width:auto}.chat-fab{bottom:20px;right:16px}}
      `}</style>
      <button className="chat-fab" onClick={()=>setOpen(o=>!o)}>{open?'✕':'💬'}</button>
      {open && (
        <div className="chat-win">
          <div style={{ background:'linear-gradient(135deg,#0ea5e9,#6366f1)',padding:'16px 18px',display:'flex',alignItems:'center',gap:10 }}>
            <div style={{ width:38,height:38,borderRadius:'50%',background:'rgba(255,255,255,0.2)',backdropFilter:'blur(10px)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0 }}>📚</div>
            <div style={{ flex:1 }}>
              <div style={{ color:'#fff',fontWeight:700,fontSize:14 }}>Speakora Support</div>
              <div style={{ color:'rgba(255,255,255,0.75)',fontSize:11,display:'flex',alignItems:'center',gap:5 }}>
                <span style={{ width:6,height:6,borderRadius:'50%',background:'#4ade80',display:'inline-block',boxShadow:'0 0 6px #4ade80' }}/>AI Assistant · Online
              </div>
            </div>
            <button onClick={()=>setOpen(false)} style={{ background:'rgba(255,255,255,0.15)',border:'none',color:'#fff',width:28,height:28,borderRadius:'50%',cursor:'pointer',fontSize:14,display:'flex',alignItems:'center',justifyContent:'center',transition:'background 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.28)'}
              onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.15)'}
            >✕</button>
          </div>
          <div className="chat-msgs" style={{ height:300,overflowY:'auto',padding:'14px 12px',background:isLight?'#f0f9ff':'#04090f',display:'flex',flexDirection:'column',gap:10 }}>
            {messages.map((m,i)=>(
              <div key={i} style={{ display:'flex',justifyContent:m.role==='user'?'flex-end':'flex-start',alignItems:'flex-end',gap:7 }}>
                {m.role==='assistant'&&<div style={{ width:26,height:26,borderRadius:'50%',background:'linear-gradient(135deg,#0ea5e9,#6366f1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,flexShrink:0,boxShadow:'0 2px 8px rgba(14,165,233,0.3)' }}>📚</div>}
                <div style={{ maxWidth:'76%',padding:'10px 14px',
                  borderRadius:m.role==='user'?'18px 18px 4px 18px':'18px 18px 18px 4px',
                  background:m.role==='user'?'linear-gradient(135deg,#0ea5e9,#6366f1)':(isLight?'#fff':'rgba(255,255,255,0.07)'),
                  color:m.role==='user'?'#fff':th.color,
                  border:m.role==='user'?'none':`1px solid ${isLight?'rgba(14,165,233,0.12)':'rgba(255,255,255,0.1)'}`,
                  fontSize:13,lineHeight:1.6,
                  boxShadow:m.role==='user'?'0 4px 14px rgba(14,165,233,0.25)':'none',
                }}>{m.content}</div>
              </div>
            ))}
            {loading&&(
              <div style={{ display:'flex',alignItems:'flex-end',gap:7 }}>
                <div style={{ width:26,height:26,borderRadius:'50%',background:'linear-gradient(135deg,#0ea5e9,#6366f1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,flexShrink:0 }}>📚</div>
                <div style={{ padding:'10px 14px',borderRadius:'18px 18px 18px 4px',background:isLight?'#fff':'rgba(255,255,255,0.07)',border:`1px solid ${isLight?'rgba(14,165,233,0.12)':'rgba(255,255,255,0.1)'}`,display:'flex',alignItems:'center' }}>
                  <span className="tdot"/><span className="tdot"/><span className="tdot"/>
                </div>
              </div>
            )}
            <div ref={endRef}/>
          </div>
          {messages.length===1&&(
            <div style={{ padding:'8px 12px',background:isLight?'#f0f9ff':'#04090f',display:'flex',gap:6,flexWrap:'wrap' }}>
              {['Courses?','Pricing?','Free trial?'].map(q=>(
                <button key={q} onClick={()=>{setInput(q);setTimeout(()=>inputRef.current?.focus(),50)}}
                  style={{ fontSize:11,padding:'5px 12px',borderRadius:100,background:'transparent',border:'1px solid rgba(14,165,233,0.35)',color:'#38bdf8',cursor:'pointer',transition:'all 0.2s',fontFamily:"'DM Sans',sans-serif" }}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(14,165,233,0.1)';e.currentTarget.style.borderColor='rgba(14,165,233,0.6)'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='rgba(14,165,233,0.35)'}}
                >{q}</button>
              ))}
            </div>
          )}
          <div style={{ padding:'10px 12px',background:isLight?'#fff':'#02060e',borderTop:`1px solid ${isLight?'rgba(14,165,233,0.1)':'rgba(255,255,255,0.06)'}`,display:'flex',gap:8,alignItems:'flex-end' }}>
            <textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}}
              placeholder="Ask about English courses..." rows={1}
              style={{ flex:1,background:isLight?'rgba(240,249,255,0.8)':'rgba(255,255,255,0.05)',border:`1px solid ${isLight?'rgba(14,165,233,0.2)':'rgba(255,255,255,0.1)'}`,borderRadius:12,padding:'9px 12px',fontSize:13,color:th.color,resize:'none',outline:'none',lineHeight:1.5,maxHeight:90,overflowY:'auto',fontFamily:"'DM Sans',sans-serif",backdropFilter:'blur(10px)' }}
              onFocus={e=>{e.target.style.borderColor='#0ea5e9';e.target.style.boxShadow='0 0 0 3px rgba(14,165,233,0.1)'}}
              onBlur={e=>{e.target.style.borderColor=isLight?'rgba(14,165,233,0.2)':'rgba(255,255,255,0.1)';e.target.style.boxShadow='none'}}
            />
            <button onClick={send} disabled={!input.trim()||loading}
              style={{ width:38,height:38,borderRadius:'50%',flexShrink:0,background:input.trim()&&!loading?'linear-gradient(135deg,#0ea5e9,#6366f1)':(isLight?'rgba(0,0,0,0.07)':'rgba(255,255,255,0.07)'),border:'none',cursor:input.trim()&&!loading?'pointer':'not-allowed',color:input.trim()&&!loading?'#fff':(isLight?'rgba(0,0,0,0.3)':'rgba(255,255,255,0.3)'),fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.2s',boxShadow:input.trim()&&!loading?'0 4px 14px rgba(14,165,233,0.3)':'none' }}
            >↑</button>
          </div>
        </div>
      )}
    </>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function EslLandingPage() {
  const navigate = useNavigate();
  const [lang, setLang]           = useState('en');
  const [theme, setTheme]         = useState('dark');
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [scrollY, setScrollY]     = useState(0);
  const [formData, setFormData]   = useState({ name:'',email:'',phone:'',level:'',message:'' });
  const [submitted, setSubmitted] = useState(false);
  const t = TRANSLATIONS[lang];
  const isLight = theme === 'light';

  const th = {
    bg:          isLight ? '#f0f9ff'                : '#04090f',
    color:       isLight ? '#0c1a2e'                : '#e2f0fb',
    navBg:       isLight ? 'rgba(240,249,255,0.82)' : 'rgba(4,9,15,0.82)',
    navBorder:   isLight ? 'rgba(14,165,233,0.15)'  : 'rgba(14,165,233,0.1)',
    cardBg:      isLight ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.03)',
    cardBorder:  isLight ? 'rgba(255,255,255,0.9)'  : 'rgba(255,255,255,0.08)',
    secBg:       isLight ? 'rgba(224,242,254,0.65)' : 'rgba(14,165,233,0.025)',
    secBorder:   isLight ? 'rgba(14,165,233,0.12)'  : 'rgba(14,165,233,0.07)',
    sub:         isLight ? 'rgba(12,26,46,0.55)'    : 'rgba(226,240,251,0.55)',
    body:        isLight ? 'rgba(12,26,46,0.72)'    : 'rgba(226,240,251,0.65)',
    muted:       isLight ? 'rgba(12,26,46,0.38)'    : 'rgba(226,240,251,0.35)',
    tagBg:       isLight ? 'rgba(14,165,233,0.06)'  : 'rgba(14,165,233,0.07)',
    tagBorder:   isLight ? 'rgba(14,165,233,0.22)'  : 'rgba(14,165,233,0.2)',
    inputBg:     isLight ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.04)',
    inputBorder: isLight ? 'rgba(14,165,233,0.22)'  : 'rgba(14,165,233,0.15)',
    hlCard:      isLight
      ? 'linear-gradient(135deg,rgba(14,165,233,0.09),rgba(99,102,241,0.09))'
      : 'linear-gradient(135deg,rgba(14,165,233,0.1),rgba(99,102,241,0.1))',
    menuBg: isLight ? 'rgba(240,249,255,0.97)' : 'rgba(4,9,15,0.97)',
    glass:  isLight ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.035)',
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0,0);
    setTimeout(()=>{ window.scrollTo(0,0); document.documentElement.style.scrollBehavior='smooth'; },400);
    const fn = () => { setScrolled(window.scrollY>40); setScrollY(window.scrollY); };
    window.addEventListener('scroll',fn,{passive:true});
    return ()=>window.removeEventListener('scroll',fn);
  }, []);

  useEffect(() => {
    const fn = () => { if(window.innerWidth>768) setMenuOpen(false); };
    window.addEventListener('resize',fn);
    return ()=>window.removeEventListener('resize',fn);
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setMenuOpen(false); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/bookings`,{
        method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(formData),
      });
      setSubmitted(true);
      setTimeout(()=>setSubmitted(false),5000);
      setFormData({name:'',email:'',phone:'',level:'',message:''});
    } catch { alert('Something went wrong. Please try again.'); }
  };

  const parallax = (speed) => `translateY(${scrollY*speed}px)`;

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif",background:th.bg,color:th.color,overflowX:'hidden',transition:'background 0.4s,color 0.3s',position:'relative' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Fraunces:opsz,wght@9..144,700;9..144,800;9..144,900&display=swap" rel="stylesheet"/>

      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{overflow-x:hidden;max-width:100vw}
        ::selection{background:#0ea5e9;color:#fff}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#0ea5e9,#6366f1);border-radius:4px}

        @keyframes fadeUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(3deg)}}
        @keyframes floatR{0%,100%{transform:translateY(0)}50%{transform:translateY(18px)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ptFloat{0%,100%{transform:translateY(0) translateX(0);opacity:0.3}25%{transform:translateY(-30px) translateX(10px);opacity:0.8}50%{transform:translateY(-15px) translateX(-10px);opacity:0.5}75%{transform:translateY(-40px) translateX(5px);opacity:0.7}}
        @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.8)}}
        @keyframes borderGlow{0%,100%{box-shadow:0 0 0 0 rgba(14,165,233,0)}50%{box-shadow:0 0 24px 2px rgba(14,165,233,0.22)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}
        @keyframes gradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes spin{to{transform:rotate(360deg)}}

        .fu{animation:fadeUp 0.7s cubic-bezier(.22,1,.36,1) both}
        .d1{animation-delay:.08s}.d2{animation-delay:.2s}.d3{animation-delay:.32s}.d4{animation-delay:.44s}.d5{animation-delay:.56s}

        .grad-text{
          background:linear-gradient(135deg,#38bdf8 0%,#818cf8 35%,#34d399 70%,#38bdf8 100%);
          background-size:300% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          animation:shimmer 5s linear infinite;
        }

        .sec-label{
          display:inline-flex;align-items:center;gap:7px;
          font-size:10.5px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;
          color:#38bdf8;background:rgba(56,189,248,0.08);border:1px solid rgba(56,189,248,0.25);
          padding:6px 16px;border-radius:100px;margin-bottom:18px;
          backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
        }
        .sec-label::before{content:'';width:5px;height:5px;border-radius:50%;background:#38bdf8;animation:pulseDot 2s ease-in-out infinite}

        .sec-title{
          font-family:'Fraunces',serif;
          font-size:clamp(26px,4.5vw,52px);font-weight:800;line-height:1.06;letter-spacing:-1.5px;
          color:${th.color};margin-bottom:16px;
        }
        .sec-sub{font-size:clamp(14px,2vw,16.5px);color:${th.sub};line-height:1.8;max-width:500px}

        .nav-link{font-size:14px;font-weight:500;color:${isLight?'rgba(12,26,46,0.6)':'rgba(226,240,251,0.6)'};cursor:pointer;letter-spacing:0.2px;position:relative;padding-bottom:3px;transition:color 0.2s}
        .nav-link::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1.5px;background:linear-gradient(90deg,#0ea5e9,#6366f1);border-radius:2px;transition:width 0.3s cubic-bezier(.22,1,.36,1)}
        .nav-link:hover{color:${isLight?'#0c1a2e':'#fff'}}
        .nav-link:hover::after{width:100%}

        .btn-p{
          display:inline-flex;align-items:center;justify-content:center;gap:8px;
          background:linear-gradient(135deg,#0ea5e9 0%,#6366f1 100%);
          background-size:200% auto;
          color:#fff;border:none;border-radius:100px;
          padding:13px 28px;font-size:14px;font-weight:600;cursor:pointer;
          transition:all 0.28s cubic-bezier(.22,1,.36,1);font-family:'DM Sans',sans-serif;white-space:nowrap;
          position:relative;overflow:hidden;
        }
        .btn-p::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.18),transparent 60%);opacity:0;transition:opacity 0.2s}
        .btn-p:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 14px 38px rgba(14,165,233,0.42);animation:gradShift 3s ease infinite}
        .btn-p:hover::after{opacity:1}
        .btn-p:active{transform:scale(0.97)}

        .btn-o{
          display:inline-flex;align-items:center;justify-content:center;gap:8px;
          background:${th.glass};
          color:${isLight?'#0c1a2e':'#e2f0fb'};
          border:1px solid ${isLight?'rgba(14,165,233,0.28)':'rgba(14,165,233,0.22)'};border-radius:100px;
          padding:13px 28px;font-size:14px;font-weight:500;cursor:pointer;
          transition:all 0.28s cubic-bezier(.22,1,.36,1);font-family:'DM Sans',sans-serif;white-space:nowrap;
          backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
        }
        .btn-o:hover{border-color:rgba(14,165,233,0.55);background:rgba(14,165,233,0.09);transform:translateY(-2px);box-shadow:0 8px 24px rgba(14,165,233,0.12)}

        .card{
          background:${th.glass};border:1px solid ${th.cardBorder};border-radius:20px;
          transition:all 0.38s cubic-bezier(.22,1,.36,1);position:relative;overflow:hidden;
          backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
        }
        .card-shine{position:absolute;top:0;left:-100%;width:55%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent);transition:left 0.65s ease;pointer-events:none}
        .card:hover .card-shine{left:120%}
        .card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(14,165,233,0.05),rgba(99,102,241,0.05));opacity:0;transition:opacity 0.38s}
        .card:hover{border-color:rgba(14,165,233,0.38);transform:translateY(-8px) scale(1.01);box-shadow:${isLight?'0 20px 52px rgba(14,165,233,0.13),0 4px 16px rgba(14,165,233,0.07)':'0 20px 52px rgba(0,0,0,0.32),0 0 0 1px rgba(14,165,233,0.14)'}}
        .card:hover::before{opacity:1}

        .p-card{
          background:${th.glass};border:1px solid ${th.cardBorder};
          border-radius:22px;transition:all 0.38s cubic-bezier(.22,1,.36,1);position:relative;overflow:hidden;
          backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
        }
        .p-card.hl{background:${th.hlCard};border-color:rgba(14,165,233,0.45);box-shadow:0 0 64px rgba(14,165,233,${isLight?'0.12':'0.16'}),0 0 0 1px rgba(14,165,233,0.18)}
        .p-card:hover{transform:translateY(-7px);box-shadow:${isLight?'0 20px 52px rgba(14,165,233,0.12)':'0 20px 52px rgba(0,0,0,0.28),0 0 0 1px rgba(14,165,233,0.18)'}}

        .t-card{
          background:${th.glass};border:1px solid ${th.cardBorder};border-radius:20px;
          transition:all 0.38s cubic-bezier(.22,1,.36,1);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
          position:relative;overflow:hidden;
        }
        .t-shine{position:absolute;top:0;left:-100%;width:55%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent);transition:left 0.6s ease;pointer-events:none}
        .t-card:hover .t-shine{left:120%}
        .t-card:hover{border-color:rgba(14,165,233,0.32);transform:translateY(-6px);box-shadow:${isLight?'0 14px 38px rgba(14,165,233,0.1)':'0 14px 38px rgba(0,0,0,0.22)'}}

        .inp{
          width:100%;background:${th.inputBg};border:1.5px solid ${th.inputBorder};
          border-radius:12px;padding:13px 16px;font-size:14px;color:${th.color};
          font-family:'DM Sans',sans-serif;transition:all 0.22s;outline:none;
          backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
        }
        .inp:focus{border-color:#0ea5e9;box-shadow:0 0 0 3px rgba(14,165,233,0.14);background:${isLight?'rgba(255,255,255,0.96)':'rgba(255,255,255,0.07)'}}
        .inp::placeholder{color:${th.muted}}
        select.inp option{background:${isLight?'#fff':'#04090f'};color:${th.color}}

        .mob-menu{display:none;position:fixed;top:68px;left:0;right:0;z-index:150;background:${th.menuBg};backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);border-bottom:1px solid ${isLight?'rgba(14,165,233,0.1)':'rgba(14,165,233,0.07)'};padding:8px 0 24px;flex-direction:column;animation:slideDown 0.22s ease both}
        .mob-menu.open{display:flex}
        .mob-link{padding:14px 24px;font-size:15px;font-weight:500;color:${isLight?'rgba(12,26,46,0.75)':'rgba(226,240,251,0.75)'};cursor:pointer;transition:all 0.2s;border-bottom:1px solid ${isLight?'rgba(14,165,233,0.07)':'rgba(255,255,255,0.04)'}}
        .mob-link:hover{color:${isLight?'#0c1a2e':'#fff'};background:rgba(14,165,233,0.05);padding-left:32px}

        .wrap{max-width:1200px;margin:0 auto;padding:0 clamp(16px,4vw,40px)}
        .sec{padding:clamp(64px,8vw,112px) clamp(16px,4vw,40px)}
        .orb{position:absolute;border-radius:50%;filter:blur(110px);pointer-events:none;will-change:transform}

        .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        .g2-about{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
        .g2-stats{display:grid;grid-template-columns:1fr 1fr;gap:16px}

        @media(max-width:1024px){.g3{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:900px){.g2-about{grid-template-columns:1fr;gap:44px}}
        @media(max-width:768px){.g3{grid-template-columns:repeat(2,1fr);gap:14px}.hide-m{display:none!important}.show-m{display:flex!important}.sec{padding:clamp(48px,7vw,80px) clamp(16px,4vw,24px)}}
        @media(max-width:560px){.g3{grid-template-columns:1fr}.btn-p,.btn-o{font-size:13px;padding:11px 22px}}
        .show-m{display:none}

        /* Scroll progress bar */
        .progress-bar{position:fixed;top:0;left:0;z-index:200;height:2px;background:linear-gradient(90deg,#0ea5e9,#6366f1,#34d399);box-shadow:0 0 10px rgba(14,165,233,0.6);transition:width 0.08s linear}

        /* Noise overlay */
        body::after{content:'';position:fixed;inset:0;z-index:9999;pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity:${isLight?'0.015':'0.028'};mix-blend-mode:overlay}
      `}</style>

      {/* Scroll progress bar */}
      <div className="progress-bar" style={{ width:`${Math.min((scrollY/Math.max((document.documentElement.scrollHeight||1)-window.innerHeight,1))*100,100)}%` }}/>

      {/* Background effects */}
      <GridBackground isLight={isLight}/>
      <Particles isLight={isLight}/>
      <CursorGlow isLight={isLight}/>

      {/* ── MOBILE MENU ────────────────────────────────────────────────── */}
      <div className={`mob-menu${menuOpen?' open':''}`}>
        {t.navLinks.map((l,i)=><div key={l} className="mob-link" onClick={()=>go(NAV_IDS[i])}>{l}</div>)}
        <div style={{ padding:'16px 24px 0',display:'flex',gap:10,flexWrap:'wrap',alignItems:'center' }}>
          <ThemeToggle theme={theme} setTheme={setTheme} isLight={isLight}/>
          <LangToggle lang={lang} setLang={setLang} isLight={isLight}/>
        </div>
        <div style={{ padding:'14px 24px 0',display:'flex',flexDirection:'column',gap:10 }}>
          <button className="btn-o" onClick={()=>{navigate('/login');setMenuOpen(false)}} style={{ width:'100%' }}>{t.navLogin}</button>
          <button className="btn-p" onClick={()=>go('contact')} style={{ width:'100%' }}>{t.navBook}</button>
        </div>
      </div>

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav style={{ position:'fixed',top:0,left:0,right:0,zIndex:100,height:68,padding:'0 clamp(16px,4vw,40px)',display:'flex',alignItems:'center',justifyContent:'space-between',
        background:scrolled?th.navBg:'transparent',
        backdropFilter:scrolled?'blur(28px) saturate(180%)':'none',
        WebkitBackdropFilter:scrolled?'blur(28px) saturate(180%)':'none',
        borderBottom:scrolled?`1px solid ${th.navBorder}`:'none',
        transition:'all 0.35s ease',
        boxShadow:scrolled?(isLight?'0 4px 28px rgba(14,165,233,0.07)':'0 4px 28px rgba(0,0,0,0.22)'):'none',
      }}>
        <div style={{ display:'flex',alignItems:'center',gap:10,flexShrink:0 }}
          onMouseEnter={e=>e.currentTarget.querySelector('.logo-icon').style.transform='rotate(-10deg) scale(1.1)'}
          onMouseLeave={e=>e.currentTarget.querySelector('.logo-icon').style.transform='none'}
        >
          <div className="logo-icon" style={{ width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,#0ea5e9,#6366f1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,boxShadow:'0 4px 14px rgba(14,165,233,0.32)',transition:'transform 0.25s cubic-bezier(.34,1.56,.64,1)' }}>📚</div>
          <span style={{ fontSize:20,fontWeight:800,fontFamily:"'Fraunces',serif",letterSpacing:'-0.6px',color:th.color }}>
            Speak<span style={{ color:'#0ea5e9' }}>ora</span>
          </span>
        </div>
        <div className="hide-m" style={{ display:'flex',alignItems:'center',gap:34 }}>
          {t.navLinks.map((l,i)=><span key={l} className="nav-link" onClick={()=>go(NAV_IDS[i])}>{l}</span>)}
        </div>
        <div className="hide-m" style={{ display:'flex',alignItems:'center',gap:8 }}>
          <ThemeToggle theme={theme} setTheme={setTheme} isLight={isLight}/>
          <LangToggle lang={lang} setLang={setLang} isLight={isLight}/>
          <button className="btn-o" onClick={()=>navigate('/login')} style={{ padding:'8px 18px',fontSize:13 }}>{t.navLogin}</button>
          <button className="btn-p" onClick={()=>go('contact')} style={{ padding:'8px 18px',fontSize:13 }}>{t.navBook}</button>
        </div>
        <button onClick={()=>setMenuOpen(!menuOpen)} className="show-m"
          style={{ background:th.glass,border:`1.5px solid ${isLight?'rgba(14,165,233,0.25)':'rgba(14,165,233,0.18)'}`,color:th.color,fontSize:18,cursor:'pointer',width:40,height:40,borderRadius:10,alignItems:'center',justifyContent:'center',transition:'all 0.2s',backdropFilter:'blur(12px)' }}>
          {menuOpen?'✕':'☰'}
        </button>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section id="hero" style={{ minHeight:'100vh',display:'flex',alignItems:'center',position:'relative',overflow:'hidden',padding:'clamp(100px,14vw,148px) clamp(16px,4vw,40px) clamp(64px,8vw,100px)' }}>
        <div className="orb" style={{ width:720,height:720,background:'radial-gradient(circle,#0ea5e9 0%,#6366f1 60%)',top:-160,right:-160,opacity:isLight?0.07:0.14,transform:parallax(-0.07) }}/>
        <div className="orb" style={{ width:520,height:520,background:'radial-gradient(circle,#34d399,#0ea5e9)',bottom:-90,left:-130,opacity:isLight?0.06:0.11,transform:parallax(0.05) }}/>
        <div className="orb" style={{ width:320,height:320,background:'radial-gradient(circle,#8b5cf6,#ec4899)',top:'38%',right:'22%',opacity:isLight?0.05:0.1,transform:parallax(-0.04) }}/>

        {/* Floating decorations */}
        <div className="hide-m" style={{ position:'absolute',top:'14%',right:'5%',animation:'float 6s ease-in-out infinite',zIndex:3 }}>
          <div style={{ width:82,height:82,borderRadius:22,background:'linear-gradient(135deg,#0ea5e9,#6366f1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:38,boxShadow:'0 18px 48px rgba(14,165,233,0.38)',backdropFilter:'blur(10px)' }}>🎓</div>
        </div>
        <div className="hide-m" style={{ position:'absolute',top:'55%',right:'17%',animation:'floatR 8s ease-in-out infinite 1.5s',zIndex:3 }}>
          <div style={{ width:58,height:58,borderRadius:15,background:th.glass,border:'1px solid rgba(14,165,233,0.4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,backdropFilter:'blur(18px)',boxShadow:'0 8px 28px rgba(14,165,233,0.2)' }}>💬</div>
        </div>
        <div className="hide-m" style={{ position:'absolute',top:'27%',right:'29%',animation:'float 7s ease-in-out infinite 2.2s',zIndex:3 }}>
          <div style={{ width:46,height:46,borderRadius:12,background:th.glass,border:'1px solid rgba(99,102,241,0.38)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:21,backdropFilter:'blur(16px)' }}>✏️</div>
        </div>
        <div className="hide-m" style={{ position:'absolute',bottom:'20%',right:'7%',animation:'floatR 9s ease-in-out infinite 0.7s',zIndex:3 }}>
          <div style={{ width:50,height:50,borderRadius:13,background:th.glass,border:'1px solid rgba(52,211,153,0.35)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:23,backdropFilter:'blur(16px)' }}>🌏</div>
        </div>

        <div style={{ maxWidth:700,position:'relative',zIndex:4,width:'100%' }}>
          <div className="fu sec-label">{t.heroLabel}</div>
          <h1 className="fu d1" style={{ fontFamily:"'Fraunces',serif",fontSize:'clamp(38px,7.5vw,92px)',fontWeight:900,lineHeight:1.02,letterSpacing:'-3px',margin:'0 0 24px',color:th.color }}>
            {t.heroTitle1}<br/>
            <span className="grad-text">{t.heroTitle2}</span>
          </h1>
          <p className="fu d2" style={{ fontSize:'clamp(15px,2.5vw,18px)',lineHeight:1.82,color:th.body,maxWidth:540,marginBottom:38 }}>
            {t.heroSub}
          </p>
          <div className="fu d3" style={{ display:'flex',gap:14,flexWrap:'wrap',marginBottom:58 }}>
            <button className="btn-p" onClick={()=>go('contact')} style={{ fontSize:'clamp(13px,2vw,15px)',padding:'14px 32px' }}>{t.heroCta1}</button>
            <button className="btn-o" onClick={()=>go('courses')} style={{ fontSize:'clamp(13px,2vw,15px)',padding:'14px 32px' }}>{t.heroCta2}</button>
          </div>

          {/* Animated stat counters */}
          <div className="fu d4" style={{ display:'flex',gap:'clamp(20px,5vw,52px)',flexWrap:'wrap',paddingTop:36,borderTop:`1px solid ${isLight?'rgba(14,165,233,0.15)':'rgba(14,165,233,0.12)'}` }}>
            {STATS.map((s,i)=>(
              <StatCounter key={i} value={s.value} label={s.label[lang]} color={th.color}/>
            ))}
          </div>

          {/* Trust row */}
          <div className="fu d5" style={{ display:'flex',alignItems:'center',gap:20,marginTop:28,flexWrap:'wrap' }}>
            {['🔒 Secure Payments','⭐ 4.9/5 Rating','📅 No Commitment'].map(b=>(
              <span key={b} style={{ fontSize:11,color:th.muted,fontWeight:500,letterSpacing:'0.2px' }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES ──────────────────────────────────────────────────────── */}
      <section id="courses" className="sec" style={{ maxWidth:1240,margin:'0 auto',position:'relative' }}>
        <div className="orb" style={{ width:380,height:380,background:'#0ea5e9',top:-80,right:-80,opacity:isLight?0.05:0.09 }}/>
        <SectionHeader label={t.coursesLabel} title1={t.coursesTitle1} title2={t.coursesTitle2} sub={t.coursesSub}/>
        <div className="g3">
          {COURSES.map((c,i)=>(
            <Reveal key={i} delay={i*0.07}>
              <div className="card" style={{ padding:'clamp(22px,3vw,34px)',height:'100%' }}>
                <div className="card-shine"/>
                <div style={{ position:'absolute',top:0,left:0,right:0,height:2.5,background:`linear-gradient(90deg,${c.color},transparent)`,borderRadius:'20px 20px 0 0' }}/>
                <div style={{ display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20 }}>
                  <div style={{ width:54,height:54,borderRadius:15,background:`${c.color}18`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,boxShadow:`0 4px 18px ${c.color}28`,transition:'transform 0.2s',cursor:'default' }}
                    onMouseEnter={e=>e.currentTarget.style.transform='scale(1.08) rotate(-5deg)'}
                    onMouseLeave={e=>e.currentTarget.style.transform='none'}
                  >{c.icon}</div>
                  <span style={{ fontSize:10,fontWeight:700,color:c.color,background:`${c.color}15`,border:`1px solid ${c.color}33`,borderRadius:100,padding:'4px 11px',letterSpacing:'0.5px',whiteSpace:'nowrap' }}>{c.badge}</span>
                </div>
                <h3 style={{ fontSize:'clamp(15px,2vw,17.5px)',fontWeight:700,marginBottom:10,color:th.color }}>{c.title[lang]}</h3>
                <p style={{ fontSize:13.5,color:th.sub,lineHeight:1.78,marginBottom:22 }}>{c.desc[lang]}</p>
                <button onClick={()=>go('contact')} style={{ fontSize:12,padding:'7px 16px',borderRadius:100,background:'transparent',border:`1px solid ${c.color}40`,color:c.color,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontWeight:600,transition:'all 0.22s' }}
                  onMouseEnter={e=>{e.currentTarget.style.background=`${c.color}15`;e.currentTarget.style.borderColor=`${c.color}80`}}
                  onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor=`${c.color}40`}}
                >Learn More →</button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" style={{ background:th.secBg,borderTop:`1px solid ${th.secBorder}`,borderBottom:`1px solid ${th.secBorder}`,position:'relative',overflow:'hidden' }}>
        <div className="orb" style={{ width:480,height:480,background:'#6366f1',top:-100,left:-100,opacity:isLight?0.05:0.1 }}/>
        <div className="wrap sec g2-about">
          <div>
            <SectionHeader label={t.aboutLabel} title1={t.aboutTitle1} title2={t.aboutTitle2} center={false}/>
            <Reveal delay={0.1}>
              <p style={{ color:th.body,fontSize:'clamp(14px,1.8vw,16px)',lineHeight:1.92,marginBottom:20 }}>{t.aboutP1}</p>
              <p style={{ color:th.body,fontSize:'clamp(14px,1.8vw,16px)',lineHeight:1.92,marginBottom:36 }}>{t.aboutP2}</p>
              <div style={{ display:'flex',gap:9,flexWrap:'wrap' }}>
                {t.aboutTags.map((tag,i)=>(
                  <Reveal key={tag} delay={i*0.06}>
                    <span style={{ fontSize:12,color:th.color,background:th.glass,border:`1px solid ${th.tagBorder}`,borderRadius:100,padding:'7px 16px',fontWeight:500,backdropFilter:'blur(12px)',transition:'all 0.22s',cursor:'default',display:'block' }}
                      onMouseEnter={e=>{e.currentTarget.style.background='rgba(14,165,233,0.1)';e.currentTarget.style.borderColor='rgba(14,165,233,0.42)'}}
                      onMouseLeave={e=>{e.currentTarget.style.background=th.glass;e.currentTarget.style.borderColor=th.tagBorder}}
                    >✓ {tag}</span>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="g2-stats">
            {STATS.map((s,i)=>(
              <Reveal key={i} delay={i*0.09}>
                <div style={{
                  background:i===1?'linear-gradient(135deg,rgba(14,165,233,0.14),rgba(99,102,241,0.14))':th.glass,
                  border:`1px solid ${i===1?'rgba(14,165,233,0.42)':th.cardBorder}`,
                  borderRadius:20,padding:'clamp(20px,3vw,34px)',textAlign:'center',
                  backdropFilter:'blur(18px)',
                  boxShadow:i===1?'0 0 48px rgba(14,165,233,0.12),0 0 0 1px rgba(14,165,233,0.1)':'none',
                  transition:'all 0.3s cubic-bezier(.22,1,.36,1)',color:th.color,
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-5px) scale(1.02)'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform='none'; }}
                >
                  <StatCounter value={s.value} label={s.label[lang]} color={th.color}/>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="sec" style={{ maxWidth:1120,margin:'0 auto',position:'relative' }}>
        <div className="orb" style={{ width:420,height:420,background:'#34d399',bottom:-100,left:-100,opacity:isLight?0.05:0.09 }}/>
        <SectionHeader label={t.pricingLabel} title1={t.pricingTitle1} title2={t.pricingTitle2} sub={t.pricingSub}/>
        <div className="g3">
          {PRICING.map((p,i)=>(
            <Reveal key={i} delay={i*0.1}>
              <div className={`p-card${p.highlight?' hl':''}`} style={{ padding:'clamp(26px,3vw,42px)',height:'100%' }}>
                {p.highlight && <>
                  <div style={{ position:'absolute',top:0,left:0,right:0,height:2.5,background:'linear-gradient(90deg,#0ea5e9,#6366f1,#34d399)',borderRadius:'22px 22px 0 0' }}/>
                  <div style={{ position:'absolute',top:16,right:16,fontSize:10,fontWeight:700,letterSpacing:1.8,background:'linear-gradient(135deg,#0ea5e9,#6366f1)',color:'#fff',padding:'5px 13px',borderRadius:100,textTransform:'uppercase',boxShadow:'0 4px 16px rgba(14,165,233,0.35)' }}>{t.pricingPopular}</div>
                </>}
                <div style={{ fontSize:11,color:th.sub,marginBottom:7,fontWeight:700,letterSpacing:'0.5px',textTransform:'uppercase' }}>{p.name[lang]}</div>
                <div style={{ display:'flex',alignItems:'baseline',gap:4,marginBottom:7 }}>
                  <span style={{ fontFamily:"'Fraunces',serif",fontSize:'clamp(28px,5vw,48px)',fontWeight:800,color:th.color,lineHeight:1.1 }}>{p.price}</span>
                  <span style={{ fontSize:13,color:th.muted }}>{p.period}</span>
                </div>
                <p style={{ fontSize:13,color:th.sub,marginBottom:28,lineHeight:1.6 }}>{p.desc[lang]}</p>
                <div style={{ marginBottom:34,display:'flex',flexDirection:'column',gap:12 }}>
                  {p.features[lang].map((f,j)=>(
                    <div key={j} style={{ display:'flex',alignItems:'flex-start',gap:10,fontSize:13.5,color:th.body,lineHeight:1.5 }}>
                      <span style={{ width:19,height:19,borderRadius:'50%',background:'rgba(56,189,248,0.12)',border:'1px solid rgba(56,189,248,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'#38bdf8',flexShrink:0,marginTop:1 }}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <button className={p.highlight?'btn-p':'btn-o'} onClick={()=>go('contact')} style={{ width:'100%',padding:'13px' }}>{p.cta[lang]}</button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section id="testimonials" style={{ background:th.secBg,borderTop:`1px solid ${th.secBorder}`,position:'relative',overflow:'hidden' }}>
        <div className="orb" style={{ width:380,height:380,background:'#ec4899',top:-60,right:-60,opacity:isLight?0.05:0.09 }}/>
        <div className="wrap sec">
          <SectionHeader label={t.testimonialsLabel} title1={t.testimonialsTitle1} title2={t.testimonialsTitle2}/>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(270px,100%),1fr))',gap:22 }}>
            {TESTIMONIALS.map((tm,i)=>(
              <Reveal key={i} delay={i*0.08}>
                <div className="t-card" style={{ padding:'clamp(22px,3vw,34px)',height:'100%' }}>
                  <div className="t-shine"/>
                  <div style={{ fontSize:52,lineHeight:1,color:'rgba(14,165,233,0.14)',fontFamily:"'Fraunces',serif",fontWeight:900,marginBottom:-10,userSelect:'none' }}>"</div>
                  <div style={{ display:'flex',gap:2,marginBottom:14 }}>
                    {Array.from({length:tm.rating}).map((_,j)=><span key={j} style={{ color:'#f59e0b',fontSize:15 }}>★</span>)}
                  </div>
                  <p style={{ fontSize:14,lineHeight:1.82,color:th.body,marginBottom:22,fontStyle:'italic' }}>{tm.text[lang]}</p>
                  <div style={{ display:'flex',alignItems:'center',gap:12,paddingTop:16,borderTop:`1px solid ${isLight?'rgba(14,165,233,0.08)':'rgba(255,255,255,0.06)'}` }}>
                    <div style={{ width:42,height:42,borderRadius:'50%',background:'linear-gradient(135deg,#0ea5e9,#6366f1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,color:'#fff',flexShrink:0,boxShadow:'0 4px 14px rgba(14,165,233,0.28)' }}>{tm.avatar}</div>
                    <div>
                      <div style={{ fontSize:13.5,fontWeight:700,color:th.color }}>{tm.name} <span style={{ fontSize:16 }}>{tm.country}</span></div>
                      <div style={{ fontSize:11,color:th.muted,marginTop:2 }}>{tm.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="sec" style={{ maxWidth:800,margin:'0 auto',position:'relative' }}>
        <div className="orb" style={{ width:340,height:340,background:'#0ea5e9',top:-80,right:-80,opacity:isLight?0.06:0.11 }}/>
        <SectionHeader label={t.contactLabel} title1={t.contactTitle1} title2={t.contactTitle2} sub={t.contactSub}/>
        {submitted ? (
          <Reveal>
            <div style={{ textAlign:'center',padding:'clamp(44px,7vw,68px) clamp(24px,5vw,52px)',background:th.glass,border:'1px solid rgba(14,165,233,0.28)',borderRadius:26,backdropFilter:'blur(18px)' }}>
              <div style={{ fontSize:58,marginBottom:18,animation:'scaleIn 0.4s cubic-bezier(.34,1.56,.64,1) both',display:'block' }}>🎉</div>
              <h3 style={{ fontSize:'clamp(20px,3.5vw,28px)',fontWeight:800,marginBottom:12,fontFamily:"'Fraunces',serif",color:th.color }}>{t.successTitle}</h3>
              <p style={{ color:th.sub,fontSize:15.5,lineHeight:1.75 }}>{t.successSub}</p>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <form onSubmit={handleSubmit} style={{ background:th.glass,border:`1px solid ${th.cardBorder}`,borderRadius:26,padding:'clamp(28px,5vw,54px)',display:'flex',flexDirection:'column',gap:20,backdropFilter:'blur(18px)' }}>
              <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:18 }}>
                <div>
                  <label style={{ fontSize:12,color:th.sub,marginBottom:8,display:'block',fontWeight:600,letterSpacing:'0.3px' }}>{t.formName} *</label>
                  <input className="inp" required placeholder={t.formNamePh} value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})}/>
                </div>
                <div>
                  <label style={{ fontSize:12,color:th.sub,marginBottom:8,display:'block',fontWeight:600,letterSpacing:'0.3px' }}>{t.formEmail} *</label>
                  <input className="inp" type="email" required placeholder={t.formEmailPh} value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})}/>
                </div>
              </div>
              <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:18 }}>
                <div>
                  <label style={{ fontSize:12,color:th.sub,marginBottom:8,display:'block',fontWeight:600,letterSpacing:'0.3px' }}>{t.formPhone}</label>
                  <input className="inp" placeholder={t.formPhonePh} value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})}/>
                </div>
                <div>
                  <label style={{ fontSize:12,color:th.sub,marginBottom:8,display:'block',fontWeight:600,letterSpacing:'0.3px' }}>{t.formLevel} *</label>
                  <select className="inp" required value={formData.level} onChange={e=>setFormData({...formData,level:e.target.value})}>
                    <option value="" disabled>{t.formLevelPh}</option>
                    {LEVELS.map(l=><option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize:12,color:th.sub,marginBottom:8,display:'block',fontWeight:600,letterSpacing:'0.3px' }}>{t.formMessage}</label>
                <textarea className="inp" rows={4} placeholder={t.formMessagePh} style={{ resize:'vertical',minHeight:112 }} value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})}/>
              </div>
              <button type="submit" className="btn-p" style={{ width:'100%',padding:'16px',fontSize:'clamp(13px,2vw,15px)' }}>{t.formSubmit}</button>
              <p style={{ fontSize:11,color:th.muted,textAlign:'center' }}>🔒 Your information is safe and will never be shared.</p>
            </form>
          </Reveal>
        )}
      </section>

      <AIChatWidget th={th} isLight={isLight}/>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ borderTop:`1px solid ${th.secBorder}`,padding:'clamp(24px,4vw,42px) clamp(16px,4vw,40px)',position:'relative',background:isLight?'rgba(240,249,255,0.75)':'rgba(4,9,15,0.75)',backdropFilter:'blur(14px)' }}>
        <div style={{ maxWidth:1200,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16 }}>
          <div style={{ display:'flex',alignItems:'center',gap:10 }}>
            <div style={{ width:30,height:30,borderRadius:8,background:'linear-gradient(135deg,#0ea5e9,#6366f1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13 }}>📚</div>
            <span style={{ fontFamily:"'Fraunces',serif",fontSize:17,fontWeight:800,color:th.color }}>Speak<span style={{ color:'#0ea5e9' }}>ora</span></span>
          </div>
          <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:4,textAlign:'center' }}>
            <p style={{ fontSize:12,color:th.muted }}>{t.footerRights}</p>
            <p style={{ fontSize:11,color:th.muted }}>
              Engineered by{' '}
              <a href="https://yourportfolio.com" target="_blank" rel="noopener noreferrer"
                style={{ color:'#38bdf8',textDecoration:'none',fontWeight:600,transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.color='#7dd3fc';e.currentTarget.style.textShadow='0 0 12px rgba(56,189,248,0.5)'}}
                onMouseLeave={e=>{e.currentTarget.style.color='#38bdf8';e.currentTarget.style.textShadow='none'}}
              >Arman Villegas</a>
            </p>
          </div>
          <div style={{ display:'flex',gap:24,flexWrap:'wrap' }}>
            {t.footerLinks.map((l,i)=>(
              <span key={l} className="nav-link" style={{ fontSize:12 }} onClick={()=>go(NAV_IDS[i])}>{l}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}