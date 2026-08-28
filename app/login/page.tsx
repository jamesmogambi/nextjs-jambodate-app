'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Users,
  KeyRound,
  X,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FormField, Input } from '@/components/ui/FormField';
import { useAuth } from '@/lib/context/AuthContext';
import { useToast } from '@/components/ui/Toast';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/discover';

  const { loginWithEmail, sendPasswordReset, switchUser } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Password reset modal state
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      await loginWithEmail(email.trim(), password);
      toast('Welcome back to JamboDate!', 'success');
      router.push(redirectUrl);
    } catch (err: unknown) {
      const errText = err instanceof Error ? err.message : 'Invalid credentials. Please verify and try again.';
      setErrorMessage(errText);
      toast(errText, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      toast('Please enter your email address', 'error');
      return;
    }

    setIsResetting(true);
    try {
      await sendPasswordReset(resetEmail.trim());
      setResetSent(true);
      toast('Password reset link sent to your email!', 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Could not send reset email. Verify your address.';
      toast(msg, 'error');
    } finally {
      setIsResetting(false);
    }
  };

  const handleQuickDemoLogin = (profileId: string, demoEmail: string) => {
    switchUser(profileId);
    toast(`Logged in as demo user`, 'info');
    router.push(redirectUrl);
  };

  return (
    <div className="min-h-screen bg-[#0D1110] text-[#F5F3EF] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand */}
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D85B7A] to-[#D99A52] p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#0D1110] rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-xl text-[#F5F3EF]">M</span>
            </div>
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#F5F3EF] flex items-center gap-1">
            jambodate
            <span className="w-1.5 h-1.5 rounded-full bg-[#3FAF72]" />
          </span>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F3EF]">
          Karibu Tena!
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#A8AAA5]">
          Sign in to your JamboDate account to connect with genuine Kenyan singles.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-[#151A18] py-8 px-6 sm:px-10 shadow-2xl rounded-2xl border border-[#272D2A]">
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 flex items-start gap-3 text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <p className="leading-relaxed">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <FormField label="Email Address" id="login-email" required>
              <div className="relative">
                <Input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. james@jambodate.co.ke"
                  className="pl-9"
                  required
                />
                <Mail className="w-4 h-4 text-[#A8AAA5] absolute left-3 top-3.5" />
              </div>
            </FormField>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#A8AAA5]" htmlFor="login-password">
                  Password <span className="text-[#D85B7A]">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setResetEmail(email);
                    setShowResetModal(true);
                  }}
                  className="text-xs text-[#D85B7A] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your JamboDate password"
                  className="pl-9 pr-10"
                  required
                />
                <Lock className="w-4 h-4 text-[#A8AAA5] absolute left-3 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#A8AAA5] hover:text-[#F5F3EF] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-4"
              isLoading={isLoading}
            >
              Sign In to JamboDate <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>

          {/* Quick Demo Selector for fast evaluation */}
          <div className="mt-8 pt-6 border-t border-[#272D2A]">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D99A52] mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Quick Demo Accounts for Testing
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('user_current', 'james@jambodate.co.ke')}
                className="p-2.5 rounded-xl bg-[#0D1110] border border-[#272D2A] hover:border-[#D85B7A] text-left transition-colors cursor-pointer group"
              >
                <p className="text-xs font-semibold text-[#F5F3EF] group-hover:text-[#D85B7A]">
                  James Mugambi
                </p>
                <p className="text-[10px] text-[#A8AAA5]">Nairobi · Tech Lead · 29</p>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('user_wangari', 'wangari@jambodate.co.ke')}
                className="p-2.5 rounded-xl bg-[#0D1110] border border-[#272D2A] hover:border-[#D85B7A] text-left transition-colors cursor-pointer group"
              >
                <p className="text-xs font-semibold text-[#F5F3EF] group-hover:text-[#D85B7A]">
                  Wangari Kamau
                </p>
                <p className="text-[10px] text-[#A8AAA5]">Nairobi · Product Mgr · 28</p>
              </button>
            </div>
          </div>

          {/* Switch to Register */}
          <div className="mt-6 pt-6 border-t border-[#272D2A] text-center">
            <p className="text-xs text-[#A8AAA5]">
              Don&apos;t have an account yet?{' '}
              <Link href="/register" className="font-semibold text-[#D85B7A] hover:underline">
                Create free profile (18+)
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Password Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#151A18] border border-[#272D2A] rounded-2xl p-6 max-w-md w-full relative shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => {
                setShowResetModal(false);
                setResetSent(false);
              }}
              className="absolute top-4 right-4 text-[#A8AAA5] hover:text-[#F5F3EF] p-1 rounded-lg hover:bg-[#272D2A]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#D85B7A]/15 border border-[#D85B7A]/30 flex items-center justify-center text-[#D85B7A]">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#F5F3EF]">Reset Password</h3>
                <p className="text-xs text-[#A8AAA5]">We will send you a secure reset link</p>
              </div>
            </div>

            {resetSent ? (
              <div className="space-y-4 py-2">
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-start gap-3 text-emerald-200 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#3FAF72] shrink-0 mt-0.5" />
                  <p>
                    Check your inbox! We sent password reset instructions to <strong>{resetEmail}</strong>.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    setShowResetModal(false);
                    setResetSent(false);
                  }}
                >
                  Return to Sign In
                </Button>
              </div>
            ) : (
              <form onSubmit={handlePasswordResetSubmit} className="space-y-4">
                <FormField
                  label="Registered Email Address"
                  id="reset-email"
                  required
                  helperText="Enter the email associated with your JamboDate account"
                >
                  <div className="relative">
                    <Input
                      id="reset-email"
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="e.g. james@jambodate.co.ke"
                      className="pl-9"
                      required
                    />
                    <Mail className="w-4 h-4 text-[#A8AAA5] absolute left-3 top-3.5" />
                  </div>
                </FormField>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={() => setShowResetModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isResetting}
                  >
                    Send Reset Link
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#0D1110] flex items-center justify-center text-[#A8AAA5] text-sm">
          Loading login...
        </div>
      }
    >
      <LoginForm />
    </React.Suspense>
  );
}
