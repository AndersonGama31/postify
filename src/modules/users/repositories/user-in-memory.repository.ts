import { User } from "../entities/user.entity";
import { UserRepository } from "./user.repository";

export class UserRepositoryInMemory implements UserRepository {
    public users: User[] = [];
    async findByEmail(email: string): Promise<any> {
        this.users.find(user => user.email === email);
    }

    async create(user: User): Promise<void> {
        this.users.push(user);
    }
}