import 'dotenv/config';
import { db } from './lib/db';
import { users } from './lib/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('Seeding admin user...');

  // Check if mrash already exists
  const existing = await db.select().from(users).where(eq(users.username, 'mrash'));
  if (existing.length > 0) {
    console.log('Admin user "mrash" already exists, skipping.');
    return;
  }

  const hashedPassword = await bcrypt.hash('726268', 12);

  await db.insert(users).values({
    username: 'mrash',
    email: 'mrash@dorbar.com',
    name: 'মোহাম্মদ রাশেদ',
    password: hashedPassword,
    role: 'staff',
    specialAccess: true,
    approved: true,
  });

  console.log('✅ Admin user "mrash" seeded as Staff with specialAccess enabled.');
}

seed().catch(console.error);
