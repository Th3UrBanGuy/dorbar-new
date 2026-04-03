import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, signToken } from '@/lib/auth';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get('dorbar_auth')?.value;
    if (!token) {
      return NextResponse.json({ error: 'অননুমোদিত' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.userId) {
      return NextResponse.json({ error: 'অবৈধ টোকেন' }, { status: 401 });
    }

    const { enabled } = await request.json();
    const newValue = Boolean(enabled);

    // Update DB
    await db
      .update(users)
      .set({ specialAccess: newValue })
      .where(eq(users.id, Number(payload.userId)));

    // Re-sign JWT with updated specialAccess
    const newToken = await signToken({
      userId: payload.userId,
      username: payload.username,
      name: payload.name,
      role: payload.role,
      specialAccess: newValue,
    });

    const response = NextResponse.json({
      success: true,
      specialAccess: newValue,
    });

    response.cookies.set({
      name: 'dorbar_auth',
      value: newToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    // Update client-side cookie too
    response.cookies.set({
      name: 'dorbar_user',
      value: JSON.stringify({
        id: payload.userId,
        name: payload.name,
        username: payload.username,
        role: payload.role,
        specialAccess: newValue,
      }),
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Special access toggle error:', error);
    return NextResponse.json({ error: 'সার্ভার এরর' }, { status: 500 });
  }
}
