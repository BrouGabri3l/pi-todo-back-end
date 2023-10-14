import { UserRepository } from '@/data/remote/repositories/User/user.repository';
import { BCryptService } from '@/infra/bcrypt/bcrypt.service';
import { DynamicModule, Module } from '@nestjs/common';
import { IUserRepository } from '../repositories/IUserRepository';
import { ICryptService } from '@/services/ICryptService';
import { LoginUserUseCase } from '../useCases/LoginUserUseCase';
import { UserModule } from '@/data/remote/repositories/User/user.module';
import { BcryptModule } from '@/infra/bcrypt/bcrypt.module';
import { UseCaseProxy } from '@/core/UseCaseProxy';
import { GetProfileUseCase } from '../useCases/GetProfileUseCase';
import { ITodoListRepository } from '../repositories/ITodoListRepository';
import { TodoListRepository } from '@/data/remote/repositories/Todo/todo.repository';
import { CreateTodoListUseCase } from '../useCases/CreateTodoListUseCase';

import { TodoModule } from '@/data/remote/repositories/Todo/todo.module';
import { GetTodoListsSummary } from '../useCases/GetTodoListsSummary';
import { GetTodoListUseCase } from '../useCases/GetTodoListUseCase';
import { DeleteTodoListUseCase } from '../useCases/DeleteTodoListUseCase';

@Module({
  imports: [UserModule, BcryptModule, TodoModule],
})
export class UseCasesProxyModule {
  static LOGIN_USECASE_PROXY = 'LoginUseCaseProxy';
  static GET_PROFILE_USECASE_PROXY = 'GetProfileUseCaseProxy';
  static CREATE_TODO_LIST_USECASE_PROXY = 'CreateTodoListUseCaseProxy';
  static GET_ALL_TODO_LISTS_USECASE_PROXY = 'GetAllTodoListsUseCaseProxy';
  static GET_TODO_LIST_USECASE_PROXY = 'GetTodoListUseCaseProxy';
  static DELETE_TODO_LIST_USECASE_PROXY = 'DeleteTodoListUseCaseProxy';

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
        {
          inject: [UserRepository],
          provide: UseCasesProxyModule.GET_PROFILE_USECASE_PROXY,
          useFactory: (userRepostory: IUserRepository) =>
            new UseCaseProxy(new GetProfileUseCase(userRepostory)),
        },
        {
          inject: [TodoListRepository],
          provide: UseCasesProxyModule.CREATE_TODO_LIST_USECASE_PROXY,
          useFactory: (todoListRepository: ITodoListRepository) =>
            new UseCaseProxy(new CreateTodoListUseCase(todoListRepository)),
        },
        {
          inject: [TodoListRepository],
          provide: UseCasesProxyModule.GET_ALL_TODO_LISTS_USECASE_PROXY,
          useFactory: (todoListRepository: ITodoListRepository) =>
            new UseCaseProxy(new GetTodoListsSummary(todoListRepository)),
        },
        {
          inject: [TodoListRepository],
          provide: UseCasesProxyModule.GET_TODO_LIST_USECASE_PROXY,
          useFactory: (todoListRepository: ITodoListRepository) =>
            new UseCaseProxy(new GetTodoListUseCase(todoListRepository)),
        },
        {
          inject: [TodoListRepository],
          provide: UseCasesProxyModule.DELETE_TODO_LIST_USECASE_PROXY,
          useFactory: (todoListRepository: ITodoListRepository) =>
            new UseCaseProxy(new DeleteTodoListUseCase(todoListRepository)),
        },
      ],
      exports: [
        UseCasesProxyModule.LOGIN_USECASE_PROXY,
        UseCasesProxyModule.GET_PROFILE_USECASE_PROXY,
        UseCasesProxyModule.CREATE_TODO_LIST_USECASE_PROXY,
        UseCasesProxyModule.GET_ALL_TODO_LISTS_USECASE_PROXY,
        UseCasesProxyModule.GET_TODO_LIST_USECASE_PROXY,
        UseCasesProxyModule.DELETE_TODO_LIST_USECASE_PROXY,
      ],
    };
  }
}
