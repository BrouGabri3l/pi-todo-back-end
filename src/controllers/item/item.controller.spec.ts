import { UseCasesProxyModule } from '@/domain/proxies/useCasesProxy.module';
import { AuthGuard } from '@/infra/auth/auth.guard';
import { AuthService } from '@/infra/auth/auth.service';
import { Test, TestingModule } from '@nestjs/testing';

import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TodoItemController } from './item.controller';

describe('TodoItemController', () => {
  let controller: TodoItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: process.env.APP_SECRET,
          signOptions: { expiresIn: '7d' },
        }),
        UseCasesProxyModule.register(),
      ],
      providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
      controllers: [TodoItemController],
    }).compile();

    controller = module.get<TodoItemController>(TodoItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
