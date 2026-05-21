import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, getHomeForRole } from '../../context/AuthContext';

// ── LANG / THEME ──────────────────────────────────────────────────────────────
const LANG_CYCLE  = { en: 'fil', fil: 'ja', ja: 'en' };
const LANG_FLAGS  = { en: '🇬🇧', fil: '🇵🇭', ja: '🇯🇵' };
const LANG_TITLES = { en: 'Switch to Filipino', fil: '日本語に切り替える', ja: 'Switch to English' };

const T = {
  en: {
    login: 'Login', register: 'Register',
    welcomeBack: 'Welcome back',
    loginSub: 'Sign in to continue your English journey.',
    joinUs: 'Join Speakora',
    registerSub: 'Create your free account and start learning today.',
    email: 'Email Address', emailPh: 'juan@email.com',
    password: 'Password', passwordPh: 'Enter your password',
    confirmPassword: 'Confirm Password', confirmPh: 'Re-enter your password',
    fullName: 'Full Name', fullNamePh: 'Juan dela Cruz',
    phone: 'Phone Number', phonePh: '+63 9XX XXX XXXX',
    role: 'I am a', rolePh: 'Select your role',
    roles: ['Student', 'Teacher', 'Parent'],
    forgotPassword: 'Forgot password?',
    loginBtn: 'Sign In ↗', registerBtn: 'Create Account ↗',
    orDivider: 'or continue with',
    noAccount: "Don't have an account?", hasAccount: 'Already have an account?',
    signUp: 'Sign up free', signIn: 'Sign in',
    terms: 'By creating an account, you agree to our',
    termsLink: 'Terms of Service', and: 'and', privacyLink: 'Privacy Policy',
    backHome: '← Back to Home', logging: 'Signing in…', registering: 'Creating account…',
  },
  fil: {
    login: 'Mag-login', register: 'Mag-register',
    welcomeBack: 'Maligayang pagbabalik',
    loginSub: 'Mag-sign in para ipagpatuloy ang iyong pag-aaral ng Ingles.',
    joinUs: 'Sumali sa Speakora',
    registerSub: 'Gumawa ng libreng account at magsimulang matuto ngayon.',
    email: 'Email Address', emailPh: 'juan@email.com',
    password: 'Password', passwordPh: 'Ilagay ang iyong password',
    confirmPassword: 'Kumpirmahin ang Password', confirmPh: 'Ilagay muli ang password',
    fullName: 'Buong Pangalan', fullNamePh: 'Juan dela Cruz',
    phone: 'Numero ng Telepono', phonePh: '+63 9XX XXX XXXX',
    role: 'Ako ay isang', rolePh: 'Piliin ang iyong papel',
    roles: ['Mag-aaral', 'Guro', 'Magulang'],
    forgotPassword: 'Nakalimutan ang password?',
    loginBtn: 'Mag-sign In ↗', registerBtn: 'Gumawa ng Account ↗',
    orDivider: 'o magpatuloy sa',
    noAccount: 'Wala pang account?', hasAccount: 'Mayroon nang account?',
    signUp: 'Mag-sign up libre', signIn: 'Mag-sign in',
    terms: 'Sa paggawa ng account, sumasang-ayon ka sa aming',
    termsLink: 'Mga Tuntunin', and: 'at', privacyLink: 'Patakaran sa Privacy',
    backHome: '← Bumalik sa Home', logging: 'Nagsa-sign in…', registering: 'Gumagawa ng account…',
  },
  ja: {
    login: 'ログイン', register: '新規登録',
    welcomeBack: 'おかえりなさい',
    loginSub: '英語学習を続けるためにサインインしてください。',
    joinUs: 'Speakoraに参加する',
    registerSub: '無料アカウントを作成して今すぐ学習を始めましょう。',
    email: 'メールアドレス', emailPh: 'taro@example.com',
    password: 'パスワード', passwordPh: 'パスワードを入力',
    confirmPassword: 'パスワード確認', confirmPh: 'パスワードを再入力',
    fullName: 'お名前', fullNamePh: '山田 太郎',
    phone: '電話番号', phonePh: '090-XXXX-XXXX',
    role: '役割', rolePh: '役割を選択',
    roles: ['生徒', '講師', '保護者'],
    forgotPassword: 'パスワードを忘れた方',
    loginBtn: 'サインイン ↗', registerBtn: 'アカウント作成 ↗',
    orDivider: 'またはこちらから',
    noAccount: 'アカウントをお持ちでない方は', hasAccount: 'すでにアカウントをお持ちの方は',
    signUp: '無料登録', signIn: 'サインイン',
    terms: 'アカウントを作成することで、',
    termsLink: '利用規約', and: 'および', privacyLink: 'プライバシーポリシー',
    backHome: '← ホームに戻る', logging: 'サインイン中…', registering: 'アカウント作成中…',
  },
};

