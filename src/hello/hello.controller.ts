import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
  Req,
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidateuserPipe } from './pipes/validateuser/validateuser.pipe';

@Controller()
export class HelloController {
  @Get()
  index(@Req() request: Request, @Res() response: Response) {
    console.log(request.url);

    return response.status(200).json({ message: 'hello' });
  }

  @Get('not-found')
  @HttpCode(404)
  notFound() {
    return '404 not found';
  }

  @Get('ticket/:num')
  getNum(@Param('num', ParseIntPipe) num: number) {
    return num + 14;
  }

  @Get('active/:status')
  isActive(@Param('status', ParseBoolPipe) status: boolean) {
    console.log(typeof status);

    return status;
  }

  @Get('greet')
  greet(@Query(ValidateuserPipe) query: { name: string; age: number }) {
    console.log(typeof query.name);
    console.log(typeof query.age);

    return `hello ${query.name} your age is ${query.age}`;
  }
}
