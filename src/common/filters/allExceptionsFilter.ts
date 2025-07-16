import { Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus, BadRequestException } from '@nestjs/common';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus();
    let message = exception.message;

    if (
      exception instanceof BadRequestException &&
      typeof exception.getResponse() === 'object'
    ) {
      const responseBody = exception.getResponse() as any;

      if (Array.isArray(responseBody.message)) {
        message = responseBody.message;
      }
    }

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.log(`ERROR: ${message}`);

      response.status(status).json({
        statusCode: status,
        message: 'An unexpected error occurred',
      });
    } else {
      response.status(status).json({
        statusCode: status,
        // message,
        error: exception.name,
      });
    }
  }
}
