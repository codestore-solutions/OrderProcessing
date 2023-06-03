import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, UseGuards, UseInterceptors, UploadedFile, Put, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderBodyDto } from './dto/create-order-details.dto';
import { UpdateOrderStatusDto } from './dto/update-order-details.dto';
import { CustomerService } from './customer.service';
import { PaymentMode } from 'src/assets/constants';
import { uuid } from 'uuidv4';
import { NotificationGateway } from 'src/gateway/gateway.provider';
import { NEW_ORDER } from 'src/gateway/notification.constant';


@ApiTags('Orders - customer')
@Controller('customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService,
        private readonly notificationService: NotificationGateway,
    ) { }

    @ApiOperation({ summary: 'Creates an order',
        description: 'Creates an order associated with given userId, and productId' })
    @ApiResponse({ status: 201, description: 'Orders created successfully' })
    @Post('createOrder')
    async createOrder(@Body() OrderBodyDto: OrderBodyDto) {

        const ordersArray = Array.isArray(OrderBodyDto.orders) ?
            OrderBodyDto.orders : [OrderBodyDto.orders];

        //creating orders using cart Id, 
        const cartId = uuid();

        //verification of product, inventory and product specification
        //takes prices of all product for validation with payment module
        const { totalAmount, data } = await this.customerService.checkProductAndInventory(ordersArray)

        //get and verification of address
        const address = await this.customerService.checkAndGetShippingAddress(OrderBodyDto.shippingAddressId)

        //payment verification if mode is online
        let payment = null;
        if (OrderBodyDto.paymentMode !== PaymentMode.CASH_ON_DELIVERY) {
            payment = await this.customerService.verifyPayment(OrderBodyDto.paymentId, totalAmount)
        }

        //creates an order after validations
        await this.customerService.createOrder(OrderBodyDto, cartId);

        //get customer details
        const customer = await this.customerService.getCustomerInfo(OrderBodyDto.userId);

        for (let key in data) {
            let orderData = {
                ...data[key],
                address,
                paymentMode: OrderBodyDto.paymentMode,
                cartId,
                customer,
                createdAt: new Date()
            }
            //sends data or notification to sellers when order placed
            this.notificationService.io.to(key).emit(NEW_ORDER, orderData);
        }
    }


    @Put('order/status/:orderId')
    @ApiOkResponse({ description: 'Order status updated successfully' })
    @ApiBadRequestResponse({ description: 'Invalid status or order cannot be updated in the current status' })
    @ApiNotFoundResponse({ description: 'Order not found' })
    @ApiOperation({ summary: 'Update the status of an order' })
    async updateOrderById(@Param('orderId') orderId: string, 
        @Body(ValidationPipe) updateOrderStatusDto: UpdateOrderStatusDto) {
        return this.customerService.updateOrderStatus(orderId, updateOrderStatusDto.status);
    }
}


// {
//     "orders": [
//       {
//         "productId": "7cfb6faf-7c25-4552-9f76-04b46d68136c",
//         "storeId": "eb1f91cc-0b57-4fa2-ac55-8c1848bb0903",
//         "specificationId": "614d9498-d0e0-48ec-be30-88010700e215",
//         "quantity": 2
//       },
//       {
//         "productId": "7cfb6faf-7c25-4552-9f76-04b46d68136c",
//         "storeId": "eb1f91cc-0b57-4fa2-ac55-8c1848bb0903",
//         "specificationId": "614d9498-d0e0-48ec-be30-88010700e215",
//         "quantity": 2
//       }
//     ],
//     "paymentId": "588ba8e8-d9d0-4758-90b8-6ac423ac4ba6",
//     "paymentMode": "credit card",
//     "userId": "eb1f91cc-0b57-4fa2-ac55-8c1848bb0903",
//     "shippingAddressId": "46c45f71-ff55-4e5b-98a7-53f25ac27ef0"
//   }



// eb1f91cc-0b57-4fa2-ac55-8c1848bb0903