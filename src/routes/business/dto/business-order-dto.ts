import { ApiProperty } from '@nestjs/swagger';


class StoreAddressDTO {
    @ApiProperty()
    street: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    state: string;

    @ApiProperty()
    country: string;

    @ApiProperty()
    pincode: string;

    @ApiProperty()
    landmark: string;
}

class StoreDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    sellerId: number;

    @ApiProperty()
    businessId: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty({ type: StoreAddressDTO })
    address: StoreAddressDTO;
}

class CustomerDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty({ type: [String] })
    contacts: string[];
}


class AgentDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty({ type: [String] })
    contacts: string[];

    @ApiProperty()
    address: string;

    @ApiProperty()
    businessAdminId: string;
}


export class BusinessOrderDTO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    orderInstanceId: string;

    @ApiProperty()
    product_count: number;

    @ApiProperty()
    customerId: string;

    @ApiProperty()
    storeId: string;

    @ApiProperty({ type: CustomerDTO })
    customer: CustomerDTO;

    @ApiProperty({ type: StoreDTO })
    store: StoreDTO;

    @ApiProperty()
    variantId: string;

    @ApiProperty()
    shippingAddressId: string;

    @ApiProperty()
    paymentId: string;

    @ApiProperty()
    paymentStatus: string;

    @ApiProperty()
    paymentMode: string;

    @ApiProperty()
    orderStatus: string;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    createdBy: string;

    @ApiProperty()
    updatedAt: string;

    @ApiProperty({ type: AgentDTO })
    deliveryAgent: AgentDTO;

    @ApiProperty()
    deliveryId: string;

    @ApiProperty()
    deliveryCharge: number;
}


export class orderDto {
    @ApiProperty()
    "total": number

    @ApiProperty({ type: BusinessOrderDTO, isArray:true })
    list: BusinessOrderDTO[]
}