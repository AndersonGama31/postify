import { Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/common/decorators/is-public';
import { AuthRequestModel } from './model/auth-request.model';
import { SignInUseCase } from 'src/modules/auth/use-cases/signin-use-case';

@Controller()
export class AuthController {
    constructor(private signInUseCase: SignInUseCase) { }

    @Post('signIn')
    @Public()
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    async signIn(@Request() request: AuthRequestModel) {
        const access_token = await this.signInUseCase.execute({
            user: request.user
        });
        return { access_token };
    }

    @Get('health')
    @Public()
    @HttpCode(HttpStatus.OK)
    async health() {
        return { status: 'ok' };
    }
}