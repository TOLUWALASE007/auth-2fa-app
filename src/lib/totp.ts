import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

export interface TOTPSecret {
  secret: string;
  qrCodeUrl: string;
}

export function generateTOTPSecret(userEmail: string, appName: string = '2FA Auth App'): TOTPSecret {
  const secret = speakeasy.generateSecret({
    name: userEmail,
    issuer: appName,
    length: 32,
  });

  return {
    secret: secret.base32,
    qrCodeUrl: secret.otpauth_url!,
  };
}

export function generateQRCode(otpauthUrl: string): Promise<string> {
  return QRCode.toDataURL(otpauthUrl);
}

export function verifyTOTPToken(token: string, secret: string): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 2, // Allow 2 time windows for clock skew
  });
}

export function generateBackupCodes(): string[] {
  const codes: string[] = [];
  for (let i = 0; i < 10; i++) {
    codes.push(Math.random().toString(36).substring(2, 10).toUpperCase());
  }
  return codes;
}
