import { UserRepository } from '@/data/remote/repositories/User/user.repository';
import { BCryptService } from '@/infra/bcrypt/bcrypt.service';
import { DynamicModule, Module } from '@nestjs/common';
import { IUserRepository } from '../repositories/IUserRepository';
import { ICryptService } from '@/services/ICryptService';
import { LoginUserUseCase } from '../useCases/LoginUserUseCase';
import { UserModule } from '@/data/remote/repositories/User/user.module';
import { BcryptModule } from '@/infra/bcrypt/bcrypt.module';
import { UseCaseProxy } from '@/core/UseCaseProxy';

@Module({
  imports: [UserModule, BcryptModule],
})
export class UseCasesProxyModule {
  static LOGIN_USECASE_PROXY = 'LoginUseCaseProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [UserRepository, BCryptService],
          provide: UseCasesProxyModule.LOGIN_USECASE_PROXY,
          useFactory: (
            userRepostory: IUserRepository,
            cryptService: ICryptService,
          ) =>
            new UseCaseProxy(new LoginUserUseCase(userRepostory, cryptService)),
        },
      ],
      exports: [UseCasesProxyModule.LOGIN_USECASE_PROXY],
    };
  }
}
