import { User } from "../entities/user.entity";
import { UserRepository } from "./user.repository";

export class Database implements UserRepository {
    findByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    create(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
}