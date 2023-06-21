import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { OrderStatusEnum, PaymentStatusEnum, constants, orderStatus, paymentStatus, roles, rolesEnum, updateStatusSuccess } from 'src/assets/constants';
import { Order } from 'src/database/entities/order.entity';
import { OrderStatusEntity } from 'src/database/entities/order_status.entity';
import { OrderDto, CreateOrderStatusDto } from './dto/order-status.dto';
import { ErrorMessages } from 'src/assets/errorMessages';
import { OrderItem } from 'src/database/entities/ordered_product';

@Injectable()
export class OrderService {

    constructor(
        @Inject(constants.ORDER_REPOSITORY)
        private orderRepository: typeof Order,

        @Inject(constants.ORDER_STATUS_REPOSITORY)
        private orderStatusRepository: typeof OrderStatusEntity,

        @Inject(constants.ORDER_ITEM_REPOSITORY)
        private orderItemRepository: typeof OrderItem,
    ) { }

    
    async getAllOrderItemsByOrderId(orderId: number) {
        return this.orderItemRepository.findAll({
            where: { orderId }
        })
    }

    
    async getOrderItemDetailByOrderId(orderId: number) {
        return await this.orderItemRepository.findByPk(orderId);
    }


    async updateStatus(orders: Order[], status: string, 
        timestamp:string, agentId?: number[], orderIds?: number[]) {
        try {

            if(agentId){
                for (const order of orders) {

                    const index = orderIds.findIndex(id => id === order.id)
                    if(index !== -1){
                        order.orderStatus = status;
                        order.deliveryId = agentId[index];
                        await this.addToOrderTimeline(order.id, status, timestamp)
                        await order.save();
                    }

                }
            } else {
                for (const order of orders) {
                    order.orderStatus = status;
                    await this.addToOrderTimeline(order.id, status, timestamp)
                    await order.save();
                }
            }

        } catch (err) {
            console.log(err)
            throw err;
        }
    }


    async addToOrderTimeline(orderId: number,
        status: string, timestamp: string) {
        try {
            await this.orderStatusRepository.create({
                timestamp,
                order_id: orderId, event_type: status
            });
        } catch (err) {
            console.log(err)
            throw err;
        }
    }


    async getOrders(Ids: number[]) {
        const orders = await this.orderRepository.findAll({
            where: {
                id: {
                    [Op.in]: Ids
                },
            }
        });
        return orders
    }

    async getOrderTimeline(orderId: number) {
        await this.orderStatusRepository.findAll({
            where: {
                order_id: orderId
            },
            attributes: {
                exclude: ['id', 'order_id']
            },
        });
    }


    async updateOrderPaymentStatus(paymentId: string){
        await this.orderStatusRepository.update(
            { paymentStatus: PaymentStatusEnum.CAPTURED, 
                orderStatus: OrderStatusEnum.Pending }, 
            { where: { paymentId } } 
        );
    }


