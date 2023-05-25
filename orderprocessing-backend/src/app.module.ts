import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { SellerModule } from './routes/seller/seller.module';
import { CustomerModule } from './routes/customer/customer.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `environments/${process.env.RUNNING_ENV}.env`
    }),
    DatabaseModule,
    SellerModule,
    CustomerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
