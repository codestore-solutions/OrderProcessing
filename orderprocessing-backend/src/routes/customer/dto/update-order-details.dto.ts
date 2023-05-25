import { PartialType } from '@nestjs/mapped-types';
import { OrderDto } from './create-order-details.dto';
import { IsIn } from 'class-validator';
import { orderStatus } from 'src/assets/constants';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateOrderDto extends PartialType(OrderDto) { }


export class UpdateOrderStatusDto {

    @ApiProperty({ enum: [...orderStatus] })
    @IsIn([...orderStatus])
    status: string;
}
