import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class RoleExistsPipe implements PipeTransform {
  constructor(private readonly rolesService: RolesService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const roleId = value;
    const role = await this.rolesService.findOne(roleId);

    if (!role) {
      throw new BadRequestException(`Role with ID ${roleId} does not exist`);
    }

    return value;
  }
}
