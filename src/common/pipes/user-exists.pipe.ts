import { ArgumentMetadata, BadRequestException, Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class UserExistsPipe implements PipeTransform {
    constructor(private readonly usersService: UsersService) { }

    async transform(value: any, metadata: ArgumentMetadata) {
        const userId = value;

        if (!userId)
            return value;

        const user = await this.usersService.findById(userId);

        if (!user) throw new NotFoundException(`User with ID ${userId} does not exist`,);

        return value;
    }
}