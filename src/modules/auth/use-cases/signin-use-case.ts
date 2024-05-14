import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/entities/user.entity';

interface SignInRequest {
    user: User;
}

interface UserPayload {
    sub: string;
    email: string;
    name: string;
    createdAt: string;
}

@Injectable()
export class SignInUseCase {
    constructor(private jwtService: JwtService) { }

    async execute({ user }: SignInRequest) {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt.toJSON(),
        };

        const jwtToken = this.jwtService.sign(payload);

        return jwtToken;
    }
}