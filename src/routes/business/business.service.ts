import { Inject, Injectable } from '@nestjs/common';
import { constants } from '../../assets/constants';
import { Order } from 'src/database/entities/order.entity';
import { users } from 'src/assets/users';
import { Op } from 'sequelize';
import { stores } from 'src/assets/stores';
import { OrderDTO } from 'src/assets/dtos/order.dto';


@Injectable()
export class BusinessService {

    constructor(
        @Inject(constants.ORDER_REPOSITORY)
        private orderRepository: typeof Order,
    ) { }


    modifyOrder(orders: any) {

        const fetchStore = (id: string) => {
            const index = stores.findIndex((store) => store.id === id);
            return index === -1 ? "" : stores[index].name
        }

        const modifiedOrders = orders.map((order) => {
            const storeId = order.storeId
            const storeName = fetchStore(storeId)
            return {
                storeName,
                ...order.dataValues
            }
        })

        return modifiedOrders
    }

    async getAllOrdersByStoreIdsWithPagination(parsedStoreIds: number[],
        page: number, pageSize: number) {

        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        const orders_count = await this.orderRepository.count({
            where: {
                storeId: {
                    [Op.in]: parsedStoreIds
                },
            },
        });

        const orders = await this.orderRepository.findAll({
            where: {
                storeId: {
                    [Op.in]: parsedStoreIds
                },
            },
            attributes: ['createdAt', 'id',
                'paymentMode', 'shippingAddressId', 'storeId'],
            limit,
            offset,
        });

        return {
            total: orders_count,
            list: this.modifyOrder(orders)
        }
    }


    async getAllOrdersByStoreIds(parsedStoreIds: number[]) {

        const orders = await this.orderRepository.findAll({
            where: {
                storeId: {
                    [Op.in]: parsedStoreIds
                },
            },
            attributes: ['createdAt', 'id',
                'paymentMode', 'shippingAddressId', 'storeId'],
        });

        return {
            total: orders.length,
            lists: this.modifyOrder(orders)
        }
    }


    async getAllOrderDetailsByOrderId(orderId: string) {
        const order = await this.orderRepository.findByPk(orderId, {
            attributes: {
                exclude: ['createdBy', 'updatedAt', 'orderInstanceId', 'deliveryMode']
            },
        });

        return order
    }
}
