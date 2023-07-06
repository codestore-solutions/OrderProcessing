import { Injectable } from "@angular/core";


@Injectable()
export class ResponseModel {
    data: Array<any>;
    message: string;
    statusCode: number;
    success: boolean;
}  