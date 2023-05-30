import { Controller, Get, Body, Param, Query, Put, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderDto } from './dto/create-order-details.dto';
import { sellerUpdateOrderStatusDto } from './dto/update-order-details.dto';
import { DeliveryService } from './delivery.service';


@ApiTags('Orders - delivery')
@Controller('delivery')
export class DeliveryController {
    constructor(private readonly sellerService: DeliveryService) { }

    @Get('orders/:sellerId')
    @ApiOperation({ description: 'Provides a list of orders associated with a store using store id' })
    async getOrdersByStoreId(@Param('sellerId') sellerId: string) {
        return this.sellerService.getAllOrdersByStoreId(sellerId);
    }

    @Get('/orders/:sellerId/:cartId')
    @ApiOperation({ description: 'Provides a list of orders associated with a store by cart id' })
    async getOrdersByCartId(@Param('cartId') cartId: string, @Param('sellerId') sellerId: string) {
        return this.sellerService.getAllOrdersByCartId(sellerId, cartId);
    }

    @Get('/order/:orderId')
    @ApiOperation({ description: 'Provides a details about an order associated with a store by order id' })
    async getOrderDetailsByOrderId(@Param('orderId') orderId: string) {
        return this.sellerService.getOrderDetailByOrderId(orderId);
    }

    @ApiOperation({ summary: 'Update the status of all eligible orders based on cart id, store id' })
    @ApiParam({ name: 'cartId', description: 'Cart ID', example: 'cf8d0e2a-d10c-442f-a73e-fd299e80c994' })
    @ApiParam({ name: 'storeId', description: 'Store ID', example: '94bb9a10-dfe7-4b5b-819c-7d951d5d977b' })
    @ApiResponse({ status: 200, description: 'Orders status updated successfully' })
    @ApiResponse({ status: 400, description: 'Invalid status transition or order not found' })
    @Put(':cartId/:storeId')
    async updateCartOrders(
        @Param('cartId') cartId: string,
        @Param('storeId') storeId: string,
        @Body(ValidationPipe) sellerUpdateOrderStatusDto: sellerUpdateOrderStatusDto,) {
        return this.sellerService.updateOrderStatusByCartId(cartId, storeId, sellerUpdateOrderStatusDto.status);
    }

    @Put('order/status/:orderId')
    @ApiOkResponse({ description: 'Order status updated successfully' })
    @ApiBadRequestResponse({ description: 'Invalid status or order cannot be updated in the current status' })
    @ApiNotFoundResponse({ description: 'Order not found' })
    @ApiOperation({ summary: 'Update the status of an order' })
    async updateOrderById(@Param('orderId') orderId: string, 
        @Body(ValidationPipe) sellerUpdateOrderStatusDto: sellerUpdateOrderStatusDto) {
        return this.sellerService.updateOrderStatus(orderId, sellerUpdateOrderStatusDto.status);
    }

    @ApiOperation({ summary: 'Get orders by status' })
    @ApiParam({ name: 'status', required: true, description: 'Order status' })
    @ApiResponse({ status: 200, description: 'Returns the orders with the specified status', type: OrderDto, isArray: true })
    @Get()
    async getOrdersByStatus(@Query('status') status: string) {
      return this.sellerService.findByStatus(status);
    }
}