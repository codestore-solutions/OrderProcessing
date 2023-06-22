import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorMessages } from "src/assets/errorMessages";
import { CreateOrderDto } from "src/routes/customer/dto/create-order-details.dto";
import { data as currencyData } from 'currency-codes';


export function transformPaginationValueToInt(value: any, key: string): number {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
        throw new HttpException(
            {
                statusCode: HttpStatus.BAD_REQUEST,
                message: key + " " + ErrorMessages.INVALID_VALUE.message,
                success: false
            },
            HttpStatus.BAD_REQUEST,
        );
    }

    if (parsedValue <= 0) {
        throw new HttpException(
            {
                statusCode: HttpStatus.BAD_REQUEST,
                message: key + " " + ErrorMessages.INVALID_NEGATIVE_VALUE.message,
                success: false
            },
            HttpStatus.BAD_REQUEST,
        );
    }
    return parsedValue;
}


export const calculateTotalPrice = (orderObject: CreateOrderDto): number => {
    let totalPrice = 0;

    for (const order of orderObject.ordersFromStore) {
        let orderTotal = 0;

        for (const orderItem of order.orderItems) {
            const itemTotal =
                (orderItem.price - orderItem.discount) * orderItem.quantity *
                (1 + orderItem.gst / 100);
            orderTotal += itemTotal;
        }

        totalPrice += orderTotal + order.deliveryCost;
    }

    return totalPrice;
};


export const getCurrencies = () => {
    const currencies = currencyData.map((currency) => currency.code);
    return currencies;
  }