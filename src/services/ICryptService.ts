import { TEither } from '@/core/Either';
import { TApplicationError } from '@/domain/errors/ApplicationError';

export interface ICryptService {
  compare(
    text: string,
    hash: string,
  ): Promise<TEither<TApplicationError, boolean>>;
  hash(
    text: string,
    salts: number,
  ): Promise<TEither<TApplicationError, string>>;
}
