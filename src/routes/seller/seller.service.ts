import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { constants, orderStatus } from '../../assets/constants';
import { OrderBodyDto, OrderDto } from './dto/create-order-details.dto';
import { Product } from 'src/database/entities/product.entity';
import { Address } from 'src/database/entities/address.entity';
import { ProductInventory } from 'src/database/entities/product-inventory.entity';
import { ProductAttributes } from 'src/database/entities/product-attributes.entity';
import { ErrorMessages } from 'src/assets/errorMessages';
import { Payment } from 'src/database/entities/payment.entity';
import { User } from 'src/database/entities/user.entity';
import { Order } from 'src/database/entities/order.entity';
import { Sequelize, literal } from 'sequelize';
import { Attribute } from 'src/database/entities/attributes.entity';
import moment from 'moment';
import sequelize from 'sequelize';
import { OrderItem } from 'src/database/entities/ordered_product';


@Injectable()
export class SellerService {

    constructor(
        @Inject(constants.ORDER_REPOSITORY)
        private orderRepository: typeof Order,

        @Inject(constants.ORDER_ITEM_REPOSITORY)
        private orderItemRepository: typeof OrderItem,

    ) { }

    async getAllOrdersBySellerIdWithPagination(parsedId: number,
        page: number, pageSize: number) {

        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        const orders_count = await this.orderRepository.count({
            where: {
                storeId: parsedId
            },
        });

        const orders = await this.orderRepository.findAll({
            where: {
                storeId: parsedId
            },
            attributes: ['createdAt', 'id',
                'paymentMode', 'shippingAddressId', 'customerId', 'deliveryId'],
            limit,
            offset,
        });

        return {
            total: orders_count,
            data: orders
        }
    }


    async getAllOrdersBySellerId(parsedId: number) {

        const orders = await this.orderRepository.findAll({
            where: {
                storeId: parsedId
            },
            attributes: ['createdAt', 'id',
                'paymentMode', 'shippingAddressId', 'customerId', 'deliveryId'],
        });

        return {
            total: orders.length,
            data: orders
        }
    }


    async getAllOrderItemsByOrderId(orderId: number) {
        return this.orderItemRepository.findAll({
            where: { orderId }
        })
    }


    async getOrderItemDetailByOrderId(orderId: number) {
        return await this.orderItemRepository.findByPk(orderId);
    }


    async findByStatus(status: string, storeId: number) {
        return this.orderRepository.findAll({
            where: { orderStatus: status, storeId: storeId }
        });
    }

    async getOrderDetailsByOrderId(orderId: number) {
        const order = await this.orderRepository.findByPk(orderId, {
            attributes: {
                exclude: ['createdBy', 'updatedAt', 'orderInstanceId', 'deliveryMode']
            },
        });

        return order
    }


    async getAllOrdersByCartId(storeId: string, cartId: string) {
        return this.orderRepository.findAll({
            where: { storeId, orderId: cartId },
            attributes: {
                exclude: ['storeId', 'userId',
                    'productAttributeId', 'shippingAddressId', 'paymentId', 'productId']
            },
            include: [
                {
                    model: Product,
                    attributes: { exclude: ['storeId', 'id'] },
                },

                {
                    model: ProductAttributes,
                    attributes: { exclude: ['id', 'attributeId', 'productId'] },
                    include: [
                        {
                            model: Attribute,
                            attributes: { exclude: ['id'] },
                        },
                    ]
                },
                {
                    model: Payment,
                    attributes: { exclude: ['id', 'storeId', 'customerId'] }
                },
                {
                    model: Address,
                    attributes: { exclude: ['id', 'userId'] }
                },
            ],
        });
    }

    async getOrderDetailByOrderId(orderId: string) {
        return this.orderRepository.findOne({
            where: { id: orderId },
            attributes: {
                exclude: ['storeId', 'customerId',
                    'productAttributeId', 'shippingAddressId', 'paymentId', 'productId']
            },
            // include: [
            //     // {
            //     //     model: User,
            //     //     as: 'customer',
            //     //     attributes: { exclude: ['id'] },
            //     // },
            //     {
            //         model: Product,
            //         attributes: { exclude: ['storeId', 'id'] },
            //     },

            //     {
            //         model: ProductAttributes,
            //         attributes: { exclude: ['id', 'attributeId', 'productId'] },
            //         include: [
            //             {
            //                 model: Attribute,
            //                 attributes: { exclude: ['id'] },
            //             },
            //         ]
            //     },
            //     {
            //         model: Payment,
            //         attributes: { exclude: ['id', 'storeId', 'customerId'] }
            //     },
            //     {
            //         model: Address,
            //         attributes: { exclude: ['id', 'customerId'] }
            //     },
            // ],
        });
    }



