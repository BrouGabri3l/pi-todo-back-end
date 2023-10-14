import { TEither, left, right } from '@/core/Either';
import { TApplicationError } from '@/domain/errors/ApplicationError';
import { CriticalError } from '@/domain/errors/CriticalError';
import { ITodoItemRepository } from '@/domain/repositories/ITodoItemRepository';
import { PrismaService } from '@/infra/prisma.service';
import { Injectable } from '@nestjs/common';

interface ICreateTodoItemParams {
  listId: string;
}

@Injectable()
export class TodoItemRepository implements ITodoItemRepository {
  constructor(private readonly _prisma: PrismaService) {}

  async create(
    params: ICreateTodoItemParams,
  ): Promise<TEither<TApplicationError, void>> {
    try {
      await this._prisma.item.create({
        data: { listId: params.listId, description: '' },
      });
      return right(undefined);
    } catch (error) {
      if (error instanceof Error)
        return left(new CriticalError({ error: [error.message] }));
      return left(
        new CriticalError({ critical: ['A critical error happened'] }),
      );
    }
  }
}
