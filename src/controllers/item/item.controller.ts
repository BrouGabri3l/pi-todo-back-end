import { UseCaseProxy } from '@/core/UseCaseProxy';
import { UseCasesProxyModule } from '@/domain/proxies/useCasesProxy.module';
import { CreateTodoItemUseCase } from '@/domain/useCases/CreateTodoItemUseCase';
import { DeleteTodoItemUseCase } from '@/domain/useCases/DeleteTodoItemUseCase';

import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Param,
  Delete,
} from '@nestjs/common';

interface ICreateTodoItemParams {
  listId: string;
}

interface IDeleteTodoItemParams {
  id: string;
}
@Controller('/todoItem')
export class TodoItemController {
  constructor(
    @Inject(UseCasesProxyModule.CREATE_TODO_ITEM_USECASE_PROXY)
    private readonly createTodoItemUseCase: UseCaseProxy<CreateTodoItemUseCase>,
    @Inject(UseCasesProxyModule.DELETE_TODO_ITEM_USECASE_PROXY)
    private readonly deleteTodoItemUseCase: UseCaseProxy<DeleteTodoItemUseCase>,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/:listId')
  //TODO: adjusts return
  async create(@Param() params: ICreateTodoItemParams) {
    const result = await this.createTodoItemUseCase
      .getInstance()
      .execute({ listId: params.listId });
    return result;
  }
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async delete(@Param() params: IDeleteTodoItemParams) {
    const result = await this.deleteTodoItemUseCase
      .getInstance()
      .execute(params);
    return result;
  }
}
