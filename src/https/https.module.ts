import { Module } from '@nestjs/common';
import { HttpService } from './https.service';


@Module({
    imports: [],
    providers: [
        HttpService
    ],
    exports: [ HttpService ]
})
export class HttpModule { }
