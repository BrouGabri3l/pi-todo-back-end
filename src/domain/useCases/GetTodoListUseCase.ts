import { IUsecase } from '@/core/Usecase';
import { ITodoListRepository } from '../repositories/ITodoListRepository';
import { right } from '@/core/Either';

interface IGetTodoListUseCaseParams {
  id: string;
}

export class GetTodoListUseCase implements IUsecase {
  constructor(private readonly todoListRepository: ITodoListRepository) {}

  async execute(params: IGetTodoListUseCaseParams) {
    const result = await this.todoListRepository.get(params);
    if (result.isRight()) return right(result.value);
    return result;
  }
}
