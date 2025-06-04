import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "error", "warn"] });

async function main() {
  // const users = await prisma.tbl_gym_lists.findMany({
  //   select: { name: true, email: true, address: true },
  // });
  // console.log(users);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

// try {
//   await prisma.$transaction([
//     prisma.order.create({ data: { userId: 1, total: 250 } }),
//     prisma.order.create({ data: { userId: 2, total: 150 } }),
//     prisma.order.create({ data: { userId: 3, total: 400 } }),
//     prisma.activityLog.create({ data: { message: "3 orders imported" } }),
//   ]);

// } catch (error) {

// }

// await prisma.$transaction(async (tx) => {
//   const sender = await tx.account.findUnique({ where: { id: 1 } });

//   if (!sender || sender.balance < 1000) {
//     throw new Error("Insufficient funds");
//   }

//   // 1. Deduct from sender
//   await tx.account.update({
//     where: { id: 1 },
//     data: { balance: { decrement: 1000 } },
//   });

//   // 2. Add to recipient
//   await tx.account.update({
//     where: { id: 2 },
//     data: { balance: { increment: 1000 } },
//   });

//   // 3. Log transaction
//   await tx.transaction.create({
//     data: {
//       fromAccountId: 1,
//       toAccountId: 2,
//       amount: 1000,
//       status: "COMPLETED",
//     },
//   });
// });
