import { TEither, right } from '@/core/Either';
import { ITodoListRepository } from '../repositories/ITodoListRepository';
import { TApplicationError } from '../errors/ApplicationError';
import { ListSummary } from '../entities/ListSummary';
import { IUsecase } from '@/core/Usecase';

interface IGetTodoListsSummaryParams {
  userId: string;
}

export class GetTodoListsSummary implements IUsecase {
  constructor(private readonly todoListRepository: ITodoListRepository) {}

  async execute(
    params: IGetTodoListsSummaryParams,
  ): Promise<TEither<TApplicationError, ListSummary[]>> {
    const result = await this.todoListRepository.getAll(params);

    if (result.isRight()) return right(result.value);
    return result;
  }
}
