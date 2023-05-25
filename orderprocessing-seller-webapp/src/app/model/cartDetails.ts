import { Injectable } from "@angular/core";

@Injectable()
export class CartDetails{
    id: string;
    cartId: string;
    status: string;
    paymentMode: string;
    createdAt: string;
    updatedAt: string;
    quantity: number;
    customer: {
        username: string,
        persona: string
    };
    product: {
        name: string,
        description: string,
        price: number,
        createdAt: string
    };
    productAttribute : {
        value: string,
        updatedAt: string,
        attribute: {
            name: string
        }
    };
    address : {
        street: string,
        city: string,
        postalCode: string,
        state: string,
        country: string
    }
}