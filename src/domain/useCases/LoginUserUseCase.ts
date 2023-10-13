import { TEither, left, right } from '@/core/Either';
import { IUsecase } from '@/core/Usecase';
import { TApplicationError } from '../errors/ApplicationError';
import { IUserRepository } from '../repositories/IUserRepository';

import { NotFound } from '../errors/NotFound';
import { LoginError } from '../errors/LoginError';
import { ICryptService } from '@/services/ICryptService';

interface ILoginUserUseCaseParams {
  email: string;
  password: string;
}

interface ILoginUserUseCaseResponse {
  id: string;
  email: string;
}

export class LoginUserUseCase implements IUsecase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _cryptService: ICryptService,
  ) {}

  async execute({
    email,
    password,
  }: ILoginUserUseCaseParams): Promise<
    TEither<TApplicationError, ILoginUserUseCaseResponse>
  > {
    const user = await this._userRepository.findUserByEmail(email);
    if (user.isLeft() && user.value instanceof NotFound) {
      return left(new LoginError({ error: ['Credenciais inválidas'] }));
    }
    if (user.isLeft()) {
      return left(user.value);
    }
    const valid = await this._cryptService.compare(
      password,
      user.value.password,
    );
    if (valid.isLeft()) {
      return left(valid.value);
    }
    if (valid.value) {
      return right({ id: user.value.id, email: user.value.email });
    }
    return left(new LoginError({ error: ['Credenciais inválidas'] }));
  }
}
