import { IUsecase } from '@/core/Usecase';
import { ITodoItemRepository } from '../repositories/ITodoItemRepository';
import { TEither, right } from '@/core/Either';
import { TApplicationError } from '../errors/ApplicationError';

interface ICreateTodoItemUseCaseParams {
  listId: string;
}

export class CreateTodoItemUseCase implements IUsecase {
  constructor(private readonly todoItemRepository: ITodoItemRepository) {}
  async execute(
    params: ICreateTodoItemUseCaseParams,
  ): Promise<TEither<TApplicationError, void>> {
    const result = await this.todoItemRepository.create(params);

    if (result.isRight()) return right(undefined);
    //TODO: Adjusts return
    return result;
  }
}
