import { Module } from '@nestjs/common';
import { DataMappingService } from './data-mapping.service';


@Module({
    imports: [],
    providers: [
        DataMappingService
    ],
    exports: [ DataMappingService ]
})
export class DataMappingModule { }
