import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  
  app.setGlobalPrefix('api/v1');
  
  const config = new DocumentBuilder()
  .setTitle('Exercise using hexagonal architecture')
  .setDescription('User management API with Hexagonal Architecture')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    }),
  ); 

  await app.listen(process.env.PORT_APP!);
  logger.log(`App running on port ${ process.env.PORT_APP }`);

}
bootstrap();
 