    // async getAllOrdersByStoreId(storeId: number) {
    //     return this.orderRepository.findAll({
    //         where: { storeId },
    //         attributes: ['cartId',
    //             [literal('COUNT(*)'), 'totalProductCount'],
    //             [sequelize.fn('SUM', sequelize.col('price')), 'totalAmount'],
    //             [sequelize.fn('SUM', sequelize.col('discount')), 'totalDiscount'],
    //             [sequelize.fn('MAX', sequelize.col('createdAt')), 'createdAt'],
    //             [sequelize.fn('MAX', sequelize.col('paymentMode')), 'paymentMode'],
    //         ],

    //         group: ['cartId'],
    //     });
    // }



    // async updateOrderStatusByCartId(cartId: string, storeId: string, status: string) {

    //     //gets orders based on cart Id, store Id
    //     const orders = await this.orderRepository.findAll({
    //         where: { cartId, storeId },
    //     });

    //     if (orders.length === 0) {
    //         throw new BadRequestException('Orders not found');
    //     }

    //     const currentState = orders[0].status;

    //     for (const order of orders) {
    //         if (order.status !== currentState) {
    //             throw new BadRequestException('All orders must be in the same state');
    //         }
    //     }

    //     if (status === 'processing' && currentState !== 'pending') {
    //         throw new BadRequestException('All orders must be in the "pending" state to update to "processing"');
    //     } else if (status === 'shipped' && currentState !== 'processing') {
    //         throw new BadRequestException('All orders must be in the "processing" state to update to "shipped"');
    //     }

    //     for (const order of orders) {
    //         order.status = status;
    //         await order.save();
    //     }
    // }


    // async updateOrderStatus(id: string, status: string) {
    //     const order = await this.orderRepository.findByPk(id);

    //     if (!order) {
    //         throw new NotFoundException(ErrorMessages.ORDER_NOT_FOUND);
    //     }

    //     switch (status) {
    //         case 'cancel':
    //             if (order.status !== 'processing' && order.status !== 'pending') {
    //                 throw new BadRequestException(ErrorMessages.CANNOT_CANCEL_ORDER);
    //             }
    //             break;
    //     }

    //     order.status = status;
    //     await order.save();

    //     return order;
    // }

    // async findByStatus(status: string, storeId: string) {

    //     const validStatus = [...orderStatus];

    //     if (!validStatus.includes(status)) {
    //         throw new BadRequestException('Invalid status value');
    //     }

    //     return this.orderRepository.findAll({
    //         where: { storeId, status },
    //         attributes: ['cartId',
    //             [literal('COUNT(*)'), 'totalProductCount'],
    //             [sequelize.fn('SUM', sequelize.col('price')), 'totalAmount'],
    //             [sequelize.fn('SUM', sequelize.col('discount')), 'totalDiscount'],
    //             [sequelize.fn('MAX', sequelize.col('createdAt')), 'createdAt'],
    //             [sequelize.fn('MAX', sequelize.col('paymentMode')), 'paymentMode'],
    //         ],

    //         group: ['cartId'],
    //         include: [
    //             {
    //                 model: User,
    //                 as: 'customer',
    //                 attributes: { exclude: ['id'] },
    //             },
    //             {
    //                 model: Address,
    //                 attributes: { exclude: ['id', 'userId'] }
    //             },
    //         ],
    //     });
    // }


    // async getOrderWithDetails() {
    //     return this.orderModel.findAll({
    //         include: [
    //             {
    //                 model: Product,
    //                 include: [
    //                     { model: Store },
    //                     { model: Specification },
    //                 ],
    //             },
    //             { model: Payment },
    //             { model: User },
    //             { model: ShippingAddress },
    //         ],
    //     });
    // }


    // update(id: string, updateOrderDto: UpdateOrderDto) {
    //     return this.orderRepository.update(updateOrderDto, { where: { id } })
    // }

    remove(id: string) {
        return `This action removes a #${id} booking`;
    }

    async getOrdersByStoreId(storeId: string) {
        return this.orderRepository.findAll({ where: { storeId } });
    }

    async createOrderDetail(OrderDto: OrderDto): Promise<void> {
        // await this.orderRepository.create(OrderDto);
    }

    async updateOrderDetail(id: string, OrderDto: OrderDto): Promise<void> {
        const orderDetails = await this.orderRepository.findByPk(id);
        if (!orderDetails) {
            throw new NotFoundException('Order detail not found');
        }
        await orderDetails.update(OrderDto);
    }
}
