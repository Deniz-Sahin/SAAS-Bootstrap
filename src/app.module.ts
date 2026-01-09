import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { LoggingModule } from './infrastructure/logging/logging.module';

@Module({
  imports: [PrismaModule, RepositoriesModule, LoggingModule],
})
export class AppModule {}
