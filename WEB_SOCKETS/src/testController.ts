// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// type Zootype = {
//   name: string;
//   location?: string;
// };

// async function zooInsertOrUpdate(data: Zootype) {
//   try {
//     const result = await prisma.zoo.upsert({
//       create: { name: data.name, location: data.location },
//       update: { name: data.name, location: data.location },
//       where: { name: data.name },
//     });
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// }

// let ArrayofZoo: Zootype[] = [
//   { name: 'zoo1', location: 'madurai' },
//   { name: 'zoo2', location: 'chennai' },
//   { name: 'zoo3', location: 'pudur' },
//   { name: 'zoo4', location: 'ramnad' },
//   { name: 'zoo5', location: 'kerala' },
// ];

// // ArrayofZoo.forEach(async data => {
// //   const result = await zooInsertOrUpdate(data);
// // });

// async function main(zoos: Zootype[]) {
//   if (zoos.length == 0) return 'valid zoodata Array needes';
//   for (let index = 0; index < zoos.length; index++) {
//     const element: Zootype = zoos[index];
//     try {
//       const res = await zooInsertOrUpdate(element);
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// main(ArrayofZoo);

// // model Zoo {
// //   id        Int      @id @default(autoincrement())
// //   name      String   @unique
// //   location  String?
// //   createdAt DateTime @default(now())
// //   updatedAt DateTime @updatedAt
// // }
