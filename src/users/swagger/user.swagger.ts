import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";

export const createUserSwagger = () => [
    ApiOperation({ summary: 'Create a new user' }),
    ApiBody({
        description: 'Fields to create a new user',
        schema: {
            example: {
                name: 'a name',
                lastName: 'a lastName',
                email: "your_email@email.com",
                password: 'a password',
                roleId: 'your_roleId',
                birthDate: 'your birtDate',
            },
        },
    }),
    ApiResponse({
        status: 201,
        description: 'User created',
        schema: {
            example: {
                message: 'User with id:<userId> succesfully created'
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

]