import { TEither } from '@/core/Either';
import { User } from '../entities/User';
import { TApplicationError } from '../errors/ApplicationError';

export interface IUserRepository {
  findUserByEmail(email: string): Promise<TEither<TApplicationError, User>>;
  getById(id: string): Promise<TEither<TApplicationError, User>>;
}
