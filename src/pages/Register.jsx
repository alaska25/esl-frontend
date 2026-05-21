import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { getRoleRedirect } from '../utils/auth';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    confirm: '',
  });

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleNext = (e) => {
    e.preventDefault();
    setError('');
    if (!form.firstName || !form.lastName || !form.email || !form.role) {
      Swal.fire({
        icon: 'warning',
        title: 'Required Fields',
        text: 'Please fill in all fields to continue.',
        confirmButtonColor: '#0ea5e9',
        background: '#04090f',
        color: '#fff',
      });
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
        confirmButtonColor: '#0ea5e9',
        background: '#04090f',
        color: '#fff',
      });
      return;
    }

    if (form.password.length < 8) {
      Swal.fire({
        icon: 'info',
        title: 'Security',
        text: 'Password must be at least 8 characters.',
        confirmButtonColor: '#0ea5e9',
        background: '#04090f',
        color: '#fff',
      });
      return;
    }

    setLoading(true);
    try {
      const result = await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        role: form.role,
        password: form.password,
      });

      await Swal.fire({
        icon: 'success',
        title: 'Account Created!',
        text: 'Welcome to Speakora! Redirecting to your dashboard...',
        timer: 2000,
        showConfirmButton: false,
        background: '#04090f',
        color: '#fff',
      });

      const user = result?.user ?? result;
      const redirectPath = getRoleRedirect(user);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        (err.message !== 'next is not a function' ? err.message : null) ||
        'Registration failed. Please try again.';
      setError(errMsg);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: errMsg,
        confirmButtonColor: '#dc2626',
        background: '#04090f',
        color: '#fff',
      });
    } finally {
      setLoading(false);
    }
  };

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', '#ef4444', '#f97316', '#eab308', '#22c55e'][strength];

  const ROLES = [
    { value: 'student',  label: 'Student',  icon: '🎓', desc: 'I want to learn English' },
    { value: 'teacher',  label: 'Teacher',  icon: '👩‍🏫', desc: 'I want to teach on Speakora' },
    { value: 'parent',   label: 'Parent',   icon: '👨‍👩‍👧', desc: "I'm enrolling my child" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .rg-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'DM Sans', sans-serif;
          background: #04090f;
        }

        /* ── LEFT PANEL ── */
        .rg-left {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 56px 64px;
          overflow: hidden;
          background: linear-gradient(135deg, #04090f 0%, #071525 100%);
        }
        .rg-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(14,165,233,.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 80%, rgba(99,102,241,.14) 0%, transparent 60%);
          pointer-events: none;
        }
        .rg-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(14,165,233,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .rg-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
        }
        .rg-brand-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px;
        }
        .rg-brand-name {
          font-family: 'Fraunces', serif;
          font-weight: 800;
          font-size: 20px;
          color: #fff;
          letter-spacing: -.3px;
        }
        .rg-brand-name em {
          font-style: normal;
          color: #38bdf8;
        }
        .rg-hero {
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
          padding: 40px 0 20px;
        }
        .rg-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: rgba(14,165,233,.15);
          border: 1px solid rgba(14,165,233,.3);
          border-radius: 20px;
          width: fit-content;
        }
        .rg-hero-tag span {
          font-size: 11px;
          font-weight: 600;
          color: #38bdf8;
          letter-spacing: .5px;
          text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
        }
        .rg-hero h1 {
          font-family: 'Fraunces', serif;
          font-size: 44px;
          font-weight: 900;
          color: #fff;
          line-height: 1.08;
          letter-spacing: -1.5px;
        }
        .rg-hero h1 em {
          font-style: italic;
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .rg-hero p {
          font-size: 15px;
          color: rgba(255,255,255,.5);
          line-height: 1.7;
          max-width: 340px;
        }
        .rg-features {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .rg-feature {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 20px;
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(14,165,233,.1);
          border-radius: 14px;
          transition: border-color .2s;
        }
        .rg-feature:hover { border-color: rgba(14,165,233,.35); }
        .rg-feature-icon {
          width: 36px; height: 36px; flex-shrink: 0;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px;
        }
        .rg-feature-text strong {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,.9);
          margin-bottom: 2px;
          font-family: 'DM Sans', sans-serif;
        }
        .rg-feature-text span {
          font-size: 12px;
          color: rgba(255,255,255,.4);
          line-height: 1.5;
        }

        /* ── RIGHT PANEL ── */
        .rg-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 64px;
          background: #f0f9ff;
        }
        .rg-card {
          width: 100%;
          max-width: 440px;
          animation: fadeUp .45s cubic-bezier(.22,.61,.36,1) forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Step indicator */
        .rg-steps {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
        }
        .rg-step {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #9ca3af;
          font-family: 'DM Sans', sans-serif;
          text-transform: uppercase;
          letter-spacing: .5px;
        }
        .rg-step.active { color: #0ea5e9; }
        .rg-step.done   { color: #22c55e; }
        .rg-step-num {
          width: 22px; height: 22px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
          font-weight: 700;
          background: #e5e7eb;
          color: #9ca3af;
          transition: all .3s;
        }
        .rg-step.active .rg-step-num { background: #0ea5e9; color: #fff; }
        .rg-step.done .rg-step-num   { background: #22c55e; color: #fff; }
        .rg-step-divider {
          flex: 1;
          height: 1px;
          background: #e5e7eb;
          max-width: 40px;
        }

        .rg-card-header { margin-bottom: 28px; }
        .rg-card-header h2 {
          font-family: 'Fraunces', serif;
          font-size: 28px;
          font-weight: 800;
          color: #0c1a2e;
          letter-spacing: -.5px;
          margin-bottom: 6px;
        }
        .rg-card-header p { font-size: 14px; color: #6b7280; }

        /* Form */
        .rg-form { display: flex; flex-direction: column; gap: 16px; }
        .rg-row  { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .rg-field { display: flex; flex-direction: column; gap: 6px; }
        .rg-label {
          font-size: 12px;
          font-weight: 600;
          color: #374151;
          letter-spacing: .3px;
          font-family: 'DM Sans', sans-serif;
          text-transform: uppercase;
        }
        .rg-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .rg-input {
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
        .rg-input-with-icon { padding-right: 44px; }
        .rg-input:focus {
          border-color: #0ea5e9;
          box-shadow: 0 0 0 3px rgba(14,165,233,.12);
        }
        .rg-input::placeholder { color: #9ca3af; }

        /* Role selector */
        .rg-roles {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .rg-role-opt {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          padding: 14px 8px;
          background: #fff;
          border: 1.5px solid #e0f2fe;
          border-radius: 12px;
          cursor: pointer;
          transition: all .2s;
          text-align: center;
        }
        .rg-role-opt:hover { border-color: #7dd3fc; background: #f0f9ff; }
        .rg-role-opt.selected {
          border-color: #0ea5e9;
          background: #f0f9ff;
          box-shadow: 0 0 0 3px rgba(14,165,233,.12);
        }
        .rg-role-icon { font-size: 22px; }
        .rg-role-label {
          font-size: 12px;
          font-weight: 700;
          color: #0c1a2e;
          font-family: 'DM Sans', sans-serif;
        }
        .rg-role-desc {
          font-size: 10px;
          color: #9ca3af;
          line-height: 1.4;
        }

        .rg-eye-btn {
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
        .rg-eye-btn:hover { color: #0ea5e9; background: rgba(14,165,233,.08); }
        .rg-eye-btn svg { width: 18px; height: 18px; }

        .rg-strength-bar {
          display: flex;
          gap: 4px;
          margin-top: 6px;
        }
        .rg-strength-seg {
          flex: 1;
          height: 3px;
          border-radius: 99px;
          background: #e5e7eb;
          transition: background .3s;
        }

        .rg-error {
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

        .rg-btn {
          height: 48px;
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all .2s;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: .3px;
        }
        .rg-btn-primary {
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          color: #fff;
          box-shadow: 0 4px 14px rgba(14,165,233,.35);
        }
        .rg-btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(14,165,233,.45);
        }
        .rg-btn-primary:disabled { opacity: .6; cursor: not-allowed; }
        .rg-btn-ghost {
          background: transparent;
          color: #0ea5e9;
          border: 1.5px solid #e0f2fe;
        }
        .rg-btn-ghost:hover { background: #f0f9ff; border-color: #7dd3fc; }

        .rg-btn-spinner {
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

        .rg-divider {
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
        .rg-divider::before, .rg-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0f2fe, transparent);
        }

        .rg-login-cta {
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
        .rg-login-cta:hover { border-color: #7dd3fc; background: #f0f9ff; }
        .rg-login-cta-text strong {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #0c1a2e;
        }
        .rg-login-cta-text span { font-size: 11px; color: #9ca3af; }
        .rg-login-arrow { font-size: 18px; color: #0ea5e9; }

        .rg-slide-in {
          animation: slideIn .35s cubic-bezier(.22,.61,.36,1) forwards;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @media (max-width: 768px) {
          .rg-root { grid-template-columns: 1fr; }
          .rg-left { display: none; }
          .rg-right { padding: 32px 24px; background: #04090f; }
          .rg-card-header h2 { color: #e2f0fb; }
          .rg-card-header p { color: rgba(226,240,251,.5); }
          .rg-label { color: rgba(226,240,251,.7); }
          .rg-input { background: rgba(255,255,255,.06); border-color: rgba(14,165,233,.15); color: #e2f0fb; }
          .rg-input::placeholder { color: rgba(255,255,255,.25); }
          .rg-role-opt { background: rgba(255,255,255,.05); border-color: rgba(14,165,233,.15); }
          .rg-role-opt:hover { background: rgba(14,165,233,.07); }
          .rg-role-opt.selected { background: rgba(14,165,233,.1); }
          .rg-role-label { color: #e2f0fb; }
          .rg-btn-ghost { background: rgba(255,255,255,.07); border-color: rgba(14,165,233,.15); color: #38bdf8; }
          .rg-login-cta { background: rgba(255,255,255,.05); border-color: rgba(14,165,233,.12); }
          .rg-login-cta-text strong { color: #e2f0fb; }
          .rg-divider { color: rgba(255,255,255,.25); }
          .rg-divider::before, .rg-divider::after { background: rgba(14,165,233,.1); }
          .rg-eye-btn { color: rgba(255,255,255,.4); }
          .rg-step { color: rgba(255,255,255,.3); }
          .rg-step.active { color: #38bdf8; }
          .rg-step-num { background: rgba(255,255,255,.1); color: rgba(255,255,255,.4); }
          .rg-step-divider { background: rgba(255,255,255,.1); }
        }
      `}</style>

      <div className="rg-root">
        {/* ── LEFT ── */}
        <div className="rg-left">
          <div className="rg-grid-bg" />

          <div className="rg-brand">
            <div className="rg-brand-icon">📚</div>
            <span className="rg-brand-name">Speak<em>ora</em></span>
          </div>

          <div className="rg-hero">
            <div className="rg-hero-tag">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="#38bdf8"><circle cx="5" cy="5" r="5"/></svg>
              <span>Certified ESL Teachers</span>
            </div>
            <h1>Speak English<br />with <em>confidence.</em></h1>
            <p>Live 1-on-1 classes, expert teachers, and a learning plan built around your goals.</p>
          </div>

          <div className="rg-features">
            {[
              { icon: '🎓', bg: 'rgba(14,165,233,.15)',  title: 'Certified Teachers',    desc: 'Every teacher is vetted, trained, and TESOL/CELTA certified' },
              { icon: '📅', bg: 'rgba(99,102,241,.15)',  title: 'Flexible Scheduling',   desc: 'Book classes any time — mornings, evenings, or weekends' },
              { icon: '📈', bg: 'rgba(34,197,94,.12)',   title: 'Track Your Progress',   desc: 'Detailed reports and CEFR level assessments every month' },
            ].map((f) => (
              <div className="rg-feature" key={f.title}>
                <div className="rg-feature-icon" style={{ background: f.bg }}>{f.icon}</div>
                <div className="rg-feature-text">
                  <strong>{f.title}</strong>
                  <span>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="rg-right">
          <div className="rg-card">
            <div className="rg-card-header">
              <div className="rg-steps">
                <div className={`rg-step ${step >= 1 ? (step > 1 ? 'done' : 'active') : ''}`}>
                  <div className="rg-step-num">{step > 1 ? '✓' : '1'}</div>
                  Your info
                </div>
                <div className="rg-step-divider" />
                <div className={`rg-step ${step >= 2 ? 'active' : ''}`}>
                  <div className="rg-step-num">2</div>
                  Password
                </div>
              </div>

              <h2>{step === 1 ? 'Create your account' : 'Secure your account'}</h2>
              <p>{step === 1 ? 'Start your free trial — no credit card required.' : 'Choose a strong password to protect your account.'}</p>
            </div>

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <form className="rg-form rg-slide-in" onSubmit={handleNext}>
                <div className="rg-row">
                  <div className="rg-field">
                    <label className="rg-label">First name</label>
                    <input
                      className="rg-input"
                      placeholder="Juan"
                      value={form.firstName}
                      onChange={set('firstName')}
                      autoFocus
                    />
                  </div>
                  <div className="rg-field">
                    <label className="rg-label">Last name</label>
                    <input
                      className="rg-input"
                      placeholder="dela Cruz"
                      value={form.lastName}
                      onChange={set('lastName')}
                    />
                  </div>
                </div>

                <div className="rg-field">
                  <label className="rg-label">Email address</label>
                  <input
                    className="rg-input"
                    type="email"
                    placeholder="juan@email.com"
                    value={form.email}
                    onChange={set('email')}
                  />
                </div>

                <div className="rg-field">
                  <label className="rg-label">I am a…</label>
                  <div className="rg-roles">
                    {ROLES.map((r) => (
                      <div
                        key={r.value}
                        className={`rg-role-opt${form.role === r.value ? ' selected' : ''}`}
                        onClick={() => setForm((prev) => ({ ...prev, role: r.value }))}
                      >
                        <div className="rg-role-icon">{r.icon}</div>
                        <div className="rg-role-label">{r.label}</div>
                        <div className="rg-role-desc">{r.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="rg-error">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {error}
                  </div>
                )}

                <button type="submit" className="rg-btn rg-btn-primary">
                  Continue →
                </button>

                <div className="rg-divider">or</div>

                <Link to="/login" className="rg-login-cta">
                  <div className="rg-login-cta-text">
                    <strong>Already have an account?</strong>
                    <span>Sign in to Speakora</span>
                  </div>
                  <span className="rg-login-arrow">→</span>
                </Link>
              </form>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <form className="rg-form rg-slide-in" onSubmit={handleSubmit}>
                <div className="rg-field">
                  <label className="rg-label">Password</label>
                  <div className="rg-input-wrap">
                    <input
                      className="rg-input rg-input-with-icon"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 8 characters"
                      value={form.password}
                      onChange={set('password')}
                      autoFocus
                    />
                    <button
                      type="button"
                      className="rg-eye-btn"
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
                  {form.password && (
                    <>
                      <div className="rg-strength-bar">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="rg-strength-seg"
                            style={{ background: i <= strength ? strengthColor : '#e5e7eb' }}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: 11, color: strengthColor, fontWeight: 600, marginTop: 2 }}>
                        {strengthLabel}
                      </span>
                    </>
                  )}
                </div>

                <div className="rg-field">
                  <label className="rg-label">Confirm password</label>
                  <div className="rg-input-wrap">
                    <input
                      className="rg-input rg-input-with-icon"
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Re-enter your password"
                      value={form.confirm}
                      onChange={set('confirm')}
                    />
                    <button
                      type="button"
                      className="rg-eye-btn"
                      onClick={() => setShowConfirm((v) => !v)}
                      aria-label={showConfirm ? 'Hide' : 'Show'}
                      tabIndex={-1}
                    >
                      {showConfirm ? (
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

                {error && (
                  <div className="rg-error">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {error}
                  </div>
                )}

                <button type="submit" className="rg-btn rg-btn-primary" disabled={loading}>
                  {loading && <span className="rg-btn-spinner" />}
                  {loading ? 'Creating account…' : 'Create account'}
                </button>

                <button
                  type="button"
                  className="rg-btn rg-btn-ghost"
                  onClick={() => { setStep(1); setError(''); }}
                >
                  ← Back
                </button>

                <p style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center', lineHeight: 1.6 }}>
                  By creating an account you agree to our{' '}
                  <a href="#" style={{ color: '#0ea5e9' }}>Terms of Service</a> and{' '}
                  <a href="#" style={{ color: '#0ea5e9' }}>Privacy Policy</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}