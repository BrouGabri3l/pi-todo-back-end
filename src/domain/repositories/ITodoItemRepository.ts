import { TEither } from '@/core/Either';
import { TApplicationError } from '../errors/ApplicationError';

interface ICreateTodoItemParams {
  listId: string;
}

export interface ITodoItemRepository {
  create(
    params: ICreateTodoItemParams,
  ): Promise<TEither<TApplicationError, void>>;
}
