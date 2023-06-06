import { Module } from '@nestjs/common';
import { BusinessService,} from './business.service';
import { businessProviders } from './business.provider';
import { BusinessController } from './business.controller';


@Module({
  imports: [],
  controllers: [ BusinessController ],
  providers: [
    BusinessService,
    ...businessProviders
  ],
})
export class BusinesModule {}
