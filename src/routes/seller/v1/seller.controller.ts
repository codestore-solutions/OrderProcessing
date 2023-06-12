import { Body, Controller, Get, Param, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags
} from '@nestjs/swagger';
import { SellerService } from '../seller.service';
import { orderStatus } from 'src/assets/constants';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { OrderDTO } from 'src/assets/dtos/order.dto';
import { OrderItemDTO } from 'src/assets/dtos/orderItem.dto';
import { sellerUpdateOrderStatusDto } from '../dto/update-order-details.dto';


@ApiTags('Orders - seller')
@Controller('v1/seller')
export class SellerController {
    constructor(private readonly sellerService: SellerService) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('getOrdersBySellerId/:sellerId')
    @ApiOperation({
        summary: 'Provides orders based on seller id',
        description: 'Provides a list of orders associated with a seller using seller id'
    })
    @ApiResponse({
        status: 200, description: 'Returns the orders with the specified seller',
        type: OrderDTO, isArray: true
    })
    async getOrdersByStoreId(@Param('sellerId') sellerId: string) {
        const parsedSellerId = parseInt(sellerId, 10);
        return this.sellerService.getAllOrdersByStoreId(parsedSellerId);
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/getOrderItemsByOrderId/:orderId')
    @ApiOperation({
        summary: 'Provides list of products ordered based on order id',
        description: 'Provides a list of products ordered associated with a store by order id'
    })
    @ApiResponse({
        status: 200, description: 'Returns the list of products ordered with the specified seller and order id',
        type: OrderItemDTO, isArray: true
    })
    async getOrderItemsByOrderId(@Param('orderId') orderId: string) {
        return this.sellerService.getAllOrderItemsByOrderId(orderId);
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/getOrderedItemDetails/:orderItemId')
    @ApiOperation({
        summary: 'Provides ordered product details based on ordered item id',
        description: 'Provides a details about the product order associated with a store by ordered item id'
    })
    @ApiResponse({
        status: 200, description: 'Returns the ordered product details with the specified ordered product id',
        type: OrderItemDTO,
    })
    async getOrderItemDetailsByOrderId(@Param('orderId') orderId: string) {
        return this.sellerService.getOrderItemDetailByOrderId(orderId);
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get orders by status' })
    @ApiResponse({
        status: 200, description: 'Returns the orders with the specified status',
        type: OrderDTO, isArray: true
    })
    @ApiQuery({ name: 'status', description: 'Order status', enum: [...orderStatus] })
    @ApiParam({ name: 'sellerId', description: 'Seller ID', example: 2 })
    @Get('/getSellerOrdersBystatus/:sellerId')
    async getOrdersByStatus(@Query('status') status: string,
        @Param('sellerId') sellerId: string,) {
        return this.sellerService.findByStatus(status, sellerId);
    }


    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    // @ApiOperation({ summary: 'Update the status of order based on order id, store id' })
    // @ApiParam({ name: 'orderId', description: 'Order ID', example: 'cf8d0e2a-d10c-442f-a73e-fd299e80c994' })
    // @ApiParam({ name: 'sellerId', description: 'Seller ID', example: '94bb9a10-dfe7-4b5b-819c-7d951d5d977b' })
    // @ApiResponse({ status: 200, description: 'Orders status updated successfully' })
    // @ApiResponse({ status: 400, description: 'Invalid status transition or order not found' })
    // @Put('updateOrder/:orderId/:sellerId')
    // async updateCartOrders(
    //     @Param('orderId') cartId: string,
    //     @Param('sellerId') sellerId: string,
    //     @Body(ValidationPipe) sellerUpdateOrderStatusDto: sellerUpdateOrderStatusDto) { console.log(sellerUpdateOrderStatusDto);
    //     // return this.sellerService.updateOrderStatusByCartId(cartId, sellerId, sellerUpdateOrderStatusDto.status);
    // }

    // @Put('order/status/:orderId')
    // @ApiOkResponse({ description: 'Order status updated successfully' })
    // @ApiBadRequestResponse({ description: 'Invalid status or order cannot be updated in the current status' })
    // @ApiNotFoundResponse({ description: 'Order not found' })
    // @ApiOperation({ summary: 'Update the status of an order' })
    // async updateOrderById(@Param('orderId') orderId: string, 
    //     @Body(ValidationPipe) sellerUpdateOrderStatusDto: sellerUpdateOrderStatusDto) {
    //     return this.sellerService.updateOrderStatus(orderId, sellerUpdateOrderStatusDto.status);
    // }

}




// {
//     "orders": [
//       {
//         "productId": "7cfb6faf-7c25-4552-9f76-04b46d68136c",
//         "storeId": "eb1f91cc-0b57-4fa2-ac55-8c1848bb0903",
//         "specificationId": "614d9498-d0e0-48ec-be30-88010700e215",
//         "quantity": 2
//       },
//       {
//         "productId": "7cfb6faf-7c25-4552-9f76-04b46d68136c",
//         "storeId": "eb1f91cc-0b57-4fa2-ac55-8c1848bb0903",
//         "specificationId": "614d9498-d0e0-48ec-be30-88010700e215",
//         "quantity": 2
//       }
//     ],
//     "paymentId": "588ba8e8-d9d0-4758-90b8-6ac423ac4ba6",
//     "paymentMode": "credit card",
//     "userId": "eb1f91cc-0b57-4fa2-ac55-8c1848bb0903",
//     "shippingAddressId": "46c45f71-ff55-4e5b-98a7-53f25ac27ef0"
//   }



// eb1f91cc-0b57-4fa2-ac55-8c1848bb0903