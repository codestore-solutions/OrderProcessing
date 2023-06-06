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
import moment from 'moment';


@Injectable()
export class CustomerService {

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

        @Inject(constants.USER_REPOSITORY)
        private userRepository: typeof User,
    ) { }


    async checkProductAndInventory(orderDtos: OrderDto[]) {
        let totalAmount = 0
        let data = {};
        for (const orderDto of orderDtos) {
            const storeId = orderDto.storeId
            if(data.hasOwnProperty("storeId")){
                data[storeId]['count']++;
            } else {
                data[storeId] = {
                    count: 1, 
                    paymentAmount: 0,
                    discount: 0
                }
            }

            // Retrieve the product from the database
            const productId = orderDto.productId;
            const product = await this.productRepository.findByPk(productId);
            totalAmount += (product.price - product.discount);
            data[storeId]['paymentAmount'] += product.price;
            data[storeId]['discount'] += product.discount;

            // Check if the product exists
            if (!product) {
                throw new NotFoundException(ErrorMessages.PRODUCT_NOT_FOUND);
            }

            const variant = await this.attributesRepository.findOne({ where: { productId } })

            // Check if the product variant exists
            if (!variant) {
                throw new NotFoundException(ErrorMessages.PRODUCT_VARIANT_NOT_AVAILABLE);
            }

            const productInventory = await this.inventoryRepository.findOne({ where: { productId } });

            // Check if the product inventory exists
            if (!productInventory) {
                throw new NotFoundException(ErrorMessages.PRODUCT_OUT_OF_STOCK);
            } else if (productInventory.quantity - productInventory.quantitySold < orderDto.quantity) {
                throw new NotFoundException(ErrorMessages.PRODUCT_OUT_OF_STOCK);
            }
        }
        return { totalAmount, data };
    }


    async checkAndGetShippingAddress(id: string) {
        const address = await this.addressRepository.findByPk(id, {
            attributes: { exclude: ['id', 'userId'] }
        });
        if (!address) {
            throw new NotFoundException(ErrorMessages.ADDRESS_NOT_FOUND);
        }
        return address;
    }


    async verifyPayment(id: string, totalAmount: number) {
        const payment = await this.paymentRepository.findByPk(id, {
            attributes: {
                exclude: ['id', 'storeId', 'customerId']
            }
        });

        if (!payment) {
            throw new NotFoundException(ErrorMessages.PAYMENT_NOT_DONE);
        } else if (payment.amountPaid !== totalAmount) {
            throw new NotFoundException(ErrorMessages.PAYMENT_IS_PARTIALLY_DONE);
        }
        delete payment.amountPaid;
        return payment;
    }


    async getCustomerInfo(userId: string) {
        const user = await this.userRepository.findByPk(userId, {
            attributes: {
                exclude: ['id']
            }
        });
        return user;
    }


    async createOrder(payload: OrderBodyDto, cartId: string) {
        const { orders, paymentId, paymentMode, userId, shippingAddressId } = payload;

        for (const order of orders) {
            const product = await this.productRepository.findByPk(order.productId);

            await this.orderRepository.create({
                userId,
                storeId: order.storeId,
                productId: order.productId,
                quantity: order.quantity,
                productAttributeId: order.specificationId,
                cartId,
                paymentId,
                price: product.price,
                discount: product.discount,
                shippingAddressId,
                status: 'pending',
                paymentMode,
            });
        }
    }


    async updateOrderStatus(id: string, status: string) {
        const order = await this.orderRepository.findByPk(id);

        if (!order) {
            throw new NotFoundException(ErrorMessages.ORDER_NOT_FOUND);
        }

        const productInventory = await this.inventoryRepository.findOne({
            where: { productId: order.productId }
        });

        switch (status) {
            case 'cancelled':
                if (order.status !== 'processing' && order.status !== 'pending') {
                    throw new BadRequestException(ErrorMessages.CANNOT_CANCEL_ORDER);
                }
                if (!productInventory.canCancel) {
                    throw new BadRequestException(ErrorMessages.CANNOT_CANCEL_ORDER_INVENTORY);
                }
                break;

            case 'return':
            case 'exchanged':
                if (order.status !== 'delivered') {
                    throw new BadRequestException(ErrorMessages.CANNOT_RETURN_AND_EXCHANGE_ORDER);
                }
                const fourteenDaysAgo = new Date();
                fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

                if (moment(order.createdAt).isBefore(fourteenDaysAgo)) {
                    throw new BadRequestException(ErrorMessages.TIMEFRAME_VALIDATION_ERROR);
                }

                if (!productInventory.canExchange) {
                    throw new BadRequestException(ErrorMessages.CANNOT_EXCHANGE_ORDER_INVENTORY);
                }

                if (!productInventory.canReturn) {
                    throw new BadRequestException(ErrorMessages.CANNOT_RETURN_ORDER_INVENTORY);
                }
                break;
        }

        order.status = status;
        await order.save();

        return order;
    }

}