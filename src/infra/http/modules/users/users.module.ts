import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateUserUseCase } from 'src/modules/users/use-cases/create-user-usecase';

@Module({
    imports: [DatabaseModule],
    controllers: [UsersController],
    providers: [CreateUserUseCase],
})
export class UsersModule { }
