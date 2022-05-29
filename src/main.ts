import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  setupSwagger(app);

  const port = configService.get('PORT');
  await app.listen(port);

  console.info('----------------------------------------------------');
  console.info(`| Application is running on: http://localhost:${port} |`);
  console.info(`| Swagger URL:       http://localhost:${port}/doc     |`);
  console.info('----------------------------------------------------');

  console.info(`Application is running on ${await app.getUrl()}`);
}

bootstrap();
