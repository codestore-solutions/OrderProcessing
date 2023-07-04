import { Module } from '@nestjs/common';
import { BusinessService,} from './business.service';
import { businessProviders } from './business.provider';
import { BusinessController } from './v1/business.controller';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from 'src/https/https.module';
import { DataMappingModule } from 'src/data-mapping/data-mapping.module';


@Module({
  imports: [ DatabaseModule, HttpModule, DataMappingModule ],
  controllers: [ BusinessController ],
  providers: [
    BusinessService,
    ...businessProviders
  ],
})
export class BusinesModule {}
