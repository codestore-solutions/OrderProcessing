import { Module } from '@nestjs/common';
import { OrderController } from './v1/orders.controller';
import { OrderService } from './orders.service';
import { orderProviders } from './orders.provider';
import { DatabaseModule } from 'src/database/database.module';


@Module({
    imports: [DatabaseModule],
    controllers: [OrderController],
    providers: [ OrderService, ...orderProviders ],
    exports: [OrderService]
})
export class OrdersModule { }
