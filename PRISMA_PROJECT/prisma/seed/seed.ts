import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a zoo
  const zoo = await prisma.zoo.create({
    data: {
      name: 'Safari Kingdom',
      location: 'South Africa',
      animal: {
        create: [
          { name: 'Leo', species: 'Lion' },
          { name: 'Zara', species: 'Zebra' },
        ],
      },
    },
  });

  console.log(`Zoo created: ${zoo.name}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
