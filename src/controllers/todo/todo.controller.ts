import { UseCaseProxy } from '@/core/UseCaseProxy';
import { UseCasesProxyModule } from '@/domain/proxies/useCasesProxy.module';
import { CreateTodoListUseCase } from '@/domain/useCases/CreateTodoListUseCase';
import { GetTodoListUseCase } from '@/domain/useCases/GetTodoListUseCase';
import { GetTodoListsSummary } from '@/domain/useCases/GetTodoListsSummary';

import {
  Controller,
  HttpCode,
  HttpStatus,
  Req,
  Inject,
  Body,
  Post,
  Get,
  Param,
} from '@nestjs/common';

interface ICreateTodoListParams {
  title: string;
}

interface IGetTodoListParams {
  id: string;
}
@Controller('/todoList')
export class TodoListController {
  constructor(
    @Inject(UseCasesProxyModule.CREATE_TODO_LIST_USECASE_PROXY)
    private readonly createTodoListUseCase: UseCaseProxy<CreateTodoListUseCase>,
    @Inject(UseCasesProxyModule.GET_ALL_TODO_LISTS_USECASE_PROXY)
    private readonly getTodoListsSummaryUseCase: UseCaseProxy<GetTodoListsSummary>,
    @Inject(UseCasesProxyModule.GET_TODO_LIST_USECASE_PROXY)
    private readonly getTodoListUseCase: UseCaseProxy<GetTodoListUseCase>,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/')
  //TODO: adjusts return
  async create(@Body() body: ICreateTodoListParams, @Req() req) {
    const result = await this.createTodoListUseCase
      .getInstance()
      .execute({ userId: req.user.id, title: body.title });
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getAll(@Req() req) {
    const result = await this.getTodoListsSummaryUseCase
      .getInstance()
      .execute(req.user.id);
    //TODO: Adjust data treatment
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async get(@Param() params: IGetTodoListParams) {
    const result = await this.getTodoListUseCase.getInstance().execute(params);
    return result;
  }
}
