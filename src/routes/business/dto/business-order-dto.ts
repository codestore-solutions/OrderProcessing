import { ApiProperty } from '@nestjs/swagger';

class AddressDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    addressLine1: string;

    @ApiProperty()
    addressLine2: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    state: string;

    @ApiProperty()
    postalCode: string;

    @ApiProperty()
    country: string;
}

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
}

export class BusinessOrderDTO {
    @ApiProperty({ type: CustomerDTO })
    customer: CustomerDTO;

    @ApiProperty({ type: AddressDTO })
    address: AddressDTO;

    @ApiProperty({ type: StoreDTO })
    store: StoreDTO;

    @ApiProperty({ type: AgentDTO })
    deliveryAgent: AgentDTO;

    @ApiProperty()
    cartId: string;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    shippingAddressId: number;

    @ApiProperty()
    storeId: number;

    @ApiProperty()
    totalProductCount: number;

    @ApiProperty()
    totalAmount: number;

    @ApiProperty()
    totalDiscount: number;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    paymentMode: string;
}
