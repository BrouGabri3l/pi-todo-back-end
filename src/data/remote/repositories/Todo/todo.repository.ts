import { TEither, left, right } from '@/core/Either';
import { List } from '@/domain/entities/List';
import { ListSummary } from '@/domain/entities/ListSummary';
import { TApplicationError } from '@/domain/errors/ApplicationError';
import { CriticalError } from '@/domain/errors/CriticalError';
import { ITodoListRepository } from '@/domain/repositories/ITodoListRepository';
import { PrismaService } from '@/infra/prisma.service';
import { Injectable } from '@nestjs/common';

interface ICreateTodoListParams {
  userId: string;
  title: string;
}
interface IGetAllTodoListsParams {
  userId: string;
}
interface IGetTodoListParams {
  id: string;
}

interface IDeleteTodoListParams {
  id: string;
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
  async getAll(
    params: IGetAllTodoListsParams,
  ): Promise<TEither<TApplicationError, ListSummary[]>> {
    try {
      const lists = await this._prisma.list.findMany({
        where: { userId: params.userId, deletedAt: null },
      });
      return right(lists);
    } catch (error) {
      if (error instanceof Error)
        return left(new CriticalError({ error: [error.message] }));
      return left(
        new CriticalError({ critical: ['A critical error happened'] }),
      );
    }
  }
  async get(
    params: IGetTodoListParams,
  ): Promise<TEither<TApplicationError, List>> {
    try {
      const list = await this._prisma.list.findUnique({
        where: { id: params.id, deletedAt: null },
        include: { items: true },
      });
      return right(list);
    } catch (error) {
      if (error instanceof Error)
        return left(new CriticalError({ error: [error.message] }));
      return left(
        new CriticalError({ critical: ['A critical error happened'] }),
      );
    }
  }
  async delete(
    params: IDeleteTodoListParams,
  ): Promise<TEither<TApplicationError, void>> {
    try {
      await this._prisma.list.update({
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
