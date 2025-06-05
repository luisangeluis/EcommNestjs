import { User } from "@prisma/client"
import { UsersService } from "./users.service"
import { Test } from "@nestjs/testing"
import { PrismaService } from "src/prisma/prisma.service"
import { E } from "@faker-js/faker/dist/airline-CBNP41sR"
import { NotFoundException } from "@nestjs/common"

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

    const userIdMock = "abc123";
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
        jest.clearAllMocks();
    })

    it('should have the service defined', () => {
        expect(service).toBeDefined();
    });

    describe("findAll", () => {
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

    describe("findOne", () => {

        it("should have the service defined", () => {
            expect(service.findOne).toBeDefined();
        })

        it("should be called once", async () => {
            mockPrisma.user.findUnique.mockResolvedValue({ ...mockUser, id: userIdMock });

            await service.findOne(userIdMock);

            expect(mockPrisma.user.findUnique).toHaveBeenCalledTimes(1);
        })

        it("should be called with the right arguments", async () => {
            mockPrisma.user.findUnique.mockResolvedValue({ ...mockUser, id: userIdMock });

            await service.findOne(userIdMock);

            expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { id: userIdMock } });
        })

        it("should return an user", async () => {
            mockPrisma.user.findUnique.mockResolvedValue({ ...mockUser, id: userIdMock });

            const user = await service.findOne(userIdMock);

            expect(user).toEqual({ ...mockUser, id: userIdMock });
        })

        it("should throw NotFoundException if user not found", async () => {
            mockPrisma.user.findUnique.mockResolvedValue(null);

            await expect(service.findOne(userIdMock)).rejects.toThrow(NotFoundException);
        })
    })

    describe("create", () => {
        it("should have the service defined", () => {
            expect(service.create).toBeDefined();
        })

        it("should be called once", async () => {
            mockPrisma.user.create.mockResolvedValue({ ...mockUser, id: userIdMock });

            await service.create(mockUser);

            expect(mockPrisma.user.create).toHaveBeenCalledTimes(1);
        })

        it("should be called with the right argument", async () => {
            mockPrisma.user.create.mockResolvedValue({ ...mockUser, id: userIdMock });

            await service.create(mockUser);

            expect(mockPrisma.user.create).toHaveBeenCalledWith({ data: mockUser });
        })

        it("should return the created user", async () => {
            mockPrisma.user.create.mockResolvedValue({ ...mockUser, id: userIdMock });

            const createdUser = await service.create(mockUser);

            expect(createdUser).toEqual({ ...mockUser, id: userIdMock });
        })

    })


})