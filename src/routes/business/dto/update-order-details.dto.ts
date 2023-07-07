import { orderStatus, sellerOrderState } from 'src/assets/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';


// export class UpdateOrderDto extends PartialType(OrderDto) {}

export class sellerUpdateOrderStatusDto {

    @ApiProperty({ example: 'processing', description: 'New status for the order', enum: [...sellerOrderState] })
    @IsIn([...sellerOrderState], { message: 'Invalid status. Only "processing" and "shipping" are allowed.' })
    status: string;
}


export class OrderStatusDto {

    @ApiProperty({ enum: [...orderStatus] })
    @IsIn([...orderStatus])
    status: string;
}