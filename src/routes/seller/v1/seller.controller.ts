import {
    Controller, Get, HttpException, HttpStatus, Param,
    ParseIntPipe,
    Query, UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiExcludeEndpoint,
    ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags
} from '@nestjs/swagger';
import { SellerService } from '../seller.service';
import { OrderStatusEnum, orderStatus } from 'src/assets/constants';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { OrderDTO } from 'src/assets/dtos/order.dto';
import { OrderItemDTO } from 'src/assets/dtos/orderItem.dto';
import { PaginationDto } from 'src/assets/dtos/pagination.dto';
import { ErrorMessages } from 'src/assets/errorMessages';
import { GetVendorOrdersQuery, SellerOrderListDto } from '../dto/seller-order.dto';
import { OrderService } from 'src/routes/orders/orders.service';
import { VendorOrderResponseDTO } from '../dto/response.dto';


@ApiTags('Orders - vendor')
@Controller('v1/vendor')
export class SellerController {
    constructor(private readonly sellerService: SellerService,
        private readonly orderService: OrderService) { }

 
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('getOrdersBySellerId/:sellerId')
    @ApiOperation({
        summary: 'Provides orders based on seller id',
        description: 'Provides a list of orders associated with a seller using seller id and status'
    })
    @ApiResponse({
        status: 200, description: 'Returns the orders with the specified seller',
        type: VendorOrderResponseDTO, isArray: true
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiQuery({
        name: 'orderStatus', description: 'Order status',
        enum: OrderStatusEnum, isArray: true
    })
    async getOrdersByStoreId(
        @Param('sellerId', ParseIntPipe) sellerId: number,
        @Query(ValidationPipe) query: GetVendorOrdersQuery) {

        const { page, pageSize, orderStatus } = query;

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

        const parsedSellerId = sellerId;

        // Initialize sets and arrays for data retrieval
        const customerIdSet: Set<number> = new Set();
        const shippingAddressIdSet: Set<number> = new Set();
        const orderIdArray: number[] = [];

        const { totalOrders, orders } = await this.sellerService.getOrdersBySellerId(parsedSellerId,
            page, pageSize, orderStatus);

        // Extract relevant data from orders
        for (const order of orders) {
            customerIdSet.add(order.customerId);
            shippingAddressIdSet.add(order.shippingAddressId);
            orderIdArray.push(order.id);
        }

        // Convert sets to arrays
        const customerIdArray = Array.from(customerIdSet);
        const shippingAddressIdArray = Array.from(shippingAddressIdSet);


        // Get mapping data from various services
        const { orderData, customers, addresses } =
            await this.sellerService.getMappingDatafromServices(
                orderIdArray, customerIdArray, shippingAddressIdArray
            );

        // Create a map of orders based on the id
        const ordersMap = new Map(orders.map(order => [order.id, order]));

        // Map orderData using orderId and merge with corresponding order
        const mappedData = orderData.map(data => {
            const order = ordersMap.get(data.orderId);
            return { ...order, ...data };
        });

        // Get mapped data
        const data = await this.sellerService.getMappedData(customers,
            addresses, mappedData
        );

        return { totalOrders, list: data };
    }


    @ApiBearerAuth()
    @ApiExcludeEndpoint()
    @UseGuards(JwtAuthGuard)
    @Get('/getOrderDetailsByOrderId/:orderId')
    @ApiOperation({
        summary: 'Provides order details based on order id',
        description: 'Provides order details by order id'
    })
    @ApiResponse({
        status: 200, description: 'Returns order details',
        type: VendorOrderResponseDTO,
    })
    async getOrderDetailsByOrderId(@Param('orderId', ParseIntPipe) orderId: number) {

        const order = await this.sellerService.getOrderById(orderId,);
        const customerId = order.customerId;
        const shippingAddressId = order.shippingAddressId;

        // Get mapping data from various services
        const { orderData, customers, addresses } =
            await this.sellerService.getMappingDatafromServices(
                [ order.id ], [ customerId ], [ shippingAddressId ]
            );

        const mappedData = [{ ...orderData[0], ...order }];

        // Get mapped data
        const data = await this.sellerService.getMappedData(customers,
            addresses, mappedData
        );
        return data[0];
    }


    // @ApiBearerAuth()
    // @ApiExcludeEndpoint()
    // @UseGuards(JwtAuthGuard)
    // @Get('/getOrderedItemDetails/:orderItemId')
    // @ApiOperation({
    //     summary: 'Provides ordered product details based on ordered item id',
    //     description: 'Provides a details about the product order associated with a store by ordered item id'
    // })
    // @ApiResponse({
    //     status: 200, description: 'Returns the ordered product details with the specified ordered product id',
    //     type: OrderItemDTO,
    // })
    // async getOrderItemDetailsByOrderId(@Param('orderItemId') orderItemId: number) {
    //     return this.sellerService.getOrderItemDetailByOrderId(orderItemId);
    // }


    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    // @ApiOperation({ summary: 'Get orders by status' })
    // @ApiResponse({
    //     status: 200, description: 'Returns the orders with the specified status',
    //     type: OrderDTO, isArray: true
    // })
    // @ApiQuery({ name: 'status', description: 'Order status', enum: [...orderStatus] })
    // @ApiParam({ name: 'sellerId', description: 'Seller ID', example: 2 })
    // @Get('/getSellerOrdersBystatus/:sellerId')
    // async getOrdersByStatus(@Query('status', ParseIntPipe) status: number,
    //     @Param('sellerId', ParseIntPipe) sellerId: number) {
    //     return this.sellerService.findByStatus(status, sellerId);
    // }


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