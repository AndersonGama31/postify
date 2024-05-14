import { User } from "src/modules/users/entities/user.entity";

export class UserViewModel {
    static toHttp({
        id,
        name,
        createdAt,
        email
    }: User) {
        return {
            createdAt,
            email,
            id,
            name
        }
    }
}