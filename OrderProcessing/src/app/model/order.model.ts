import { Injectable } from "@angular/core";

interface OrderList {
    createdAt: string,
    customer: {
        id: number,
        name: string,
        email: string
    },
    deliveryCharges: number,
    orderStatus: number,
    paymentId: number,
    paymentMode: number,
    paymentStatus: number,
    productCount: number,
    shippingAddress: object
}

@Injectable()
export class Order {
    data: {
        list: OrderList[],
        total: number
    };
    message: string;
    statusCode: number;
    success: boolean;
}  