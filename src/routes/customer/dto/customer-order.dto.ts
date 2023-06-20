import { ApiProperty } from "@nestjs/swagger";


export class CustomerOrderDTO {

    @ApiProperty({
        example: '2023-06-12T11:13:29.000Z',
        description: 'The creation date of the store'
    })
    createdAt: string;

    @ApiProperty({
        example: 1,
        description: 'The ID of the order'
    })
    id: number;

    @ApiProperty({
        example: 'credit card',
        description: 'The payment mode used by the customer'
    })
    paymentMode: string;

    @ApiProperty({ example: 1, description: 'The ID of the shipping address' })
    shippingAddressId: number;

    @ApiProperty({ example: 4, description: 'The ID of the store' })
    storeId: number;

    @ApiProperty({ example: 1, description: 'The ID of the delivery agent' })
    deliveryId: number
}


export class CustomerOrderListDto {
    @ApiProperty({ example: 1 })
    total: number

    @ApiProperty({ type: CustomerOrderDTO, isArray: true })
    data: CustomerOrderDTO[]
}
