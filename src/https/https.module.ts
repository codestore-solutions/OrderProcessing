import { Module } from '@nestjs/common';
import { HttpService } from './https.service';
import { DataManagementService } from './microservices';


@Module({
    imports: [],
    providers: [
        HttpService,
        DataManagementService
    ],
    exports: [ HttpService, DataManagementService ]
})
export class HttpModule { }
