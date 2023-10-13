import { UseCaseProxy } from '@/core/UseCaseProxy';
import { UserDTO } from '@/domain/dtos/UserDTO';
import { mapper } from '@/domain/mapper';
import { UseCasesProxyModule } from '@/domain/proxies/useCasesProxy.module';
import { ProfileResponse } from '@/domain/responses/ProfileResponse';
import { GetProfileUseCase } from '@/domain/useCases/GetProfileUseCase';

import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Req,
  Inject,
} from '@nestjs/common';

@Controller('/profile')
export class ProfileController {
  constructor(
    @Inject(UseCasesProxyModule.GET_PROFILE_USECASE_PROXY)
    private readonly getProfileUseCase: UseCaseProxy<GetProfileUseCase>,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  //TODO: adjusts return
  async get(@Req() req) {
    const result = await this.getProfileUseCase.getInstance().execute(req.user);
    if (result.isRight())
      return mapper.map(result.value, UserDTO, ProfileResponse);
    return result;
  }
}
