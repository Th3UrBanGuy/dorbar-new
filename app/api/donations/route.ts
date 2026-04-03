import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { donations } from '@/lib/db/schema';
import { uploadToR2 } from '@/lib/r2';
import { verifyToken } from '@/lib/auth';
import { desc } from 'drizzle-orm';

export const runtime = 'nodejs';

/**
 * GET /api/donations
 * Staff only: Fetch all donations
 */
export async function GET(request: NextRequest) {
  const token = request.cookies.get('dorbar_auth')?.value;
  if (!token) {
    return NextResponse.json({ error: 'অননুমোদিত অ্যাক্সেস' }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload || payload.role !== 'staff') {
    return NextResponse.json({ error: 'শুধুমাত্র এডমিন এই তথ্য দেখতে পারবেন' }, { status: 403 });
  }

  try {
    const list = await db
      .select()
      .from(donations)
      .orderBy(desc(donations.createdAt));

    return NextResponse.json({ donations: list });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ error: 'তথ্য লোড করতে সমস্যা হয়েছে' }, { status: 500 });
  }
}

/**
 * POST /api/donations
 * Public: Submit a new donation/hadya
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const donorName = formData.get('donorName') as string;
    const amount = parseInt(formData.get('amount') as string);
    const paymentMethod = formData.get('paymentMethod') as string;
    const transactionId = formData.get('transactionId') as string | null;
    const senderNumber = formData.get('senderNumber') as string | null;
    const transactionDate = formData.get('transactionDate') as string | null;
    const slipFile = formData.get('slip') as File | null;

    if (!donorName || !amount) {
      return NextResponse.json({ error: 'নাম এবং হাদিয়ার পরিমাণ আবশ্যক' }, { status: 400 });
    }

    let slipUrl = null;

    // Handle slip image upload to R2
    if (slipFile && slipFile.size > 0) {
      const arrayBuffer = await slipFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const timestamp = Date.now();
      const sanitizedName = slipFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const key = `donations/${timestamp}-${sanitizedName}`;

      const { url } = await uploadToR2(buffer, key, slipFile.type);
      slipUrl = url;
    }

    // Save to Database
    const [newDonation] = await db.insert(donations).values({
      contributor: donorName,
      amount,
      paymentMethod: paymentMethod || 'Hand Cash',
      transactionId,
      senderNumber,
      transactionDate,
      slipUrl,
      status: 'pending',
    }).returning();

    return NextResponse.json({ success: true, donation: newDonation });
  } catch (error) {
    console.error('Donation submission error:', error);
    return NextResponse.json({ error: 'সাবমিট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।' }, { status: 500 });
  }
}
