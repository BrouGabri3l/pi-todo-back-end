import { ErrorType } from '../enums/ErrorType';
import { TApplicationError, TGenericError } from './ApplicationError';

export class CriticalError extends TApplicationError {
  constructor(
    public readonly error: TGenericError = {
      error: ['A critical error happened'],
    },
  ) {
    super({
      error: error,
      type: ErrorType.CRITICAL,
      message: 'A critical error happened ',
    });
  }
}
