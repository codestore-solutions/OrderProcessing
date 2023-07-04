import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './v1/delivery.controller';
import { deliveryProviders } from './delivery.provider';
import { DataMappingModule } from 'src/data-mapping/data-mapping.module';
import { HttpModule } from 'src/https/https.module';
import { DatabaseModule } from 'src/database/database.module';
import { OrdersModule } from '../orders/orders.module';


@Module({
  imports: [ DatabaseModule, HttpModule, DataMappingModule, OrdersModule],
  controllers: [ DeliveryController ],
  providers: [
    DeliveryService,
    ...deliveryProviders
  ],
})
export class DeliveryModule {}
