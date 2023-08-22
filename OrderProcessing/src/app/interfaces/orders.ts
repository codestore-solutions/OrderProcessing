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
    data:{
        id:number;
        deliveryAgentId: number | null;
        orderStatus: number;
        paymentId: number | string | null;
        paymentMode: number;
        paymentStatus:number;
        productCount: number;
        deliveryCharges: number;
        createdAt:string;
        customer:{
            id:number;
            name:string;
            email:string;
        };
        vendor:{
            id: number;
            profile_picture: string | null;
            first_name: string;
            last_name: string;
            email: string;
            phone_number: string;
            business_admin_id: number;
            status: string;
            created_at: string;
            updated_at: string;
            business: {
                id: number;
                name: string;
                description: string;
                address_id: number;
                vendor_id: number;
                status: string;
                created_at: string;
                updated_at: string;
                category_id: number;
                category: {
                    category_id: number;
                    name: string;
                    description: string;
                    created_at: string;
                    updated_at: string;
                    status: string;
                },
                address: {
                    id: number;
                    landmark: string;
                    street: string;
                    city: string;
                    state: string;
                    postalCode: string;
                    country: string;
                    latitude: number;
                    longitude: number;
                    createdAt: string;
                    updatedAt: string;
                }
            }
        };
        shippingAddress:{
            id: number;
            userId: number;
            street: string;
            city: string;
            state: string;
            country: string;
            countryCode: string;
            postalCode: string;
            phoneNumber: string;
            alternateNumber?: string | null;
            addressType: number;
            latitude: number;
            longitude: number;
        };
        deliveryAgent?:{
            id: number;
            agentId: number;
            fullName: string;
            countryCode: string;
            phoneNumber: string;
            email: string;
            gender: string;
            dateOfBirth: string;
            address: string;
            profileImage: string;
            isProfileCompleted: boolean;
            createdOn: string;
            updatedOn: string;
            agentStatus: number;
            verificationStatus: number;
            bankDetails:{
                id: number;
                agentDetailId: number;
                accountHolderName: string;
                bankName: string;
                ifscCode: string;
                accountNumber: string;
                createdOn: string;
                updatedOn: string;
                agentDetail: null | string;
            };
            vehicleDetails:{
                id: number;
                agentDetailId: number;
                vehicleType: number;
                vehicleModel: string;
                company: string;
                manufacturedYear: string;
                vehicleImage: string;
                registrationNumber: string;
                createdOn: string;
                updatedOn: string;
                agentDetails: null | string;
            };
            kyCs?:[];
            serviceLocations?:[];
            lazyLoader?:{};
        };
    }
    statusCode: number;
    success: boolean;
    message: string;
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