import {
    BadRequestException,
    Injectable,
    NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { SignInDTO } from '../dto/sigin.dto';

@Injectable()
export class SignInDTOValidateMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const body = req.body;

        console.log('body', body)

        const signInBody = new SignInDTO();
        signInBody.email = body.email;
        signInBody.password = body.password;

        const validations = await validate(signInBody);

        if (validations.length) {
            throw new BadRequestException(validations);
        }

        next();
    }
}