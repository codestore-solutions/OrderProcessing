import { IsIn } from 'class-validator';
import { orderStatus } from 'src/assets/constants';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateOrderStatusDto {

    @ApiProperty({ enum: [...orderStatus] })
    @IsIn([...orderStatus])
    status: string;
}
