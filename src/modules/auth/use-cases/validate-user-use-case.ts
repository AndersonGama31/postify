import { Injectable, UnauthorizedException } from "@nestjs/common";
import { compare } from "bcrypt";
import { UserRepository } from "src/modules/users/repositories/user.repository";

interface ValidateUserRequest {
    email: string;
    password: string;
}

@Injectable()
export class ValidateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute({ email, password }: ValidateUserRequest) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isPasswordMatched = await compare(password, user.password);

        if (!isPasswordMatched) throw new UnauthorizedException('Invalid credentials');

        return user;
    }
}