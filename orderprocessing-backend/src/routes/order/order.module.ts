import { Module } from '@nestjs/common';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';
import { orderProviders } from './order.provider';

@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    ...orderProviders
  ],
})
export class OrdersModule {}
