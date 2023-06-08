import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDTO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    variantId: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    discount: number;

    @ApiProperty()
    gst: number;
}
