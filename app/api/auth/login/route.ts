import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username === 'mrash' && password === '726268') {
      const token = await signToken({ username, role: 'admin' });
      
      const response = NextResponse.json({ success: true, message: 'লগিন সফল হয়েছে' });
      response.cookies.set({
        name: 'dorbar_auth',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });
      return response;
    }

    return NextResponse.json({ success: false, message: 'ভুল ইউজারনেম বা পাসওয়ার্ড' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'সার্ভার এরর' }, { status: 500 });
  }
}
