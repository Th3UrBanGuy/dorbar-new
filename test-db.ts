import 'dotenv/config';
import { db } from './lib/db';
import { donations } from './lib/db/schema';

async function testConnection() {
  console.log('Testing Neon connection...');
  try {
    const result = await db.select().from(donations);
    console.log('Successfully connected! Current donations:', result.length);
    
    console.log('Inserting a test donation...');
    await db.insert(donations).values({
      amount: 100,
      contributor: 'Test User',
      purpose: 'Verification',
    });
    
    const updatedResult = await db.select().from(donations);
    console.log('Updated donations count:', updatedResult.length);
    console.log('Test successful!');
  } catch (error) {
    console.error('Error connecting to Neon:', error);
  }
}

testConnection();
