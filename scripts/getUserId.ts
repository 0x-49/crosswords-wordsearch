import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

// Configure dotenv to load variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const prisma = new PrismaClient();

async function main() {
  try {
    const user = await prisma.user.findFirst();
    if (user) {
      console.log('User ID found:', user.id);
      await fs.writeFile(path.resolve(process.cwd(), 'scripts/userId.txt'), user.id);
      console.log('User ID written to scripts/userId.txt');
    } else {
      console.log('No users found in the database.');
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
