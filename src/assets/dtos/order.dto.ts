import { ApiProperty } from '@nestjs/swagger';


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

    @ApiProperty()
    deliveryId: string;

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
}