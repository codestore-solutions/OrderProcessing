import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './v1/user.controller';
import { userProviders } from './user.provider';


@Module({
  imports: [],
  controllers: [ UserController ],
  providers: [
    UserService,
    ...userProviders
  ],
})
export class UserModule {}
