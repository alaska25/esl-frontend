import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ── TRANSLATIONS ──────────────────────────────────────────────────────────────
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
    successTitle: 'You\'re In!', successSub: "We'll contact you within 2 hours to confirm your free trial lesson.",
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
  { icon: '🗣️', title: L('Conversational English','Conversational English','英会話'), desc: L('Build real speaking confidence through daily conversation practice with a certified teacher.','Bumuo ng totoong kumpiyansa sa pagsasalita sa pamamagitan ng pang-araw-araw na practice.','認定講師との毎日の会話練習で、本物の話す自信をつけます。'), badge: 'Most Popular' },
  { icon: '💼', title: L('Business English','Business English','ビジネス英語'), desc: L('Emails, presentations, meetings and negotiations — master professional English for the workplace.','Emails, presentations, meetings — master professional English para sa trabaho.','メール・プレゼン・会議・交渉など職場の英語をマスター。'), badge: 'Career Focus' },
  { icon: '📝', title: L('IELTS / TOEIC Prep','IELTS / TOEIC Prep','IELTS / TOEIC対策'), desc: L('Targeted exam preparation with practice tests, strategies, and personalized coaching.','Targeted na paghahanda sa exam kasama ang practice tests at personalized coaching.','模擬試験・戦略・個別指導による的を絞った試験対策。'), badge: 'Exam Ready' },
  { icon: '👶', title: L('Kids English','Kids English','キッズ英語'), desc: L('Fun, engaging lessons designed for children ages 5–15 with games, songs, and stories.','Masaya at engaging na leksyon para sa mga bata edad 5–15 na may games at kwento.','5〜15歳向けのゲーム・歌・物語を使った楽しいレッスン。'), badge: 'Ages 5–15' },
  { icon: '✈️', title: L('Travel English','Travel English','旅行英語'), desc: L('Essential phrases for airports, hotels, restaurants, and navigating any English-speaking country.','Mahahalagang parirala para sa paliparan, hotel, restaurant, at paglalakbay.','空港・ホテル・レストランなど旅行に必要な英語フレーズ。'), badge: 'For Travelers' },
  { icon: '🎯', title: L('Pronunciation & Accent','Pronunciation & Accent','発音・アクセント'), desc: L('Reduce your accent, sharpen clarity, and speak with a natural, confident English flow.','Bawasan ang accent, palakasin ang clarity, at magsalita nang natural at may kumpiyansa.','アクセントを改善し、明瞭で自然な英語の流れを身につけます。'), badge: 'Clarity Focus' },
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
      ['Walang limitasyong leksyon', 'Dedikadong guro', 'Custom na plano', '24/7 messaging sa guro', 'Kasama ang exam prep', 'Priority scheduling', 'Sertipiko sa pagtatapos'],
      ['レッスン無制限（50分）', '専任講師', 'カスタム学習プラン', '24時間講師メッセージ', '試験対策込み', '優先スケジュール', '修了証書']
    ),
    cta: L('Go Intensive','Maging Intensive','集中コースへ'), highlight: false,
  },
];

