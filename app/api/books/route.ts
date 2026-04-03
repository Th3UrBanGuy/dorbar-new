import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { books } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const allBooks = await db
      .select()
      .from(books)
      .orderBy(desc(books.createdAt));

    return NextResponse.json({ books: allBooks });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { error: 'বই লোড করতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}
