import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { RoleExistsPipe } from "src/common/pipes/role-exists.pipe";
import { NonEmptyBodyPipe } from "src/common/pipes/non-empty-body.pipe";
import { UserExistsPipe } from "src/common/pipes/user-exists.pipe";
import { first } from "rxjs";

describe("UsersController (unit)", () => {
    const mockService = {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        remove: jest.fn()

    };
    const mockRoleExistsPipe = { transform: (v: any) => v };
    const mockNonEmptyBodyPipe = { transform: (v: any) => v };
    const mockUserExistsPipe = { transform: (v: any) => v };
    let controller: UsersController;
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                { provide: UsersService, useValue: mockService }
            ]
        })
            .overridePipe(RoleExistsPipe)
            .useValue(mockRoleExistsPipe)
            .overridePipe(NonEmptyBodyPipe)
            .useValue(mockNonEmptyBodyPipe)
            .overridePipe(UserExistsPipe)
            .useValue(mockUserExistsPipe)
            .compile();

        controller = module.get(UsersController);
        service = module.get(UsersService);

        jest.resetAllMocks()
    })

    it('should have the service defined', () => {
        expect(controller).toBeDefined();
    });

    describe("findAll", () => {
        it("should be defined", () => {
            expect(controller.findAll).toBeDefined();
        })

        it("should be called once", async () => {
            await controller.findAll();

            expect(service.findAll).toHaveBeenCalledTimes(1);
        })

        it("should return the users", async () => {
            const users = [{ id: "abc123", firstName: "firstName", lastName: "lastName" }];
            mockService.findAll.mockResolvedValue(users);
            const result = await controller.findAll();

            expect(result).toEqual(users);
        })
    })

    describe("findOne", () => {
        const mockUserId = "abc123"
        const mockUser = { id: "abc123", firstName: "firstName", lastName: "lastName" }

        beforeEach(() => {
            mockService.findOne.mockResolvedValue(mockUser);
        });

        it("should be defined", () => {
            expect(controller.findOne).toBeDefined
        })

        it("should call the service once", async () => {
            await controller.findOne(mockUserId);

            expect(mockService.findOne).toHaveBeenCalledTimes(1);
        })

        it("should be called with the right parameters", async () => {
            await controller.findOne(mockUserId);

            expect(mockService.findOne).toHaveBeenCalledWith(mockUserId);
        })

        it("should return the product", async () => {
            const result = await controller.findOne(mockUserId);

            expect(result).toEqual(mockUser);
        })
    })

    describe("create", () => {
        const mockUserId = "abc123"
        const mockUser = { firstName: "firstName", lastName: "lastName", email: "email@email.com", password: "pass", birthDate: "2000-01-01", roleId: "abc123" }
        const mockRoleId = "abc123";

        beforeEach(() => {
            mockService.create.mockResolvedValue({ ...mockUser, id: mockUserId, });
        });

        it("should be defined", () => {
            expect(controller.create).toBeDefined();
        })

        it("should call the service once", async () => {
            await controller.create(mockUser, mockRoleId);

            expect(mockService.create).toHaveBeenCalledTimes(1);
        })

        it("should return the right message", async () => {
            const result = await controller.create(mockUser, mockRoleId);

            expect(result).toEqual({ message: `User with id: ${mockUserId} successfully created` });
        })

        it("should call service with the right parameters", async () => {
            await controller.create(mockUser, mockRoleId);

            expect(mockService.create).toHaveBeenCalledWith(mockUser);
        })
    })

    describe("update", () => {
        const mockUserId = "abc123"
        const mockNewData = { firstName: "new-firstName" };
        const mockUser = { firstName: "firstName", lastName: "lastName", email: "email@email.com", password: "pass", birthDate: "2000-01-01", roleId: "abc123" }

        beforeEach(() => {
            mockService.update.mockResolvedValue({ ...mockUser, ...mockNewData, id: mockUserId });
        })

        it("should be defined", () => {
            expect(controller.update).toBeDefined();
        })

        it("should call the service once", async () => {
            await controller.update(mockUserId, mockNewData);

            expect(mockService.update).toHaveBeenCalledTimes(1);
        })

        it("should call the service with the right parameters", async () => {
            await controller.update(mockUserId, mockNewData);

            expect(mockService.update).toHaveBeenCalledWith(mockUserId, mockNewData);
        })

        it("should return the right message", async () => {
            const result = await controller.update(mockUserId, mockNewData);

            expect(result).toEqual({ message: `User with id ${mockUserId} successfully updated` });
        })

    })

    describe("delete", () => {
        const mockUserId = "abc123"

        it("should be defined", () => {
            expect(controller.remove).toBeDefined();
        })

        it("should call the service once", async () => {
            await controller.remove(mockUserId);

            expect(mockService.remove).toHaveBeenCalledTimes(1);
        })

        it("should call the service with right arguments", async () => {
            await controller.remove(mockUserId);

            expect(mockService.remove).toHaveBeenCalledWith(mockUserId);
        })

        it("should return the right message", async () => {
            const result = await controller.remove(mockUserId);

            expect(result).toEqual({ message: `User with id ${mockUserId} successfully deleted` });
        })

    })

})