import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "error", "warn"] });

async function main() {
  const users = await prisma.tbl_gym_lists.findMany({
    select: { name: true, email: true, address: true },
  });
  console.log(users);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
