import { IUsecase } from '@/core/Usecase';
import { TEither, right } from '@/core/Either';
import { TApplicationError } from '../errors/ApplicationError';
import { ITodoItemRepository } from '../repositories/ITodoItemRepository';

interface IDeleteTodoItemUseCaseParams {
  id: string;
}

export class DeleteTodoItemUseCase implements IUsecase {
  constructor(private readonly todoItemRepository: ITodoItemRepository) {}

  async execute(
    params: IDeleteTodoItemUseCaseParams,
  ): Promise<TEither<TApplicationError, void>> {
    const result = await this.todoItemRepository.delete(params);
    if (result.isRight()) return right(undefined);
    return result;
  }
}
