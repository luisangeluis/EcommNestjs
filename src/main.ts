import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //useGlobalPipes activa validacion de datos al hacer uso de los DTO's
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Sanitiza los datos que se reciben por body
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
    // origin: 'https://faztweb.com',
  });

  await app.listen(3000);
}
bootstrap();
