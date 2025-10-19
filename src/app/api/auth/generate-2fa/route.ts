import { NextRequest, NextResponse } from 'next/server';
import { generateTOTPSecret } from '@/lib/totp';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Generate 2FA secret and QR code
    const { secret, qrCodeUrl } = generateTOTPSecret(payload.email, '2FA Auth App');

    // In a real app, you'd save the secret to the user's record in MongoDB
    // For now, we'll return it (in production, never return the secret to client)

    return NextResponse.json({
      secret,
      qrCodeUrl,
    });
  } catch (error) {
    console.error('Generate 2FA error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
