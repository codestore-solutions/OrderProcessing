import { Controller, Get, Body, Param, Query, Put, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderDto } from './dto/create-order-details.dto';
import { sellerUpdateOrderStatusDto } from './dto/update-order-details.dto';
import { DeliveryService } from './delivery.service';


@ApiTags('Orders - delivery')
@Controller('delivery')
export class DeliveryController {
    constructor(private readonly sellerService: DeliveryService) { }

}