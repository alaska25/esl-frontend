import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { getRoleRedirect } from '../utils/auth';
import {
  GoogleAuthProvider,
  signInWithPopup,
  getRedirectResult,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { auth } from '../firebase';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const REMEMBER_KEY = 'speakora_remember_me';
const EMAIL_KEY    = 'speakora_saved_email';

function saveRememberMe(email) {
  localStorage.setItem(REMEMBER_KEY, '1');
  localStorage.setItem(EMAIL_KEY, email);
}
function clearRememberMe() {
  localStorage.removeItem(REMEMBER_KEY);
  localStorage.removeItem(EMAIL_KEY);
}
function loadRemembered() {
  return {
    remembered: localStorage.getItem(REMEMBER_KEY) === '1',
    email: localStorage.getItem(EMAIL_KEY) || '',
  };
}

export default function Login() {
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();

  const [loading, setLoading]             = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError]                 = useState('');
  const [showPassword, setShowPassword]   = useState(false);
  const [rememberMe, setRememberMe]       = useState(false);
  const [form, setForm]                   = useState({ email: '', password: '' });

  useEffect(() => {
    const { remembered, email } = loadRemembered();
    if (remembered) {
      setRememberMe(true);
      setForm((prev) => ({ ...prev, email }));
    }
  }, []);

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (!result) return;
        setGoogleLoading(true);
        const idToken = await result.user.getIdToken();
        const data = await googleLogin(idToken);
        redirectAfterLogin(data.user);
      } catch (err) {
        console.log('Redirect error:', err);
      } finally {
        setGoogleLoading(false);
      }
    };
    handleRedirectResult();
  }, []);

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const redirectAfterLogin = (user) => {
    navigate(getRoleRedirect(user), { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please enter your email and password.',
        confirmButtonColor: '#0ea5e9',
      });
      return;
    }

    setLoading(true);
    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );

      const data = await login(form);

      if (rememberMe) {
        saveRememberMe(form.email);
      } else {
        clearRememberMe();
      }

      await Swal.fire({
        icon: 'success',
        title: 'Welcome back!',
        text: 'Redirecting to your dashboard…',
        timer: 1500,
        showConfirmButton: false,
        background: '#04090f',
        color: '#fff',
      }).then(() => {
        redirectAfterLogin(data.user);
      });

    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        err.message ||
        'Invalid credentials. Please try again.';
      setError(errMsg);
      Swal.fire({
        icon: 'error',
        title: 'Authentication Failed',
        text: errMsg,
        confirmButtonColor: '#dc2626',
        background: '#04090f',
        color: '#fff',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        const idToken = await result.user.getIdToken();
        const data = await googleLogin(idToken);
        redirectAfterLogin(data.user);
      }
    } catch (err) {
      if (
        err.code === 'auth/popup-closed-by-user' ||
        err.code === 'auth/cancelled-popup-request'
      ) return;
      console.error('Google Login Error:', err);
      setError(err.message || 'Google sign-in failed.');
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.message,
        background: '#04090f',
        color: '#fff',
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,800;0,900;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lg-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'DM Sans', sans-serif;
          background: #04090f;
        }

        /* ── LEFT PANEL ── */
        .lg-left {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 56px 64px;
          overflow: hidden;
          background: linear-gradient(135deg, #04090f 0%, #071525 100%);
        }
        .lg-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(14,165,233,.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 80%, rgba(99,102,241,.14) 0%, transparent 60%);
          pointer-events: none;
        }
        .lg-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(14,165,233,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .lg-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
        }
        .lg-brand-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px;
        }
        .lg-brand-name {
          font-family: 'Fraunces', serif;
          font-weight: 800;
          font-size: 20px;
          color: #fff;
          letter-spacing: -.3px;
        }
        .lg-brand-name em { font-style: normal; color: #38bdf8; }

        .lg-hero {
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
          padding: 40px 0 20px;
        }
        .lg-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: rgba(14,165,233,.15);
          border: 1px solid rgba(14,165,233,.3);
          border-radius: 20px;
          width: fit-content;
        }
        .lg-hero-tag span {
          font-size: 11px;
          font-weight: 600;
          color: #38bdf8;
          letter-spacing: .5px;
          text-transform: uppercase;
        }
        .lg-hero h1 {
          font-family: 'Fraunces', serif;
          font-size: 44px;
          font-weight: 900;
          color: #fff;
          line-height: 1.08;
          letter-spacing: -1.5px;
        }
        .lg-hero h1 em {
          font-style: italic;
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .lg-hero p {
          font-size: 15px;
          color: rgba(255,255,255,.5);
          line-height: 1.7;
          max-width: 340px;
        }

        .lg-quote {
          position: relative;
          padding: 24px 28px;
          background: rgba(14,165,233,.05);
          border: 1px solid rgba(14,165,233,.12);
          border-radius: 18px;
          border-left: 3px solid #0ea5e9;
          margin-bottom: 4px;
        }
        .lg-quote p {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255,255,255,.65);
          font-style: italic;
          margin-bottom: 14px;
        }
        .lg-quote-author {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .lg-avatar {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
        }
        .lg-quote-meta strong {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,.85);
        }
        .lg-quote-meta span {
          font-size: 11px;
          color: rgba(255,255,255,.35);
        }

        .lg-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          position: relative;
        }
        .lg-stat {
          text-align: center;
          padding: 18px 10px;
          background: rgba(14,165,233,.04);
          border: 1px solid rgba(14,165,233,.1);
          border-radius: 14px;
          transition: background .2s;
        }
        .lg-stat:hover { background: rgba(14,165,233,.08); }
        .lg-stat strong {
          display: block;
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 4px;
        }
        .lg-stat span {
          font-size: 11px;
          color: rgba(255,255,255,.4);
          letter-spacing: .3px;
        }

        /* ── RIGHT PANEL ── */
        .lg-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 64px;
          background: #f0f9ff;
        }
        .lg-card {
          width: 100%;
          max-width: 400px;
          animation: fadeUp .45s cubic-bezier(.22,.61,.36,1) forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .lg-card-header { margin-bottom: 32px; }
        .lg-card-header h2 {
          font-family: 'Fraunces', serif;
          font-size: 28px;
          font-weight: 800;
          color: #0c1a2e;
          letter-spacing: -.5px;
          margin-bottom: 6px;
        }
        .lg-card-header p { font-size: 14px; color: #6b7280; }

        .lg-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .6px;
          text-transform: uppercase;
          color: #c4c9d4;
          font-family: 'DM Sans', sans-serif;
        }
        .lg-divider::before, .lg-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0f2fe, transparent);
        }

        .lg-google-btn {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          border: 1.5px solid #e0f2fe;
          border-radius: 14px;
          background: linear-gradient(160deg, #ffffff 60%, #f0f9ff 100%);
          font-size: 14px;
          font-weight: 600;
          color: #1f2937;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all .22s cubic-bezier(.22,.61,.36,1);
          box-shadow: 0 1px 4px rgba(0,0,0,.06);
          position: relative;
          overflow: hidden;
        }
        .lg-google-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(14,165,233,.06), rgba(99,102,241,.04));
          opacity: 0;
          transition: opacity .22s;
        }
        .lg-google-btn:hover:not(:disabled)::before { opacity: 1; }
        .lg-google-btn:hover:not(:disabled) {
          border-color: #7dd3fc;
          box-shadow: 0 4px 16px rgba(14,165,233,.12), 0 0 0 3px rgba(14,165,233,.08);
          transform: translateY(-1px);
        }
        .lg-google-btn:active:not(:disabled) { transform: translateY(0); }
        .lg-google-btn:disabled { opacity: .55; cursor: not-allowed; }
        .lg-google-icon { width: 20px; height: 20px; flex-shrink: 0; position: relative; }
        .lg-google-btn-text { position: relative; letter-spacing: .1px; }

        .lg-form { display: flex; flex-direction: column; gap: 16px; }
        .lg-field { display: flex; flex-direction: column; gap: 6px; }
        .lg-label {
          font-size: 12px;
          font-weight: 600;
          color: #374151;
          letter-spacing: .3px;
          font-family: 'DM Sans', sans-serif;
          text-transform: uppercase;
        }
        .lg-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .lg-input {
          width: 100%;
          height: 48px;
          padding: 0 14px;
          background: #fff;
          border: 1.5px solid #e0f2fe;
          border-radius: 10px;
          font-size: 14px;
          color: #0c1a2e;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .lg-input-with-icon { padding-right: 44px; }
        .lg-input:focus {
          border-color: #0ea5e9;
          box-shadow: 0 0 0 3px rgba(14,165,233,.12);
        }
        .lg-input::placeholder { color: #9ca3af; }

        .lg-eye-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #9ca3af;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          transition: color .15s, background .15s;
          line-height: 0;
        }
        .lg-eye-btn:hover { color: #0ea5e9; background: rgba(14,165,233,.08); }
        .lg-eye-btn svg { width: 18px; height: 18px; }

        .lg-row-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .lg-forgot {
          font-size: 12px;
          color: #0ea5e9;
          text-decoration: none;
          font-weight: 500;
        }
        .lg-forgot:hover { text-decoration: underline; }

        .lg-remember {
          display: flex;
          align-items: center;
          gap: 9px;
          cursor: pointer;
          user-select: none;
          width: fit-content;
        }
        .lg-remember input[type="checkbox"] { display: none; }
        .lg-checkbox-box {
          width: 18px; height: 18px;
          border: 1.5px solid #bae6fd;
          border-radius: 5px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all .18s;
        }
        .lg-remember input:checked + .lg-checkbox-box {
          background: #0ea5e9;
          border-color: #0ea5e9;
        }
        .lg-checkbox-box svg {
          width: 11px; height: 11px;
          stroke: #fff;
          opacity: 0;
          transform: scale(.5);
          transition: all .18s;
        }
        .lg-remember input:checked + .lg-checkbox-box svg {
          opacity: 1;
          transform: scale(1);
        }
        .lg-remember-label {
          font-size: 13px;
          color: #4b5563;
          font-family: 'DM Sans', sans-serif;
        }

        .lg-error {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          font-size: 13px;
          color: #dc2626;
        }

        .lg-btn {
          height: 48px;
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all .2s;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: .3px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          color: #fff;
          box-shadow: 0 4px 14px rgba(14,165,233,.35);
        }
        .lg-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(14,165,233,.45);
        }
        .lg-btn:disabled { opacity: .6; cursor: not-allowed; }

        .lg-btn-spinner {
          display: inline-block;
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin .6s linear infinite;
          margin-right: 8px;
          vertical-align: middle;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .lg-register-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          border-radius: 12px;
          border: 1.5px solid #e0f2fe;
          background: #fff;
          text-decoration: none;
          transition: all .2s;
        }
        .lg-register-cta:hover { border-color: #7dd3fc; background: #f0f9ff; }
        .lg-register-cta-text strong {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #0c1a2e;
        }
        .lg-register-cta-text span { font-size: 11px; color: #9ca3af; }
        .lg-register-arrow { font-size: 18px; color: #0ea5e9; }

        @media (max-width: 768px) {
          .lg-root { grid-template-columns: 1fr; }
          .lg-left { display: none; }
          .lg-right { padding: 32px 24px; background: #04090f; }
          .lg-card-header h2 { color: #e2f0fb; }
          .lg-card-header p { color: rgba(226,240,251,.5); }
          .lg-label { color: rgba(226,240,251,.7); }
          .lg-input { background: rgba(255,255,255,.06); border-color: rgba(14,165,233,.15); color: #e2f0fb; }
          .lg-input::placeholder { color: rgba(255,255,255,.25); }
          .lg-google-btn { background: rgba(255,255,255,.07); border-color: rgba(14,165,233,.15); color: rgba(255,255,255,.85); }
          .lg-google-btn:hover:not(:disabled) { background: rgba(14,165,233,.1); border-color: rgba(14,165,233,.4); }
          .lg-register-cta { background: rgba(255,255,255,.05); border-color: rgba(14,165,233,.12); }
          .lg-register-cta-text strong { color: #e2f0fb; }
          .lg-remember-label { color: rgba(255,255,255,.6); }
          .lg-checkbox-box { background: rgba(255,255,255,.08); border-color: rgba(14,165,233,.2); }
          .lg-divider { color: rgba(255,255,255,.25); }
          .lg-divider::before, .lg-divider::after { background: rgba(14,165,233,.1); }
          .lg-eye-btn { color: rgba(255,255,255,.4); }
          .lg-forgot { color: #38bdf8; }
        }
      `}</style>

      <div className="lg-root">
        {/* ── LEFT ── */}
        <div className="lg-left">
          <div className="lg-grid-bg" />

          <div className="lg-brand">
            <div className="lg-brand-icon">📚</div>
            <span className="lg-brand-name">Speak<em>ora</em></span>
          </div>

          <div className="lg-hero">
            <div className="lg-hero-tag">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="#38bdf8"><circle cx="5" cy="5" r="5"/></svg>
              <span>ESL Learning Platform</span>
            </div>
            <h1>Learn English<br /><em>your way.</em></h1>
            <p>Live classes, certified teachers, and a personalized plan — all in one place.</p>
          </div>

          <div className="lg-quote">
            <p>"My IELTS score jumped from 6.0 to 7.5 in just 2 months. The teachers here genuinely care about your progress."</p>
            <div className="lg-quote-author">
              <div className="lg-avatar">MS</div>
              <div className="lg-quote-meta">
                <strong>Maria Santos</strong>
                <span>Nurse · Quezon City</span>
              </div>
            </div>
          </div>

          <div className="lg-stats" style={{ marginTop: '16px' }}>
            {[
              { value: '8,000+', label: '🎓 Students' },
              { value: '98%',    label: '⭐ Satisfaction' },
              { value: '200+',   label: '👩‍🏫 Teachers' },
            ].map((s) => (
              <div className="lg-stat" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="lg-right">
          <div className="lg-card">
            <div className="lg-card-header">
              <h2>Welcome back</h2>
              <p>Sign in to your Speakora account to continue.</p>
            </div>

            <form className="lg-form" onSubmit={handleSubmit}>
              <div className="lg-field">
                <label className="lg-label">Email</label>
                <div className="lg-input-wrap">
                  <input
                    className="lg-input"
                    type="email"
                    placeholder="juan@email.com"
                    value={form.email}
                    onChange={set('email')}
                    autoFocus
                  />
                </div>
              </div>

              <div className="lg-field">
                <div className="lg-row-label">
                  <label className="lg-label">Password</label>
                  <Link to="/forgot-password" className="lg-forgot">
                    Forgot password?
                  </Link>
                </div>
                <div className="lg-input-wrap">
                  <input
                    className="lg-input lg-input-with-icon"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={set('password')}
                  />
                  <button
                    type="button"
                    className="lg-eye-btn"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <label className="lg-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="lg-checkbox-box">
                  <svg viewBox="0 0 12 12" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2,6 5,9 10,3"/>
                  </svg>
                </span>
                <span className="lg-remember-label">Remember me for 30 days</span>
              </label>

              {error && (
                <div className="lg-error">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}

              <button type="submit" className="lg-btn" disabled={loading}>
                {loading && <span className="lg-btn-spinner" />}
                {loading ? 'Signing in…' : 'Sign in'}
              </button>

              <div className="lg-divider">or continue with</div>

              <button
                type="button"
                className="lg-google-btn"
                onClick={handleGoogleLogin}
                disabled={googleLoading || loading}
              >
                {googleLoading ? (
                  <span className="lg-btn-spinner" style={{ borderTopColor: '#4285F4', borderColor: 'rgba(66,133,244,.25)' }} />
                ) : (
                  <svg className="lg-google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                )}
                <span className="lg-google-btn-text">
                  {googleLoading ? 'Signing in…' : 'Continue with Google'}
                </span>
              </button>

              <Link to="/register" className="lg-register-cta">
                <div className="lg-register-cta-text">
                  <strong>New to Speakora?</strong>
                  <span>Create a free account — no credit card required</span>
                </div>
                <span className="lg-register-arrow">→</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}