// src/prisma/client.ts
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export default prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'error'], // optional
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
