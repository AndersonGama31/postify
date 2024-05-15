import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserViewModel } from './model/user-view-model';
import { CreateUserUseCase } from 'src/modules/users/use-cases/create-user-usecase';

@Controller('users')
export class UsersController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) { }

    @Post()
    async createUser(@Body() payload: CreateUserDto) {
        const { name, email, password } = payload;

        const user = await this.createUserUseCase.execute({
            name,
            email,
            password
        });

        return UserViewModel.toHttp(user);
    }
}
