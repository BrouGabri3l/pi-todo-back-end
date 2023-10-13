import { UseCaseProxy } from '@/core/UseCaseProxy';
import { UseCasesProxyModule } from '@/domain/proxies/useCasesProxy.module';
import { CreateTodoListUseCase } from '@/domain/useCases/CreateTodoListUseCase';

import {
  Controller,
  HttpCode,
  HttpStatus,
  Req,
  Inject,
  Body,
  Post,
} from '@nestjs/common';

interface ICreateTodoListUseCaseParams {
  title: string;
}

@Controller('/todoList')
export class TodoListController {
  constructor(
    @Inject(UseCasesProxyModule.CREATE_TODO_LIST_USECASE_PROXY)
    private readonly createTodoListUseCase: UseCaseProxy<CreateTodoListUseCase>,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/')
  //TODO: adjusts return
  async create(@Body() body: ICreateTodoListUseCaseParams, @Req() req) {
    const result = await this.createTodoListUseCase
      .getInstance()
      .execute({ userId: req.user.id, title: body.title });
    return result;
  }
}
