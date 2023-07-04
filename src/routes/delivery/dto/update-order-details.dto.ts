import { sellerOrderState } from 'src/assets/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
export class sellerUpdateOrderStatusDto {

    @ApiProperty({ example: 'processing', description: 'New status for the order', enum: [...sellerOrderState] })
    @IsIn([...sellerOrderState], { message: 'Invalid status. Only "processing" and "shipping" are allowed.' })
    status: string;
}
