import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class PaymentStatusDtoOfOrder {

    @ApiProperty({ description: 'payment id', 
        example: 'xyzWvahhkusskiolui'})
    @IsString()
    paymentId: string;

}