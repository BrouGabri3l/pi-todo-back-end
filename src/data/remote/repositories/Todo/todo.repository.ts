import { TEither, left, right } from '@/core/Either';
import { TApplicationError } from '@/domain/errors/ApplicationError';
import { CriticalError } from '@/domain/errors/CriticalError';
import { ITodoListRepository } from '@/domain/repositories/ITodoListRepository';
import { PrismaService } from '@/infra/prisma.service';
import { Injectable } from '@nestjs/common';

interface ICreateTodoListParams {
  userId: string;
  title: string;
}

@Injectable()
export class TodoListRepository implements ITodoListRepository {
  constructor(private readonly _prisma: PrismaService) {}

  async create(
    params: ICreateTodoListParams,
  ): Promise<TEither<TApplicationError, void>> {
    try {
      await this._prisma.list.create({
        data: {
          title: params.title,
          userId: params.userId,
        },
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
