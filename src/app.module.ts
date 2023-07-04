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
import { BusinesModule } from './routes/business/business.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './routes/orders/orders.module';
import { SeedService } from './seed/seed.service';
import { ServiceBusModule } from './queue/service-bus.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `environments/${process.env.RUNNING_ENV}.env`
    }),
    DatabaseModule,
    ServiceBusModule,
    SellerModule,
    CustomerModule,
    DeliveryModule,
    OrdersModule,
    GatewayModule,
    UserModule,
    BusinesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule { }
