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
}


export class OrderDTO {
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
    deliveryId: AgentDTO;

    @ApiProperty()
    deliveryAgentId: string;

    @ApiProperty()
    deliveryCharge: number;
}


export class OrderDBDto {

  orderInstanceId: string;

  product_count: number;

  customerId: string;

  storeId: string;

  shippingAddressId: string;

  paymentId?: string;

  paymentStatus?: string;

  paymentMode: string;

  orderStatus?: string;

  createdAt?: string;

  createdBy: string;

  updatedAt?: string;

  deliveryId?: string;

  deliveryMode?: string;

  deliveryCharge?: number;

  deliveryEstimatedTime?: number;
}