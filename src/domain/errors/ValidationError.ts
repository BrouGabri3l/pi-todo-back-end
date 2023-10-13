import { ErrorType } from '@/domain/enums/ErrorType';
import { TApplicationError, TGenericError } from './ApplicationError';

export class ValidationError extends TApplicationError {
  constructor(public readonly error: TGenericError) {
    super({
      error: error,
      type: ErrorType.VALIDATION,
      message: 'Error on validation',
    });
  }
}
