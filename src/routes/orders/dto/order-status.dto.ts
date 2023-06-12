import { IsOptional, IsString, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatusEnum } from 'src/assets/constants';



export class OrderDto {
    @ApiProperty({ description: 'Timestamp', example: '01918' })
    @IsString()
    timestamp: string;

    @ApiProperty({ description: 'Order ID', example: '122337' })
    @IsString()
    orderId: string;
}


class CreateOrderStatusDto {
    @ApiPropertyOptional({ description: 'Agent ID', example: '123' })
    @IsOptional()
    @IsString()
    agentId?: string;

    @ApiProperty({ enum: OrderStatusEnum, example: OrderStatusEnum.Pending })
    @IsString()
    status: OrderStatusEnum;

    @ApiProperty({ type: [OrderDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderDto)
    orders: OrderDto[];
}


export class OrderStatusTimelineDTO {

  @ApiProperty({ example: 'pending', description: 'Order status event type' })
  event_type: string;

  @ApiProperty({ example: '2023-06-12T10:30:00.000Z', description: 'Timestamp of the order status event' })
  timestamp: Date;
}


export { CreateOrderStatusDto };