// ── SHARED TOGGLES (same as landing) ─────────────────────────────────────────
function LangToggle({ lang, setLang, isLight }) {
  const bg     = isLight ? 'rgba(0,0,0,0.05)'    : 'rgba(255,255,255,0.06)';
  const border = isLight ? 'rgba(0,0,0,0.12)'    : 'rgba(255,255,255,0.12)';
  const color  = isLight ? 'rgba(17,24,39,0.75)' : 'rgba(232,237,245,0.85)';
  return (
    <div onClick={() => setLang(l => LANG_CYCLE[l])} title={LANG_TITLES[lang]}
      style={{ display:'flex', alignItems:'center', gap:6, background:bg, border:`1px solid ${border}`, borderRadius:100, padding:'5px 12px 5px 8px', cursor:'pointer', userSelect:'none', fontSize:13, fontWeight:600, color, flexShrink:0, transition:'all 0.2s' }}
      onMouseEnter={e=>e.currentTarget.style.background=isLight?'rgba(0,0,0,0.08)':'rgba(255,255,255,0.1)'}
      onMouseLeave={e=>e.currentTarget.style.background=bg}
    >
      <div style={{ display:'flex', background:isLight?'rgba(0,0,0,0.06)':'rgba(255,255,255,0.08)', borderRadius:100, padding:'2px', gap:2 }}>
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
      title={isLight?'Switch to dark mode':'Switch to light mode'}
      style={{ display:'flex', alignItems:'center', justifyContent:'center', width:36, height:36, background:bg, border:`1px solid ${border}`, borderRadius:'50%', cursor:'pointer', transition:'all 0.2s', userSelect:'none', fontSize:15, flexShrink:0 }}
      onMouseEnter={e=>e.currentTarget.style.background=isLight?'rgba(0,0,0,0.08)':'rgba(255,255,255,0.1)'}
      onMouseLeave={e=>e.currentTarget.style.background=bg}
    >{isLight ? '🌙' : '☀️'}</div>
  );
}

// ── PASSWORD STRENGTH ─────────────────────────────────────────────────────────
function getStrength(pw) {
  let s = 0;
  if (pw.length >= 8)          s++;
  if (/[A-Z]/.test(pw))        s++;
  if (/[0-9]/.test(pw))        s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}
