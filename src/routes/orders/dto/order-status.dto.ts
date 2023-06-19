import { IsOptional, IsString, IsArray, IsNumber, IsISO8601 } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatusEnum } from 'src/assets/constants';



export class OrderDto {

    @ApiProperty({ description: 'Order ID', example: 1 })
    @IsNumber()
    orderId: number;
}


class CreateOrderStatusDto {
    @ApiPropertyOptional({ description: 'Agent ID', example: [ 1, 2 ] })
    @IsOptional()
    @IsArray()
    agentId?: number[];

    @ApiProperty({ enum: OrderStatusEnum, example: OrderStatusEnum.AgentAssigned })
    @IsString()
    status: OrderStatusEnum;

    @ApiProperty({ description: 'Timestamp', example: '2020-07-10 15:00:00.000' })
    @IsString()
    @IsISO8601({ strict: true })
    timestamp: string;

    @ApiProperty({ description: 'list of order ids', example: [1,2] })
    @IsArray()
    orders: number[];
}


export class OrderStatusTimelineDTO {

  @ApiProperty({ example: 'pending', description: 'Order status event type' })
  event_type: string;
}


export { CreateOrderStatusDto };