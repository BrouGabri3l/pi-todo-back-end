import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UseCasesProxyModule } from '@/domain/proxies/useCasesProxy.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/infra/auth/auth.guard';
import { AuthService } from '@/infra/auth/auth.service';

describe('AuthController', () => {
  let controller: AuthController;

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
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
