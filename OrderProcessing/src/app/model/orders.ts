export interface Orders {
    data: {
        list: {
            id: number;
            deliveryAgentId: null | number;
            paymentId: number | null;
            orderStatus: number;
            paymentMode: number;
            productCount: number;
            deliveryCharges: number;
            createdAt: string;
            paymentStatus: number;
            customer:{
                id:number;
                name:string;
                email:string;
            };
            shippingAddress:{
                id:number;
                userId:number;
                street:string;
                city:string;
                state:string;
                country:string;
                countryCode:string;
                postalCode:string;
                phoneNumber:string;
                alternateNumber:string | null;
                addressType:number;
                longitude:number;
                latitude:number;
            };
        }[];
        totalOrders: number;
    };
    statusCode: number;
    success: boolean;
    message: string;
}

export interface OrderDetails{
    
}

export interface OrderStatuses{
    data:{
        id: number;
        name: string;
    }[];
    statusCode: number;
    success: boolean;
    message: string;
}