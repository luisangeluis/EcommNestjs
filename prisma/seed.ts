import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.productCategory.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  //Users
  const users = await Promise.all(
    Array.from({ length: 5 }).map(() => {
      return prisma.user.create({
        data: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      });
    }),
  );

  //Categories
  const categories = await Promise.all(
    ['Electronics', 'Sports', 'Toys', 'Kitchen'].map((name) => {
      return prisma.category.create({ data: { name } });
    }),
  );

  //Products with images and categories
  for (let i = 0; i < 25; i++) {
    const randomUser = faker.helpers.arrayElement(users);
    const randomCategories = faker.helpers.arrayElements(categories, 2);

    const productTitle = faker.commerce.productName();

    const product = await prisma.product.create({
      data: {
        title: productTitle,
        description: faker.commerce.productDescription(),
        price: new Prisma.Decimal(faker.commerce.price({ min: 1, dec: 2 })),
        userId: randomUser.id,
        productImages: {
          create: [
            {
              url: `https://picsum.photos/seed/${faker.helpers.slugify(productTitle + '-1')}/400/300`,
            },
            {
              url: `https://picsum.photos/seed/${faker.helpers.slugify(productTitle + '-2')}/400/300`,
            },
          ],
        },
        categories: {
          create: randomCategories.map((cat) => ({
            categoryId: cat.id,
          })),
        },
      },
    });

    console.log(`✅ Producto creado: ${product.title}`);
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
