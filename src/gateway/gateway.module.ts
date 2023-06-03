import { Module, forwardRef } from '@nestjs/common';
import { NotificationGateway } from './gateway.provider';
import { NotificationServices } from './gateway.services';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from 'src/auth/constants';

@Module({
    imports: [
        JwtModule.register({
            secret: '123',
            signOptions: { expiresIn: '30d' },
        }),
    ],
    providers: [ NotificationGateway, NotificationServices ],
    exports: [NotificationGateway],
})
export class GatewayModule {}
