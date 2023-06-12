import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDTO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    productId: string;

    @ApiProperty()
    orderId: string;

    @ApiProperty()
    variantId: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    discount: number;

    @ApiProperty()
    gst: number;
}
