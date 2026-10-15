import { useState } from 'react';
import { Eye, EyeOff, Shield, Lock, Mail, AlertCircle } from 'lucide-react';
import Logo from '@/components/Logo';

interface LoginPageProps {
  onLogin: () => void;
}

// Demo credentials
const VALID_EMAIL = 'admin@upitrace.in';
const VALID_PASSWORD = 'UpiTrace@2025';

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focused, setFocused] = useState<'email' | 'password' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    // Simulate a brief auth delay
    await new Promise((r) => setTimeout(r, 900));

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      onLogin();
    } else {
      setError('Invalid credentials. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-800 bg-grid flex items-center justify-center relative overflow-hidden">
      {/* Ambient glow blobs */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #778368 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-60 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #A8915C 0%, transparent 70%)' }}
      />

      {/* Card */}
      <div className="relative w-full max-w-md mx-4 animate-slide-up">
        {/* Top accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-sage-500/40 to-transparent mb-8" />

        <div
          className="rounded-2xl border border-ivory-500/8 bg-charcoal-700/60 backdrop-blur-xl shadow-elevated px-8 py-10"
          style={{ boxShadow: '0 8px 64px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(244,239,223,0.04)' }}
        >
          {/* Logo & heading */}
          <div className="flex flex-col items-center mb-8">
            <div className="mb-5">
              <Logo />
            </div>
            <h1 className="font-serif text-2xl font-medium text-ivory-500 tracking-tight">
              Welcome back
            </h1>
            <p className="mt-1.5 text-small text-ivory-500/50 text-center">
              Sign in to access your UPI-TRACE workspace
            </p>
          </div>

          {/* Security badge */}
          <div className="flex items-center gap-2 rounded-lg bg-sage-900/30 border border-sage-700/20 px-3 py-2 mb-7">
            <Shield size={13} className="text-sage-300 shrink-0" />
            <span className="text-micro text-sage-300 uppercase tracking-widest font-medium">
              Secure · Encrypted · Audit-logged
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email field */}
            <div>
              <label htmlFor="login-email" className="block text-micro text-ivory-500/50 uppercase tracking-widest mb-1.5 font-medium">
                Email Address
              </label>
              <div
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 ${
                  focused === 'email'
                    ? 'border-sage-500/50 bg-charcoal-600/60 shadow-[0_0_0_3px_rgba(119,131,104,0.08)]'
                    : 'border-ivory-500/8 bg-charcoal-600/30 hover:border-ivory-500/14'
                }`}
              >
                <Mail size={15} className={`shrink-0 transition-colors ${focused === 'email' ? 'text-sage-300' : 'text-ivory-500/30'}`} />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="admin@upitrace.in"
                  className="flex-1 bg-transparent text-body text-ivory-500 placeholder:text-ivory-500/25 outline-none"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="login-password" className="block text-micro text-ivory-500/50 uppercase tracking-widest mb-1.5 font-medium">
                Password
              </label>
              <div
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 ${
                  focused === 'password'
                    ? 'border-sage-500/50 bg-charcoal-600/60 shadow-[0_0_0_3px_rgba(119,131,104,0.08)]'
                    : 'border-ivory-500/8 bg-charcoal-600/30 hover:border-ivory-500/14'
                }`}
              >
                <Lock size={15} className={`shrink-0 transition-colors ${focused === 'password' ? 'text-sage-300' : 'text-ivory-500/30'}`} />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••••••"
                  className="flex-1 bg-transparent text-body text-ivory-500 placeholder:text-ivory-500/25 outline-none"
                />
                <button
                  type="button"
                  id="toggle-password-visibility"
                  onClick={() => setShowPassword((v) => !v)}
                  className="shrink-0 text-ivory-500/30 hover:text-ivory-500/60 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-alert-red/20 bg-alert-red/8 px-3.5 py-2.5 animate-fade-in">
                <AlertCircle size={13} className="text-alert-red shrink-0" />
                <span className="text-small text-alert-red">{error}</span>
              </div>
            )}

            {/* Forgot password */}
            <div className="flex justify-end">
              <button
                type="button"
                id="forgot-password-link"
                className="text-small text-ivory-500/40 hover:text-sage-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center gap-2.5 rounded-xl bg-sage-500 hover:bg-sage-300 disabled:opacity-60 disabled:cursor-not-allowed text-charcoal-800 font-medium text-body py-3 transition-all duration-200 hover:shadow-[0_4px_20px_-4px_rgba(119,131,104,0.5)] active:scale-[0.99]"
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-charcoal-700/30 border-t-charcoal-800 rounded-full animate-spin" />
                  Authenticating…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-7 pt-6 border-t border-ivory-500/6">
            <p className="text-center text-micro text-ivory-500/30 uppercase tracking-widest mb-3">Demo credentials</p>
            <div className="rounded-lg bg-charcoal-900/60 border border-ivory-500/6 divide-y divide-ivory-500/6">
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-small text-ivory-500/40">Email</span>
                <span className="font-mono text-small text-ivory-500/60">{VALID_EMAIL}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-small text-ivory-500/40">Password</span>
                <span className="font-mono text-small text-ivory-500/60">{VALID_PASSWORD}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/20 to-transparent mt-8" />

        {/* Footer note */}
        <p className="text-center text-micro text-ivory-500/20 mt-4">
          UPI-TRACE · Evidence Workspace · All activity is audit-logged
        </p>
      </div>
    </div>
  );
}
