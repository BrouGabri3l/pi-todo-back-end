import { TEither, left, right } from '@/core/Either';
import { User } from '@/domain/entities/User';
import { TApplicationError } from '@/domain/errors/ApplicationError';
import { CriticalError } from '@/domain/errors/CriticalError';
import { NotFound } from '@/domain/errors/NotFound';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { PrismaService } from '@/infra/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly _prisma: PrismaService) {}
  async findUserByEmail(
    email: string,
  ): Promise<TEither<TApplicationError, User>> {
    try {
      const user = await this._prisma.user.findUnique({
        where: { email },
      });
      if (!user) return left(new NotFound());

      return right(user);
    } catch (error) {
      if (error instanceof Error)
        return left(new CriticalError({ error: [error.message] }));
      return left(
        new CriticalError({ critical: ['A critical error happened'] }),
      );
    }
  }
}
