import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { transformPaginationValueToInt } from 'src/utils';

export class PaginationDto {

    @Transform(({ value }) =>  transformPaginationValueToInt(value, 'page'))
    @ApiProperty({ type: Number, example: 1 })
    page: number;
  
    @Transform(({ value }) =>  transformPaginationValueToInt(value, 'pageSize'))
    @ApiProperty({ type: Number,  example: 10 })
    pageSize: number;
}
