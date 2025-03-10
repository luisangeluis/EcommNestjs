import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //useGlobalPipes activa validacion de datos al hacer uso de los DTO's
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Sanitiza los datos que se reciben por body
    }),
  );
  await app.listen(3000);
}
bootstrap();
