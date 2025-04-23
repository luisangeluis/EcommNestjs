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
        name: 'luis',
<<<<<<< HEAD
        lastName: 'luis',
        password: 'luis123abc',
        email: 'luis@email.com',
        roleId: roles[0].id,
        birthDate: "1991-04-20"
      },
      {
        name: 'angel',
        lastName: 'angel',
        password: 'angel123abc',
        email: 'angel@email.com',
        roleId: roles[1].id,
        birthDate: "1991-04-20"

      },
      {
        name: 'pedro',
        lastName: 'pedro',
        password: 'pedro123abc',
        email: 'pedro@email.com',
        roleId: roles[2].id,
        birthDate: "1991-04-20"

=======
        password: 'luis123abc',
        email: 'luis@email.com',
        roleId: roles[0].id,
      },
      {
        name: 'angel',
        password: 'angel123abc',
        email: 'angel@email.com',
        roleId: roles[1].id,
      },
      {
        name: 'pedro',
        password: 'pedro123abc',
        email: 'pedro@email.com',
        roleId: roles[2].id,
>>>>>>> d62a7bf9faef8f464b5a799b50629ee01ffdeda8
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
