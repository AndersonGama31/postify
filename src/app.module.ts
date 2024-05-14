import { Module } from '@nestjs/common';
import { UsersModule } from './infra/http/modules/users/users.module';
import { DatabaseModule } from './infra/database/database.module';
import { AuthModule } from './infra/http/modules/auth/auth.module';

@Module({
    imports: [DatabaseModule, UsersModule, AuthModule],
})
export class AppModule { }
