import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserViewModel } from './model/user-view-model';
import { CreateUserUseCase } from 'src/modules/users/use-cases/create-user-usecase';
import { Public } from 'src/common/decorators/is-public';

@Controller('users')
export class UsersController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) { }

    @Post()
    @Public()
    async createUser(@Body() payload: CreateUserDto) {
        const { name, email, password, avatar, job } = payload;

        const user = await this.createUserUseCase.execute({
            name,
            email,
            password,
            avatar,
            job
        });

        return UserViewModel.toHttp(user);
    }
}
