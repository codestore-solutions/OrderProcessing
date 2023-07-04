import { ApiProperty } from '@nestjs/swagger';


const responseExampleData = {
    "id": 27,
    "customer": {
        "id": 5,
        "name": "Ramesh Kapoor",
        "email": "ramesh.kapoor@example.com",
    },
    "shippingAddress": {
        "id": 1,
        "street": "Block B, Industrial Area, Sector 62",
        "city": "Noida",
        "state": "Uttar Pradesh",
        "country": "India",
        "countryCode": "",
        "postalCode": "201309",
        "phoneNumber": "9034906248",
        "alternateNumber": null,
        "latitude": 28.621377,
        "longitude": 77.359644,
        "shippingAddressId": 1,
        "shippingAddress": null
    }
}




class CustomerDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;
}

class ShippingAddressDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    street: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    state: string;

    @ApiProperty()
    country: string;

    @ApiProperty()
    countryCode: string;

    @ApiProperty()
    postalCode: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    alternateNumber: string | null;

    @ApiProperty()
    latitude: number;

    @ApiProperty()
    longitude: number;

    @ApiProperty()
    shippingAddressId: number;

    @ApiProperty()
    shippingAddress: string | null;
}


export class VendorOrderResponseDTO {
    @ApiProperty({ example: responseExampleData.id })
    id: number;

    @ApiProperty({ type: CustomerDTO, example: responseExampleData.customer })
    customer: CustomerDTO;

    @ApiProperty({ type: ShippingAddressDTO, example: responseExampleData.shippingAddress })
    shippingAddress: ShippingAddressDTO;
}
