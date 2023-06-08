import { Controller, Get, ParseIntPipe, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation, ApiResponse, ApiTags
} from '@nestjs/swagger';
import { BusinessOrderDTO } from '../dto/business-order-dto';
import { BusinessService } from '../business.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { PaginationDto } from 'src/assets/dtos/pagination.dto';


@ApiTags('Orders - business')
@Controller('v1/business')
export class BusinessController {
    constructor(private readonly businessService: BusinessService) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('getOrdersByStoresId/')
    @ApiOperation({
        summary: 'Provides orders based on stores Id',
        description: 'Provides a list of orders associated with a store using stores id'
    })
    @ApiResponse({
        status: 200, description: 'Returns the packed orders with the specified stores',
        type: BusinessOrderDTO, isArray: true
    })
    async getOrdersByBusinessIds(@Query('storeIds') businessIds: string[],
        @Query('page', ParseIntPipe) page: number,
        @Query('pageSize', ParseIntPipe) pageSize: number,) {
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
}