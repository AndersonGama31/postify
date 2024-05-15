import { Module } from '@nestjs/common';
import { UsersModule } from './infra/http/modules/users/users.module';
import { DatabaseModule } from './infra/database/database.module';
import { AuthModule } from './infra/http/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { PostModule } from './infra/http/modules/post/post.module';

@Module({
    imports: [DatabaseModule, UsersModule, AuthModule, PostModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        }
    ]
})
export class AppModule { }
