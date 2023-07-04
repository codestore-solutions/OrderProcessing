import { HttpException, HttpStatus, Inject, Injectable, } from '@nestjs/common';
import { constants } from '../../assets/constants';
import { ErrorMessages } from 'src/assets/errorMessages';
import AxiosService from 'src/utils/axios/axiosService';
import { ConfigService } from '@nestjs/config';
import { HttpService } from 'src/https/https.service';
import { PaymentService } from 'src/assets/endpoints';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class CustomerService {

    constructor(
        @Inject(constants.PRISMA_CLIENT) private readonly prisma: PrismaClient,
        private configService: ConfigService,) { }


    async createPaymentIntent(amount: number, currency: string) {
        try {
            const baseUrl = this.configService.get("PAYMENT_SERVICE_URL")
            const endPoint = PaymentService.create_intent
            const completeUrl = AxiosService.urlBuilder(baseUrl, endPoint)
            console.log('110000', completeUrl)

            return HttpService.post(completeUrl, { amount, currency });
        } catch (err) {
            console.log(err, '0000')
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: ErrorMessages.INTERNAL_SERVER_ERROR.message,
                success: false
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };


    async getAllOrdersByCustomerIdWithPagination(parsedId: number, page: number, pageSize: number) {
        try {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;

            const [orders, total] = await Promise.all([
                this.prisma.order.findMany({
                    where: {
                        customerId: parsedId,
                    },
                    select: {
                        id: true,
                        vendorId: true,
                        deliveryAgentId: true,
                    },
                    skip: offset,
                    take: limit,
                }),
                this.prisma.order.count({
                    where: {
                        customerId: parsedId,
                    },
                }),
            ]);

            return {
                total,
                data: orders,
            };
        } catch (error) {
            // Handle any errors or exceptions
            console.error(error);
            throw error;
        }
    }


    async getAllOrdersByCustomerId(parsedId: number) {
        try {
            const orders = await this.prisma.order.findMany({
                where: {
                    customerId: parsedId,
                },
                select: {
                    id: true,
                    vendorId: true,
                    deliveryAgentId: true,
                },
            });

            return {
                total: orders.length,
                data: orders,
            };
        } catch (error) {
            // Handle any errors or exceptions
            console.error(error);
            throw error;
        }
    }


    async getOrderDetailsByOrderId(orderId: number) {
        try {
            const order = await this.prisma.order.findUnique({
                where: {
                    id: orderId,
                },
                select: {
                    id: true,
                    customerId: true,
                    deliveryAgentId: true,
                },
            });

            return order;
        } catch (error) {
            // Handle any errors or exceptions
            console.error(error);
            throw error;
        }
    }


    async getAllOrdersBasedOnStatusWithPagination(customerId: number,
        page: number, pageSize: number, orderStatus: number[]) {
        try {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;

            const countPromise = this.prisma.order.count({
                where: {
                    customerId,
                    orderStatusId: {
                        in: orderStatus,
                    },
                },
            });

            const ordersPromise = this.prisma.order.findMany({
                where: {
                    customerId,
                    orderStatusId: {
                        in: orderStatus,
                    },
                },
                select: {
                    id: true,
                    vendorId: true,
                    deliveryAgentId: true,
                },
                take: limit,
                skip: offset,
            });

            const [orders_count, orders] = await Promise.all([countPromise, ordersPromise]);

            return {
                total: orders_count,
                data: orders,
            };
        } catch (error) {
            // Handle any errors or exceptions
            console.error(error);
            throw error;
        }
    }


    async getAllOrdersBasedOnStatus(customerId: number, orderStatus: number[]) {
        try {
            const orders = await this.prisma.order.findMany({
                where: {
                    customerId,
                    orderStatusId: {
                        in: orderStatus,
                    },
                },
                select: {
                    id: true,
                    vendorId: true,
                    deliveryAgentId: true,
                },
            });

            return {
                total: orders.length,
                data: orders,
            };
        } catch (error) {
            // Handle any errors or exceptions
            console.error(error);
            throw error;
        }
    }
}
