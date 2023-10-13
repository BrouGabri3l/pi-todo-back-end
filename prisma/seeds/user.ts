import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

export class UserSeed {
  static async run(client: PrismaClient): Promise<void> {
    const availableUsers = await client.user.findMany();

    if (!availableUsers.length) {
      await this.storeUsers(client);
    } else {
      console.log(`Skipped users seed, table was not empty`);
    }
  }

  private static async storeUsers(client: PrismaClient): Promise<void> {
    await client.user.createMany({
      data: [
        {
          name: 'admin',
          email: 'dev@todo.com.br',
          password: hashSync(
            process.env.APP_SECRET as string,
            Number(process.env.ENCRYPT_SALTS as string),
          ),
        },
      ],
    });
  }
}
