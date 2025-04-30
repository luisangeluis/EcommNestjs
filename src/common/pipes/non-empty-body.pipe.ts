import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class NonEmptyBodyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const body = value;

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      throw new BadRequestException('Invalid body format');
    }

    if (Object.keys(body).length === 0) {
      throw new BadRequestException('Request body must contain at least one valid field');
    }

    return value;
  }
}
