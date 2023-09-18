import { ApiProperty } from '@nestjs/swagger';


export class OrderDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    orderInstanceId: string;

    @ApiProperty()
    product_count: number;

    @ApiProperty()
    customerId: number;

    @ApiProperty()
    storeId: number;

    @ApiProperty()
    shippingAddressId: number;

    @ApiProperty()
    paymentId: number;

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
    deliveryId:  number;

    @ApiProperty()
    deliveryCharge: number;

    // @ApiProperty()
    // orderItems:any;
}


export class OrderDBDto {

  orderInstanceId: string;

  product_count: number;

  customerId: number;

  storeId: number;

  shippingAddressId: number;

  paymentId?: string;

  paymentStatus?: string;

  paymentMode: string;

  orderStatus?: string;

  createdAt?: string;

  createdBy: string;

  updatedAt?: string;

  deliveryId?: number;

  deliveryMode?: string;

  deliveryCharge?: number;

  // orderItems: any;
}