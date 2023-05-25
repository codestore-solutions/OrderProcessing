import { Injectable } from "@angular/core";

@Injectable()
export class Booking{
    order_ID: number
    customer_ID:number
    order_detail_ID: number
    payment_ID: number
    booking_status: string
    service_method: string
    payment_method: string
}