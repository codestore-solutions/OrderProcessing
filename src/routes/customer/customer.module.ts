import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './v1/customer.controller';
import { customerProviders } from './customer.provider';
import { HttpModule } from 'src/https/https.module';
import { DatabaseModule } from 'src/database/database.module';
import { OrdersModule } from '../orders/orders.module';
import { DataMappingModule } from 'src/data-mapping/data-mapping.module';


@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    DatabaseModule, DataMappingModule,
    HttpModule, OrdersModule
  ],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    ...customerProviders
  ],
})
export class CustomerModule { }
