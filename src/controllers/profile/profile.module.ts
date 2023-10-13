import { Module } from '@nestjs/common';
import { AuthService } from '@/infra/auth/auth.service';
import { AuthGuard } from '../../infra/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UseCasesProxyModule } from '@/domain/proxies/useCasesProxy.module';
import { ProfileController } from './profile.controller';

@Module({
  imports: [UseCasesProxyModule.register()],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
  controllers: [ProfileController],
  exports: [],
})
export class ProfileModule {}
