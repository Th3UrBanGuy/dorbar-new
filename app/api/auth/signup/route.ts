import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { signToken } from '@/lib/auth';
import { eq, or } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { username, email, name, password, role, staffCode } = await request.json();

    // Validate required fields
    if (!username || !email || !name || !password) {
      return NextResponse.json(
        { success: false, message: 'সকল তথ্য পূরণ করুন' },
        { status: 400 }
      );
    }

    // Validate role
    let userRole = 'user';
    if (role === 'staff') {
      const serverStaffCode = process.env.STAFF_REGISTER_CODE || 'dorbar2024';
      if (staffCode !== serverStaffCode) {
        return NextResponse.json(
          { success: false, message: 'অবৈধ স্টাফ রেজিস্ট্রেশন কোড' },
          { status: 403 }
        );
      }
      userRole = 'staff';
    } else if (role === 'mureed') {
      userRole = 'mureed';
    } else {
      userRole = 'user';
    }

    // Check for existing username or email
    const [existing] = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.username, username.toLowerCase().trim()),
          eq(users.email, email.toLowerCase().trim())
        )
      )
      .limit(1);

    if (existing) {
      if (existing.username === username.toLowerCase().trim()) {
        return NextResponse.json(
          { success: false, message: 'এই ইউজারনেম আগে থেকে নেওয়া আছে' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { success: false, message: 'এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট তৈরি হয়েছে' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    // For now, approved = true (dev stage). Future: mureed may require approval.
    const [newUser] = await db.insert(users).values({
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      name: name.trim(),
      password: hashedPassword,
      role: userRole,
      specialAccess: false,
      approved: true, // Change to false for mureed when approval system is ready
    }).returning();

    // Auto-login: sign JWT
    const token = await signToken({
      userId: newUser.id,
      username: newUser.username,
      name: newUser.name,
      role: newUser.role,
      specialAccess: newUser.specialAccess,
    });

    const response = NextResponse.json({
      success: true,
      message: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে',
      user: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        role: newUser.role,
        specialAccess: newUser.specialAccess,
      },
    });

    response.cookies.set({
      name: 'dorbar_auth',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    response.cookies.set({
      name: 'dorbar_user',
      value: JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        role: newUser.role,
        specialAccess: newUser.specialAccess,
      }),
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, message: 'সার্ভার এরর। আবার চেষ্টা করুন।' },
      { status: 500 }
    );
  }
}
