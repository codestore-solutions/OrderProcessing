import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth,  ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeliveryService } from '../delivery.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { OrderDTO } from 'src/assets/dtos/order.dto';


@ApiTags('Orders - delivery')
@Controller('delivery')
export class DeliveryController {
    constructor(private readonly sellerService: DeliveryService) { }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('getOrdersByDeliveryAgentId/:agentId')
    @ApiOperation({
        summary: 'Provides orders based on agent id',
        description: 'Provides a list of orders associated with a agent using agent id'
    })
    @ApiResponse({
        status: 200, description: 'Returns the orders with the specified agent',
        type: OrderDTO, isArray: true
    })
    async getOrdersByDeliveryAgentId(@Param('agentId') agentId: string) {
        const parsedagentId = parseInt(agentId, 10);
        return this.sellerService.getAllOrdersByDeliveryAgentId(parsedagentId);
    }
}