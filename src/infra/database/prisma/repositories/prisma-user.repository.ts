import { Injectable } from '@nestjs/common';
import { User } from '../../../../modules/users/entities/user.entity';
import { UserRepository } from '../../../../modules/users/repositories/user.repository'
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private prisma: PrismaService) { }

    async create(user: User): Promise<void> {
        await this.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                avatar: user.avatar,
                job: user.job
            }
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return null
        }

        return PrismaUserMapper.toDomain(user);
    }
}