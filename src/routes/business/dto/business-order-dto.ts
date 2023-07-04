import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsOptional, Min, IsInt, IsArray, IsPositive } from 'class-validator';
import { ErrorMessages } from 'src/assets/errorMessages';
import { transformArrayToIntArray, transformPaginationValueToInt } from 'src/utils';
import { BusinessOrderResponseDTO } from './response.dto';


export class BusinessOrderDetailsDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  product_count: number;

  @ApiProperty()
  customerId: number;

  @ApiProperty()
  storeId: number;

  @ApiProperty()
  shippingAddressId: number;

  @ApiProperty()
  paymentId: number;

  @ApiProperty()
  paymentStatus: string;

  @ApiProperty()
  paymentMode: string;

  @ApiProperty()
  orderStatus: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  deliveryId: number;

  @ApiProperty()
  deliveryCharge: number;
}


export class BusinessOrderDTO {

  @ApiProperty({ example: '2023-06-12T11:13:29.000Z', description: 'The creation date of the store' })
  createdAt: string;

  @ApiProperty({ example: 1, description: 'The ID of the order' })
  id: number;

  @ApiProperty({ example: 'credit Card', description: 'The payment mode used by the customer' })
  paymentMode: string;

  @ApiProperty({ example: 1, description: 'The ID of the shipping address' })
  shippingAddressId: number;

  @ApiProperty({ example: 4, description: 'The ID of the store' })
  storeId: number;

  @ApiProperty({ example: 1, description: 'The ID of the delivery agent' })
  deliveryId: number
}


export class OrderListDto {
  @ApiProperty({ example: 1 })
  "total": number

  @ApiProperty({ type: BusinessOrderResponseDTO, isArray: true })
  list: BusinessOrderResponseDTO[]
}


export class GetOrdersQuery {
  @Transform(({ value }) => transformArrayToIntArray(value, 'store id'))
  // @IsArray()
  @ApiProperty({ type: [Number], })
  vendorIds: number[];

  // @IsArray()
  @Transform(({ value }) => transformArrayToIntArray(value, 'order status'))
  orderStatus: number[];

  @Transform(({ value }) => transformPaginationValueToInt(value, 'page'))
  @ApiPropertyOptional()
  @IsOptional()
  @ApiProperty({ type: Number })
  page?: number;

  @Transform(({ value }) => transformPaginationValueToInt(value, 'pagesize'))
  @ApiPropertyOptional()
  @IsOptional()
  @ApiProperty({ type: Number, })
  pageSize?: number;
}

