import { NextRequest, NextResponse } from 'next/server';
import { uploadToR2 } from '@/lib/r2';
import { db } from '@/lib/db';
import { books } from '@/lib/db/schema';
import { verifyToken } from '@/lib/auth';

export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes for large uploads

export async function POST(request: NextRequest) {
  // ─── Auth: Admin (Staff) only ───
  const token = request.cookies.get('dorbar_auth')?.value;
  if (!token) {
    return NextResponse.json({ error: 'অননুমোদিত অ্যাক্সেস' }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'অবৈধ টোকেন' }, { status: 401 });
  }

  // Check Staff role from JWT payload
  const isStaff = payload.role === 'staff';

  if (!isStaff) {
    return NextResponse.json({ error: 'শুধুমাত্র এডমিন আপলোড করতে পারবেন' }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const description = formData.get('description') as string | null;
    const isMureedOnly = formData.get('isMureedOnly') === 'true';
    const coverColor = (formData.get('coverColor') as string) || '#EA580C';

    if (!file || !title || !author) {
      return NextResponse.json(
        { error: 'ফাইল, নাম ও লেখকের নাম আবশ্যক' },
        { status: 400 }
      );
    }

    // Read file into buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate unique key
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const key = `books/${timestamp}-${sanitizedName}`;

    // Upload to R2
    const { url, key: fileKey } = await uploadToR2(buffer, key, file.type || 'application/pdf');

    // Save to database
    const [newBook] = await db.insert(books).values({
      title,
      author,
      description: description || '',
      fileKey,
      fileUrl: url,
      fileSize: buffer.length,
      coverColor,
      isMureedOnly,
    }).returning();

    return NextResponse.json({ success: true, book: newBook });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'আপলোডে সমস্যা হয়েছে। আবার চেষ্টা করুন।' },
      { status: 500 }
    );
  }
}
