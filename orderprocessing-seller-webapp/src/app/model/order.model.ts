import { Injectable } from "@angular/core";

@Injectable()
export class Order{
    cartId: string;
    count: number;
    customer: {
        username: string,
        persona: string
    };
    payment: {
        amountPaid: number,
        discount: number,
        createdAt: string
    };
    address: {
        street: string,
        city: string,
        postalCode: string,
        state: string,
        country: string
    };
}