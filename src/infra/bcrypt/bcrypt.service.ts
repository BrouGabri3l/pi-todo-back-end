import { TEither, left, right } from '@/core/Either';
import { TApplicationError } from '@/domain/errors/ApplicationError';
import { CriticalError } from '@/domain/errors/CriticalError';
import { ICryptService } from '@/services/ICryptService';
import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class BCryptService implements ICryptService {
  constructor() {}

  async compare(
    text: string,
    hash: string,
  ): Promise<TEither<TApplicationError, boolean>> {
    try {
      const matches = await bcrypt.compare(text, hash);
      return right(matches);
    } catch (error) {
      if (error instanceof Error) {
        return left(new CriticalError({ error: [error.message] }));
      }

      return left(
        new CriticalError({ critical: ['A critical error happened'] }),
      );
    }
  }

  async hash(
    text: string,
    salts: number,
  ): Promise<TEither<TApplicationError, string>> {
    try {
      const hashed = await bcrypt.hash(text, salts);
      return right(hashed);
    } catch (error) {
      if (error instanceof Error) {
        return left(new CriticalError({ error: [error.message] }));
      }

      return left(
        new CriticalError({ critical: ['A critical error happened'] }),
      );
    }
  }
}
