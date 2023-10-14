import { TEither } from '@/core/Either';
import { TApplicationError } from '../errors/ApplicationError';
import { ListSummary } from '../entities/ListSummary';
import { List } from '../entities/List';

interface ICreateTodoListParams {
  title: string;
  userId: string;
}
interface IGetAllTodoListsParams {
  userId: string;
}
interface IGetTodoListParams {
  id: string;
}

export interface ITodoListRepository {
  create(
    params: ICreateTodoListParams,
  ): Promise<TEither<TApplicationError, void>>;
  getAll(
    params: IGetAllTodoListsParams,
  ): Promise<TEither<TApplicationError, ListSummary[]>>;
  get(params: IGetTodoListParams): Promise<TEither<TApplicationError, List>>;
}
