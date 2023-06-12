import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, ValidateNested, IsUUID, IsNumber, Min, MinLength, ValidateIf, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

//example
const orderObject = {
    shippingAddressesId: '4024dd19-e44c-4c13-9757-629ed513d34d',
    customerId: '5',
    paymentId: '9e0e6f33-cd33-45f0-a012-057b1c57816c',
    paymentMode: 'Credit card',
    ordersFromStore: [
        {
            storeId: '5577cf1c-c23c-4f4f-a350-6f39ecd95ef3',
            deliveryCost: 59,
            deliveryEstimatedTime: 10000,
            orderItems: [
                {
                    "productId": "686e34c8-7d1f-42e0-9cb8-564663ae3213",
                    "variantId": "11b38359-4e8b-4f2b-8484-7cb9d932ebdb",
                    "price": 999,
                    "discount": 10,
                    "quantity": 1,
                    "gst": 18
                },
                {
                    "productId": "d6aa7c01-b13d-4a44-8c43-7c8e2f11d864",
                    "variantId": "ffbaa511-191d-4c07-ba02-62ffb14ab7db",
                    "price": 1999,
                    "discount": 0,
                    "quantity": 1,
                    "gst": 18
                }
            ]
        },

        {
            storeId: '2edd3841-c902-43c8-862d-5e98b599d9ce',
            deliveryCost: 159,
            deliveryEstimatedTime: 100000,
            orderItems: [
                {
                    "productId": "4a7033b5-66d9-4f85-858a-ffd9426aa02f",
                    "variantId": "ce8ed04e-eec7-41ab-bc5b-c771e0ff8974",
                    "price": 999,
                    "discount": 10,
                    "quantity": 1,
                    "gst": 18
                },
            ]
        }
    ]
}

export class OrderItemDto {
    @ApiProperty({ example: '686e34c8-7d1f-42e0-9cb8-564663ae3213' })
    @IsNotEmpty()
    @IsUUID()
    productId: string;

    @ApiProperty({ example: '11b38359-4e8b-4f2b-8484-7cb9d932ebdb' })
    @IsNotEmpty()
    @IsUUID()
    variantId: string;

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

class StoreDto {
    @ApiProperty({ example: '5577cf1c-c23c-4f4f-a350-6f39ecd95ef3' })
    @IsNotEmpty()
    @IsUUID()
    storeId: string;

    @ApiProperty({ example: 59 })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    deliveryCost: number;

    @ApiProperty({ type: [OrderItemDto], example: [{ productId: '686e34c8-7d1f-42e0-9cb8-564663ae3213', variantId: '11b38359-4e8b-4f2b-8484-7cb9d932ebdb', price: 999, discount: 10, quantity: 1, gst: 18 }] })
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    orderItems: OrderItemDto[];
}

export class CreateOrderDto {
    @ApiProperty({ example: '4024dd19-e44c-4c13-9757-629ed513d34d' })
    @IsNotEmpty()
    @IsUUID()
    shippingAddressId: string;

    @ApiProperty({ example: '5' })
    @IsNotEmpty()
    @IsUUID()
    customerId: string;

    @ApiProperty({ example: '9e0e6f33-cd33-45f0-a012-057b1c57816c' })
    @IsNotEmpty()
    @IsUUID()
    paymentId: string;

    @ApiProperty({ example: 'Credit card' })
    @IsNotEmpty()
    @MinLength(1)
    paymentMode: string;

    @ApiProperty({ type: [StoreDto], example: [...orderObject.ordersFromStore] })
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => StoreDto)
    ordersFromStore: StoreDto[];
}


