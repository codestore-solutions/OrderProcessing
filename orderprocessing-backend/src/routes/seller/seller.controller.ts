import { Controller, Get, Body, Param, Query, Put, ValidationPipe } from '@nestjs/common';
import {
    ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags
} from '@nestjs/swagger';
import { CartDto, OrderDetailDto, OrderListDto } from './dto/create-order-details.dto';
import { sellerUpdateOrderStatusDto } from './dto/update-order-details.dto';
import { SellerService } from './seller.service';
import { orderStatus } from 'src/assets/constants';


@ApiTags('Orders - seller')
@Controller('seller')
export class SellerController {
    constructor(private readonly sellerService: SellerService) { }

    @Get('carts/:sellerId')
    @ApiOperation({
        summary: 'Provides cart based on seller id',
        description: 'Provides a list of orders associated with a store using store id'
    })
    @ApiResponse({
        status: 200, description: 'Returns the cart with the specified seller',
        type: CartDto, isArray: true
    })
    async getOrdersByStoreId(@Param('sellerId') sellerId: string) {
        return this.sellerService.getAllOrdersByStoreId(sellerId);
    }


    @Get('/orders/:sellerId/:cartId')
    @ApiOperation({
        summary: 'Provides orders based on seller id and cart id',
        description: 'Provides a list of orders associated with a store by cart id'
    })
    @ApiResponse({
        status: 200, description: 'Returns the orders with the specified seller and cart',
        type: OrderListDto, isArray: true
    })
    async getOrdersByCartId(@Param('cartId') cartId: string, @Param('sellerId') sellerId: string) {
        return this.sellerService.getAllOrdersByCartId(sellerId, cartId);
    }


    @Get('/order/:orderId')
    @ApiOperation({
        summary: 'Provides order details based on order id',
        description: 'Provides a details about an order associated with a store by order id'
    })
    @ApiResponse({
        status: 200, description: 'Returns the order details with the specified order id',
        type: OrderDetailDto,
    })
    async getOrderDetailsByOrderId(@Param('orderId') orderId: string) {
        return this.sellerService.getOrderDetailByOrderId(orderId);
    }


    @ApiOperation({ summary: 'Update the status of all eligible orders based on cart id, store id' })
    @ApiParam({ name: 'cartId', description: 'Cart ID', example: 'cf8d0e2a-d10c-442f-a73e-fd299e80c994' })
    @ApiParam({ name: 'sellerId', description: 'Seller ID', example: '94bb9a10-dfe7-4b5b-819c-7d951d5d977b' })
    @ApiResponse({ status: 200, description: 'Orders status updated successfully' })
    @ApiResponse({ status: 400, description: 'Invalid status transition or order not found' })
    @Put(':cartId/:sellerId')
    async updateCartOrders(
        @Param('cartId') cartId: string,
        @Param('sellerId') sellerId: string,
        @Body(ValidationPipe) sellerUpdateOrderStatusDto: sellerUpdateOrderStatusDto,) {
        return this.sellerService.updateOrderStatusByCartId(cartId, sellerId, sellerUpdateOrderStatusDto.status);
    }

    // @Put('order/status/:orderId')
    // @ApiOkResponse({ description: 'Order status updated successfully' })
    // @ApiBadRequestResponse({ description: 'Invalid status or order cannot be updated in the current status' })
    // @ApiNotFoundResponse({ description: 'Order not found' })
    // @ApiOperation({ summary: 'Update the status of an order' })
    // async updateOrderById(@Param('orderId') orderId: string, 
    //     @Body(ValidationPipe) sellerUpdateOrderStatusDto: sellerUpdateOrderStatusDto) {
    //     return this.sellerService.updateOrderStatus(orderId, sellerUpdateOrderStatusDto.status);
    // }

    @ApiOperation({ summary: 'Get orders by status' })
    @ApiResponse({
        status: 200, description: 'Returns the orders with the specified status',
        type: CartDto, isArray: true
    })
    @ApiQuery({ name: 'status', description: 'Order status', enum: [...orderStatus] })
    @ApiParam({ name: 'sellerId', description: 'Seller ID', example: '94bb9a10-dfe7-4b5b-819c-7d951d5d977b' })
    @Get('carts/getBystatus/:sellerId')
    async getOrdersByStatus(@Query('status') status: string,
        @Param('sellerId') sellerId: string,) {

            console.log(status, sellerId)
        return this.sellerService.findByStatus(status, sellerId);
    }
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