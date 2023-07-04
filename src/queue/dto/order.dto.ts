import { IsInt, IsOptional } from 'class-validator';

export class CreateOrderDto {
    @IsInt()
    orderId: number;

    @IsInt()
    vendorId: number;

    @IsInt()
    customerId: number;

    @IsInt()
    shippingAddressId: number;
}