import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();

  for (let i = 0; i < 25; i++) {
    await prisma.product.create({
      data: {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 1 }),
        productImages: {
          create: Array.from({
            length: faker.number.int({ min: 1, max: 5 }),
          }).map(() => ({
            url: faker.image.urlPicsumPhotos(), // o faker.image.urlLoremFlickr({ category: 'product' })
          })),
        },
      },
    });
  }
}

main()
  .then(() => {
    console.log('✅ Database seeded with fake data!');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
