import { Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/common/decorators/is-public';
import { AuthRequestModel } from './model/auth-request.model';
import { SignInUseCase } from 'src/modules/auth/use-cases/signin-use-case';
import { CreateUserUseCase } from 'src/modules/users/use-cases/create-user-usecase';
import { UserViewModel } from '../users/model/user-view-model';

@Controller('auth')
export class AuthController {
    constructor(
        private signInUseCase: SignInUseCase,
        private readonly createUserUseCase: CreateUserUseCase,

    ) { }

    @Post('signIn')
    @Public()
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    async signIn(@Request() request: AuthRequestModel) {
        const access_token = await this.signInUseCase.execute({
            user: request.user
        });
        return {
            access_token, user: {
                name: request.user.name,
                email: request.user.email,
                avatar: request.user.avatar,
                job: request.user.job,
                id: request.user.id
            }
        };
    }

    @Post('signUp')
    @Public()
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() body: { name: string, email: string, password: string, avatar: string, job: string }) {

        console.log(body)

        const user = await this.createUserUseCase.execute({
            name: body.name,
            email: body.email,
            password: body.password,
            avatar: body.avatar,
            job: body.job
        });

        console.log(user)


        UserViewModel.toHttp(user)

        const access_token = await this.signInUseCase.execute({
            user: user
        });

        console.log(user)

        return {
            access_token,
            user: {
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                job: user.job,
                id: user.id
            }
        };
    }

    @Get('health')
    @Public()
    @HttpCode(HttpStatus.OK)
    async health() {
        return { status: 'ok' };
    }
}