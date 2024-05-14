import { User as UserRaw } from '@prisma/client';
import { User } from 'src/modules/users/entities/user.entity';

export class PrismaUserMapper {
    static toPrisma({ createdAt, email, name, password, id }: User): UserRaw {
        return {
            createdAt,
            email,
            name,
            password,
            id,
        };
    }
}