import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import User from '@/models/User';
import { connectDB } from '@/lib/db';

export async function GET(request: NextRequest) {
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

    await connectDB();

    // Fetch user data from MongoDB
    const user = await User.findById(payload.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = {
      id: user._id.toString(),
      email: user.email,
      twoFactorEnabled: user.twoFactorEnabled,
      is2FAVerified: payload.is2FAVerified || false,
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
