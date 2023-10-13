import { IUsecase } from '@/core/Usecase';
import { ITodoListRepository } from '../repositories/ITodoListRepository';
import { TApplicationError } from '../errors/ApplicationError';
import { TEither, left, right } from '@/core/Either';

interface ICreateTodoListUseCaseParams {
  userId: string;
  title: string;
}

export class CreateTodoListUseCase implements IUsecase {
  constructor(private readonly todoListRepository: ITodoListRepository) {}

  async execute(
    params: ICreateTodoListUseCaseParams,
  ): Promise<TEither<TApplicationError, void>> {
    const result = await this.todoListRepository.create(params);

    if (result.isLeft()) {
      return left(result.value);
    }
    return right(undefined);
  }
}
