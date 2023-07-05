import { Controller, Get, Param, ValidationPipe, UseGuards, 
    UsePipes, Query, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerService } from '../customer.service';
import { OrderStatusEnum } from 'src/assets/constants';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { GetCustomerOrdersQuery } from '../dto/customer-order.dto';
import { PaginationDto } from 'src/assets/dtos/pagination.dto';
import { ErrorMessages } from 'src/assets/errorMessages';
import { OrderService } from 'src/routes/orders/orders.service';
import { CustomerOrderResponseDTO } from '../dto/response.dto';


@ApiTags('Orders - customer')
@Controller('v1/customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService,
        private readonly orderService: OrderService
    ) { }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('getOrdersByCustomerId/:customerId')
    @ApiOperation({
        summary: 'Provides orders based on customer id',
        description: 'Provides a list of orders associated with a customer using customer id'
    })
    @ApiResponse({
        status: 200, description: 'Returns the orders with the specified customer',
        type: CustomerOrderResponseDTO, isArray: true
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    async getOrdersByStoreId(
        @Param('customerId', ParseIntPipe) customerId: number,
        @Query(ValidationPipe) query: PaginationDto) {

        const { page, pageSize } = query;

        // Check if pageSize and page are provided
        if (!pageSize || !page) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: ErrorMessages.INVALID_PAGINATION_INPUT.message,
                success: false
            }, HttpStatus.BAD_REQUEST);
        }

        // Initialize sets and arrays for data retrieval
        const deliveryAgentIdSet: Set<number> = new Set();
        const storeIdSet: Set<number> = new Set();
        const shippingAddressIdSet: Set<number> = new Set();
        const orderIdArray: number[] = [];

        // Get orders with pagination details
        const { totalOrders, orders } = await this.customerService.getOrdersByCustomerId(
            customerId, page, pageSize,
        );

        // Extract relevant data from orders
        for (const order of orders) {
            if (order.deliveryAgentId) {
                deliveryAgentIdSet.add(order.deliveryAgentId);
            }
            storeIdSet.add(order.vendorId);
            shippingAddressIdSet.add(order.shippingAddressId);
            orderIdArray.push(order.id);
        }

        // Convert sets to arrays
        const deliveryAgentIdArray = Array.from(deliveryAgentIdSet);
        const storeIdArray = Array.from(storeIdSet);
        const shippingAddressIdArray = Array.from(shippingAddressIdSet);

        // Get mapping data from various services
        const { orderData, deliveryAgents, vendors, addresses } =
            await this.customerService.getMappingDatafromServices(
                orderIdArray, deliveryAgentIdArray, storeIdArray,
                shippingAddressIdArray
            );
            // console.log(orderData, deliveryAgents, vendors, addresses)
        // Create a map of orders based on the id
        const ordersMap = new Map(orders.map(order => [order.id, order]));

        // console.log(ordersMap, orderData, 'mapped')

        // Map orderData using orderId and merge with corresponding order
        const mappedData = orderData.map(data => {
            const order = ordersMap.get(data.orderId);
            return { ...order, ...data };
        });

        // Get mapped data
        // console.log(mappedData)
        const data = await this.customerService.getMappedData(
            deliveryAgents, vendors, addresses, mappedData
        );

        return { totalOrders, list: data };
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('getOrdersByCustomerIdAndStatus/:customerId')
    @ApiOperation({
        summary: 'Provides orders based on customer Id and status',
        description: 'Provides a list of orders associated with a customer using customer id and status'
    })
    @ApiResponse({
        status: 200, description: 'Returns the orders with the specified customer and status',
        type: CustomerOrderResponseDTO,
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiQuery({
        name: 'orderStatus', description: 'Order status',
        enum: OrderStatusEnum, isArray: true
    })
    async getOrdersByCustomerIdAndStatus(
        @Param('customerId', ParseIntPipe) customerId: number,
        @Query() query: GetCustomerOrdersQuery
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
        const deliveryAgentIdSet: Set<number> = new Set();
        const storeIdSet: Set<number> = new Set();
        const shippingAddressIdSet: Set<number> = new Set();
        const orderIdArray: number[] = [];

        // Get orders with pagination details
        const { total, orders } = await this.customerService.getOrdersByCustomerIdAndStatus(
            customerId, page, pageSize, orderStatus
        );

        // Extract relevant data from orders
        for (const order of orders) {
            if (order.deliveryAgentId) {
                deliveryAgentIdSet.add(order.deliveryAgentId);
            }
            storeIdSet.add(order.vendorId);
            shippingAddressIdSet.add(order.shippingAddressId);
            orderIdArray.push(order.id);
        }

        // Convert sets to arrays
        const deliveryAgentIdArray = Array.from(deliveryAgentIdSet);
        const storeIdArray = Array.from(storeIdSet);
        const shippingAddressIdArray = Array.from(shippingAddressIdSet);

        // Get mapping data from various services
        const { orderData, deliveryAgents, vendors, addresses } =
            await this.customerService.getMappingDatafromServices(
                orderIdArray, deliveryAgentIdArray, storeIdArray, 
                shippingAddressIdArray
            );

        // Create a map of orders based on the id
        const ordersMap = new Map(orders.map(order => [order.id, order]));

        // Map orderData using orderId and merge with corresponding order
        const mappedData = orderData.map(data => {
            const order = ordersMap.get(data.orderId);
            return { ...order, ...data };
        });

        // Get mapped data
        const data = await this.customerService.getMappedData(
            deliveryAgents, vendors, addresses, mappedData
        );

        return { totalOrders: total, list: data };
    }
}
