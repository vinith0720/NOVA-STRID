import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const Venue = await prisma.venue.createMany({
    data: [
      {
        name: "The Great Palace",
        address: "madurai",
        capacity: 5,
      },
      {
        name: "The Lovely Palace",
        address: "chennai",
        capacity: 10,
      },
      {
        name: "The Great Paradise",
        address: "bengaluru",
        capacity: 15,
      },
    ],
  });
  Venue
    ? console.log("Venue seeded successfully ")
    : console.log("Venue Seesed failed");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
