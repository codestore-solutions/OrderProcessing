import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Min, IsOptional } from 'class-validator';
import { transformPaginationValueToInt } from 'src/utils';

export class PaginationDto {

    @Transform(({ value }) =>  transformPaginationValueToInt(value, 'page'))
    @ApiPropertyOptional()
    @IsOptional()
    @ApiProperty({ type: Number, example: 1 })
    page?: number;
  
    @Transform(({ value }) =>  transformPaginationValueToInt(value, 'pageSize'))
    @ApiPropertyOptional()
    @IsOptional()
    @ApiProperty({ type: Number,  example: 10 })
    pageSize?: number;
}
