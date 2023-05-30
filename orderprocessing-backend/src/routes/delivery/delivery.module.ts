import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { deliveryProviders } from './delivery.provider';


@Module({
  imports: [],
  controllers: [ DeliveryController ],
  providers: [
    DeliveryService,
    ...deliveryProviders
  ],
})
export class DeliveryModule {}
