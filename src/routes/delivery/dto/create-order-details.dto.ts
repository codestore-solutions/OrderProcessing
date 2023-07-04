import { ApiProperty } from '@nestjs/swagger';
import { transformArrayToIntArray, transformPaginationValueToInt } from 'src/utils';
import { Transform } from 'class-transformer';


export class GetDeliveryAgentOrdersQuery {
  
    @Transform(({ value }) => transformArrayToIntArray(value, 'order status'))
    orderStatus: number[];
  
    @Transform(({ value }) => transformPaginationValueToInt(value, 'page'))
    @ApiProperty({ type: Number })
    page: number;
  
    @Transform(({ value }) => transformPaginationValueToInt(value, 'pagesize'))
    @ApiProperty({ type: Number, })
    pageSize: number;
}