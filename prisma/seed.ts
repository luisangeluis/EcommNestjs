import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  await prisma.category.createMany({
    data: [
      { name: 'sports' },
      { name: 'home' },
      { name: 'electronic' },
      { name: 'toys' },
    ],
  });

  const categories = await prisma.category.findMany();

  const products = Array.from({ length: 10 }).map(() => ({
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    categoryId: faker.helpers.arrayElement(categories).id,
  }));

  await prisma.product.createMany({ data: products });
}

main()
  .then(() => console.log('Seeding completed'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
