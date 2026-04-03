import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { signToken } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'ইউজারনেম ও পাসওয়ার্ড দিন' }, { status: 400 });
    }

    // Find user by username or email
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username.toLowerCase().trim()))
      .limit(1);

    if (!user) {
      // Try email
      const [byEmail] = await db
        .select()
        .from(users)
        .where(eq(users.email, username.toLowerCase().trim()))
        .limit(1);

      if (!byEmail) {
        return NextResponse.json({ success: false, message: 'ভুল ইউজারনেম বা পাসওয়ার্ড' }, { status: 401 });
      }

      // Check approval
      if (!byEmail.approved) {
        return NextResponse.json({ success: false, message: 'আপনার অ্যাকাউন্ট এখনো অনুমোদিত হয়নি। অনুগ্রহ করে অপেক্ষা করুন।' }, { status: 403 });
      }

      const valid = await bcrypt.compare(password, byEmail.password);
      if (!valid) {
        return NextResponse.json({ success: false, message: 'ভুল ইউজারনেম বা পাসওয়ার্ড' }, { status: 401 });
      }

      return createAuthResponse(byEmail);
    }

    // Check approval
    if (!user.approved) {
      return NextResponse.json({ success: false, message: 'আপনার অ্যাকাউন্ট এখনো অনুমোদিত হয়নি। অনুগ্রহ করে অপেক্ষা করুন।' }, { status: 403 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ success: false, message: 'ভুল ইউজারনেম বা পাসওয়ার্ড' }, { status: 401 });
    }

    return createAuthResponse(user);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'সার্ভার এরর' }, { status: 500 });
  }
}

async function createAuthResponse(user: typeof users.$inferSelect) {
  const token = await signToken({
    userId: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    specialAccess: user.specialAccess,
  });

  const response = NextResponse.json({
    success: true,
    message: 'লগিন সফল হয়েছে',
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      specialAccess: user.specialAccess,
    },
  });

  response.cookies.set({
    name: 'dorbar_auth',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });

  // Also set a non-httpOnly cookie for client-side role checks
  response.cookies.set({
    name: 'dorbar_user',
    value: JSON.stringify({
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      specialAccess: user.specialAccess,
    }),
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
    path: '/',
  });

  return response;
}
