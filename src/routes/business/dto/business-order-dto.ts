import { ApiProperty } from '@nestjs/swagger';


export class BusinessOrderDetailsDTO {
    @ApiProperty()
    id: string;

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
    deliveryId: string;

    @ApiProperty()
    deliveryCharge: number;
}


export class BusinessOrderDTO {
  @ApiProperty({ example: 'Tech Bazaar', description: 'The name of the store' })
  storeName: string;

  @ApiProperty({ example: '2023-06-12T11:13:29.000Z', description: 'The creation date of the store' })
  createdAt: string;

  @ApiProperty({ example: '8b0802aa-cacf-40af-8c3a-290f6dd27741', description: 'The ID of the store' })
  id: string;

  @ApiProperty({ example: 'credit Card', description: 'The payment mode used by the store' })
  paymentMode: string;

  @ApiProperty({ example: '4024dd19-e44c-4c13-9757-629ed513d34d', description: 'The ID of the shipping address' })
  shippingAddressId: string;

  @ApiProperty({ example: '4', description: 'The ID of the store' })
  storeId: string;
}


export class orderListDto {
    @ApiProperty({ example: 1 })
    "total": number

    @ApiProperty({ type: BusinessOrderDTO, isArray:true })
    list: BusinessOrderDTO[]
}
