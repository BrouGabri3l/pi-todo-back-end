import { TEither, left, right } from '@/core/Either';
import { TApplicationError } from '@/domain/errors/ApplicationError';
import { CriticalError } from '@/domain/errors/CriticalError';
import { ITodoItemRepository } from '@/domain/repositories/ITodoItemRepository';
import { PrismaService } from '@/infra/prisma.service';
import { Injectable } from '@nestjs/common';

interface ICreateTodoItemParams {
  listId: string;
  description: string;
}

interface IDeleteTodoItemParams {
  id: string;
}
@Injectable()
export class TodoItemRepository implements ITodoItemRepository {
  constructor(private readonly _prisma: PrismaService) {}

  async create(
    params: ICreateTodoItemParams,
  ): Promise<TEither<TApplicationError, void>> {
    try {
      await this._prisma.item.create({
        data: { listId: params.listId, description: params.description },
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

  async delete(
    params: IDeleteTodoItemParams,
  ): Promise<TEither<TApplicationError, void>> {
    try {
      await this._prisma.item.update({
        where: { id: params.id },
        data: { deletedAt: new Date() },
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
