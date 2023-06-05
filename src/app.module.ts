import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { SellerModule } from './routes/seller/seller.module';
import { CustomerModule } from './routes/customer/customer.module';
import { GatewayModule } from './gateway/gateway.module';
import { DeliveryModule } from './routes/delivery/delivery.module';
import { UserModule } from './routes/user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `environment1s/${process.env.RUNNING_ENV}.env`
    }),
    DatabaseModule,
    SellerModule,
    CustomerModule,
    DeliveryModule,
    GatewayModule,
    UserModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
