import { Controller, Get, HttpException, HttpStatus, Param, ParseArrayPipe, ParseIntPipe, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation, ApiQuery, ApiResponse, ApiTags
} from '@nestjs/swagger';
import { BusinessOrderDetailsDTO, GetOrdersQuery, orderListDto, } from '../dto/business-order-dto';
import { BusinessService } from '../business.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { OrderStatusEnum } from 'src/assets/constants';
import { ErrorMessages } from 'src/assets/errorMessages';


@ApiTags('Orders - business')
@Controller('v1/business')
export class BusinessController {
    constructor(private readonly businessService: BusinessService) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('getOrdersByStoresIdAndStatus')
    @ApiOperation({
        summary: 'Provides orders based on stores Ids and status',
        description: 'Provides a list of orders associated with a store using stores id and status'
    })
    @ApiResponse({
        status: 200, description: 'Returns the orders with the specified stores and status',
        type: orderListDto,
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiQuery({ name: 'orderStatus', description: 'Order status', enum: OrderStatusEnum, isArray: true})
    async getOrdersByBusinessIds(
        @Query(ValidationPipe) query: GetOrdersQuery) {
        const { storeIds, page, pageSize, orderStatus } = query;
        const stores = Array.isArray(storeIds) ? storeIds : [storeIds];

        if ((pageSize && !page) || (!pageSize && page)) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: ErrorMessages.INVALID_PAGINATON_INPUT.message,
                success: false
            }, HttpStatus.BAD_REQUEST);
        }
        // Check if pagination details are provided
        if (page && pageSize) {
            return this.businessService.getAllOrdersByStoreIdsWithPagination(stores,
                page, pageSize, orderStatus);
        } else {
            // Retrieve all data
            // No pagination details provided, return all results
            return this.businessService.getAllOrdersByStoreIds(stores, orderStatus);

        }
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/getOrderDetailsByOrderId/:orderId')
    @ApiOperation({
        summary: 'Provides order details based on order id',
        description: 'Provides order details associated with a store by order id'
    })
    @ApiResponse({
        status: 200, description: 'Returns order details by order id',
        type: BusinessOrderDetailsDTO,
    })
    async getOrderDetailsByOrderId(@Param('orderId') orderId: number) {
        return this.businessService.getOrderDetailsByOrderId(orderId);
    }

}


// {
//     "shippingAddressId": 1,
//     "customerId": 5,
//     "paymentMode": "online",
//     "currency": "INR",
//     "ordersFromStore": [
//       {
//         "storeId": 3,
//         "deliveryCost": 59,
//         "orderItems": [
//           {
//             "productId": 1,
//             "variantId": 2,
//             "price": 999,
//             "discount": 10,
//             "quantity": 1,
//             "gst": 18
//           },
//           {
//             "productId": 2,
//             "variantId": 3,
//             "price": 1999,
//             "discount": 0,
//             "quantity": 1,
//             "gst": 18
//           }
//         ]
//       },
//       {
//         "storeId": 4,
//         "deliveryCost": 159,
//         "orderItems": [
//           {
//             "productId": 3,
//             "variantId": 4,
//             "price": 999,
//             "discount": 10,
//             "quantity": 1,
//             "gst": 18
//           }
//         ]
//       }
//     ]
//   }