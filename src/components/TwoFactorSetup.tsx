'use client';

import { useState, useEffect } from 'react';

interface TwoFactorSetupProps {
  secret: string;
  qrCodeUrl: string;
  onVerify: (token: string) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export default function TwoFactorSetup({ secret, qrCodeUrl, onVerify, isLoading = false, error }: TwoFactorSetupProps) {
  const [token, setToken] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');

  useEffect(() => {
    // Generate QR code data URL
    import('qrcode').then((QRCode) => {
      QRCode.toDataURL(qrCodeUrl).then(setQrCodeDataUrl);
    });
  }, [qrCodeUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onVerify(token);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Set up Two-Factor Authentication
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Scan the QR code with your authenticator app
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center">
            <div className="mb-4">
              <img src={qrCodeDataUrl} alt="QR Code" className="mx-auto" />
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Or enter this secret manually:</p>
              <code className="bg-gray-100 p-2 rounded text-xs break-all">{secret}</code>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="token" className="block text-sm font-medium text-gray-700">
                  Enter verification code
                </label>
                <input
                  id="token"
                  type="text"
                  maxLength={6}
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="000000"
                  value={token}
                  onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))}
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || token.length !== 6}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verifying...' : 'Verify & Enable 2FA'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
