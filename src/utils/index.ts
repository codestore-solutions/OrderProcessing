import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorMessages } from "src/assets/errorMessages";


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


export function transformArrayToIntArray(value: any, key: string): number[] {
    const parsedValues = [];
    for (const ele of value) {
        const parsedValue = parseInt(ele, 10);
        if (isNaN(parsedValue)) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: key + " " + ErrorMessages.INVALID_VALUE.message,
                success: false
            }, HttpStatus.BAD_REQUEST);
        }
        parsedValues.push(parsedValue)
    }
    return parsedValues;
}