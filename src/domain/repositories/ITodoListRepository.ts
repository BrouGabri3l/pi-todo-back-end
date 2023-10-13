import { TEither } from '@/core/Either';
import { TApplicationError } from '../errors/ApplicationError';

interface ICreateTodoListParams {
  title: string;
  userId: string;
}

export interface ITodoListRepository {
  create(
    params: ICreateTodoListParams,
  ): Promise<TEither<TApplicationError, void>>;
}
