import { PrismaClient, Prisma } from "@prisma/client";

const logs: Prisma.PrismaClientOptions = {
  log: ["error", "warn", "query", "info"],
};

const prisma = new PrismaClient(logs);

export default prisma;
