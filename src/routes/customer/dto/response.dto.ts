import { ApiProperty } from '@nestjs/swagger';


const responseExampleData = {
    "id": 27,
    "vendor": {
        "id": 3,
        "first_name": "Amit",
        "last_name": "Sharma",
        "email": "amit.sharma@example.com",
        "phone_number": "+91-8001234567",
        "business": {
            "id": 1,
            "name": "P1/2 Store",
            "description": "A premium store offering high-quality products",
            "category": {
                "category_id": 1,
                "name": "Electronics",
                "description": "Electronics and gadgets",
            },
            "address": {
                "id": 2,
                "landmark": "Near Central Park",
                "street": "123 Main Street",
                "city": "Bangalore",
                "state": "Karnataka",
                "postalCode": "560001",
                "country": "India",
                "createdAt": "2023-07-03T10:33:42.320Z",
                "updatedAt": "2023-07-03T10:33:42.320Z"
            }
        }
    },
    "deliveryAgent": {
        "id": 11,
        "businessId": 2,
        "deliveryAgentId": 8,
        "deliveryAgentName": "Kamlesh Kumar",
        "deliveryAgentAddress": "Noida, Sector 2",
        "agentLatitude": 28.582066,
        "agentLongitude": 77.313859,
        "maxDistance": 10,
        "agentEmailId": "kamlesh@gmail.com",
        "orderAssignStatus": 0,
        "agentStatus": 1
    },
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


class BusinessCategoryDTO {
    @ApiProperty()
    category_id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;
}

class BusinessAddressDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    landmark: string;

    @ApiProperty()
    street: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    state: string;

    @ApiProperty()
    postalCode: string;

    @ApiProperty()
    country: string;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    updatedAt: string;
}

class VendorBusinessDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty({ type: BusinessCategoryDTO })
    category: BusinessCategoryDTO;

    @ApiProperty({ type: BusinessAddressDTO })
    address: BusinessAddressDTO;
}

class VendorDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    first_name: string;

    @ApiProperty()
    last_name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phone_number: string;

    @ApiProperty({ type: VendorBusinessDTO })
    business: VendorBusinessDTO;
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


class DeliveryAgentDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    businessId: number;

    @ApiProperty()
    deliveryAgentId: number;

    @ApiProperty()
    deliveryAgentName: string;

    @ApiProperty()
    deliveryAgentAddress: string;

    @ApiProperty()
    agentLatitude: number;

    @ApiProperty()
    agentLongitude: number;

    @ApiProperty()
    maxDistance: number;

    @ApiProperty()
    agentEmailId: string;

    @ApiProperty()
    orderAssignStatus: number;

    @ApiProperty()
    agentStatus: number;
}


class CustomerOrderListDto {
    @ApiProperty({ example: responseExampleData.id })
    id: number;

    @ApiProperty({ type: VendorDTO, example: responseExampleData.vendor })
    vendor: VendorDTO;

    @ApiProperty({ type: DeliveryAgentDTO, example: responseExampleData.deliveryAgent })
    deliveryAgent: DeliveryAgentDTO;

    @ApiProperty({ type: ShippingAddressDTO, example: responseExampleData.shippingAddress })
    shippingAddress: ShippingAddressDTO;
}



export class CustomerOrderResponseDTO {
    @ApiProperty({ example: 1 })
    totalOrder: number

    @ApiProperty({ type: CustomerOrderListDto, isArray: true })
    data: CustomerOrderListDto[]
}