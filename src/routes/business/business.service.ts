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
        const fetchCustomer = (id: string) => {
            const index = users.findIndex((user) => user.id === id);
            if (index === -1) {
                return {};
            }

            const user = { ...users[index] };

            delete user.password;
            delete user.role

            return user;
        }


        const fetchStore = (id: string) => {
            const index = stores.findIndex((store) => store.id === id);
            return index === -1 ? {} : stores[index]
        }

        const fetchDeliveryAgent = (id: string) => {
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
            const userId = order.customerId
            const storeId = order.storeId
            const agentId = order.deliveryAgentId
            const customer = fetchCustomer(userId)
            const store = fetchStore(storeId)
            const agent = agentId ? fetchDeliveryAgent(agentId) : {}
            return {
                customer, store, deliveryAgent: agent,
                ...order.dataValues
            }
        })

        return modifiedOrders
    }

    async getAllOrdersByStoreIdsWithPagination(parsedStoreIds: number[],
        page: number, pageSize: number) {

        const offset = (page - 1) * pageSize;
        const limit =  pageSize;

        console.log(offset, typeof limit)

        const orders = await this.orderRepository.findAll({
            where: {
                storeId: {
                    [Op.in]: parsedStoreIds
                },
            },
            limit,
            offset,
        });

        return this.modifyOrder(orders)
    }


    async getAllOrdersByStoreIds(parsedStoreIds: number[]) {

        const orders = await this.orderRepository.findAll({
            where: {
                storeId: {
                    [Op.in]: parsedStoreIds
                },
            },
        });

        return this.modifyOrder(orders)
    }
}
