import { Module } from '@nestjs/common';

import { PrismaModule } from '@/infra/prisma.module';
import { TodoItemRepository } from './item.repository';

@Module({
  imports: [PrismaModule],
  providers: [TodoItemRepository],
  exports: [TodoItemRepository],
})
export class TodoItemModule {}
