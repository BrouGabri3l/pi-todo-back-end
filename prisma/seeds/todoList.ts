import { PrismaClient } from '@prisma/client';
export class TodoListSeed {
  static async run(client: PrismaClient): Promise<void> {
    const availableTodoLists = await client.list.findMany();

    if (!availableTodoLists.length) {
      await this.storeTodoList(client);
    } else {
      console.log(`Skipped TodoLists seed, table was not empty`);
    }
  }

  private static async storeTodoList(client: PrismaClient): Promise<void> {
    const user = await client.user.findUnique({
      where: { email: 'dev@todo.com.br' },
    });
    await client.list.create({
      data: {
        title: 'Todo example',
        userId: user.id,
      },
    });
  }
}
