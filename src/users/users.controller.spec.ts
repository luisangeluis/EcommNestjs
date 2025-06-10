import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { RoleExistsPipe } from "src/common/pipes/role-exists.pipe";
import { NonEmptyBodyPipe } from "src/common/pipes/non-empty-body.pipe";
import { UserExistsPipe } from "src/common/pipes/user-exists.pipe";

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

})