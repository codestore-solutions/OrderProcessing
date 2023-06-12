import { ApiProperty } from "@nestjs/swagger";

class Address {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    landmark: string;
}

export class StoreDto {
    @ApiProperty({ example: '3', description: 'Store ID' })
    id: string;

    @ApiProperty({ example: '3', description: 'Seller ID' })
    sellerId: string;

    @ApiProperty({ example: '2', description: 'Business ID' })
    businessId: string;

    @ApiProperty({ example: 'Fashion Junction', description: 'Store name' })
    name: string;

    @ApiProperty({ example: 'A trendy fashion store offering a wide range of clothing and accessories.', description: 'Store description' })
    description: string;

    @ApiProperty({ type: Address, description: 'Store address' })
    address: Address;
}