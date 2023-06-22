import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ErrorMessages } from '../assets/errorMessages';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(req: any, username: string, password: string ) {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new HttpException({
        statusCode: HttpStatus.UNAUTHORIZED,
			  message: ErrorMessages.INVALID_USERNAME_OR_PASSWORD.message,
				success: false
      }, HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}