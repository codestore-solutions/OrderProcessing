import { PartialType } from '@nestjs/mapped-types';
import { OrderDto } from './create-order-details.dto';

export class UpdateOrderDto extends PartialType(OrderDto) {}
