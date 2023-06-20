import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './v1/customer.controller';
import { customerProviders } from './customer.provider';
import { GatewayModule } from 'src/gateway/gateway.module';
import { HttpModule } from 'src/https/https.module';


@Module({
  imports: [
    GatewayModule,
    HttpModule
  ],
  controllers: [ CustomerController ],
  providers: [
    CustomerService,
    ...customerProviders
  ],
})
export class CustomerModule {}
