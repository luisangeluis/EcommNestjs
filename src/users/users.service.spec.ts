import { User } from "@prisma/client"
import { UsersService } from "./users.service"
import { Test } from "@nestjs/testing"
import { PrismaService } from "src/prisma/prisma.service"
import { async } from "rxjs"

describe("UsersService", () => {
    const mockPrisma = {
        user: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        }
    }
    const mockUser = {
        firstName: "firstName",
        lastName: "lastName",
        email: "email@email.com",
        password: "passabc123",
        roleId: "roleIdabc123",
        birthDate: "2000-01-01"
    }
    let service: UsersService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: PrismaService, useValue: mockPrisma }
            ]
        }).compile();

        service = module.get(UsersService);

        jest.resetAllMocks();
    })


    it('should have the service defined', () => {
        expect(service).toBeDefined();
    });

    describe("findAll users service", () => {
        const mockUsers = [
            { id: 1, firstName: 'firstName' },
            { id: 2, firstName: 'firstName' },
        ];

        it("should have the service defined", () => {
            expect(service.findAll).toBeDefined();
        })

        it("should be called once", async () => {
            await service.findAll();
            expect(mockPrisma.user.findMany).toHaveBeenCalledTimes(1);

        })

        it("should be return the users", async () => {
            mockPrisma.user.findMany.mockResolvedValue(mockUsers);
            const users = await service.findAll();

            expect(users).toEqual(mockUsers);
        })
    })


})