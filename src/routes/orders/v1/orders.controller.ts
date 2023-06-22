import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateOrderStatusDto, OrderStatusTimelineDTO } from '../dto/order-status.dto';
import { OrderService } from '../orders.service';
import { OrderItemDTO } from 'src/assets/dtos/orderItem.dto';
import { PaymentStatusDtoOfOrder } from '../dto/payment.dto';
import { ErrorMessages } from 'src/assets/errorMessages';


@ApiTags('Orders')
@Controller('v1/order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/getOrderItemsByOrderId/:orderId')
    @ApiOperation({
        summary: 'Provides list of products ordered based on order id',
        description: 'Provides a list of products ordered by order id'
    })
    @ApiResponse({
        status: 200, description: 'Returns the list of products ordered with the order id',
        type: OrderItemDTO, isArray: true
    })
    async getOrderItemsByOrderId(@Param('orderId') orderId: number) {
        return this.orderService.getAllOrderItemsByOrderId(orderId);
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/getOrderedItemDetails/:orderItemId')
    @ApiOperation({
        summary: 'Provides ordered product details based on ordered item id',
        description: 'Provides details about the product order by ordered item id'
    })
    @ApiResponse({
        status: 200, description: 'Returns the ordered product details with the specified ordered product id',
        type: OrderItemDTO,
    })
    async getOrderItemDetailsByOrderId(@Param('orderItemId') orderItemId: number) {
        return this.orderService.getOrderItemDetailByOrderId(orderItemId);
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update the status of order or list of orders based on order id' })
    @ApiResponse({ status: 200, description: 'Orders status updated successfully' })
    @ApiResponse({ status: 400, description: 'Invalid status transition or order not found' })
    @Put('updateOrder')
    async updateStatus(
        @Req() request: any,
        @Body(ValidationPipe) orderStatusDto: CreateOrderStatusDto ) { 
  
        const user = request.user;
        return this.orderService.updateOrderStatus(orderStatusDto, user);
    }

    
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get order timeline with status' })
    @ApiResponse({
        status: 200, description: 'Returns the order timeline',
        type: OrderStatusTimelineDTO, isArray: true
    })
    @ApiParam({ name: 'orderId', description: 'Order ID', example: 2 })
    @Get('/getOrderTimeline/:orderId')
    async getOrderTimeline(@Param('orderId') orderId: number,) {
        return this.orderService.getOrderTimeline(orderId);
    }


    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update the payment status of orders by payment id' })
    @ApiResponse({ status: 200, description: 'Orders payment status updated successfully' })
    @ApiResponse({ status: 400, description: 'Invalid status transition or order not found' })
    @Post('/updatePaymentStatusOfOrders')
    async updatePaymentStatusOfOrder(@Body(ValidationPipe) paymentStatusDtoOfOrder: 
        PaymentStatusDtoOfOrder ) { 
            console.log(paymentStatusDtoOfOrder, 'sssssssssss')
        const { paymentId } = paymentStatusDtoOfOrder;
        return this.orderService.updateOrderPaymentStatus(paymentId);
    }
}