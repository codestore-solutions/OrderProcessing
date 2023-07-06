import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth,  ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeliveryService } from '../delivery.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { OrderStatusEnum } from 'src/assets/constants';
import { GetDeliveryAgentOrdersQuery } from '../dto/create-order-details.dto';
import { ErrorMessages } from 'src/assets/errorMessages';
import { OrderService } from 'src/routes/orders/orders.service';


@ApiTags('Orders - delivery')
@Controller('delivery')
export class DeliveryController {
    constructor(private readonly deliveryService: DeliveryService,
        private readonly orderService: OrderService) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Provides orders based on agent id',
        description: 'Provides a list of orders associated with a agent using agent id'
    })
    @ApiResponse({
        status: 200, description: 'Returns the orders with the specified agent',
       isArray: true
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiQuery({
        name: 'orderStatus', description: 'Order status',
        enum: OrderStatusEnum, isArray: true
    })
    @Get('getOrdersByDeliveryAgentId/:agentId')
    async getOrdersByDeliveryAgentId(
        @Query() query: GetDeliveryAgentOrdersQuery,
        @Param('agentId', ParseIntPipe) agentId: number
    ) {
        const { page, pageSize, orderStatus } = query;

        // Check if pageSize and page are provided
        if (!pageSize || !page) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: ErrorMessages.INVALID_PAGINATION_INPUT.message,
                success: false
            }, HttpStatus.BAD_REQUEST);
        }

        // Validate order status
        if (!this.orderService.validateOrderStatus(orderStatus)) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: ErrorMessages.INVALID_ORDER_STATUS.message,
                success: false
            }, HttpStatus.BAD_REQUEST);
        }

        // Initialize sets and arrays for data retrieval
        const customerIdSet: Set<number> = new Set();
        const vendorIdSet: Set<number> = new Set();
        const shippingAddressIdSet: Set<number> = new Set();
        const orderIdArray: number[] = [];

        // Get orders with pagination details
        const { totalOrders, orders } = await this.deliveryService.getOrders(
            agentId, page, pageSize, orderStatus
        );

        // Extract relevant data from orders
        for (const order of orders) {
            customerIdSet.add(order.customerId);
            vendorIdSet.add(order.vendorId);
            shippingAddressIdSet.add(order.shippingAddressId);
            orderIdArray.push(order.id);
        }

        // Convert sets to arrays
        const customerIdArray = Array.from(customerIdSet);
        const vendorIdArray = Array.from(vendorIdSet);
        const shippingAddressIdArray = Array.from(shippingAddressIdSet);

        // Get mapping data from various services
        const { orderData, customers, vendors, addresses } =
            await this.deliveryService.getMappingDatafromServices(
                orderIdArray, vendorIdArray, 
                customerIdArray, shippingAddressIdArray
            );

        // Create a map of orders based on the id
        const ordersMap = new Map(orders.map(order => [order.id, order]));

        // Map orderData using orderId and merge with corresponding order
        const mappedData = orderData.map(data => {
            const order = ordersMap.get(data.orderId);
            return { ...order, ...data };
        });

        // Get mapped data
        const data = await this.deliveryService.getMappedData(
            customers, vendors, addresses, mappedData
        );
        return { totalOrders, list: data };
    }

}