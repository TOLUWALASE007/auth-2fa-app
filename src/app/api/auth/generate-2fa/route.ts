import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { generate2FACode } from '@/lib/2fa';

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

    if (!payload || !payload.email) {
      return NextResponse.json(
        { error: 'Invalid token or missing email' },
        { status: 401 }
      );
    }

    // Generate 2FA code (custom implementation)
    const code = generate2FACode();

    return NextResponse.json({
      message: '2FA code generated successfully',
      code: code, // In production, this would be sent via email/SMS
      expiresIn: '5 minutes'
    });
  } catch (error) {
    console.error('Generate 2FA error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
