import { UseCaseProxy } from '@/core/UseCaseProxy';
import { UseCasesProxyModule } from '@/domain/proxies/useCasesProxy.module';
import { LoginUserUseCase } from '@/domain/useCases/LoginUserUseCase';
import { AuthService } from '@/infra/auth/auth.service';
import { Public } from '@/infra/auth/decorators/public.decorator';

import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';

interface ISignInBody {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(UseCasesProxyModule.LOGIN_USECASE_PROXY)
    private readonly loginUserUserCase: UseCaseProxy<LoginUserUseCase>,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  //TODO: adjusts return
  async signIn(@Body() signInDto: ISignInBody) {
    const signedUser = await this.loginUserUserCase
      .getInstance()
      .execute(signInDto);
    if (signedUser.isLeft()) throw new UnauthorizedException();
    const token = await this.authService.generateToken(
      signedUser.value.id,
      signedUser.value.email,
    );
    return token;
  }
}
