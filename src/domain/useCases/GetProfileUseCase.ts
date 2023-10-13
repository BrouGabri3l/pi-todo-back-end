import { IUsecase } from '@/core/Usecase';

import { TApplicationError } from '../errors/ApplicationError';
import { IUserRepository } from '../repositories/IUserRepository';
import { TEither, right } from '@/core/Either';
import { UserDTO } from '../dtos/UserDTO';

interface IGetProfileUseCaseParams {
  id: string;
}

export class GetProfileUseCase implements IUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({
    id,
  }: IGetProfileUseCaseParams): Promise<TEither<TApplicationError, UserDTO>> {
    const result = await this.userRepository.getById(id);

    if (result.isRight()) {
      return right(result.value);
    }

    return result;
  }
}
