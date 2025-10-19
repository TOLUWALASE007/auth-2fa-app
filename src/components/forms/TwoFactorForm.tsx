'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function TwoFactorForm() {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const pendingEmail = localStorage.getItem('pending2FAEmail');
    if (!pendingEmail) {
      router.push('/login');
      return;
    }

    setIsLoading(false);
  }, [router]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError('');

    try {
      const pendingEmail = localStorage.getItem('pending2FAEmail');
      if (!pendingEmail) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/auth/verify-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: pendingEmail, code: token }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Verification failed');
        return;
      }

      // Clear pending email and store token
      localStorage.removeItem('pending2FAEmail');
      localStorage.setItem('token', data.token);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('2FA verification error:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Two-Factor Authentication
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the verification code sent to your email
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center">
            <div className="mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-blue-700">
                  A 6-digit verification code has been sent to your email address.
                  Please check your inbox and enter the code below.
                </p>
              </div>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <Input
                label="Enter verification code"
                type="text"
                maxLength={6}
                required
                placeholder="000000"
                value={token}
                onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))}
                disabled={isVerifying}
                helperText="Enter the 6-digit code from your authenticator app"
              />

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              <Button
                type="submit"
                isLoading={isVerifying}
                disabled={token.length !== 6}
                className="w-full"
                size="lg"
              >
                Verify & Enable 2FA
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
