import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

export const createProductSwagger = () => [
  ApiOperation({ summary: 'Create a new product' }),
  ApiBody({
    description: 'Fields to create a new product',
    schema: {
      example: {
        title: 'a car',
        description: 'a car description',
        price: 10.2,
        categoryId: 'a6422150-e7b7-4cc2-9cfc-fe73b7b707d4',
      },
    },
  }),
  ApiResponse({
    status: 201,
    description: 'Product created',
    schema: {
      example: {
<<<<<<< HEAD
        message: 'Product with id:<productId> succesfully created'
=======
        message: 'Product succesfully created',
        data: {
          id: 'f323246b-85a9-4a46-9638-180cfa58ad5d',
          title: 'a car',
          description: 'a car description',
          price: 10.2,
          categoryId: 'fa6704d5-2dc3-4d45-b042-4c811788912c',
        },
>>>>>>> d62a7bf9faef8f464b5a799b50629ee01ffdeda8
      },
    },
  }),
  ApiResponse({
    status: 400,
    description: 'Validation error',
    schema: {
      example: {
        message: ['array with errors'],
        error: 'Bad request',
        statusCode: 400,
      },
    },
  }),
];
