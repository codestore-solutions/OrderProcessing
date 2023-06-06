import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OrderStatusEnum, constants, orderStatus } from '../../assets/constants';
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
import { users } from 'src/assets/users';
import { Op } from 'sequelize';
import { shippingAddresses } from 'src/assets/address';
import { stores } from 'src/assets/stores';


@Injectable()
export class BusinessService {

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


    async getAllOrdersByBusinessId(businessId: number) {


        const storesIds = stores.filter(item => (item.businessId === businessId))
        const orders = await this.orderRepository.findAll({
            where: {
                storeId: {
                    [Op.in]: storesIds.map((item) => item.id),
                },
                status: OrderStatusEnum.PackingCompleted
            },
            attributes: ['cartId', 'userId', 'shippingAddressId', 'storeId',
                [literal('COUNT(*)'), 'totalProductCount'],
                [sequelize.fn('SUM', sequelize.col('price')), 'totalAmount'],
                [sequelize.fn('SUM', sequelize.col('discount')), 'totalDiscount'],
                [sequelize.fn('MAX', sequelize.col('createdAt')), 'createdAt'],
                [sequelize.fn('MAX', sequelize.col('paymentMode')), 'paymentMode'],
            ],
            group: ['cartId'],
        });

        const fetchCustomer = (id: number) => {
            const index = users.findIndex((user) => user.id === id);
            if (index === -1) {
                return {};
            }

            const user = { ...users[index] };

            delete user.password;
            delete user.role

            return user;
        }

        const fetchAddress = (id: number) => {
            const index = shippingAddresses.findIndex((address) => address.id === id);
            return index === -1 ? {} : shippingAddresses[index]
        }

        const fetchStore = (id: number) => {
            const index = stores.findIndex((store) => store.id === id);
            return index === -1 ? {} : stores[index]
        }

        const fetchDeliveryAgent = (id: number) => {
            const index = users.findIndex((user) => user.id === id && user?.role === 'delivery-agent');

            if (index === -1) {
                return {};
            }

            const user = { ...users[index] };

            delete user.password;
            delete user.role

            return user;
        }



        const modifiedOrders = orders.map((order) => {
            const userId = order.userId
            const addressId = order.shippingAddressId
            const storeId = order.storeId
            const agentId = order.deliveryAgentId
            const customer = fetchCustomer(userId)
            const address = fetchAddress(addressId)
            const store = fetchStore(storeId)
            const agent = agentId ? fetchDeliveryAgent(agentId) : {}
            return {
                customer, address, store, deliveryAgent: agent,
                ...order.dataValues
            }
        })

        return modifiedOrders
    }


    async getAllOrdersByCartId(storeId: string, cartId: string) {
        return this.orderRepository.findAll({
            where: { storeId, cartId },
            attributes: {
                exclude: ['storeId', 'userId',
                    'productAttributeId', 'shippingAddressId', 'paymentId', 'productId']
            },
            include: [
                {
                    model: User,
                    as: 'customer',
                    attributes: { exclude: ['id'] },
                },
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
                exclude: ['storeId', 'userId',
                    'productAttributeId', 'shippingAddressId', 'paymentId', 'productId']
            },
            include: [
                {
                    model: User,
                    as: 'customer',
                    attributes: { exclude: ['id'] },
                },
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


    async updateOrderStatusByCartId(cartId: string, storeId: string, status: string) {

        //gets orders based on cart Id, store Id
        const orders = await this.orderRepository.findAll({
            where: { cartId, storeId },
        });

        if (orders.length === 0) {
            throw new BadRequestException('Orders not found');
        }

        const currentState = orders[0].status;

        for (const order of orders) {
            if (order.status !== currentState) {
                throw new BadRequestException('All orders must be in the same state');
            }
        }

        if (status === 'processing' && currentState !== 'pending') {
            throw new BadRequestException('All orders must be in the "pending" state to update to "processing"');
        } else if (status === 'shipped' && currentState !== 'processing') {
            throw new BadRequestException('All orders must be in the "processing" state to update to "shipped"');
        }

        for (const order of orders) {
            order.status = status;
            await order.save();
        }
    }


    async updateOrderStatus(id: string, status: string) {
        const order = await this.orderRepository.findByPk(id);

        if (!order) {
            throw new NotFoundException(ErrorMessages.ORDER_NOT_FOUND);
        }

        switch (status) {
            case 'cancel':
                if (order.status !== 'processing' && order.status !== 'pending') {
                    throw new BadRequestException(ErrorMessages.CANNOT_CANCEL_ORDER);
                }
                break;
        }

        order.status = status;
        await order.save();

        return order;
    }

    async findByStatus(status: string, storeId: string) {

        const validStatus = [...orderStatus];

        if (!validStatus.includes(status)) {
            throw new BadRequestException('Invalid status value');
        }

        return this.orderRepository.findAll({
            where: { storeId, status },
            attributes: ['cartId',
                [literal('COUNT(*)'), 'totalProductCount'],
                [sequelize.fn('SUM', sequelize.col('price')), 'totalAmount'],
                [sequelize.fn('SUM', sequelize.col('discount')), 'totalDiscount'],
                [sequelize.fn('MAX', sequelize.col('createdAt')), 'createdAt'],
                [sequelize.fn('MAX', sequelize.col('paymentMode')), 'paymentMode'],
            ],

            group: ['cartId'],
            include: [
                {
                    model: User,
                    as: 'customer',
                    attributes: { exclude: ['id'] },
                },
                {
                    model: Address,
                    attributes: { exclude: ['id', 'userId'] }
                },
            ],
        });
    }

}
