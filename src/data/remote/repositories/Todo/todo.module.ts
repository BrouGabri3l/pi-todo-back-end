import { Module } from '@nestjs/common';

import { PrismaModule } from '@/infra/prisma.module';
import { TodoListRepository } from './todo.repository';

@Module({
  imports: [PrismaModule],
  providers: [TodoListRepository],
  exports: [TodoListRepository],
})
export class TodoModule {}
