import { Module } from '@nestjs/common';
import { AuthService } from '@/infra/auth/auth.service';
import { AuthController } from '@/controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';

import { AuthGuard } from '../../infra/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UseCasesProxyModule } from '@/domain/proxies/useCasesProxy.module';

@Module({
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
  exports: [AuthService],
})
export class AuthModule {}
