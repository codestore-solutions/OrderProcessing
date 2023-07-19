import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
    OrderStatusEnum,
    constants, orderStatus, rolesEnum, updateStatusSuccessMessage,
} from 'src/assets/constants';
import { AssigningStatusDto, CreateOrderStatusDto, OrderAssigningStatusDto } from './dto/order-status.dto';
import { ErrorMessages } from 'src/assets/errorMessages';
import { PrismaClient } from '@prisma/client';
import { OrderEntityDto } from './dto/order.dto';


@Injectable()
export class OrderService {

    constructor(@Inject(constants.PRISMA_CLIENT) private readonly prisma: PrismaClient) { }

    async validateOrderStatus(status: number[]) {
        try {
            // Count the number of order status records where 
            // the id is present in the status array
            const count = await this.prisma.orderStatus.count({
                where: {
                    id: {
                        in: status,
                    },
                },
            });

            // Return true if the count matches the 
            // length of the status array
            return count === status.length;
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: ErrorMessages.INTERNAL_SERVER_ERROR.message,
                success: false
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOrderStatusById(orderId: number) {

        const order = await this.prisma.order.findUnique({
            where: {
                id: orderId
            },
            select: {
                orderStatusId: true,
                id: true
            }
        });
        if (!order) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                message: ErrorMessages.ORDER_NOT_FOUND.message,
                success: false
            }, HttpStatus.NOT_FOUND);
        }
        return order;
    }


    async getOrderStatus() {

        const orderStatus = await this.prisma.orderStatus.findMany();
        return orderStatus;
    }




    async getOrderTimeline(orderId: number) {
        try {
            const orderTimeline = await this.prisma.orderStatusTimeline.findMany({
                where: { orderId },
                select: { timestamp: true, orderStatusId: true }
            });
            return orderTimeline;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    async updateStatusWithAgent(orderArray: AssigningStatusDto[], orderStatus: number) {
        console.log(111, orderArray)
        for (const order of orderArray) {
            console.log(11111111111111)
            try{
                await this.prisma.order.update({
                    where: { id: order.orderId },
                    data: {
                        orderStatusId: orderStatus,
                        deliveryAgentId: order.deliveryAgentId
                    }
                });
            } catch(error){
                console.log(error)
            }

            console.log(order)
            // await this.addToOrderTimeline(order.orderId, orderStatus);
        }
    }


    async updateStatus(orders: OrderEntityDto[], status: number) {
        try {

            for (const order of orders) {
                await this.prisma.order.update({
                    where: { id: order.id },
                    data: { orderStatusId: status }
                });
                await this.addToOrderTimeline(order.id, status);
            }
        } catch (err) {
            console.log(err)
            throw err;
        }
    }


    async addToOrderTimeline(orderId: number,
        status: number) {
        try {
            await this.prisma.orderStatusTimeline.create({
                data: {
                    orderStatusId: status,
                    orderId,
                },
            });
        } catch (err) {
            console.log(err)
            throw err;
        }
    }


    async getOrders(ids: number[]) {
        const orders = await this.prisma.order.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
        return orders;
    }

    async updateAndAssignAgent(orderStatusDto: OrderAssigningStatusDto, user: any) {
        const role = user.role;
        const orders = orderStatusDto.orders

        const { orderStatus } = orderStatusDto;

        //validate role - only business admin can assign order
        if (orders.length === 0) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                message: ErrorMessages.ORDER_NOT_FOUND.message,
                success: false
            }, HttpStatus.NOT_FOUND);
        }

        const validatePreviousStatus = async (orderArray: AssigningStatusDto[],
            status: number[]) => {
            const ids = orderArray.map((item) => item.orderId)
            const orders = await this.getOrders(ids);
            for (const order of orders) {
                if (!(status.includes(order.orderStatusId))) return false;
            }
            return true;
        }

        //assigning the delivery agent to order/orders
        if (orderStatusDto.orderStatus === OrderStatusEnum.AGENT_ASSIGNED) {

            //validate role - only business admin can assign order
            if (!role || role !== rolesEnum.BusinessAdmin) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.NOT_AUTHORIZED.message,
                    success: false
                }, HttpStatus.NOT_FOUND);
            }

            // //must provide agent id in body dto
            // if (!(orderStatusDto.orders && orderStatusDto.orders,length>0)) {
            //     throw new HttpException({
            //         statusCode: HttpStatus.NOT_FOUND,
            //         message: ErrorMessages.AGENT_ID_REQUIRED.message,
            //         success: false
            //     }, HttpStatus.NOT_FOUND);
            // }

            //validate orders previous status and 
            //for assigning agent it should be packing_completed
            //only those orders with status packing_completed will get to assigned
            const previousStatus = [OrderStatusEnum.PACKING_COMPLETED];
            if (!validatePreviousStatus(orders, previousStatus)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.INVALID_ASSIGNING.message,
                    success: false
                }, HttpStatus.NOT_FOUND);
            }

            //Assign and update order status after all validation
            //sends a notification to delivery agent
            await this.updateStatusWithAgent(orders, orderStatus)
            return updateStatusSuccessMessage;
        }
    }


    async updateOrderStatus(orderStatusDto: CreateOrderStatusDto, user: any) {
        const role = user.role;
        const orderIds = [...orderStatusDto.orders]
        const orders = await this.getOrders(orderIds)

        const { status } = orderStatusDto;

        console.log(orderStatusDto, user)
        //validate role - only business admin can assign order
        if (orders.length === 0) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                message: ErrorMessages.ORDER_NOT_FOUND.message,
                success: false
            }, HttpStatus.NOT_FOUND);
        }

        function validatePreviousStatus(orders: OrderEntityDto[], status: number[]) {
            for (const order of orders) {
                if (!(status.includes(order.orderStatusId))) return false;
            }
            return true;
        }

        //update pick order status
        if (orderStatusDto.status === OrderStatusEnum.PICKED_UP) {

            //validate role - only business admin can assign order
            if (!role || role !== rolesEnum.DeliveryAgent) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.NOT_AUTHORIZED.message,
                    success: false
                }, HttpStatus.NOT_FOUND);
            }

            //must provide agent id in body dto
            if (!('agentId' in orderStatusDto)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.AGENT_ID_REQUIRED.message,
                    success: false
                }, HttpStatus.NOT_FOUND);
            }

            //validate the orders comming from frontend with
            //the one on backend with delivery agent Id
            //---------

            //validate orders previous status and 
            //for picking up, it should be agent_assigned or agent_re_assigned
            //only those orders with status agent_assigned or agent_re_assigned
            //will get to be picked up
            const previousStatus = [OrderStatusEnum.AGENT_ASSIGNED,
            OrderStatusEnum.RE_ASSIGNING];
            if (!validatePreviousStatus(orders, previousStatus)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.INVALID_PICKUP.message,
                    success: false
                }, HttpStatus.NOT_FOUND);
            }

            //update order status after all validation and 
            //sends a notification to customer when item is picked
            //----------
            await this.updateStatus(orders, status)
            return updateStatusSuccessMessage
        }

        //update pick order status
        if (orderStatusDto.status === OrderStatusEnum.ACCEPTED_BY_AGENT) {

            //validate role - only business admin can assign order
            if (!role || role !== rolesEnum.DeliveryAgent) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.NOT_AUTHORIZED.message,
                    success: false
                }, HttpStatus.NOT_FOUND);
            }

            //validate the orders comming from frontend with
            //the one on backend with delivery agent Id
            //---------

            //validate orders previous status and 
            //for picking up, it should be agent_assigned or agent_re_assigned
            //only those orders with status agent_assigned or agent_re_assigned
            //will get to be picked up
            const previousStatus = [OrderStatusEnum.AGENT_ASSIGNED];
            if (!validatePreviousStatus(orders, previousStatus)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.ACCEPTED_BY_AGENT.message,
                    success: false
                }, HttpStatus.NOT_FOUND);
            }

            //update order status after all validation and 
            //sends a notification to customer when item is picked
            //----------
            await this.updateStatus(orders, status)
            return updateStatusSuccessMessage
        }


        //update pick order status
        if (orderStatusDto.status === OrderStatusEnum.RE_ASSIGNING) {

            //validate role - only business admin can assign order
            if (!role || (role !== rolesEnum.DeliveryAgent && role !== rolesEnum.BusinessAdmin)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.NOT_AUTHORIZED.message,
                    success: false
                }, HttpStatus.NOT_FOUND);
            }

            //validate the orders comming from frontend with
            //the one on backend with delivery agent Id
            //---------

            //validate orders previous status and 
            //for picking up, it should be agent_assigned or agent_re_assigned
            //only those orders with status agent_assigned or agent_re_assigned
            //will get to be picked up
            const previousStatus = [OrderStatusEnum.AGENT_ASSIGNED];
            if (!validatePreviousStatus(orders, previousStatus)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.INVALID_RE_ASSIGNING.message,
                    success: false
                }, HttpStatus.NOT_FOUND);
            }

            //update order status after all validation and 
            //sends a notification to customer when item is picked
            //----------
            await this.updateStatus(orders, status)
            return updateStatusSuccessMessage
        }


        //reached destination update
        if (orderStatusDto.status === OrderStatusEnum.REACHED_DESTINATION) {

            //validate role - only business admin can assign order
            if (!role || role !== rolesEnum.DeliveryAgent) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.NOT_AUTHORIZED.message,
                    success: false
                }, HttpStatus.NOT_FOUND);
            }

            //validate the orders comming from frontend with
            //the one on backend with delivery agent Id
            // ---------

            //validate orders previous status and 
            //for reached desination, it should be picked_up
            const previousStatus = [OrderStatusEnum.PICKED_UP];
            if (!validatePreviousStatus(orders, previousStatus)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.INVALID_REACHED_DESINATION_UPDATE.message,
                    success: false
                }, HttpStatus.NOT_FOUND);
            }

            //update order status after all validation and 
            //sends a notification to seller and customer
            //---------
            await this.updateStatus(orders, status)
            return updateStatusSuccessMessage;
        }


        //delivered update
        if (orderStatusDto.status === OrderStatusEnum.DELIVERED) {

            //validate role - only delivery agent can deliver order
            if (!role || role !== rolesEnum.DeliveryAgent) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.NOT_AUTHORIZED.message,
                    success: false
                }, HttpStatus.NOT_FOUND);
            }

            //validate orders previous status and 
            //for delivered, it should be reached desination
            const previousStatus = [OrderStatusEnum.REACHED_DESTINATION];
            if (!validatePreviousStatus(orders, previousStatus)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.INVALID_DELIVERED_UPDATE.message,
                    success: false
                }, HttpStatus.NOT_FOUND);
            }

            //update orders status after all validation and 
            //sends a notification to seller and customer regarding delivered orders
            //---------
            await this.updateStatus(orders, status)
            return updateStatusSuccessMessage;
        }


        //orders not accepted by customer
        if (orderStatusDto.status === OrderStatusEnum.NOT_ACCEPTED_BY_CUSTOMER) {

            //validate role - only deivery agent 
            if (!role || role !== rolesEnum.DeliveryAgent) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.NOT_AUTHORIZED.message,
                    success: false
                }, HttpStatus.NOT_FOUND);
            }

            //validate orders previous status and 
            //for not accepted by customer, it should be reaced destination
            const previousStatus = [OrderStatusEnum.REACHED_DESTINATION];
            if (!validatePreviousStatus(orders, previousStatus)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.INVALID_NOT_ACCEPTED_CUSTOMER_UPDATE.message,
                    success: false
                }, HttpStatus.NOT_FOUND);
            }

            //update orders status after all validation and 
            //sends a notification to seller and customer
            //---------
            await this.updateStatus(orders, status)
            return updateStatusSuccessMessage;
        }

        //orders packing started by seller
        if (orderStatusDto.status === OrderStatusEnum.PACKING) {

            //validate role - only for seller 
            if (!role || role !== rolesEnum.Seller) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.NOT_AUTHORIZED.message,
                    success: false
                }, HttpStatus.NOT_FOUND);
            }

            //validate orders previous status and 
            //for packing, it should be pending
            const previousStatus = [OrderStatusEnum.NEW];
            if (!validatePreviousStatus(orders, previousStatus)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.INVALID_PACKING_UPDATE.message,
                    success: false
                }, HttpStatus.NOT_FOUND);
            }

            //update orders status after all validation and 
            //sends a notification to customer
            //---------
            await this.updateStatus(orders, status)
            return updateStatusSuccessMessage;
        }


        //orders packing completed
        if (orderStatusDto.status === OrderStatusEnum.PACKING_COMPLETED) {

            //validate role - only seller
            if (!role || role !== rolesEnum.Seller) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.NOT_AUTHORIZED.message,
                    success: false
                }, HttpStatus.NOT_FOUND);
            }

            //validate orders previous status and 
            //for reached desination, it should be picked_up
            const previousStatus = [OrderStatusEnum.PACKING];
            if (!validatePreviousStatus(orders, previousStatus)) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: ErrorMessages.INVALID_PACKING_COMPLETE_UPDATE.message,
                    success: false
                }, HttpStatus.NOT_FOUND);
            }

            //update orders status after all validation and 
            //sends a notification to customer and busines admin
            //---------
            await this.updateStatus(orders, status)
            return updateStatusSuccessMessage;
        }
    }
}
