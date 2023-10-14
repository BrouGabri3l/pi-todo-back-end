import { TEither } from '@/core/Either';
import { TApplicationError } from '../errors/ApplicationError';

interface ICreateTodoItemParams {
  listId: string;
}

interface IDeleteTodoItemParams {
  id: string;
}
export interface ITodoItemRepository {
  create(
    params: ICreateTodoItemParams,
  ): Promise<TEither<TApplicationError, void>>;
  delete(
    params: IDeleteTodoItemParams,
  ): Promise<TEither<TApplicationError, void>>;
}
