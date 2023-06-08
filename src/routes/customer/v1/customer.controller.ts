import { Controller, Get, Post, Body, Patch, Param, Put, ValidationPipe, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from '../dto/create-order-details.dto';
import { UpdateOrderStatusDto } from '../dto/update-order-details.dto';
import { CustomerService } from '../customer.service';
import { PaymentMode } from 'src/assets/constants';
import { uuid } from 'uuidv4';
import { NotificationGateway } from 'src/gateway/gateway.provider';
import { NEW_ORDER } from 'src/gateway/notification.constant';
import { JwtAuthGuard } from 'src/auth/jwt.guard';


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
    @ApiOperation({ summary: 'Creates an order',
        description: 'Creates an order associated with given userId, and productId' })
    @ApiResponse({ status: 201, description: 'Orders created successfully' })
    @Post('createOrder')
    async createOrder(@Body() OrderBodyDto: CreateOrderDto) {

        //creating orders using instance Id
        const instanceId = uuid();

        //creates an order
        await this.customerService.createOrder(OrderBodyDto, instanceId);

        // this.notificationService.io.to(key).emit(NEW_ORDER, orderData);
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
