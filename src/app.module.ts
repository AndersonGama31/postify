import { Module } from '@nestjs/common';
import { UsersModule } from './infra/http/modules/users/users.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
    imports: [DatabaseModule, UsersModule],
})
export class AppModule { }
