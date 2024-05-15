import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/modules/users/repositories/user.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user.repository';
import { PostRepository } from 'src/modules/posts/repositories/post.repository';

@Module({
    providers: [PrismaService,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository
        },
        {
            provide: PostRepository,
            useClass: PrismaUserRepository
        }
    ],
    exports: [UserRepository, PostRepository],
})
export class DatabaseModule { }
