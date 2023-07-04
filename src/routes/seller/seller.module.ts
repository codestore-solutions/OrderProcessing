import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './v1/seller.controller';
import { sellerProviders } from './seller.provider';
import { DatabaseModule } from 'src/database/database.module';
import { DataMappingModule } from 'src/data-mapping/data-mapping.module';
import { HttpModule } from 'src/https/https.module';
import { OrdersModule } from '../orders/orders.module';


@Module({
  imports: [ DatabaseModule, DataMappingModule, 
    HttpModule, OrdersModule ],
  controllers: [ SellerController ],
  providers: [
    SellerService,
    ...sellerProviders
  ],
})
export class SellerModule {}
