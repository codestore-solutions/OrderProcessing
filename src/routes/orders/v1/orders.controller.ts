import { Body, Controller, Get, Param, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateOrderStatusDto, OrderAssigningStatusDto, OrderStatusTimelineDTO } from '../dto/order-status.dto';
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
    @UsePipes(new ValidationPipe({ transform: true }))
    @Put('updateOrder')
    async updateStatus(
        @Req() request: any,
        @Body() orderStatusDto: CreateOrderStatusDto ) { 
  
        const user = request.user;
        return this.orderService.updateOrderStatus(orderStatusDto, user);
    }


    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update the status and delivery agent of order or list of orders based on order id' })
    @ApiResponse({ status: 200, description: 'Orders status updated successfully' })
    @ApiResponse({ status: 400, description: 'Invalid status transition or order not found' })
    @Put('updateOrderWithAgent')
    async updateStatusWithAgentAssigning(
        @Req() request: any,
        @Body(ValidationPipe) orderStatusDto: OrderAssigningStatusDto ) { 
  
        const user = request.user;
        return this.orderService.updateAndAssignAgent(orderStatusDto, user);
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
}