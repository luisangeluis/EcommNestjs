import { applyDecorators } from '@nestjs/common';

export function SwaggerDocs(decorators: any[]) {
  return applyDecorators(...decorators);
}
