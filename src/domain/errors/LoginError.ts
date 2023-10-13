import { ErrorType } from '../enums/ErrorType';
import { TApplicationError } from './ApplicationError';
import { TGenericError } from './ApplicationError';

export class LoginError extends TApplicationError {
  constructor(
    public readonly error: TGenericError = { error: ['Erro ao fazer o login'] },
    public readonly type: ErrorType = ErrorType.NOT_ACCEPTABLE,
  ) {
    super({ error: error, type: type, message: 'Erro ao fazer o login' });
  }
}
