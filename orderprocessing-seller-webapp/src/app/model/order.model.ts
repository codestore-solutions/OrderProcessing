import { Injectable } from "@angular/core";

@Injectable()
export class Order{
    cartId: string;
    totalProductCount: number;
    totalAmount: number;
    totalDiscount:number;
    paymentMode: string;
    createdAt: string
    customer: {
        username: string,
        persona: string
    };
    address: {
        street: string,
        city: string,
        postalCode: string,
        state: string,
        country: string
    };
}