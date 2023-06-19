import { Inject, Injectable } from '@nestjs/common';
import { OrderStatusEnum, constants, orderStatus } from '../../assets/constants';
import { Order } from 'src/database/entities/order.entity';
import { Op } from 'sequelize';


@Injectable()
export class BusinessService {

    constructor(
        @Inject(constants.ORDER_REPOSITORY)
        private orderRepository: typeof Order,
    ) { }


    async getAllOrdersByStoreIdsWithPagination(parsedStoreIds: number[],
        page: number, pageSize: number, orderStatus: string[]) {

        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        const orders_count = await this.orderRepository.count({
            where: {
                storeId: {
                    [Op.in]: parsedStoreIds
                },
                orderStatus: {
                    [Op.in]: orderStatus
                },
            },
        });

        const orders = await this.orderRepository.findAll({
            where: {
                storeId: {
                    [Op.in]: parsedStoreIds,
                },
                orderStatus: {
                    [Op.in]: orderStatus
                },
            },
            attributes: ['createdAt', 'id',
                'paymentMode', 'shippingAddressId', 'storeId', 'deliveryId'],
            limit,
            offset,
        });

        return {
            total: orders_count,
            list: orders
        }
    }


    async getAllOrdersByStoreIds(parsedStoreIds: number[],  orderStatus:string[]) {

        const orders = await this.orderRepository.findAll({
            where: {
                storeId: {
                    [Op.in]: parsedStoreIds,
                },
                orderStatus: {
                    [Op.in]: orderStatus
                },
            },
            attributes: ['createdAt', 'id',
                'paymentMode', 'shippingAddressId', 'storeId', 'deliveryId'],
        });

        return {
            total: orders.length,
            lists: orders
        }
    }


    async getOrderDetailsByOrderId(orderId: number) {
        const order = await this.orderRepository.findByPk(orderId, {
            attributes: {
                exclude: ['createdBy', 'updatedAt', 'orderInstanceId', 'deliveryMode']
            },
        });

        return order
    }
}
