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
    await new Promise((r) => setTimeout(r, 800));

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      onLogin();
    } else {
      setError('Invalid credentials. Please use the demo credentials below.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-hero flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-grid-white opacity-20 pointer-events-none" />

      {/* Login Card */}
      <div className="relative w-full max-w-md animate-slide-up z-10">
        <div className="rounded-2xl border border-white/20 bg-white shadow-2xl p-8 sm:p-10">
          {/* Logo & heading */}
          <div className="flex flex-col items-center mb-6">
            <div className="mb-4">
              <Logo size="lg" />
            </div>
            <h1 className="font-serif-heading text-2xl font-bold text-navy tracking-tight">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-slate-500 text-center font-normal">
              Sign in to see who paid you, and why
            </p>
          </div>

          {/* Security badge */}
          <div className="flex items-center justify-center gap-2 rounded-lg bg-ieee-light border border-ieee/20 px-3 py-2 mb-6">
            <Shield size={14} className="text-ieee shrink-0" />
            <span className="text-[11px] text-ieee font-semibold">
              Private and secure
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email field */}
            <div>
              <label htmlFor="login-email" className="block text-xs text-slate-600 mb-1.5 font-semibold">
                Email Address
              </label>
              <div
                className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-all duration-200 bg-slate-50 ${
                  focused === 'email'
                    ? 'border-ieee bg-white ring-2 ring-ieee/20 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Mail size={16} className={`shrink-0 transition-colors ${focused === 'email' ? 'text-ieee' : 'text-slate-400'}`} />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="admin@upitrace.in"
                  className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none font-medium"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="login-password" className="block text-xs text-slate-600 mb-1.5 font-semibold">
                Password
              </label>
              <div
                className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-all duration-200 bg-slate-50 ${
                  focused === 'password'
                    ? 'border-ieee bg-white ring-2 ring-ieee/20 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Lock size={16} className={`shrink-0 transition-colors ${focused === 'password' ? 'text-ieee' : 'text-slate-400'}`} />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••••••"
                  className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none font-medium"
                />
                <button
                  type="button"
                  id="toggle-password-visibility"
                  onClick={() => setShowPassword((v) => !v)}
                  className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 animate-fade-in">
                <AlertCircle size={15} className="text-red-600 shrink-0" />
                <span className="text-xs text-red-700 font-medium">{error}</span>
              </div>
            )}

            {/* Forgot password */}
            <div className="flex justify-end">
              <button
                type="button"
                id="forgot-password-link"
                className="text-xs text-slate-500 hover:text-ieee transition-colors font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand hover:bg-brand-dark active:scale-95 disabled:opacity-60 text-white font-bold text-sm py-3 transition-all duration-200 shadow-md shadow-brand/25"
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-navy-deep/30 border-t-navy-deep rounded-full animate-spin" />
                  Authenticating…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-center text-[11px] text-slate-400 mb-2 font-semibold">Demo Credentials</p>
            <div className="rounded-lg bg-slate-50 border border-slate-200 divide-y divide-slate-200 text-xs">
              <div className="flex items-center justify-between px-3.5 py-2">
                <span className="text-slate-500 font-medium">Email</span>
                <span className="font-mono text-slate-700 font-semibold">{VALID_EMAIL}</span>
              </div>
              <div className="flex items-center justify-between px-3.5 py-2">
                <span className="text-slate-500 font-medium">Password</span>
                <span className="font-mono text-slate-700 font-semibold">{VALID_PASSWORD}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-white/60 mt-5 font-medium">
          UPI-TRACE &middot; National Legal Hackathon 2026 &middot; Team ECHELON
        </p>
      </div>
    </div>
  );
}
