import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { constants } from '../assets/constants';

@Injectable()
export class LocalAuthGuard extends AuthGuard(constants.LOCAL_GUARD) {}