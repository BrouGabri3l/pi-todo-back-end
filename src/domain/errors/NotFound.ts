import { ErrorType } from '@/domain/enums/ErrorType';
import { TApplicationError, TGenericError } from './ApplicationError';

export class NotFound extends TApplicationError {
  constructor(
    public readonly error: TGenericError = {
      error: ['Not found'],
    },
  ) {
    super({
      error: error,
      type: ErrorType.NOT_FOUND,
      message: 'Not found',
    });
  }
}
