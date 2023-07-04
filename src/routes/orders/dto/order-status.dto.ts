import { IsOptional, IsString, IsArray, IsNumber, IsISO8601, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatusEnum } from 'src/assets/constants';


export class OrderDto {

  @ApiProperty({ description: 'Order ID', example: 1 })
  @IsNumber()
  orderId: number;
}


class CreateOrderStatusDto {

  @ApiProperty({ enum: OrderStatusEnum, example: OrderStatusEnum.AGENT_ASSIGNED })
  @IsNumber()
  status: OrderStatusEnum;

  @ApiProperty({ description: 'list of order ids', example: [1, 2] })
  @IsArray()
  orders: number[];
}


export class AssigningStatusDto {
  @ApiProperty({ description: 'order id', example: 1 })
  @IsInt()
  orderId: number;

  @ApiProperty({ description: 'agent id', example: 1 })
  @IsInt()
  deliveryAgentId: number
}

export class OrderAssigningStatusDto {
  @IsInt()
  @ApiProperty({ description: 'order status id', example: 5 })
  orderStatus: number;

  @IsArray()
  @ApiProperty({ description: 'order with assigned agent', example: [{ orderId: 39, deliveryAgentId: 401}] })
  orders: AssigningStatusDto[]
}


export class OrderStatusTimelineDTO {

  @ApiProperty({ example: 'pending', description: 'Order status event type' })
  event_type: string;
}


export { CreateOrderStatusDto };