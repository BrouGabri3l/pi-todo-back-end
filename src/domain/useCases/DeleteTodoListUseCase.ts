import { IUsecase } from '@/core/Usecase';
import { ITodoListRepository } from '../repositories/ITodoListRepository';
import { TEither, right } from '@/core/Either';
import { TApplicationError } from '../errors/ApplicationError';

interface IDeleteTodoListUseCaseParams {
  id: string;
}

export class DeleteTodoListUseCase implements IUsecase {
  constructor(private readonly todoListRepository: ITodoListRepository) {}

  async execute(
    params: IDeleteTodoListUseCaseParams,
  ): Promise<TEither<TApplicationError, void>> {
    const result = await this.todoListRepository.delete(params);
    if (result.isRight()) return right(undefined);
    return result;
  }
}
