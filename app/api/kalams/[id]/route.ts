import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { kalams } from '@/lib/db/schema';
import { verifyToken } from '@/lib/auth';
import { eq } from 'drizzle-orm';

// GET /api/kalams/[id] — public, get single kalam
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [kalam] = await db
      .select()
      .from(kalams)
      .where(eq(kalams.id, Number(id)))
      .limit(1);

    if (!kalam) {
      return NextResponse.json({ error: 'কালাম পাওয়া যায়নি' }, { status: 404 });
    }

    return NextResponse.json({ kalam });
  } catch (error) {
    return NextResponse.json({ error: 'সার্ভার এরর' }, { status: 500 });
  }
}

// DELETE /api/kalams/[id] — staff only
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.cookies.get('dorbar_auth')?.value;
    if (!token) {
      return NextResponse.json({ error: 'অননুমোদিত' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'staff') {
      return NextResponse.json({ error: 'শুধুমাত্র স্টাফ ডিলিট করতে পারবেন' }, { status: 403 });
    }

    const { id } = await params;
    await db.delete(kalams).where(eq(kalams.id, Number(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'সার্ভার এরর' }, { status: 500 });
  }
}
