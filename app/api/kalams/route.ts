import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { kalams } from '@/lib/db/schema';
import { verifyToken } from '@/lib/auth';
import { desc } from 'drizzle-orm';

// GET /api/kalams — public, list all kalams
export async function GET() {
  try {
    const allKalams = await db
      .select()
      .from(kalams)
      .orderBy(desc(kalams.createdAt));

    return NextResponse.json({ kalams: allKalams });
  } catch (error) {
    console.error('Failed to fetch kalams:', error);
    return NextResponse.json({ kalams: [] }, { status: 500 });
  }
}

// POST /api/kalams — staff only, create new kalam
export async function POST(request: NextRequest) {
  try {
    // Auth: Staff only
    const token = request.cookies.get('dorbar_auth')?.value;
    if (!token) {
      return NextResponse.json({ error: 'অননুমোদিত' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'staff') {
      return NextResponse.json({ error: 'শুধুমাত্র স্টাফ কালাম যোগ করতে পারবেন' }, { status: 403 });
    }

    const body = await request.json();
    const { title, content, writer, mediaUrl, isMureedOnly } = body;

    if (!title?.trim() || !content?.trim() || !writer?.trim()) {
      return NextResponse.json({ error: 'শিরোনাম, কন্টেন্ট ও লেখকের নাম দিন' }, { status: 400 });
    }

    const [newKalam] = await db.insert(kalams).values({
      title: title.trim(),
      content: content.trim(),
      writer: writer.trim(),
      mediaUrl: mediaUrl?.trim() || null,
      isMureedOnly: Boolean(isMureedOnly),
    }).returning();

    return NextResponse.json({ success: true, kalam: newKalam }, { status: 201 });
  } catch (error) {
    console.error('Failed to create kalam:', error);
    return NextResponse.json({ error: 'সার্ভার এরর' }, { status: 500 });
  }
}
