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
    @ApiProperty({ type: () => OrderDto, isArray: true })
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

//dto for cart
export class CartDto {
    @ApiProperty({ example: '95494fb5-b4f7-4a37-845c-e6c5c122c321' })
    cartId: string;

    @ApiProperty({ example: 2 })
    totalProductCount: number;

    @ApiProperty({ example: 2600 })
    totalAmount: number;

    @ApiProperty({ example: 0 })
    totalDiscount: number;

    @ApiProperty({ example: '2023-05-29T07:02:45.000Z' })
    createdAt: string;

    @ApiProperty({ example: 'credit card' })
    paymentMode: string;

    @ApiProperty({
        example: {
            username: 'Ramesh sharma',
            persona: 'store',
        },
    })
    customer: {
        username: string;
        persona: string;
    };

    @ApiProperty({
        example: {
            street: 'XYZ',
            city: 'Delhi',
            postalCode: '252011',
            state: 'Delhi',
            country: 'India',
        },
    })
    address: {
        street: string;
        city: string;
        postalCode: string;
        state: string;
        country: string;
    };
}


//order list dto 
export class OrderListDto {
    @ApiProperty({ example: '3364e750-07a3-4632-b3c8-e6f327d767a4' })
    id: string;

    @ApiProperty({ example: '95494fb5-b4f7-4a37-845c-e6c5c122c321' })
    cartId: string;

    @ApiProperty({ example: 1300 })
    price: number;

    @ApiProperty({ example: 0 })
    discount: number;

    @ApiProperty({ example: 'processing' })
    status: string;

    @ApiProperty({ example: 'credit card' })
    paymentMode: string;

    @ApiProperty({ example: '2023-05-29T07:02:45.000Z' })
    createdAt: string;

    @ApiProperty({ example: '2023-05-29T07:02:45.000Z' })
    updatedAt: string;

    @ApiProperty({ example: 2 })
    quantity: number;

    @ApiProperty({
        example: {
            username: 'Ramesh sharma',
            persona: 'store',
        },
    })
    customer: {
        username: string;
        persona: string;
    };

    @ApiProperty({
        example: {
            name: 'Fastrack Limitless Smartwatch at 1995',
            description: 'Biggest 1.95” Horizon Curve Display: Fastrack Limitless FS1 comes with India\'s first largest 1.95” Horizon Curve Display and is ready to style your wrist with bright pixel resolution and brand new amazing colours, Built-In Alexa: Your personal assistant to make your life quick and smart like setting up alarms, reminders or adding grocery to your cart',
            price: 1300,
            discount: 0,
            createdAt: '2023-05-11T15:30:00.000Z',
        },
    })
    product: {
        name: string;
        description: string;
        price: number;
        discount: number;
        createdAt: string;
    };

    @ApiProperty({
        example: {
            value: '160805',
            updatedAt: '2023-05-11T15:30:00.000Z',
            attribute: {
                name: 'size',
            },
        },
    })
    productAttributes: {
        value: string;
        updatedAt: string;
        attribute: {
            name: string;
        };
    };

    @ApiProperty({
        example: {
            amountPaid: 2600,
            discount: 0,
            createdAt: '2023-05-11T15:30:00.000Z',
        },
    })
    payment: {
        amountPaid: number;
        discount: number;
        createdAt: string;
    };

    @ApiProperty({
        example: {
            street: 'XYZ',
            city: 'Delhi',
            postalCode: '252011',
            state: 'Delhi',
            country: 'India',
        },
    })
    address: {
        street: string;
        city: string;
        postalCode: string;
        state: string;
        country: string;
    };
}



class CustomerDto {
    @ApiProperty({ example: 'Ramesh sharma' })
    username: string;

    @ApiProperty({ example: 'store' })
    persona: string;
}

class ProductDto {
    @ApiProperty({ example: 'Fastrack Limitless Smartwatch at 1995' })
    name: string;

    @ApiProperty({
        example: "Biggest 1.95” Horizon Curve Display: Fastrack Limitless FS1 comes with India's first largest 1.95” Horizon Curve Display and is ready to style your wrist with bright pixel resolution and brand new amazing colours, Built-In Alexa: Your personal assistant to make your life quick and smart like setting up alarms, reminders or adding grocery to your cart"
    })
    description: string;

    @ApiProperty({ example: 1300 })
    price: number;

    @ApiProperty({ example: 0 })
    discount: number;

    @ApiProperty({ example: '2023-05-11T15:30:00.000Z' })
    createdAt: string;
}

class ProductAttributeDto {
    @ApiProperty({ example: '160805' })
    value: string;

    @ApiProperty({ example: '2023-05-11T15:30:00.000Z' })
    updatedAt: string;

    @ApiProperty({ example: 'size' })
    name: string;
}

class PaymentDto {
    @ApiProperty({ example: 2600 })
    amountPaid: number;

    @ApiProperty({ example: 0 })
    discount: number;

    @ApiProperty({ example: '2023-05-11T15:30:00.000Z' })
    createdAt: string;
}

class AddressDto {
    @ApiProperty({ example: 'XYZ' })
    street: string;

    @ApiProperty({ example: 'Delhi' })
    city: string;

    @ApiProperty({ example: '252011' })
    postalCode: string;

    @ApiProperty({ example: 'Delhi' })
    state: string;

    @ApiProperty({ example: 'India' })
    country: string;
}


//order details dto
export class OrderDetailDto {
    @ApiProperty({ example: '3364e750-07a3-4632-b3c8-e6f327d767a4' })
    id: string;

    @ApiProperty({ example: '95494fb5-b4f7-4a37-845c-e6c5c122c321' })
    cartId: string;

    @ApiProperty({ example: 1300 })
    price: number;

    @ApiProperty({ example: 0 })
    discount: number;

    @ApiProperty({ example: 'processing' })
    status: string;

    @ApiProperty({ example: 'credit card' })
    paymentMode: string;

    @ApiProperty({ example: '2023-05-29T07:02:45.000Z' })
    createdAt: string;

    @ApiProperty({ example: '2023-05-29T07:02:45.000Z' })
    updatedAt: string;

    @ApiProperty({ example: 2 })
    quantity: number;

    @ApiProperty({ type: CustomerDto })
    customer: CustomerDto;

    @ApiProperty({ type: ProductDto })
    product: ProductDto;

    @ApiProperty({ type: ProductAttributeDto })
    productAttributes: ProductAttributeDto;

    @ApiProperty({ type: PaymentDto })
    payment: PaymentDto;

    @ApiProperty({ type: AddressDto })
    address: AddressDto;
}