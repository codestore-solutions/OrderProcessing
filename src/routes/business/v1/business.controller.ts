import { Controller, Get, Param, ParseIntPipe, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation, ApiResponse, ApiTags
} from '@nestjs/swagger';
import { BusinessOrderDTO, BusinessOrderDetailsDTO, orderListDto,  } from '../dto/business-order-dto';
import { BusinessService } from '../business.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { PaginationDto } from 'src/assets/dtos/pagination.dto';


@ApiTags('Orders - business')
@Controller('v1/business')
export class BusinessController {
    constructor(private readonly businessService: BusinessService) { }

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Get('getOrdersByStoresId/')
    @ApiOperation({
        summary: 'Provides orders based on stores Id',
        description: 'Provides a list of orders associated with a store using stores id'
    })
    @ApiResponse({
        status: 200, description: 'Returns the packed orders with the specified stores',
        type: orderListDto,
    })
    async getOrdersByBusinessIds(@Query('storeIds') businessIds: string[],
        @Query('page', ParseIntPipe) page: number,
        @Query('pageSize', ParseIntPipe) pageSize: number,) {

        businessIds = Array.isArray(businessIds) ? businessIds : [businessIds];
        const parsedBusinessIds = businessIds.map(id => parseInt(id, 10));

        // Check if pagination details are provided
        if (page && pageSize) {
            return this.businessService.getAllOrdersByStoreIdsWithPagination(parsedBusinessIds, page, pageSize);
        } else {
            // Retrieve all data
            // No pagination details provided, return all results
            return this.businessService.getAllOrdersByStoreIds(parsedBusinessIds);

        }
    }


    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Get('/getOrderDetailsByOrderId/:orderId')
    @ApiOperation({
        summary: 'Provides order details based on order id',
        description: 'Provides order details associated with a store by order id'
    })
    @ApiResponse({
        status: 200, description: 'Returns order details by order id',
        type: BusinessOrderDetailsDTO,
    })
    async getOrderDetailsByOrderId(@Param('orderId') orderId: string) {
        return this.businessService.getAllOrderDetailsByOrderId(orderId);
    }

}