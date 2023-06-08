import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { JsonWebTokenError } from 'jsonwebtoken';
import { ErrorMessages } from '../assets/errorMessages';

@Injectable()
export class JwtAuthGuard extends AuthGuard(jwtConstants.guardKey) {
    handleRequest(err: any, user: any, info: any, context: any, status?: any) {
        if(info instanceof JsonWebTokenError) {
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                message: ErrorMessages.SESSION_EXPIRED.message,
				code: ErrorMessages.SESSION_EXPIRED.code,
              }, HttpStatus.UNAUTHORIZED);
        }

        return super.handleRequest(err, user, info, context, status);
    }
}
