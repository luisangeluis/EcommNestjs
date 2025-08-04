import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from "./common/filters/allExceptionsFilter"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // origin: 'https://faztweb.com',
  });

  app.setGlobalPrefix('api');

  //useGlobalPipes activa validacion de datos al hacer uso de los DTO's
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Sanitiza los datos que se reciben por body
    }),
  );

  // app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
