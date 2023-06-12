import { Module } from '@nestjs/common';
import { OrderController } from './v1/orders.controller';
import { OrderService } from './orders.service';
import { orderProviders } from './orders.provider';


@Module({
    imports: [],
    controllers: [OrderController],
    providers: [ OrderService, ...orderProviders ],
})
export class OrdersModule { }
