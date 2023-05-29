import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { customerProviders } from './customer.provider';
import { GatewayModule } from 'src/gateway/gateway.module';


@Module({
  imports: [
    GatewayModule
  ],
  controllers: [ CustomerController ],
  providers: [
    CustomerService,
    ...customerProviders
  ],
})
export class CustomerModule {}
