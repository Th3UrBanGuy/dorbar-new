import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

export type UserRole = 'staff' | 'mureed' | 'user';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  role: text('role').notNull().default('user'),
  specialAccess: boolean('special_access').default(false),
  approved: boolean('approved').default(true),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const donations = pgTable('donations', {
  id: serial('id').primaryKey(),
  amount: integer('amount').notNull(),
  contributor: text('contributor').notNull(),
  paymentMethod: text('payment_method').default('Hand Cash'),
  transactionId: text('transaction_id'),
  senderNumber: text('sender_number'),
  transactionDate: text('transaction_date'),
  slipUrl: text('slip_url'),
  purpose: text('purpose'),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  description: text('description'),
  fileKey: text('file_key').notNull(),
  fileUrl: text('file_url').notNull(),
  fileSize: integer('file_size'),
  pageCount: integer('page_count'),
  coverColor: text('cover_color').default('#EA580C'),
  isMureedOnly: boolean('is_mureed_only').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const kalams = pgTable('kalams', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),        // Lyrics/poetry in markdown
  writer: text('writer').notNull(),           // Poet/writer name
  mediaUrl: text('media_url'),               // Audio URL (optional)
  category: text('category').default('AUDIO'),
  isMureedOnly: boolean('is_mureed_only').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
