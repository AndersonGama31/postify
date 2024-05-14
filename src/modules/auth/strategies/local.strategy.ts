import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ValidateUserUseCase } from '../use-cases/validate-user-use-case';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private validateUserUseCase: ValidateUserUseCase) {
        super({
            usernameField: 'email',
        });
    }

    async validate(email: string, password: string) {
        return this.validateUserUseCase.execute({ email, password });
    }
}