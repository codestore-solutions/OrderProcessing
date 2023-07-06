import {
    Controller, Get, HttpException, HttpStatus, Logger, Param,
    ParseIntPipe,
    Query, UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation, ApiQuery, ApiResponse, ApiTags
} from '@nestjs/swagger';
import { BusinessOrderDetailsDTO, GetOrdersQuery, OrderListDto, } from '../dto/business-order-dto';
import { BusinessService } from '../business.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { OrderStatusEnum } from 'src/assets/constants';
import { ErrorMessages } from 'src/assets/errorMessages';
import { BusinessOrderResponseDTO } from '../dto/response.dto';


@ApiTags('Orders - business')
@Controller('v1/business')
export class BusinessController {
    constructor(private readonly businessService: BusinessService) { }
    private logger = new Logger(BusinessController.name)

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('getOrdersByStoresIdAndStatus')
    @ApiOperation({
        summary: 'Provides orders based on stores Ids and status',
        description: 'Provides a list of orders associated with a store using stores id and status'
    })
    @ApiResponse({
        status: 200, description: 'Returns the orders with the specified stores and status',
        type: OrderListDto,
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiQuery({
        name: 'orderStatus', description: 'Order status',
        enum: OrderStatusEnum, isArray: true
    })
    async getOrdersByBusinessIds(
        @Query() query: GetOrdersQuery
    ) {
        const { vendorIds, page, pageSize, orderStatus } = query;
        const vendorIdArray = Array.isArray(vendorIds) ? vendorIds : [vendorIds];

        const startTime = performance.now();

        // Check if pageSize and page are provided
        if (!pageSize || !page) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: ErrorMessages.INVALID_PAGINATION_INPUT.message,
                success: false
            }, HttpStatus.BAD_REQUEST);
        }

        // Validate order status
        if (!this.businessService.validateOrderStatus(orderStatus)) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: ErrorMessages.INVALID_ORDER_STATUS.message,
                success: false
            }, HttpStatus.BAD_REQUEST);
        }

        // Initialize sets and arrays for data retrieval
        const deliveryAgentIdSet: Set<number> = new Set();
        const customerIdSet: Set<number> = new Set();
        const storeIdSet: Set<number> = new Set();
        const shippingAddressIdSet: Set<number> = new Set();
        const orderIdArray: number[] = [];

        // Get orders with pagination details
        const { total, orders } = await this.businessService.getAllOrdersByStoreIdsWithPagination(
            vendorIdArray, page, pageSize, orderStatus
        );

        // Extract relevant data from orders
        for (const order of orders) {
            if (order.deliveryAgentId) {
                deliveryAgentIdSet.add(order.deliveryAgentId);
            }
            customerIdSet.add(order.customerId);
            storeIdSet.add(order.vendorId);
            shippingAddressIdSet.add(order.shippingAddressId);
            orderIdArray.push(order.id);
        }

        // Convert sets to arrays
        const deliveryAgentIdArray = Array.from(deliveryAgentIdSet);
        const customerIdArray = Array.from(customerIdSet);
        const storeIdArray = Array.from(storeIdSet);
        const shippingAddressIdArray = Array.from(shippingAddressIdSet);

        // Get mapping data from various services
        const { orderData, deliveryAgents, customers, vendors, addresses } =
            await this.businessService.getMappingDatafromServices(
                orderIdArray, deliveryAgentIdArray, storeIdArray, 
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
        const data = await this.businessService.getMappedData(
            deliveryAgents, customers, vendors, addresses, mappedData
        );

        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
        this.logger.log(`API requests completed in ${elapsedTime} milliseconds.`);

        return { totalOrders: total, list: data };
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/getOrderDetailsByOrderId/:orderId')
    @ApiOperation({
        summary: 'Provides order details based on order id',
        description: 'Provides order details associated with store by order id'
    })
    @ApiResponse({
        status: 200, description: 'Returns order details',
        type: BusinessOrderResponseDTO,
    })
    async getOrderDetailsByOrderId(@Param('orderId', ParseIntPipe) orderId: number) {

        const order = await this.businessService.getOrderById(orderId,);
        const customerId = order.customerId;
        const shippingAddressId = order.shippingAddressId;
        const deliveryAgentId = order.deliveryAgentId;
        const vendorId = order.vendorId


        // Get mapping data from various services
        const { orderData, deliveryAgents, vendors, customers, addresses } =
            await this.businessService.getMappingDatafromServices(
                [ order.id ], [ deliveryAgentId ], [ vendorId ], 
                [ customerId ], [ shippingAddressId ]
            );

        const mappedData = [{ ...orderData[0], ...order }];

        // Get mapped data
        const data = await this.businessService.getMappedData(
            deliveryAgents, customers, vendors, addresses, mappedData
        );

        return data[0];
    }



    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    // @Get('/getOrderDetailsByOrderId/:orderId')
    // @ApiOperation({
    //     summary: 'Provides order details based on order id',
    //     description: 'Provides order details associated with a store by order id'
    // })
    // @ApiResponse({
    //     status: 200, description: 'Returns order details by order id',
    //     type: BusinessOrderDetailsDTO,
    // })
    // async getOrderDetailsByOrderId(@Param('orderId', ParseIntPipe) orderId: number) {
    //     return this.businessService.getOrderDetailsByOrderId(orderId);
    // }

}