import { UseCaseProxy } from '@/core/UseCaseProxy';
import { UseCasesProxyModule } from '@/domain/proxies/useCasesProxy.module';
import { CreateTodoItemUseCase } from '@/domain/useCases/CreateTodoItemUseCase';

import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Param,
} from '@nestjs/common';

interface ICreateTodoListParams {
  listId: string;
}

@Controller('/todoItem')
export class TodoItemController {
  constructor(
    @Inject(UseCasesProxyModule.CREATE_TODO_ITEM_USECASE_PROXY)
    private readonly createTodoItemUseCase: UseCaseProxy<CreateTodoItemUseCase>,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/:listId')
  //TODO: adjusts return
  async create(@Param() params: ICreateTodoListParams) {
    console.log(params);
    const result = await this.createTodoItemUseCase
      .getInstance()
      .execute({ listId: params.listId });
    return result;
  }
}
