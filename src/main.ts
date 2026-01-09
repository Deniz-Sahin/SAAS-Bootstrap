import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './infrastructure/logging/logger.service';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new AppLogger('Bootstrap'),
  });

  const logger = app.get(AppLogger);
  logger.setContext({ requestId: 'bootstrap' });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
