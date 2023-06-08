import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './v1/seller.controller';
import { sellerProviders } from './seller.provider';


@Module({
  imports: [],
  controllers: [ SellerController ],
  providers: [
    SellerService,
    ...sellerProviders
  ],
})
export class SellerModule {}
