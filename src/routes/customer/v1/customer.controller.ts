import { Controller, Get, Post, Body, Patch, Param, Put, ValidationPipe, UseGuards, UsePipes, Query, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto, CreateOrderResposeDto } from '../dto/create-order-details.dto';
import { UpdateOrderStatusDto } from '../dto/update-order-details.dto';
import { CustomerService } from '../customer.service';
import { OrderStatusEnum, PaymentMode } from 'src/assets/constants';
import { uuid } from 'uuidv4';
import { NotificationGateway } from 'src/gateway/gateway.provider';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CustomerOrderDTO, CustomerOrderListDto } from '../dto/customer-order.dto';
import { PaginationDto } from 'src/assets/dtos/pagination.dto';
import { ErrorMessages } from 'src/assets/errorMessages';
import { calculateTotalPrice } from 'src/utils';


@ApiTags('Orders - customer')
@Controller('v1/customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService,
        private readonly notificationService: NotificationGateway,
    ) { }

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    // @ApiOperation({ summary: 'Creates an order',
    //     description: 'Creates an order associated with given userId, and productId' })
    // @ApiResponse({ status: 201, description: 'Orders created successfully' })
    // @Post('createOrder')
    // async createOrder(@Body() OrderBodyDto: OrderBodyDto) {

    //     const ordersArray = Array.isArray(OrderBodyDto.orders) ?
    //         OrderBodyDto.orders : [OrderBodyDto.orders];

    //     //creating orders using cart Id, 
    //     const cartId = uuid();

    //     //verification of product, inventory and product specification
    //     //takes prices of all product for validation with payment module
    //     const { totalAmount, data } = await this.customerService.checkProductAndInventory(ordersArray)

    //     //get and verification of address
    //     const address = await this.customerService.checkAndGetShippingAddress(OrderBodyDto.shippingAddressId)

    //     //payment verification if mode is online
    //     let payment = null;
    //     if (OrderBodyDto.paymentMode !== PaymentMode.CASH_ON_DELIVERY) {
    //         payment = await this.customerService.verifyPayment(OrderBodyDto.paymentId, totalAmount)
    //     }

    //     //creates an order after validations
    //     await this.customerService.createOrder(OrderBodyDto, cartId);

    //     //get customer details
    //     const customer = await this.customerService.getCustomerInfo(OrderBodyDto.userId);

    //     for (let key in data) {
    //         let orderData = {
    //             ...data[key],
    //             address,
    //             paymentMode: OrderBodyDto.paymentMode,
    //             cartId,
    //             customer,
    //             createdAt: new Date()
    //         }
    //         //sends data or notification to sellers when order placed
    //         this.notificationService.io.to(key).emit(NEW_ORDER, orderData);
    //     }
    // }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Creates an order',
        description: 'Creates an order associated with given userId, and productId'
    })
    @ApiResponse({ type: CreateOrderResposeDto, status: 201, description: 'Orders created successfully' })
    @Post('createOrder')
    async createOrder(@Body() OrderBodyDto: CreateOrderDto) {

        //creating orders using instance Id
        const instanceId = uuid();
        const { currency } = OrderBodyDto

        const totalAmount = calculateTotalPrice(OrderBodyDto)
        const response = await this.customerService.createPaymentIntent(totalAmount, currency);
        const { clientSecret, paymentId } = response.data;
        
        //creates an order
        await this.customerService.createOrder(OrderBodyDto, paymentId , instanceId);
        return { clientSecret }

        // this.notificationService.io.to(key).emit(NEW_ORDER, orderData);
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('getOrdersByCustomerId/:customerId')
    @ApiOperation({
        summary: 'Provides orders based on customer id',
        description: 'Provides a list of orders associated with a customer using customer id'
    })
    @ApiResponse({
        status: 200, description: 'Returns the orders with the specified customer',
        type: CustomerOrderListDto, isArray: true
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    async getOrdersByStoreId(
        @Param('customerId') customerId: number,
        @Query(ValidationPipe) query: PaginationDto) {

        const { pageSize, page } = query;
        if ((pageSize && !page) || (!pageSize && page)) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: ErrorMessages.INVALID_PAGINATON_INPUT.message,
                success: false
            }, HttpStatus.BAD_REQUEST);
        }

        // Check if pagination details are provided
        if (page && pageSize) {
            return this.customerService.getAllOrdersByCustomerIdWithPagination(customerId,
                page, pageSize);
        } else {
            // Retrieve all data
            // No pagination details provided, return all results
            return this.customerService.getAllOrdersByCustomerId(customerId);
        }
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/getOrderDetailsByOrderId/:orderId')
    @ApiOperation({
        summary: 'Provides order details based on order id',
        description: 'Provides order details associated with a customer by order id'
    })
    @ApiResponse({
        status: 200, description: 'Returns order details by order id',
        type: CustomerOrderDTO,
    })
    async getOrderDetailsByOrderId(@Param('orderId') orderId: number) {
        return this.customerService.getOrderDetailsByOrderId(orderId);
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('getOrdersByCustomerIdAndStatus')
    @ApiOperation({
        summary: 'Provides orders based on customer Id and status',
        description: 'Provides a list of orders associated with a customer using customer id and status'
    })
    @ApiResponse({
        status: 200, description: 'Returns the orders with the specified customer and status',
        type: CustomerOrderListDto,
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiQuery({ name: 'orderStatus', description: 'Order status', 
        enum: OrderStatusEnum, isArray: true})
    async getOrdersByBusinessIds(
        @Param('customerId') customerId: number,
        @Query('orderStatus') orderStatus: string[],
        @Query(ValidationPipe) query: PaginationDto) {
        const { page, pageSize,} = query;

        if ((pageSize && !page) || (!pageSize && page)) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: ErrorMessages.INVALID_PAGINATON_INPUT.message,
                success: false
            }, HttpStatus.BAD_REQUEST);
        }
        // Check if pagination details are provided
        if (page && pageSize) {
            return this.customerService.getAllOrdersBasedOnStatusWithPagination(customerId,
                page, pageSize, orderStatus);
        } else {
            // Retrieve all data
            // No pagination details provided, return all results
            return this.customerService.getAllOrdersBasedOnStatus(customerId, orderStatus);

        }
    }

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    // @Put('updateOrderStatus/:orderId')
    // @ApiOkResponse({ description: 'Order status updated successfully' })
    // @ApiBadRequestResponse({ description: 'Invalid status or order cannot be updated in the current status' })
    // @ApiNotFoundResponse({ description: 'Order not found' })
    // @ApiOperation({ summary: 'Update the status of an order' })
    // async updateOrderById(@Param('orderId') orderId: string, 
    //     @Body(ValidationPipe) updateOrderStatusDto: UpdateOrderStatusDto) {
    //     // return this.customerService.updateOrderStatus(orderId, updateOrderStatusDto.status);
    // }
}
