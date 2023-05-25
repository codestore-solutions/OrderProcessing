import { ApiProperty } from '@nestjs/swagger';
import { PaymentMode } from 'src/assets/constants';
import { IsNotEmpty, IsUUID, IsEnum, IsOptional, Min } from 'class-validator';


export class OrderDto {

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    productId: string;
  
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    storeId: string;

  
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    specificationId: string;
  
    @Min(1)
    @ApiProperty()
    quantity: number;
}


export class OrderBodyDto {
    @ApiProperty({ type: () => OrderDto, isArray:true })
    orders: OrderDto[];

    @IsUUID()
    @IsOptional()
    @ApiProperty()
    paymentId?: string;
  
    @IsEnum(PaymentMode)
    @IsNotEmpty()
    @ApiProperty({ enum: Object.keys(PaymentMode).map((key) => PaymentMode[key]) })
    paymentMode: PaymentMode;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    userId: string;
  
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    shippingAddressId: string;
}

// [
//     {
//         "productId": "fcbabb2b-5d5b-4733-b9f8-777ef267240a",
//         "storeId": "642352d6-ccdd-4add-8ec8-594d4b4470c9",
//         "userId": "552bc7d3-66cc-4a14-bf77-7193af1bb4bc",
//         "shippingAddressId": "4590cdbf-3c48-4132-b13a-54e447d542f5",
//         "specificationId": "2bf627c2-592b-4f23-8aa3-7fc487206d8e",
//         "paymentId": "ba2bea24-9530-48ba-b214-ffc290d4b512",
//         "paymentMode": 1,
//         "quantity": 2,
//         "createdAt": "timestamp",
//     }
// ]