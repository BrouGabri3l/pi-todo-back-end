import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './controllers/auth/auth.module';
import { ProfileModule } from './controllers/profile/profile.module';
import { TodoListModule } from './controllers/todo/todo.module';
import { TodoItemModule } from './controllers/item/item.module';

@Module({
  imports: [AuthModule, ProfileModule, TodoListModule, TodoItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
