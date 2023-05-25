import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, UseGuards, UseInterceptors, UploadedFile, Put, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import moment from 'moment';
import { ErrorMessages } from 'src/assets/errorMessages';
import { OrderBodyDto, OrderDto } from './dto/create-order-details.dto';
import { UpdateOrderDto } from './dto/update-order-details.dto';
import { OrdersService } from './order.service';
import { PaymentMode } from 'src/assets/constants';
import { uuid } from 'uuidv4';


@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService) { }

    @ApiOperation({ description: 'Creates a order associated with given userId, and productId' })
    @ApiResponse({ status: 201, description: 'Orders created successfully' })
    // @ApiBody({ type: OrderBodyDto })
    @Post('createOrder')
    async createOrder(@Body() OrderBodyDto: OrderBodyDto) {

        const ordersArray = Array.isArray(OrderBodyDto.orders) ?
            OrderBodyDto.orders : [OrderBodyDto.orders];

        //verification of product, inventory and product specification
        //takes price of product for validation with payment module
        const { totalAmount } = await this.orderService.checkProductAndInventory(ordersArray)

        //verification of address
        await this.orderService.checkShippingAddress(OrderBodyDto.shippingAddressId)

        //payment verification if mode is online
        if(OrderBodyDto.paymentMode !== PaymentMode.CASH_ON_DELIVERY){
            await this.orderService.verifyPayment(OrderBodyDto.paymentId, totalAmount)
        }

        //creating orders using cart Id, 
        const cartId = uuid();
        await this.orderService.createOrder(OrderBodyDto, cartId);

        //sends data to store 
    }

    // @Put(':id')
    // @ApiOperation({ description: 'Updating Order detail' })
    // async updateOrderDetail(@Param('id') id: string, @Body() OrderDto: OrderDto) {
    //     await this.orderService.updateOrderDetail(id, OrderDto);
    // }


    @Get('store/:storeId')
    @ApiOperation({ description: 'Provides a list of orders associated with a store using store id' })
    async getOrdersByStoreId(@Param('storeId') storeId: string){
        return this.orderService.getAllOrdersByStoreId(storeId);
    }

    @Get('/store/:storeId/:cartId')
    @ApiOperation({ description: 'Provides a list of orders associated with a store by cart id' })
    async getOrdersByCartId(@Param('cartId') cartId: string, @Param('storeId') storeId: string){
        return this.orderService.getAllOrdersByCartId(storeId, cartId);
    }

    @Get('/store/:orderId')
    @ApiOperation({ description: 'Provides a details about an order associated with a store by order id' })
    async getOrderDetailsByOrderId(@Param('orderId') orderId: string){
        return this.orderService.getOrderDetailByOrderId(orderId);
    }
}