    async updateOrderStatus(orderStatusDto: CreateOrderStatusDto, user: any) {
        const role = user.role;
        const orderIds = [ ...orderStatusDto.orders ]
        const orders = await this.getOrders(orderIds)

        const { status, timestamp } = orderStatusDto;

        //validate role - only business admin can assign order
        if (orders.length === 0) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                message: ErrorMessages.ORDER_NOT_FOUND.message,
                code: ErrorMessages.ORDER_NOT_FOUND.code,
            }, HttpStatus.NOT_FOUND);
        }

        function validatePreviousStatus(orders: Order[], status: string[]) {
            for (const order of orders) {
                if (!(status.includes(order.orderStatus))) return false;
            }
            return true;
        }
        

        //assigning the delivery agent to order/orders
        if (orderStatusDto.status === OrderStatusEnum.AgentAssigned) {

            //validate role - only business admin can assign order
            if (!role || role !== rolesEnum.BUSINESS_ADMIN) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.NOT_AUTHORIZED.message,
                    code: ErrorMessages.NOT_AUTHORIZED.code,
                }, HttpStatus.NOT_FOUND);
            }

            //must provide agent id in body dto
            if (!('agentId' in orderStatusDto)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.AGENT_ID_REQUIRED.message,
                    code: ErrorMessages.AGENT_ID_REQUIRED.code,
                }, HttpStatus.NOT_FOUND);
            }

            //validate orders previous status and 
            //for assigning agent it should be packing_completed
            //only those orders with status packing_completed will get to assigned
            const previousStatus = [OrderStatusEnum.PackingCompleted];
            if (!validatePreviousStatus(orders, previousStatus)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.INVALID_ASSIGNING.message,
                    code: ErrorMessages.INVALID_ASSIGNING.code,
                }, HttpStatus.NOT_FOUND);
            }

            //Assign and update order status after all validation
            //sends a notification to delivery agent
            await this.updateStatus(orders, status, timestamp, 
                orderStatusDto.agentId, orderStatusDto.orders)
            return updateStatusSuccess(orderStatusDto.status);
        }


        //re-assigning the delivery agent to order/orders
        if (orderStatusDto.status === OrderStatusEnum.ReAssigning) {

            //validate role - only business admin can assign order
            if (!role || role !== rolesEnum.BUSINESS_ADMIN) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.NOT_AUTHORIZED.message,
                    code: ErrorMessages.NOT_AUTHORIZED.code,
                }, HttpStatus.NOT_FOUND);
            }

            //must provide agent id in body dto
            if (!('agentId' in orderStatusDto)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.AGENT_ID_REQUIRED.message,
                    code: ErrorMessages.AGENT_ID_REQUIRED.code,
                }, HttpStatus.NOT_FOUND);
            }

            //validate orders previous status and 
            //for re-assigning agent it should be agent_assigned
            //only those orders with status agent_assigned will get to re-assigned
            const previousStatus = [OrderStatusEnum.AgentAssigned];
            if (!validatePreviousStatus(orders, previousStatus)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.INVALID_RE_ASSIGNING.message,
                    code: ErrorMessages.INVALID_RE_ASSIGNING.code,
                }, HttpStatus.NOT_FOUND);
            }

            //Assign and update order status after all validation
            //sends a notification to both previous and current delivery agent
            //----------
            await this.updateStatus(orders, status, timestamp, 
                orderStatusDto.agentId, orderStatusDto.orders)

            return updateStatusSuccess(orderStatusDto.status);
        }

        //update pick order status
        if (orderStatusDto.status === OrderStatusEnum.PickedUp) {

            //validate role - only business admin can assign order
            if (!role || role !== rolesEnum.DELIVERY_AGENT) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.NOT_AUTHORIZED.message,
                    code: ErrorMessages.NOT_AUTHORIZED.code,
                }, HttpStatus.NOT_FOUND);
            }

            //must provide agent id in body dto
            if (!('agentId' in orderStatusDto)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.AGENT_ID_REQUIRED.message,
                    code: ErrorMessages.AGENT_ID_REQUIRED.code,
                }, HttpStatus.NOT_FOUND);
            }

            //validate the orders comming from frontend with
            //the one on backend with delivery agent Id
            //---------

            //validate orders previous status and 
            //for picking up, it should be agent_assigned or agent_re_assigned
            //only those orders with status agent_assigned or agent_re_assigned
            //will get to be picked up
            const previousStatus = [OrderStatusEnum.AgentAssigned,
            OrderStatusEnum.ReAssigning];
            if (!validatePreviousStatus(orders, previousStatus)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.INVALID_PICKUP.message,
                    code: ErrorMessages.INVALID_PICKUP.code,
                }, HttpStatus.NOT_FOUND);
            }

            //update order status after all validation and 
            //sends a notification to customer when item is picked
            //----------
            await this.updateStatus(orders, status, timestamp)
            return updateStatusSuccess(orderStatusDto.status);
        }


        //reached destination update
        if (orderStatusDto.status === OrderStatusEnum.ReachedDesination) {

            //validate role - only business admin can assign order
            if (!role || role !== rolesEnum.DELIVERY_AGENT) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.NOT_AUTHORIZED.message,
                    code: ErrorMessages.NOT_AUTHORIZED.code,
                }, HttpStatus.NOT_FOUND);
            }

            //validate the orders comming from frontend with
            //the one on backend with delivery agent Id
            // ---------

            //validate orders previous status and 
            //for reached desination, it should be picked_up
            const previousStatus = [OrderStatusEnum.PickedUp];
            if (!validatePreviousStatus(orders, previousStatus)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.INVALID_REACHED_DESINATION_UPDATE.message,
                    code: ErrorMessages.INVALID_REACHED_DESINATION_UPDATE.code,
                }, HttpStatus.NOT_FOUND);
            }

            //update order status after all validation and 
            //sends a notification to seller and customer
            //---------
            await this.updateStatus(orders, status, timestamp)
            return updateStatusSuccess(orderStatusDto.status);
        }


        //delivered update
        if (orderStatusDto.status === OrderStatusEnum.Delivered) {

            //validate role - only delivery agent can deliver order
            if (!role || role !== rolesEnum.DELIVERY_AGENT) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.NOT_AUTHORIZED.message,
                    code: ErrorMessages.NOT_AUTHORIZED.code,
                }, HttpStatus.NOT_FOUND);
            }

            //validate orders previous status and 
            //for delivered, it should be reached desination
            const previousStatus = [OrderStatusEnum.ReachedDesination];
            if (!validatePreviousStatus(orders, previousStatus)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.INVALID_DELIVERED_UPDATE.message,
                    code: ErrorMessages.INVALID_DELIVERED_UPDATE.code,
                }, HttpStatus.NOT_FOUND);
            }

            //update orders status after all validation and 
            //sends a notification to seller and customer regarding delivered orders
            //---------
            await this.updateStatus(orders, status, timestamp)
            return updateStatusSuccess(orderStatusDto.status);
        }


        //orders not accepted by customer
        if (orderStatusDto.status === OrderStatusEnum.NotAcceptedByCustomer) {

            //validate role - only deivery agent 
            if (!role || role !== rolesEnum.DELIVERY_AGENT) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.NOT_AUTHORIZED.message,
                    code: ErrorMessages.NOT_AUTHORIZED.code,
                }, HttpStatus.NOT_FOUND);
            }

            //validate orders previous status and 
            //for not accepted by customer, it should be reaced destination
            const previousStatus = [OrderStatusEnum.ReachedDesination];
            if (!validatePreviousStatus(orders, previousStatus)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.INVALID_NOT_ACCEPTED_CUSTOMER_UPDATE.message,
                    code: ErrorMessages.INVALID_NOT_ACCEPTED_CUSTOMER_UPDATE.code,
                }, HttpStatus.NOT_FOUND);
            }

            //update orders status after all validation and 
            //sends a notification to seller and customer
            //---------
            await this.updateStatus(orders, status, timestamp)
            return updateStatusSuccess(orderStatusDto.status);
        }

        //orders packing started by seller
        if (orderStatusDto.status === OrderStatusEnum.Packing) {

            //validate role - only for seller 
            if (!role || role !== rolesEnum.SELLER) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.NOT_AUTHORIZED.message,
                    code: ErrorMessages.NOT_AUTHORIZED.code,
                }, HttpStatus.NOT_FOUND);
            }

            //validate orders previous status and 
            //for packing, it should be pending
            const previousStatus = [OrderStatusEnum.Pending];
            if (!validatePreviousStatus(orders, previousStatus)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.INVALID_PACKING_UPDATE.message,
                    code: ErrorMessages.INVALID_PACKING_UPDATE.code,
                }, HttpStatus.NOT_FOUND);
            }

            //update orders status after all validation and 
            //sends a notification to customer
            //---------
            await this.updateStatus(orders, status, timestamp)
            return updateStatusSuccess(orderStatusDto.status);
        }


        //orders packing completed
        if (orderStatusDto.status === OrderStatusEnum.PackingCompleted) {

            //validate role - only seller
            if (!role || role !== rolesEnum.SELLER) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.NOT_AUTHORIZED.message,
                    code: ErrorMessages.NOT_AUTHORIZED.code,
                }, HttpStatus.NOT_FOUND);
            }

            //validate orders previous status and 
            //for reached desination, it should be picked_up
            const previousStatus = [OrderStatusEnum.Packing];
            if (!validatePreviousStatus(orders, previousStatus)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.INVALID_PACKING_COMPLETE_UPDATE.message,
                    code: ErrorMessages.INVALID_PACKING_COMPLETE_UPDATE.code,
                }, HttpStatus.NOT_FOUND);
            }

            //update orders status after all validation and 
            //sends a notification to customer and busines admin
            //---------
            await this.updateStatus(orders, status, timestamp)
            return updateStatusSuccess(orderStatusDto.status);
        }
    }
}