import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsOptional, Min, IsInt, IsArray, IsPositive } from 'class-validator';
import { OrderStatusEnum } from 'src/assets/constants';
import { ErrorMessages } from 'src/assets/errorMessages';


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

  @ApiProperty({ example: 'credit Card', description: 'The payment mode used by the store' })
  paymentMode: string;

  @ApiProperty({ example: 1, description: 'The ID of the shipping address' })
  shippingAddressId: number;

  @ApiProperty({ example: 4, description: 'The ID of the store' })
  storeId: number;
}


export class orderListDto {
  @ApiProperty({ example: 1 })
  "total": number

  @ApiProperty({ type: BusinessOrderDTO, isArray: true })
  list: BusinessOrderDTO[]
}


export class GetOrdersQuery {
  @Transform(({ value }) => transformId(value))
  @IsArray()
  @ApiProperty({ type: [Number], })
  storeIds: number[];

  @IsEnum(OrderStatusEnum)
  orderStatus: string;

  @Transform(({ value }) => transformToInt(value))
  @ApiPropertyOptional()
  @IsOptional()
  @ApiProperty({ type: Number })
  page?: number;

  @Transform(({ value }) => transformToInt(value))
  @ApiPropertyOptional()
  @IsOptional()
  @ApiProperty({ type: Number, })
  pageSize?: number;
}

function transformId(value: any): number[] {
  const parsedValues = [];
  for (const ele of value) {
    const parsedValue = parseInt(ele, 10);
    if (isNaN(parsedValue)) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ErrorMessages.INVALID_VALUE.message,
        code: ErrorMessages.INVALID_VALUE.code,
      }, HttpStatus.BAD_REQUEST);
    }
    parsedValues.push(parsedValue)
  }
  return parsedValues;
}


function transformToInt(value: any): number {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw new HttpException(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: ErrorMessages.INVALID_VALUE.message,
        code: ErrorMessages.INVALID_VALUE.code,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
  console.log(typeof parsedValue)
  return parsedValue;
}