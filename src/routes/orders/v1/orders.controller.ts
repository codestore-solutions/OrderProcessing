import { Body, Controller, Get, Param, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateOrderStatusDto, OrderStatusTimelineDTO } from '../dto/order-status.dto';
import { OrderService } from '../orders.service';


@ApiTags('Orders')
@Controller('v1/order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ) { }

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
    async getOrdersByStatus(@Param('orderId') orderId: number,) {
        return this.orderService.getOrderTimeline(orderId);
    }
}
