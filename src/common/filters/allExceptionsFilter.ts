import { Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus, BadRequestException } from '@nestjs/common';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log("global catch");
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    if (typeof message === 'object' && (message as any).message) {
      message = (message as any).message;
    }

    response.status(status).json({
      success: false,
      error: {
        code: status,
        message,
      },
      timestamp: new Date().toISOString(),
      path: request.url,
    });

  }
}
