import { User } from "../entities/user.entity";
import { UserRepository } from "./user.repository";

export class UserRepositoryInMemory implements UserRepository {
    findByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    public users: User[] = [];

    async create(user: User): Promise<void> {
        this.users.push(user);
    }
}