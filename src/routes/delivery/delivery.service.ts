import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { constants } from '../../assets/constants';
import { OrderBodyDto, OrderDto } from './dto/create-order-details.dto';
import { Product } from 'src/database/entities/product.entity';
import { Address } from 'src/database/entities/address.entity';
import { ProductInventory } from 'src/database/entities/product-inventory.entity';
import { ProductAttributes } from 'src/database/entities/product-attributes.entity';
import { ErrorMessages } from 'src/assets/errorMessages';
import { Payment } from 'src/database/entities/payment.entity';
import { User } from 'src/database/entities/user.entity';
import { Order } from 'src/database/entities/order.entity';
import { literal } from 'sequelize';
import { Attribute } from 'src/database/entities/attributes.entity';
import sequelize from 'sequelize';


@Injectable()
export class DeliveryService {

    constructor(
        @Inject(constants.ORDER_REPOSITORY)
        private orderRepository: typeof Order,

        @Inject(constants.PRODUCT_REPOSITORY)
        private productRepository: typeof Product,

        @Inject(constants.ADDRESS_REPOSITORY)
        private addressRepository: typeof Address,

        @Inject(constants.PRODUCT_INVENTORY_REPOSITORY)
        private inventoryRepository: typeof ProductInventory,

        @Inject(constants.PRODUCT_SPECIFICATION_REPOSITORY)
        private attributesRepository: typeof ProductAttributes,

        @Inject(constants.PAYMENT_REPOSITORY)
        private paymentRepository: typeof Payment,
    ) { }

}
