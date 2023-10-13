import { ErrorType } from '../enums/ErrorType';
import { TApplicationError } from './ApplicationError';

export class ForbiddenError extends TApplicationError {
  constructor() {
    super({
      error: { error: ['Access denied'] },
      type: ErrorType.FORBIDDEN,
      message: 'Access denied',
    });
  }
}