const TESTIMONIALS = [
  { name: 'Yuki Tanaka', role: 'Software Engineer, Tokyo', text: L('After 3 months with Speakora I passed my TOEIC with 890 points. My teacher was incredibly patient and always pushed me to do better.','Pagkatapos ng 3 buwan sa Speakora, pumasa ako sa TOEIC na may 890 puntos. Sobrang galing ng aking guro!','Speakoraで3ヶ月学び、TOEICで890点を取得。先生がとても丁寧で、常に背中を押してくれました。'), rating: 5, avatar: 'YT', country: '🇯🇵' },
  { name: 'Marco Bianchi', role: 'Marketing Manager, Milan', text: L('My business English improved dramatically. I can now lead international meetings with confidence. Worth every peso.','Malaki ang pagbabago ng aking Business English. Kayang-kaya ko na ang mga international meetings.','ビジネス英語が劇的に向上。今では国際会議をリードできます。費用対効果は抜群です。'), rating: 5, avatar: 'MB', country: '🇮🇹' },
  { name: 'Priya Sharma', role: 'Nurse, Dubai', text: L('Speakora helped me prepare for my nursing licensure interview in the UK. I got the job! The teachers here are world-class.','Tinulungan ako ng Speakora na maghanda para sa aking UK nursing interview. Natanggap ako sa trabaho!','SpreakoraのおかげでUKの看護師試験面接を突破。採用されました！先生たちは世界クラスです。'), rating: 5, avatar: 'PS', country: '🇮🇳' },
  { name: 'Ana Gonzalez', role: 'Student, Mexico City', text: L('I tried many apps but nothing worked until Speakora. Real teachers, real conversations. My English went from broken to confident in 4 months.','Subukan ko ang maraming apps pero Speakora lang ang nagtrabaho. Totoong guro, totoong conversation.','多くのアプリを試しましたが、Speakoraだけが効果的でした。4ヶ月で英語が劇的に上達しました。'), rating: 5, avatar: 'AG', country: '🇲🇽' },
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

// ── LANG TOGGLE ───────────────────────────────────────────────────────────────
function LangToggle({ lang, setLang, isLight }) {
  const bg     = isLight ? 'rgba(0,0,0,0.05)'    : 'rgba(255,255,255,0.06)';
  const border = isLight ? 'rgba(0,0,0,0.12)'    : 'rgba(255,255,255,0.12)';
  const color  = isLight ? 'rgba(17,24,39,0.75)' : 'rgba(232,237,245,0.85)';
  return (
    <div onClick={() => setLang(l => LANG_CYCLE[l])} title={LANG_TITLES[lang]}
      style={{ display:'flex', alignItems:'center', gap:6, background:bg, border:`1px solid ${border}`, borderRadius:100, padding:'5px 12px 5px 8px', cursor:'pointer', userSelect:'none', fontSize:13, fontWeight:600, color, flexShrink:0, transition:'all 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)'}
      onMouseLeave={e => e.currentTarget.style.background = bg}
    >
      <div style={{ display:'flex', background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)', borderRadius:100, padding:'2px', gap:2 }}>
        {['en','fil','ja'].map(code => (
          <span key={code} style={{ padding:'2px 7px', borderRadius:100, fontSize:11, fontWeight:700,
            background: lang===code ? 'linear-gradient(135deg,#0ea5e9,#6366f1)' : 'transparent',
            color: lang===code ? '#fff' : isLight ? 'rgba(17,24,39,0.4)' : 'rgba(232,237,245,0.4)',
            transition:'all 0.2s' }}>
            {code==='en'?'EN':code==='fil'?'FIL':'JA'}
          </span>
        ))}
      </div>
      <span style={{ fontSize:14 }}>{LANG_FLAGS[lang]}</span>
    </div>
  );
}

function ThemeToggle({ theme, setTheme, isLight }) {
  const bg     = isLight ? 'rgba(0,0,0,0.05)'  : 'rgba(255,255,255,0.06)';
  const border = isLight ? 'rgba(0,0,0,0.12)'  : 'rgba(255,255,255,0.12)';
  return (
    <div onClick={() => setTheme(t => t==='dark'?'light':'dark')}
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      style={{ display:'flex', alignItems:'center', justifyContent:'center', width:36, height:36, background:bg, border:`1px solid ${border}`, borderRadius:'50%', cursor:'pointer', transition:'all 0.2s', userSelect:'none', fontSize:15, flexShrink:0 }}
      onMouseEnter={e => e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)'}
      onMouseLeave={e => e.currentTarget.style.background = bg}
    >{isLight ? '🌙' : '☀️'}</div>
  );
}

// ── AI CHAT WIDGET ────────────────────────────────────────────────────────────
function AIChatWidget({ th, isLight }) {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState([{ role:'assistant', content:"Hi! 👋 I'm the Speakora assistant. Ask me anything about our English courses, pricing, or teachers!" }]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const endRef   = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => endRef.current?.scrollIntoView({ behavior:'smooth' }), 100);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open, messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role:'user', content:text }];
    setMessages(next); setInput(''); setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/chat/support`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.map(m => ({ role: m.role, content: m.content })) }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMessages(p => [...p, { role:'assistant', content: data.reply || 'Sorry, no response. Try again.' }]);
    } catch {
      setMessages(p => [...p, { role:'assistant', content:'⚠️ Something went wrong. Please try again or contact us directly.' }]);
    } finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        @keyframes chatPop { from{opacity:0;transform:scale(0.88) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes fabPulse { 0%,100%{box-shadow:0 0 0 0 rgba(14,165,233,0.45)} 60%{box-shadow:0 0 0 12px rgba(14,165,233,0)} }
        @keyframes dot { 0%,80%,100%{transform:translateY(0);opacity:.4} 40%{transform:translateY(-5px);opacity:1} }
        .chat-fab { position:fixed; bottom:24px; right:20px; z-index:1000; width:54px; height:54px; border-radius:50%; background:linear-gradient(135deg,#0ea5e9,#6366f1); border:none; cursor:pointer; color:#fff; font-size:22px; display:flex; align-items:center; justify-content:center; box-shadow:0 8px 28px rgba(14,165,233,0.4); transition:transform 0.2s; animation:fabPulse 2.5s ease-in-out infinite; }
        .chat-fab:hover { transform:scale(1.1); }
        .chat-win { position:fixed; bottom:88px; right:20px; z-index:1000; width:min(360px,calc(100vw - 24px)); border-radius:20px; overflow:hidden; animation:chatPop 0.22s ease both; box-shadow:0 20px 60px rgba(0,0,0,0.28); }
        .chat-msgs::-webkit-scrollbar { width:3px; }
        .chat-msgs::-webkit-scrollbar-thumb { background:rgba(14,165,233,0.25); border-radius:2px; }
        .tdot { width:6px; height:6px; border-radius:50%; background:#38bdf8; display:inline-block; margin:0 2px; }
        .tdot:nth-child(1){animation:dot 1.2s ease-in-out infinite 0s}
        .tdot:nth-child(2){animation:dot 1.2s ease-in-out infinite .2s}
        .tdot:nth-child(3){animation:dot 1.2s ease-in-out infinite .4s}
        @media(max-width:480px){ .chat-win { bottom:84px; right:12px; left:12px; width:auto; } .chat-fab { bottom:20px; right:16px; } }
      `}</style>
      <button className="chat-fab" onClick={() => setOpen(o => !o)}>{open ? '✕' : '💬'}</button>
      {open && (
        <div className="chat-win">
          <div style={{ background:'linear-gradient(135deg,#0ea5e9,#6366f1)', padding:'14px 18px', display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:36,height:36,borderRadius:'50%',background:'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,flexShrink:0 }}>📚</div>
            <div style={{ flex:1 }}>
              <div style={{ color:'#fff', fontWeight:700, fontSize:14 }}>Speakora Support</div>
              <div style={{ color:'rgba(255,255,255,0.75)', fontSize:11, display:'flex', alignItems:'center', gap:5 }}>
                <span style={{ width:6,height:6,borderRadius:'50%',background:'#4ade80',display:'inline-block' }}/>AI Assistant · Online
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background:'rgba(255,255,255,0.15)',border:'none',color:'#fff',width:26,height:26,borderRadius:'50%',cursor:'pointer',fontSize:13,display:'flex',alignItems:'center',justifyContent:'center' }}>✕</button>
          </div>
          <div className="chat-msgs" style={{ height:300, overflowY:'auto', padding:'14px 12px', background: isLight ? '#f0f9ff' : '#04090f', display:'flex', flexDirection:'column', gap:10 }}>
            {messages.map((m,i) => (
              <div key={i} style={{ display:'flex', justifyContent: m.role==='user'?'flex-end':'flex-start', alignItems:'flex-end', gap:7 }}>
                {m.role==='assistant' && <div style={{ width:26,height:26,borderRadius:'50%',background:'linear-gradient(135deg,#0ea5e9,#6366f1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,flexShrink:0 }}>📚</div>}
                <div style={{ maxWidth:'76%', padding:'9px 13px',
                  borderRadius: m.role==='user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: m.role==='user' ? 'linear-gradient(135deg,#0ea5e9,#6366f1)' : (isLight ? '#fff' : 'rgba(255,255,255,0.07)'),
                  color: m.role==='user' ? '#fff' : th.color,
                  border: m.role==='user' ? 'none' : `1px solid ${isLight?'rgba(0,0,0,0.08)':'rgba(255,255,255,0.1)'}`,
                  fontSize:13, lineHeight:1.55,
                }}>{m.content}</div>
              </div>
            ))}
            {loading && (
              <div style={{ display:'flex', alignItems:'flex-end', gap:7 }}>
                <div style={{ width:26,height:26,borderRadius:'50%',background:'linear-gradient(135deg,#0ea5e9,#6366f1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,flexShrink:0 }}>📚</div>
                <div style={{ padding:'10px 14px', borderRadius:'16px 16px 16px 4px', background: isLight?'#fff':'rgba(255,255,255,0.07)', border:`1px solid ${isLight?'rgba(0,0,0,0.08)':'rgba(255,255,255,0.1)'}`, display:'flex', alignItems:'center' }}>
                  <span className="tdot"/><span className="tdot"/><span className="tdot"/>
                </div>
              </div>
            )}
            <div ref={endRef}/>
          </div>
          {messages.length === 1 && (
            <div style={{ padding:'8px 12px', background: isLight?'#f0f9ff':'#04090f', display:'flex', gap:6, flexWrap:'wrap' }}>
              {['Courses?','Pricing?','Free trial?'].map(q => (
                <button key={q} onClick={() => { setInput(q); setTimeout(()=>inputRef.current?.focus(),50); }}
                  style={{ fontSize:11, padding:'4px 10px', borderRadius:100, background:'transparent', border:`1px solid rgba(14,165,233,0.4)`, color:'#38bdf8', cursor:'pointer', transition:'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background='rgba(14,165,233,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}
                >{q}</button>
              ))}
            </div>
          )}
          <div style={{ padding:'10px 12px', background: isLight?'#fff':'#02060e', borderTop:`1px solid ${isLight?'rgba(0,0,0,0.07)':'rgba(255,255,255,0.07)'}`, display:'flex', gap:8, alignItems:'flex-end' }}>
            <textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();} }}
              placeholder="Ask about English courses..." rows={1}
              style={{ flex:1, background: isLight?'#f0f9ff':'rgba(255,255,255,0.06)', border:`1px solid ${isLight?'rgba(14,165,233,0.2)':'rgba(255,255,255,0.1)'}`, borderRadius:10, padding:'9px 12px', fontSize:13, color:th.color, resize:'none', outline:'none', lineHeight:1.5, maxHeight:90, overflowY:'auto', fontFamily:"'DM Sans',sans-serif" }}
              onFocus={e=>e.target.style.borderColor='#0ea5e9'}
              onBlur={e=>e.target.style.borderColor=isLight?'rgba(14,165,233,0.2)':'rgba(255,255,255,0.1)'}
            />
            <button onClick={send} disabled={!input.trim()||loading}
              style={{ width:36,height:36,borderRadius:'50%',flexShrink:0, background: input.trim()&&!loading?'linear-gradient(135deg,#0ea5e9,#6366f1)':(isLight?'rgba(0,0,0,0.07)':'rgba(255,255,255,0.07)'), border:'none', cursor: input.trim()&&!loading?'pointer':'not-allowed', color: input.trim()&&!loading?'#fff':(isLight?'rgba(0,0,0,0.3)':'rgba(255,255,255,0.3)'), fontSize:16, display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s' }}
            >↑</button>
          </div>
        </div>
      )}
    </>
  );
}

function SectionHeader({ label, title1, title2, sub, center = true }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 52 }}>
      <div className="sec-label">{label}</div>
      <h2 className="sec-title">{title1}<br /><span className="grad-text">{title2}</span></h2>
      {sub && <p className="sec-sub" style={{ margin: center ? '0 auto' : 0 }}>{sub}</p>}
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function EslLandingPage() {
  const navigate = useNavigate();
  const [lang, setLang]           = useState('en');
  const [theme, setTheme]         = useState('dark');
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [formData, setFormData]   = useState({ name:'', email:'', phone:'', level:'', message:'' });
  const [submitted, setSubmitted] = useState(false);
  const t       = TRANSLATIONS[lang];
  const isLight = theme === 'light';

  const th = {
    bg:          isLight ? '#f0f9ff'               : '#04090f',
    color:       isLight ? '#0c1a2e'               : '#e2f0fb',
    navBg:       isLight ? 'rgba(240,249,255,0.95)': 'rgba(4,9,15,0.93)',
    navBorder:   isLight ? 'rgba(14,165,233,0.1)'  : 'rgba(14,165,233,0.08)',
    cardBg:      isLight ? '#ffffff'               : 'rgba(255,255,255,0.03)',
    cardBorder:  isLight ? 'rgba(14,165,233,0.12)' : 'rgba(14,165,233,0.1)',
    secBg:       isLight ? '#e0f2fe'               : 'rgba(14,165,233,0.03)',
    secBorder:   isLight ? 'rgba(14,165,233,0.12)' : 'rgba(14,165,233,0.07)',
    sub:         isLight ? 'rgba(12,26,46,0.55)'   : 'rgba(226,240,251,0.55)',
    body:        isLight ? 'rgba(12,26,46,0.7)'    : 'rgba(226,240,251,0.65)',
    muted:       isLight ? 'rgba(12,26,46,0.38)'   : 'rgba(226,240,251,0.35)',
    tagBg:       isLight ? 'rgba(14,165,233,0.06)' : 'rgba(14,165,233,0.08)',
    tagBorder:   isLight ? 'rgba(14,165,233,0.18)' : 'rgba(14,165,233,0.18)',
    inputBg:     isLight ? '#ffffff'               : 'rgba(255,255,255,0.04)',
    inputBorder: isLight ? 'rgba(14,165,233,0.2)'  : 'rgba(14,165,233,0.15)',
    hlCard:      isLight
      ? 'linear-gradient(135deg,rgba(14,165,233,0.08),rgba(99,102,241,0.08))'
      : 'linear-gradient(135deg,rgba(14,165,233,0.12),rgba(99,102,241,0.12))',
    menuBg: isLight ? 'rgba(240,249,255,0.98)' : 'rgba(4,9,15,0.98)',
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0,0);
    setTimeout(() => { window.scrollTo(0,0); document.documentElement.style.scrollBehavior = 'smooth'; }, 400);
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }); setMenuOpen(false); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/bookings`, {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(formData),
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({ name:'', email:'', phone:'', level:'', message:'' });
    } catch { alert('Something went wrong. Please try again.'); }
  };

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:th.bg, color:th.color, overflowX:'hidden', transition:'background 0.3s,color 0.3s' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&family=Fraunces:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet"/>

      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{overflow-x:hidden;max-width:100vw}
        ::selection{background:#0ea5e9;color:#fff}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:${th.bg}}
        ::-webkit-scrollbar-thumb{background:#0ea5e9;border-radius:3px}

        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-16px) rotate(2deg)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}

        .fu{animation:fadeUp 0.65s ease both}
        .d1{animation-delay:.08s}.d2{animation-delay:.18s}.d3{animation-delay:.28s}.d4{animation-delay:.38s}

        .grad-text{
          background:linear-gradient(135deg,#38bdf8 0%,#818cf8 50%,#34d399 100%);
          background-size:200% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          animation:shimmer 4s linear infinite;
        }

        .sec-label{
          display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;
          color:#38bdf8;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.22);
          padding:5px 14px;border-radius:100px;margin-bottom:16px;
        }
        .sec-title{
          font-family:'Fraunces',serif;
          font-size:clamp(26px,4.5vw,50px);font-weight:800;line-height:1.08;letter-spacing:-0.5px;
          color:${th.color};margin-bottom:14px;
        }
        .sec-sub{font-size:clamp(14px,2vw,16px);color:${th.sub};line-height:1.7;max-width:480px;}

        .nav-link{font-size:14px;font-weight:500;color:${isLight?'rgba(12,26,46,0.6)':'rgba(226,240,251,0.65)'};cursor:pointer;transition:color 0.2s;letter-spacing:0.2px}
        .nav-link:hover{color:${isLight?'#0c1a2e':'#fff'}}

        .btn-p{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:linear-gradient(135deg,#0ea5e9,#6366f1);color:#fff;border:none;border-radius:100px;padding:12px 26px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.22s;font-family:'DM Sans',sans-serif;white-space:nowrap;}
        .btn-p:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(14,165,233,0.38)}
        .btn-p:active{transform:scale(0.97)}
        .btn-o{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:transparent;color:${isLight?'#0c1a2e':'#e2f0fb'};border:1.5px solid ${isLight?'rgba(14,165,233,0.25)':'rgba(14,165,233,0.2)'};border-radius:100px;padding:12px 26px;font-size:14px;font-weight:500;cursor:pointer;transition:all 0.22s;font-family:'DM Sans',sans-serif;white-space:nowrap;}
        .btn-o:hover{border-color:rgba(14,165,233,0.5);background:rgba(14,165,233,0.06)}

        .card{background:${th.cardBg};border:1px solid ${th.cardBorder};border-radius:18px;transition:all 0.28s ease;position:relative;overflow:hidden;}
        .card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(14,165,233,0.06),rgba(99,102,241,0.06));opacity:0;transition:opacity 0.28s}
        .card:hover{border-color:rgba(14,165,233,0.35);transform:translateY(-5px);box-shadow:${isLight?'0 12px 36px rgba(14,165,233,0.1)':'0 12px 36px rgba(0,0,0,0.2)'}}
        .card:hover::before{opacity:1}

        .p-card{background:${th.cardBg};border:1px solid ${isLight?'rgba(14,165,233,0.1)':'rgba(14,165,233,0.1)'};border-radius:20px;transition:all 0.28s ease;position:relative;overflow:hidden;}
        .p-card.hl{background:${th.hlCard};border-color:rgba(14,165,233,0.4);box-shadow:0 0 50px rgba(14,165,233,${isLight?'0.1':'0.15'})}
        .p-card:hover{transform:translateY(-4px);box-shadow:${isLight?'0 14px 40px rgba(14,165,233,0.1)':'0 14px 40px rgba(0,0,0,0.2)'}}

        .t-card{background:${th.cardBg};border:1px solid ${th.cardBorder};border-radius:18px;transition:all 0.28s}
        .t-card:hover{border-color:rgba(14,165,233,0.3);transform:translateY(-4px)}

        .inp{width:100%;background:${th.inputBg};border:1.5px solid ${th.inputBorder};border-radius:11px;padding:13px 16px;font-size:14px;color:${th.color};font-family:'DM Sans',sans-serif;transition:border-color 0.2s,box-shadow 0.2s;outline:none;}
        .inp:focus{border-color:#0ea5e9;box-shadow:0 0 0 3px rgba(14,165,233,0.12)}
        .inp::placeholder{color:${th.muted}}
        select.inp option{background:${isLight?'#fff':'#04090f'};color:${th.color}}

        .mob-menu{display:none;position:fixed;top:68px;left:0;right:0;z-index:99;background:${th.menuBg};backdrop-filter:blur(20px);border-bottom:1px solid ${isLight?'rgba(14,165,233,0.1)':'rgba(14,165,233,0.07)'};padding:8px 0 24px;flex-direction:column;animation:slideDown 0.2s ease both;}
        .mob-menu.open{display:flex}
        .mob-link{padding:14px 24px;font-size:15px;font-weight:500;color:${isLight?'rgba(12,26,46,0.75)':'rgba(226,240,251,0.75)'};cursor:pointer;transition:all 0.18s;border-bottom:1px solid ${isLight?'rgba(14,165,233,0.07)':'rgba(255,255,255,0.05)'};}
        .mob-link:hover{color:${isLight?'#0c1a2e':'#fff'};background:rgba(14,165,233,0.04);padding-left:30px}

        .wrap{max-width:1200px;margin:0 auto;padding:0 clamp(16px,4vw,40px)}
        .sec{padding:clamp(64px,8vw,108px) clamp(16px,4vw,40px)}
        .orb{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;opacity:${isLight?'0.08':'0.18'}}

        .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
        .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
        .g2-about{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center}
        .g2-stats{display:grid;grid-template-columns:1fr 1fr;gap:14px}

        @media(max-width:1024px){.g3{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:900px){.g2-about{grid-template-columns:1fr;gap:40px}.g4{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:768px){.g3{grid-template-columns:repeat(2,1fr);gap:14px}.hide-m{display:none!important}.show-m{display:flex!important}.sec{padding:clamp(48px,7vw,80px) clamp(16px,4vw,24px)}}
        @media(max-width:560px){.g3{grid-template-columns:1fr}.btn-p,.btn-o{font-size:13px;padding:11px 20px}}
        .show-m{display:none}
      `}</style>

      {/* Mobile Menu */}
      <div className={`mob-menu${menuOpen?' open':''}`}>
        {t.navLinks.map((l,i) => <div key={l} className="mob-link" onClick={()=>go(NAV_IDS[i])}>{l}</div>)}
        <div style={{ padding:'16px 24px 0', display:'flex', gap:10, flexWrap:'wrap', alignItems:'center' }}>
          <ThemeToggle theme={theme} setTheme={setTheme} isLight={isLight}/>
          <LangToggle lang={lang} setLang={setLang} isLight={isLight}/>
        </div>
        <div style={{ padding:'14px 24px 0', display:'flex', flexDirection:'column', gap:10 }}>
          <button className="btn-o" onClick={()=>{navigate('/login');setMenuOpen(false)}} style={{ width:'100%' }}>{t.navLogin}</button>
          <button className="btn-p" onClick={()=>go('contact')} style={{ width:'100%' }}>{t.navBook}</button>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ position:'fixed',top:0,left:0,right:0,zIndex:100,height:68,padding:'0 clamp(16px,4vw,40px)',display:'flex',alignItems:'center',justifyContent:'space-between', background: scrolled ? th.navBg : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? `1px solid ${th.navBorder}` : 'none', transition:'all 0.3s' }}>
        <div style={{ display:'flex',alignItems:'center',gap:9,flexShrink:0 }}>
          <div style={{ width:34,height:34,borderRadius:9,background:'linear-gradient(135deg,#0ea5e9,#6366f1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16 }}>📚</div>
          <span style={{ fontSize:19,fontWeight:700,fontFamily:"'Fraunces',serif",letterSpacing:'-0.4px',color:th.color }}>
            Speak<span style={{ color:'#0ea5e9' }}>ora</span>
          </span>
        </div>
        <div className="hide-m" style={{ display:'flex',alignItems:'center',gap:32 }}>
          {t.navLinks.map((l,i)=><span key={l} className="nav-link" onClick={()=>go(NAV_IDS[i])}>{l}</span>)}
        </div>
        <div className="hide-m" style={{ display:'flex',alignItems:'center',gap:8 }}>
          <ThemeToggle theme={theme} setTheme={setTheme} isLight={isLight}/>
          <LangToggle lang={lang} setLang={setLang} isLight={isLight}/>
          <button className="btn-o" onClick={()=>navigate('/login')} style={{ padding:'9px 20px',fontSize:13 }}>{t.navLogin}</button>
          <button className="btn-p" onClick={()=>go('contact')} style={{ padding:'9px 20px',fontSize:13 }}>{t.navBook}</button>
        </div>
        <button onClick={()=>setMenuOpen(!menuOpen)} className="show-m"
          style={{ background:'none',border:`1.5px solid ${isLight?'rgba(14,165,233,0.2)':'rgba(14,165,233,0.15)'}`,color:th.color,fontSize:18,cursor:'pointer',width:38,height:38,borderRadius:8,alignItems:'center',justifyContent:'center',transition:'all 0.2s' }}>
          {menuOpen?'✕':'☰'}
        </button>
      </nav>

      {/* Hero */}
      <section id="hero" style={{ minHeight:'100vh',display:'flex',alignItems:'center',position:'relative',overflow:'hidden',padding:'clamp(100px,14vw,140px) clamp(16px,4vw,40px) clamp(48px,6vw,80px)' }}>
        <div className="orb" style={{ width:600,height:600,background:'#0ea5e9',top:-100,right:-100 }}/>
        <div className="orb" style={{ width:400,height:400,background:'#6366f1',bottom:-60,left:-100 }}/>
        <div className="hide-m" style={{ position:'absolute',top:'18%',right:'7%',animation:'float 6s ease-in-out infinite',opacity:0.55 }}>
          <div style={{ width:72,height:72,borderRadius:18,background:'linear-gradient(135deg,#0ea5e9,#6366f1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32 }}>🎓</div>
        </div>
        <div className="hide-m" style={{ position:'absolute',top:'52%',right:'17%',animation:'float 8s ease-in-out infinite 1.8s',opacity:0.4 }}>
          <div style={{ width:54,height:54,borderRadius:13,background:isLight?'rgba(14,165,233,0.12)':'rgba(14,165,233,0.2)',border:'1px solid rgba(14,165,233,0.4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24 }}>💬</div>
        </div>
        <div className="hide-m" style={{ position:'absolute',top:'32%',right:'28%',animation:'float 7s ease-in-out infinite 0.9s',opacity:0.35 }}>
          <div style={{ width:42,height:42,borderRadius:10,background:isLight?'rgba(99,102,241,0.1)':'rgba(99,102,241,0.18)',border:'1px solid rgba(99,102,241,0.35)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:19 }}>✏️</div>
        </div>
        <div style={{ maxWidth:680,position:'relative',zIndex:2,width:'100%' }}>
          <div className="fu sec-label">{t.heroLabel}</div>
          <h1 className="fu d1" style={{ fontFamily:"'Fraunces',serif",fontSize:'clamp(34px,7vw,82px)',fontWeight:900,lineHeight:1.04,letterSpacing:'-2px',margin:'0 0 20px',color:th.color }}>
            {t.heroTitle1}<br/><span className="grad-text">{t.heroTitle2}</span>
          </h1>
          <p className="fu d2" style={{ fontSize:'clamp(14px,2.5vw,17px)',lineHeight:1.75,color:th.body,maxWidth:520,marginBottom:32 }}>
            {t.heroSub}
          </p>
          <div className="fu d3" style={{ display:'flex',gap:12,flexWrap:'wrap',marginBottom:48 }}>
            <button className="btn-p" onClick={()=>go('contact')} style={{ fontSize:'clamp(13px,2vw,15px)',padding:'13px 28px' }}>{t.heroCta1}</button>
            <button className="btn-o" onClick={()=>go('courses')} style={{ fontSize:'clamp(13px,2vw,15px)',padding:'13px 28px' }}>{t.heroCta2}</button>
          </div>
          <div className="fu d4" style={{ display:'flex',gap:'clamp(20px,4vw,40px)',flexWrap:'wrap',paddingTop:32,borderTop:`1px solid ${isLight?'rgba(14,165,233,0.12)':'rgba(14,165,233,0.1)'}` }}>
            {STATS.map(s=>(
              <div key={s.value}>
                <div style={{ fontSize:'clamp(18px,3.5vw,28px)',fontWeight:800,fontFamily:"'Fraunces',serif",color:th.color,lineHeight:1.1 }}>{s.value}</div>
                <div style={{ fontSize:'clamp(10px,1.8vw,12px)',color:th.muted,marginTop:3,letterSpacing:'0.3px' }}>{s.label[lang]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="sec" style={{ maxWidth:1200,margin:'0 auto' }}>
        <SectionHeader label={t.coursesLabel} title1={t.coursesTitle1} title2={t.coursesTitle2} sub={t.coursesSub}/>
        <div className="g3">
          {COURSES.map((c,i)=>(
            <div key={i} className="card" style={{ padding:'clamp(20px,3vw,30px)' }}>
              <div style={{ display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:18 }}>
                <div style={{ width:48,height:48,borderRadius:13,background:isLight?'rgba(14,165,233,0.08)':'rgba(14,165,233,0.12)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22 }}>{c.icon}</div>
                <span style={{ fontSize:10,fontWeight:700,color:'#38bdf8',background:'rgba(56,189,248,0.1)',border:'1px solid rgba(56,189,248,0.2)',borderRadius:100,padding:'3px 10px',letterSpacing:'0.5px',whiteSpace:'nowrap' }}>{c.badge}</span>
              </div>
              <h3 style={{ fontSize:'clamp(15px,2vw,17px)',fontWeight:700,marginBottom:9,color:th.color }}>{c.title[lang]}</h3>
              <p style={{ fontSize:13,color:th.sub,lineHeight:1.7,marginBottom:18 }}>{c.desc[lang]}</p>
              <button className="btn-o" onClick={()=>go('contact')} style={{ fontSize:12,padding:'7px 16px',borderRadius:100 }}>Learn More →</button>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ background:th.secBg,borderTop:`1px solid ${th.secBorder}`,borderBottom:`1px solid ${th.secBorder}` }}>
        <div className="wrap sec g2-about">
          <div>
            <SectionHeader label={t.aboutLabel} title1={t.aboutTitle1} title2={t.aboutTitle2} center={false}/>
            <p style={{ color:th.body,fontSize:'clamp(14px,1.8vw,15.5px)',lineHeight:1.85,marginBottom:20 }}>{t.aboutP1}</p>
            <p style={{ color:th.body,fontSize:'clamp(14px,1.8vw,15.5px)',lineHeight:1.85,marginBottom:32 }}>{t.aboutP2}</p>
            <div style={{ display:'flex',gap:8,flexWrap:'wrap' }}>
              {t.aboutTags.map(tag=>(
                <span key={tag} style={{ fontSize:12,color:th.color,background:th.tagBg,border:`1px solid ${th.tagBorder}`,borderRadius:100,padding:'6px 14px',fontWeight:500 }}>✓ {tag}</span>
              ))}
            </div>
          </div>
          <div className="g2-stats">
            {STATS.map((s,i)=>(
              <div key={i} style={{ background: i===1?'linear-gradient(135deg,rgba(14,165,233,0.14),rgba(99,102,241,0.14))':(isLight?'#fff':'rgba(255,255,255,0.035)'), border:`1px solid ${i===1?'rgba(14,165,233,0.4)':(isLight?'rgba(14,165,233,0.1)':'rgba(255,255,255,0.07)')}`,borderRadius:18,padding:'clamp(18px,3vw,28px)',textAlign:'center' }}>
                <div style={{ fontFamily:"'Fraunces',serif",fontSize:'clamp(22px,4vw,38px)',fontWeight:800,color:th.color,lineHeight:1.1,marginBottom:6 }}>{s.value}</div>
                <div style={{ fontSize:12,color:th.sub,letterSpacing:'0.3px' }}>{s.label[lang]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="sec" style={{ maxWidth:1100,margin:'0 auto' }}>
        <SectionHeader label={t.pricingLabel} title1={t.pricingTitle1} title2={t.pricingTitle2} sub={t.pricingSub}/>
        <div className="g3">
          {PRICING.map((p,i)=>(
            <div key={i} className={`p-card${p.highlight?' hl':''}`} style={{ padding:'clamp(22px,3vw,36px)' }}>
              {p.highlight && (
                <div style={{ position:'absolute',top:14,right:14,fontSize:10,fontWeight:700,letterSpacing:1.5,background:'linear-gradient(135deg,#0ea5e9,#6366f1)',color:'#fff',padding:'4px 11px',borderRadius:100,textTransform:'uppercase' }}>{t.pricingPopular}</div>
              )}
              <div style={{ fontSize:12,color:th.sub,marginBottom:6,fontWeight:500 }}>{p.name[lang]}</div>
              <div style={{ display:'flex',alignItems:'baseline',gap:4,marginBottom:4 }}>
                <span style={{ fontFamily:"'Fraunces',serif",fontSize:'clamp(26px,5vw,44px)',fontWeight:800,color:th.color,lineHeight:1.1 }}>{p.price}</span>
                <span style={{ fontSize:13,color:th.muted }}>{p.period}</span>
              </div>
              <p style={{ fontSize:12,color:th.sub,marginBottom:24,lineHeight:1.5 }}>{p.desc[lang]}</p>
              <div style={{ marginBottom:28,display:'flex',flexDirection:'column',gap:10 }}>
                {p.features[lang].map((f,j)=>(
                  <div key={j} style={{ display:'flex',alignItems:'flex-start',gap:9,fontSize:13,color:th.body,lineHeight:1.5 }}>
                    <span style={{ color:'#38bdf8',fontSize:14,flexShrink:0,marginTop:1 }}>✓</span>{f}
                  </div>
                ))}
              </div>
              <button className={p.highlight?'btn-p':'btn-o'} onClick={()=>go('contact')} style={{ width:'100%' }}>{p.cta[lang]}</button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" style={{ background:th.secBg,borderTop:`1px solid ${th.secBorder}` }}>
        <div className="wrap sec">
          <SectionHeader label={t.testimonialsLabel} title1={t.testimonialsTitle1} title2={t.testimonialsTitle2}/>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(260px,100%),1fr))',gap:20 }}>
            {TESTIMONIALS.map((tm,i)=>(
              <div key={i} className="t-card" style={{ padding:'clamp(20px,3vw,28px)' }}>
                <div style={{ display:'flex',gap:3,marginBottom:16 }}>
                  {Array.from({length:tm.rating}).map((_,j)=><span key={j} style={{ color:'#f59e0b',fontSize:14 }}>★</span>)}
                </div>
                <p style={{ fontSize:14,lineHeight:1.75,color:th.body,marginBottom:20,fontStyle:'italic' }}>
                  {t.quoteOpen}{tm.text[lang]}{t.quoteClose}
                </p>
                <div style={{ display:'flex',alignItems:'center',gap:11 }}>
                  <div style={{ width:38,height:38,borderRadius:'50%',background:'linear-gradient(135deg,#0ea5e9,#6366f1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,color:'#fff',flexShrink:0 }}>{tm.avatar}</div>
                  <div>
                    <div style={{ fontSize:13,fontWeight:700,color:th.color }}>{tm.name} <span style={{ fontSize:14 }}>{tm.country}</span></div>
                    <div style={{ fontSize:11,color:th.muted }}>{tm.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="sec" style={{ maxWidth:780,margin:'0 auto' }}>
        <SectionHeader label={t.contactLabel} title1={t.contactTitle1} title2={t.contactTitle2} sub={t.contactSub}/>
        {submitted ? (
          <div style={{ textAlign:'center',padding:'clamp(32px,6vw,56px) clamp(20px,5vw,40px)',background:'rgba(14,165,233,0.07)',border:'1px solid rgba(14,165,233,0.25)',borderRadius:22 }}>
            <div style={{ fontSize:48,marginBottom:14 }}>🎉</div>
            <h3 style={{ fontSize:'clamp(18px,3vw,24px)',fontWeight:700,marginBottom:8,fontFamily:"'Fraunces',serif",color:th.color }}>{t.successTitle}</h3>
            <p style={{ color:th.sub,fontSize:15 }}>{t.successSub}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ background:th.cardBg,border:`1px solid ${th.cardBorder}`,borderRadius:22,padding:'clamp(24px,5vw,48px)',display:'flex',flexDirection:'column',gap:18 }}>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:16 }}>
              <div>
                <label style={{ fontSize:12,color:th.sub,marginBottom:7,display:'block',fontWeight:600 }}>{t.formName} *</label>
                <input className="inp" required placeholder={t.formNamePh} value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})}/>
              </div>
              <div>
                <label style={{ fontSize:12,color:th.sub,marginBottom:7,display:'block',fontWeight:600 }}>{t.formEmail} *</label>
                <input className="inp" type="email" required placeholder={t.formEmailPh} value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})}/>
              </div>
            </div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:16 }}>
              <div>
                <label style={{ fontSize:12,color:th.sub,marginBottom:7,display:'block',fontWeight:600 }}>{t.formPhone}</label>
                <input className="inp" placeholder={t.formPhonePh} value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})}/>
              </div>
              <div>
                <label style={{ fontSize:12,color:th.sub,marginBottom:7,display:'block',fontWeight:600 }}>{t.formLevel} *</label>
                <select className="inp" required value={formData.level} onChange={e=>setFormData({...formData,level:e.target.value})}>
                  <option value="" disabled>{t.formLevelPh}</option>
                  {LEVELS.map(l=><option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize:12,color:th.sub,marginBottom:7,display:'block',fontWeight:600 }}>{t.formMessage}</label>
              <textarea className="inp" rows={4} placeholder={t.formMessagePh} style={{ resize:'vertical',minHeight:100 }} value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})}/>
            </div>
            <button type="submit" className="btn-p" style={{ width:'100%',padding:'15px',fontSize:'clamp(13px,2vw,15px)' }}>{t.formSubmit}</button>
            <p style={{ fontSize:11,color:th.muted,textAlign:'center' }}>🔒 Your information is safe and will never be shared.</p>
          </form>
        )}
      </section>

      <AIChatWidget th={th} isLight={isLight}/>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${th.secBorder}`,padding:'clamp(22px,4vw,36px) clamp(16px,4vw,40px)' }}>
        <div style={{ maxWidth:1200,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:14,rowGap:16 }}>
          <div style={{ display:'flex',alignItems:'center',gap:9 }}>
            <div style={{ width:28,height:28,borderRadius:7,background:'linear-gradient(135deg,#0ea5e9,#6366f1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13 }}>📚</div>
            <span style={{ fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:700,color:th.color }}>Speak<span style={{ color:'#0ea5e9' }}>ora</span></span>
          </div>
          <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:4,textAlign:'center' }}>
            <p style={{ fontSize:12,color:th.muted }}>{t.footerRights}</p>
            <p style={{ fontSize:11,color:th.muted }}>
              Engineered by{' '}
              <a href="https://yourportfolio.com" target="_blank" rel="noopener noreferrer"
                style={{ color:'#38bdf8',textDecoration:'none',fontWeight:600,transition:'color 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.color='#7dd3fc'}
                onMouseLeave={e=>e.currentTarget.style.color='#38bdf8'}
              >Arman Villegas</a>
            </p>
          </div>
          <div style={{ display:'flex',gap:20,flexWrap:'wrap' }}>
            {t.footerLinks.map((l,i)=>(
              <span key={l} className="nav-link" style={{ fontSize:12 }} onClick={()=>go(NAV_IDS[i])}>{l}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}