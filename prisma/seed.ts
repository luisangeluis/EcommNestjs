import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  //CREATING CATEGORIES
  await prisma.category.createMany({
    data: [
      { name: 'sports' },
      { name: 'home' },
      { name: 'electronic' },
      { name: 'toys' },
    ],
  });

  const categories = await prisma.category.findMany();

  //CREATING PRODUCTS
  const products = Array.from({ length: 10 }).map(() => ({
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    categoryId: faker.helpers.arrayElement(categories).id,
  }));

  await prisma.product.createMany({ data: products });

  //CREATING ROLES
  await prisma.role.createMany({
    data: [{ name: 'admin' }, { name: 'seller' }, { name: 'client' }],
  });

  const roles = await prisma.role.findMany();

  //CREATING USERS
  await prisma.user.createMany({
    data: [
      {
        firstName: 'luis',
        lastName: 'gomez',
        password: 'luis123abc',
        email: 'luis@email.com',
        roleId: roles[0].id,
        birthDate: new Date("1991-04-20")
      },
      {
        firstName: 'angel',
        lastName: 'perez',
        password: 'angel123abc',
        email: 'angel@email.com',
        roleId: roles[1].id,
        birthDate: new Date("1991-04-20")

      },
      {
        firstName: 'pedro',
        lastName: 'lopez',
        password: 'pedro123abc',
        email: 'pedro@email.com',
        roleId: roles[2].id,
        birthDate: new Date("1991-04-20")

      },
    ],
  });
}

main()
  .then(() => console.log('Seeding completed'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
