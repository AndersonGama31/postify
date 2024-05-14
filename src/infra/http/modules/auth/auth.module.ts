import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { ValidateUserUseCase } from 'src/modules/auth/use-cases/validate-user-use-case';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { SignInDTOValidateMiddleware } from './middlewares/signin-validate.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [UsersModule, DatabaseModule, JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
    })],
    controllers: [AuthController],
    providers: [LocalStrategy, ValidateUserUseCase],
})
export class AuthModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SignInDTOValidateMiddleware).forRoutes('auth');
    }
}