import { User as UserRaw } from '@prisma/client';
import { User } from 'src/modules/users/entities/user.entity';

export class PrismaUserMapper {
    static toPrisma({ createdAt, email, name, password, id, avatar, job }: User): UserRaw {
        return {
            createdAt,
            email,
            name,
            password,
            avatar,
            job,
            id,
        };
    }

    static toDomain({ createdAt, email, name, password, id, avatar, job }: UserRaw): User {
        return new User({
            createdAt,
            email,
            name,
            password,
            avatar,
            job
        }, id);
    }
}