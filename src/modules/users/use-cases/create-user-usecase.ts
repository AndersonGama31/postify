import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../entities/user.entity";
import { hash } from "bcrypt";

interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    job: string;
    avatar: string;
}

@Injectable()
export class CreateUserUseCase {
    constructor(
        private userRepository: UserRepository) { }

    async execute({ name, email, password, job, avatar }: CreateUserRequest): Promise<User> {
        const user = new User({
            name,
            email,
            avatar,
            job,
            password: await hash(password, 10)
        });

        const userAlreadyExists = await this.userRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new BadRequestException('User already exists');
        }

        await this.userRepository.create(user)

        return user;
    }
}