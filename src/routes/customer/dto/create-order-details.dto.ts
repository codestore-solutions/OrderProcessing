import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, ValidateNested, 
    IsNumber, Min, MinLength, IsOptional, IsIn, } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMode } from 'src/assets/constants';

export class CreateOrderResposeDto {
    @ApiProperty()
    clientSecret: string
} 

//example
const orderObject = {
    shippingAddressesId: 1,
    customerId: 5,
    paymentMode: PaymentMode.ONLINE,
    ordersFromStore: [
        {
            storeId: 3,
            deliveryCost: 59,
            orderItems: [
                {
                    "productId": 1,
                    "variantId": 2,
                    "price": 999,
                    "discount": 10,
                    "quantity": 1,
                    "gst": 18
                },
                {
                    "productId": 2,
                    "variantId": 3,
                    "price": 1999,
                    "discount": 0,
                    "quantity": 1,
                    "gst": 18
                }
            ]
        },

        {
            storeId: 4,
            deliveryCost: 159,
            orderItems: [
                {
                    "productId": 3,
                    "variantId": 4,
                    "price": 999,
                    "discount": 10,
                    "quantity": 1,
                    "gst": 18
                },
            ]
        }
    ]
}

export class StoreOrderItemDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    variantId: number;

    @ApiProperty({ example: 999 })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ example: 10 })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    discount: number;
    
    @ApiProperty({ example: 10 })
    @IsOptional()
    @IsNumber()
    @Min(0)
    gst: number;

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;
}

export class StoreDto {
    @ApiProperty({ example: 3 })
    @IsNotEmpty()
    @IsNumber()
    storeId: number;

    @ApiProperty({ example: 59 })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    deliveryCost: number;

    @ApiProperty({ type: [StoreOrderItemDto], example: [{ productId: 1, variantId: 2, 
        price: 999, discount: 10, quantity: 1, gst: 18 }] })
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => StoreOrderItemDto)
    orderItems: StoreOrderItemDto[];
}

export class CreateOrderDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    shippingAddressId: number;

    @ApiProperty({ example: 5 })
    @IsNotEmpty()
    @IsNumber()
    customerId: number;

    @ApiProperty({ example: 'online' })
    @IsNotEmpty()
    paymentMode: string;


    @ApiProperty({ type: [StoreDto], example: [...orderObject.ordersFromStore] })
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => StoreDto)
    ordersFromStore: StoreDto[];
}