const STRENGTH_LABELS  = ['Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_COLORS  = ['#ef4444', '#f59e0b', '#38bdf8', '#34d399'];

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function AuthPage({ defaultTab = 'login' }) {
  const navigate        = useNavigate();
  const location        = useLocation();
  const { login, register, user } = useAuth();

  const [tab, setTab]       = useState(defaultTab);
  const [lang, setLang]     = useState('en');
  const [theme, setTheme]   = useState('dark');
  const [showPw, setShowPw] = useState(false);
  const [showCpw,setShowCpw]= useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');
  const [success, setSuccess] = useState('');

  const [loginForm, setLoginForm] = useState({ email:'', password:'' });
  const [regForm, setRegForm]     = useState({ name:'', email:'', phone:'', password:'', confirmPassword:'', role:'' });

  const t       = T[lang];
  const isLight = theme === 'light';

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate(getHomeForRole(user.role), { replace: true });
  }, [user, navigate]);

  useEffect(() => { setError(''); setSuccess(''); }, [tab]);

  const th = {
    bg:          isLight ? '#f0f9ff'               : '#04090f',
    color:       isLight ? '#0c1a2e'               : '#e2f0fb',
    cardBg:      isLight ? '#ffffff'               : 'rgba(255,255,255,0.03)',
    cardBorder:  isLight ? 'rgba(14,165,233,0.18)' : 'rgba(14,165,233,0.12)',
    sub:         isLight ? 'rgba(12,26,46,0.55)'   : 'rgba(226,240,251,0.55)',
    muted:       isLight ? 'rgba(12,26,46,0.38)'   : 'rgba(226,240,251,0.35)',
    inputBg:     isLight ? '#ffffff'               : 'rgba(255,255,255,0.04)',
    inputBorder: isLight ? 'rgba(14,165,233,0.2)'  : 'rgba(14,165,233,0.15)',
  };

  // ── HANDLERS ─────────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const data = await login(loginForm);
      // Navigate to where they came from, or their role home
      const from = location.state?.from?.pathname || getHomeForRole(data.user?.role);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed. Please try again.');
    } finally { setLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (regForm.password !== regForm.confirmPassword) {
      setError('Passwords do not match.'); return;
    }
    setLoading(true);
    try {
      const data = await register({
        name:     regForm.name,
        email:    regForm.email,
        phone:    regForm.phone,
        password: regForm.password,
        role:     regForm.role,
      });
      setSuccess('Account created! Redirecting…');
      setTimeout(() => navigate(getHomeForRole(data.user?.role), { replace: true }), 1200);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  const pwStrength = getStrength(regForm.password);

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:th.bg, color:th.color, minHeight:'100vh', display:'flex', flexDirection:'column', transition:'background 0.3s,color 0.3s', overflowX:'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&family=Fraunces:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet"/>

      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{overflow-x:hidden}
        ::selection{background:#0ea5e9;color:#fff}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:#0ea5e9;border-radius:3px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(18px)}to{opacity:1;transform:translateX(0)}}
        .auth-card{animation:fadeUp 0.5s ease both}
        .tab-content{animation:slideIn 0.28s ease both}
        .grad-text{
          background:linear-gradient(135deg,#38bdf8 0%,#818cf8 50%,#34d399 100%);
          background-size:200% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          animation:shimmer 4s linear infinite;
        }
        .btn-p{
          display:inline-flex;align-items:center;justify-content:center;gap:7px;
          background:linear-gradient(135deg,#0ea5e9,#6366f1);color:#fff;border:none;border-radius:100px;
          padding:13px 26px;font-size:14.5px;font-weight:600;cursor:pointer;
          transition:all 0.22s;font-family:'DM Sans',sans-serif;white-space:nowrap;width:100%;
        }
        .btn-p:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 10px 28px rgba(14,165,233,0.38)}
        .btn-p:active:not(:disabled){transform:scale(0.97)}
        .btn-p:disabled{opacity:0.6;cursor:not-allowed}
        .inp{
          width:100%;background:${th.inputBg};border:1.5px solid ${th.inputBorder};
          border-radius:11px;padding:12px 16px;font-size:14px;color:${th.color};
          font-family:'DM Sans',sans-serif;transition:border-color 0.2s,box-shadow 0.2s;outline:none;
        }
        .inp:focus{border-color:#0ea5e9;box-shadow:0 0 0 3px rgba(14,165,233,0.12)}
        .inp::placeholder{color:${th.muted}}
        select.inp option{background:${isLight?'#fff':'#04090f'};color:${th.color}}
        .pw-wrap{position:relative}
        .pw-eye{position:absolute;right:13px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:${th.muted};font-size:16px;padding:4px;transition:color 0.2s;line-height:1}
        .pw-eye:hover{color:#38bdf8}
        .soc-btn{
          display:flex;align-items:center;justify-content:center;gap:8px;
          background:${isLight?'rgba(0,0,0,0.04)':'rgba(255,255,255,0.05)'};
          border:1.5px solid ${isLight?'rgba(14,165,233,0.15)':'rgba(255,255,255,0.1)'};
          border-radius:100px;padding:10px 18px;font-size:13px;font-weight:500;
          color:${th.color};cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.22s;flex:1;
        }
        .soc-btn:hover{border-color:rgba(14,165,233,0.4);background:${isLight?'rgba(14,165,233,0.05)':'rgba(14,165,233,0.08)'}}
        .strength-bar{height:4px;border-radius:2px;transition:all 0.3s}
        .orb{position:fixed;border-radius:50%;filter:blur(100px);pointer-events:none;opacity:${isLight?'0.08':'0.18'};z-index:0}
        .hide-m{display:block}
        @media(max-width:640px){
          .auth-inner{padding:24px 18px!important}
          .hide-m{display:none!important}
          .two-col{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* Orbs */}
      <div className="orb" style={{ width:500, height:500, background:'#0ea5e9', top:-120, right:-100 }}/>
      <div className="orb" style={{ width:360, height:360, background:'#6366f1', bottom:-80, left:-80 }}/>

      {/* Nav */}
      <nav style={{ position:'relative', zIndex:10, height:68, padding:'0 clamp(16px,4vw,40px)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div onClick={() => navigate('/')} style={{ display:'flex', alignItems:'center', gap:9, cursor:'pointer', flexShrink:0 }}>
          <div style={{ width:34,height:34,borderRadius:9,background:'linear-gradient(135deg,#0ea5e9,#6366f1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15 }}>📚</div>
          <span style={{ fontSize:19,fontWeight:700,fontFamily:"'Fraunces',serif",letterSpacing:'-0.4px',color:th.color }}>
            Speak<span style={{ color:'#0ea5e9' }}>ora</span>
          </span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <ThemeToggle theme={theme} setTheme={setTheme} isLight={isLight}/>
          <LangToggle lang={lang} setLang={setLang} isLight={isLight}/>
        </div>
      </nav>

      {/* Main */}
      <main style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'clamp(12px,3vw,32px) 16px clamp(32px,5vw,56px)', position:'relative', zIndex:1 }}>
        <div className="auth-card" style={{ width:'100%', maxWidth:480, position:'relative' }}>

          {/* Back home */}
          <button onClick={() => navigate('/')} style={{ background:'none', border:'none', color:th.muted, cursor:'pointer', fontSize:13, fontWeight:500, marginBottom:18, padding:0, display:'flex', alignItems:'center', gap:4, transition:'color 0.2s', fontFamily:"'DM Sans',sans-serif" }}
            onMouseEnter={e=>e.currentTarget.style.color='#38bdf8'}
            onMouseLeave={e=>e.currentTarget.style.color=th.muted}
          >{t.backHome}</button>

          {/* Card */}
          <div style={{ background:th.cardBg, border:`1px solid ${th.cardBorder}`, borderRadius:24, overflow:'hidden', boxShadow: isLight?'0 20px 60px rgba(14,165,233,0.08)':'0 20px 60px rgba(0,0,0,0.3)' }}>

            {/* Tabs */}
            <div style={{ display:'flex', borderBottom:`1px solid ${th.cardBorder}`, background:isLight?'rgba(14,165,233,0.03)':'rgba(255,255,255,0.02)' }}>
              {['login','register'].map(tabId => (
                <button key={tabId} onClick={() => setTab(tabId)} style={{
                  flex:1, padding:'17px 0', background:'none', border:'none', cursor:'pointer',
                  fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:700,
                  color: tab===tabId ? '#38bdf8' : th.muted,
                  borderBottom: tab===tabId ? '2.5px solid #0ea5e9' : '2.5px solid transparent',
                  transition:'all 0.22s',
                }}>
                  {tabId==='login' ? t.login : t.register}
                </button>
              ))}
            </div>

            <div className="auth-inner tab-content" key={tab} style={{ padding:'clamp(24px,5vw,38px)' }}>

              {/* Header */}
              <div style={{ marginBottom:24 }}>
                <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:'clamp(22px,5vw,28px)', fontWeight:800, lineHeight:1.1, marginBottom:7, color:th.color }}>
                  {tab==='login'
                    ? <>{t.welcomeBack} <span className="grad-text">👋</span></>
                    : <span className="grad-text">{t.joinUs}</span>
                  }
                </h1>
                <p style={{ fontSize:13.5, color:th.sub, lineHeight:1.6 }}>
                  {tab==='login' ? t.loginSub : t.registerSub}
                </p>
              </div>

              {/* Alerts */}
              {error && (
                <div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:11, padding:'11px 15px', marginBottom:18, fontSize:13, color:'#f87171', display:'flex', alignItems:'flex-start', gap:8 }}>
                  ⚠️ {error}
                </div>
              )}
              {success && (
                <div style={{ background:'rgba(52,211,153,0.1)', border:'1px solid rgba(52,211,153,0.3)', borderRadius:11, padding:'11px 15px', marginBottom:18, fontSize:13, color:'#34d399', display:'flex', alignItems:'center', gap:8 }}>
                  ✅ {success}
                </div>
              )}

              {/* ── LOGIN ────────────────────────────────────────────── */}
              {tab === 'login' && (
                <form onSubmit={handleLogin} style={{ display:'flex', flexDirection:'column', gap:15 }}>
                  <div>
                    <label style={{ fontSize:12, color:th.sub, marginBottom:7, display:'block', fontWeight:600, letterSpacing:'0.3px' }}>{t.email}</label>
                    <input className="inp" type="email" required autoComplete="email" placeholder={t.emailPh}
                      value={loginForm.email} onChange={e=>setLoginForm({...loginForm,email:e.target.value})}/>
                  </div>

                  <div>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:7 }}>
                      <label style={{ fontSize:12, color:th.sub, fontWeight:600, letterSpacing:'0.3px' }}>{t.password}</label>
                      <button type="button" onClick={() => navigate('/forgot-password')}
                        style={{ background:'none', border:'none', color:'#38bdf8', fontSize:12, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", padding:0 }}>
                        {t.forgotPassword}
                      </button>
                    </div>
                    <div className="pw-wrap">
                      <input className="inp" type={showPw?'text':'password'} required autoComplete="current-password"
                        placeholder={t.passwordPh} style={{ paddingRight:44 }}
                        value={loginForm.password} onChange={e=>setLoginForm({...loginForm,password:e.target.value})}/>
                      <button type="button" className="pw-eye" onClick={()=>setShowPw(s=>!s)}>{showPw?'🙈':'👁️'}</button>
                    </div>
                  </div>

                  <button type="submit" className="btn-p" disabled={loading} style={{ marginTop:4 }}>
                    {loading
                      ? <span style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <span style={{ width:15,height:15,borderRadius:'50%',border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',animation:'spin 0.7s linear infinite',display:'inline-block' }}/>
                          {t.logging}
                        </span>
                      : t.loginBtn}
                  </button>

                  {/* Divider */}
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <div style={{ flex:1, height:1, background:isLight?'rgba(0,0,0,0.08)':'rgba(255,255,255,0.08)' }}/>
                    <span style={{ fontSize:12, color:th.muted }}>{t.orDivider}</span>
                    <div style={{ flex:1, height:1, background:isLight?'rgba(0,0,0,0.08)':'rgba(255,255,255,0.08)' }}/>
                  </div>

                  {/* Social */}
                  <div style={{ display:'flex', gap:10 }}>
                    <button type="button" className="soc-btn">
                      <svg width="15" height="15" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/><path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/><path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/><path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/></svg>
                      Google
                    </button>
                    <button type="button" className="soc-btn">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill={isLight?'#1877F2':'#4299e1'}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      Facebook
                    </button>
                  </div>

                  <p style={{ fontSize:13, color:th.muted, textAlign:'center' }}>
                    {t.noAccount}{' '}
                    <button type="button" onClick={()=>setTab('register')} style={{ background:'none', border:'none', color:'#38bdf8', cursor:'pointer', fontWeight:600, fontSize:13, fontFamily:"'DM Sans',sans-serif", padding:0 }}>{t.signUp}</button>
                  </p>
                </form>
              )}

              {/* ── REGISTER ─────────────────────────────────────────── */}
              {tab === 'register' && (
                <form onSubmit={handleRegister} style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  <div className="two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:13 }}>
                    <div>
                      <label style={{ fontSize:12, color:th.sub, marginBottom:7, display:'block', fontWeight:600, letterSpacing:'0.3px' }}>{t.fullName} *</label>
                      <input className="inp" required autoComplete="name" placeholder={t.fullNamePh}
                        value={regForm.name} onChange={e=>setRegForm({...regForm,name:e.target.value})}/>
                    </div>
                    <div>
                      <label style={{ fontSize:12, color:th.sub, marginBottom:7, display:'block', fontWeight:600, letterSpacing:'0.3px' }}>{t.phone}</label>
                      <input className="inp" autoComplete="tel" placeholder={t.phonePh}
                        value={regForm.phone} onChange={e=>setRegForm({...regForm,phone:e.target.value})}/>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize:12, color:th.sub, marginBottom:7, display:'block', fontWeight:600, letterSpacing:'0.3px' }}>{t.email} *</label>
                    <input className="inp" type="email" required autoComplete="email" placeholder={t.emailPh}
                      value={regForm.email} onChange={e=>setRegForm({...regForm,email:e.target.value})}/>
                  </div>

                  <div>
                    <label style={{ fontSize:12, color:th.sub, marginBottom:7, display:'block', fontWeight:600, letterSpacing:'0.3px' }}>{t.role} *</label>
                    <select className="inp" required value={regForm.role} onChange={e=>setRegForm({...regForm,role:e.target.value})}>
                      <option value="" disabled>{t.rolePh}</option>
                      {['Student','Teacher','Parent'].map((r,i) => (
                        <option key={r} value={r.toLowerCase()}>{t.roles[i]}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize:12, color:th.sub, marginBottom:7, display:'block', fontWeight:600, letterSpacing:'0.3px' }}>{t.password} *</label>
                    <div className="pw-wrap">
                      <input className="inp" type={showPw?'text':'password'} required autoComplete="new-password"
                        placeholder={t.passwordPh} style={{ paddingRight:44 }} minLength={8}
                        value={regForm.password} onChange={e=>setRegForm({...regForm,password:e.target.value})}/>
                      <button type="button" className="pw-eye" onClick={()=>setShowPw(s=>!s)}>{showPw?'🙈':'👁️'}</button>
                    </div>
                    {regForm.password && (
                      <div style={{ marginTop:8, display:'flex', gap:4, alignItems:'center' }}>
                        {[1,2,3,4].map(level => (
                          <div key={level} className="strength-bar" style={{ flex:1, background: level<=pwStrength ? STRENGTH_COLORS[pwStrength-1] : (isLight?'rgba(0,0,0,0.08)':'rgba(255,255,255,0.08)') }}/>
                        ))}
                        <span style={{ fontSize:11, color:th.muted, marginLeft:4, whiteSpace:'nowrap' }}>{STRENGTH_LABELS[pwStrength-1] || ''}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label style={{ fontSize:12, color:th.sub, marginBottom:7, display:'block', fontWeight:600, letterSpacing:'0.3px' }}>{t.confirmPassword} *</label>
                    <div className="pw-wrap">
                      <input className="inp" type={showCpw?'text':'password'} required autoComplete="new-password"
                        placeholder={t.confirmPh} style={{ paddingRight:44,
                          borderColor: regForm.confirmPassword && regForm.password!==regForm.confirmPassword ? 'rgba(239,68,68,0.6)' : undefined }}
                        value={regForm.confirmPassword} onChange={e=>setRegForm({...regForm,confirmPassword:e.target.value})}/>
                      <button type="button" className="pw-eye" onClick={()=>setShowCpw(s=>!s)}>{showCpw?'🙈':'👁️'}</button>
                    </div>
                    {regForm.confirmPassword && regForm.password!==regForm.confirmPassword && (
                      <p style={{ fontSize:11, color:'#f87171', marginTop:5 }}>⚠️ Passwords don't match</p>
                    )}
                  </div>

                  <button type="submit" className="btn-p" disabled={loading} style={{ marginTop:2 }}>
                    {loading
                      ? <span style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <span style={{ width:15,height:15,borderRadius:'50%',border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',animation:'spin 0.7s linear infinite',display:'inline-block' }}/>
                          {t.registering}
                        </span>
                      : t.registerBtn}
                  </button>

                  <p style={{ fontSize:11, color:th.muted, textAlign:'center', lineHeight:1.6 }}>
                    {t.terms}{' '}
                    <span style={{ color:'#38bdf8', cursor:'pointer' }}>{t.termsLink}</span>
                    {' '}{t.and}{' '}
                    <span style={{ color:'#38bdf8', cursor:'pointer' }}>{t.privacyLink}</span>.
                  </p>

                  <p style={{ fontSize:13, color:th.muted, textAlign:'center' }}>
                    {t.hasAccount}{' '}
                    <button type="button" onClick={()=>setTab('login')} style={{ background:'none', border:'none', color:'#38bdf8', cursor:'pointer', fontWeight:600, fontSize:13, fontFamily:"'DM Sans',sans-serif", padding:0 }}>{t.signIn}</button>
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Decorative floaters */}
          <div className="hide-m" style={{ position:'absolute', top:'10%', right:'-10%', animation:'float 6s ease-in-out infinite', opacity:0.45, pointerEvents:'none' }}>
            <div style={{ width:54,height:54,borderRadius:13,background:'linear-gradient(135deg,#0ea5e9,#6366f1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24 }}>📖</div>
          </div>
          <div className="hide-m" style={{ position:'absolute', bottom:'12%', left:'-8%', animation:'float 8s ease-in-out infinite 1.5s', opacity:0.35, pointerEvents:'none' }}>
            <div style={{ width:42,height:42,borderRadius:10,background:isLight?'rgba(14,165,233,0.12)':'rgba(14,165,233,0.2)',border:'1px solid rgba(14,165,233,0.4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:19 }}>🎓</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ position:'relative', zIndex:1, borderTop:`1px solid ${isLight?'rgba(14,165,233,0.1)':'rgba(14,165,233,0.07)'}`, padding:'18px clamp(16px,4vw,40px)', textAlign:'center' }}>
        <p style={{ fontSize:12, color:th.muted }}>© 2026 Speakora. All rights reserved.</p>
      </footer>
    </div>
  );
}