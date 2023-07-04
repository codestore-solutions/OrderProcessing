import { Module } from '@nestjs/common';
import { ServiceBusService } from './service-bus.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [ServiceBusService],
    exports: [ServiceBusService],
})
export class ServiceBusModule { }
