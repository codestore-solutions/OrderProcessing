import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    productId: number;

    @ApiProperty()
    orderId: number;

    @ApiProperty()
    variantId: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    discount: number;

    @ApiProperty()
    gst: number;
}
