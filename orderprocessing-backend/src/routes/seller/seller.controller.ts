import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, UseGuards, UseInterceptors, UploadedFile, Put, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import moment from 'moment';
import { ErrorMessages } from 'src/assets/errorMessages';
import { OrderBodyDto, OrderDto } from './dto/create-order-details.dto';
import { UpdateOrderDto, UpdateOrderStatusDto } from './dto/update-order-details.dto';
import { SellerService } from './seller.service';
import { PaymentMode } from 'src/assets/constants';
import { uuid } from 'uuidv4';


@ApiTags('Orders - seller')
@Controller('seller')
export class SellerController {
    constructor(private readonly sellerService: SellerService) { }

    @Get('orders/:sellerId')
    @ApiOperation({ description: 'Provides a list of orders associated with a store using store id' })
    async getOrdersByStoreId(@Param('sellerId') sellerId: string) {
        return this.sellerService.getAllOrdersByStoreId(sellerId);
    }

    @Get('/orders/:sellerId/:cartId')
    @ApiOperation({ description: 'Provides a list of orders associated with a store by cart id' })
    async getOrdersByCartId(@Param('cartId') cartId: string, @Param('sellerId') sellerId: string) {
        return this.sellerService.getAllOrdersByCartId(sellerId, cartId);
    }

    @Get('/order/:orderId')
    @ApiOperation({ description: 'Provides a details about an order associated with a store by order id' })
    async getOrderDetailsByOrderId(@Param('orderId') orderId: string) {
        return this.sellerService.getOrderDetailByOrderId(orderId);
    }

    @Put('order/status/:orderId')
    @ApiOkResponse({ description: 'Order status updated successfully' })
    @ApiBadRequestResponse({ description: 'Invalid status or order cannot be updated in the current status' })
    @ApiNotFoundResponse({ description: 'Order not found' })
    @ApiOperation({ summary: 'Update the status of an order' })
    async updateOrderById(@Param('orderId') orderId: string, 
        @Body(ValidationPipe) updateOrderStatusDto: UpdateOrderStatusDto) {
        return this.sellerService.updateOrderStatus(orderId, updateOrderStatusDto.status);
    }

    @ApiOperation({ summary: 'Get orders by status' })
    @ApiParam({ name: 'status', required: true, description: 'Order status' })
    @ApiResponse({ status: 200, description: 'Returns the orders with the specified status', type: OrderDto, isArray: true })
    @Get()
    async getOrdersByStatus(@Query('status') status: string) {
      return this.sellerService.findByStatus(status);
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