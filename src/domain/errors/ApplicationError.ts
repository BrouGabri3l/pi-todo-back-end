import { ErrorType } from '../enums/ErrorType';

export type TGenericError = Record<string, string[]>;

interface TApplicationErrorParams {
  error: TGenericError;
  type: ErrorType;
  message: string;
}

export abstract class TApplicationError extends Error {
  error: TGenericError;
  type: ErrorType;

  constructor({ error, type, message }: TApplicationErrorParams) {
    super(message);
    this.error = error;
    this.type = type;
  }
}
