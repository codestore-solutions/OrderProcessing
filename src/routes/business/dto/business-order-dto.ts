import { ApiProperty } from '@nestjs/swagger';


export class BusinessOrderDetailsDTO {
    @ApiProperty()
    id: number;

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
    deliveryId: number;

    @ApiProperty()
    deliveryCharge: number;
}


export class BusinessOrderDTO {

  @ApiProperty({ example: '2023-06-12T11:13:29.000Z', description: 'The creation date of the store' })
  createdAt: string;

  @ApiProperty({ example: 1, description: 'The ID of the order' })
  id: number;

  @ApiProperty({ example: 'credit Card', description: 'The payment mode used by the store' })
  paymentMode: string;

  @ApiProperty({ example: 1, description: 'The ID of the shipping address' })
  shippingAddressId: number;

  @ApiProperty({ example: 4, description: 'The ID of the store' })
  storeId: number;
}


export class orderListDto {
    @ApiProperty({ example: 1 })
    "total": number

    @ApiProperty({ type: BusinessOrderDTO, isArray:true })
    list: BusinessOrderDTO[]
}
