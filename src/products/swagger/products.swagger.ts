import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

export const createProductSwagger = () => [
  ApiOperation({ summary: 'Create a new product' }),
  ApiBody({
    description: 'Fields to create a new product',
    schema: {
      example: {
        title: '',
        description: '',
        price: '',
        categoryId: '',
      },
    },
  }),
  ApiResponse({
    status: 200,
    description: 'Product created',
    schema: {
      example: {
        message: 'Product succesfully created',
        data: {
          id: 'myId',
          title: 'myTitle',
          description: 'myDescription',
          price: 0.0,
          categoryId: 'myCategoryId',
        },
      },
    },
  }),
];
