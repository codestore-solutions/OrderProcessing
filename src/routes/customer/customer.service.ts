import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OrderStatusEnum, PaymentMode, constants, deliveryModes, roles } from '../../assets/constants';
import { CreateOrderDto, StoreOrderItemDto } from './dto/create-order-details.dto';
import { Product } from 'src/database/entities/product.entity';
import { Address } from 'src/database/entities/address.entity';
import { ProductInventory } from 'src/database/entities/product-inventory.entity';
import { ProductAttributes } from 'src/database/entities/product-attributes.entity';
import { ErrorMessages } from 'src/assets/errorMessages';
import { Payment } from 'src/database/entities/payment.entity';
import { User } from 'src/database/entities/user.entity';
import { Order } from 'src/database/entities/order.entity';
import moment from 'moment';
import { OrderItem } from 'src/database/entities/ordered_product';
import { shippingAddresses } from 'src/assets/address';
import { OrderDBDto } from 'src/assets/dtos/order.dto';
import { Op } from 'sequelize';
import AxiosService from 'src/utils/axios/axiosService';
import { ConfigService } from '@nestjs/config';
import { HttpService } from 'src/https/https.service';
import { PaymentService } from 'src/assets/endpoints';


@Injectable()
export class CustomerService {

    constructor(
        @Inject(constants.ORDER_REPOSITORY)
        private orderRepository: typeof Order,

        @Inject(constants.ORDER_ITEM_REPOSITORY)
        private orderItemRepository: typeof OrderItem,

        private configService: ConfigService,
    ) { }


    async createPaymentIntent (amount: number, currency: string) {
        try{
            const baseUrl = this.configService.get("PAYMENT_SERVICE_URL")
            const endPoint = PaymentService.create_intent
            const completeUrl = AxiosService.urlBuilder(baseUrl, endPoint)
            console.log('110000', completeUrl)

            return HttpService.post(completeUrl, { amount, currency });
        } catch(err) {
            console.log(err, '0000')
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: ErrorMessages.INTERNAL_SERVER_ERROR.message,
                success: false
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
    

    async createOrder(payload: CreateOrderDto, paymentId: string, instanceId: string) {
        const { ordersFromStore, paymentMode,
            shippingAddressId, customerId } = payload;

        const createOrder = async (order: StoreOrderItemDto, orderId: number) => {
            try {
                await this.orderItemRepository.create({ orderId, ...order });
            } catch (error) {
                console.error(`Error creating order`);
            }
        };

        for (const order of ordersFromStore) {
            const orderInstance: OrderDBDto = {
                paymentId,
                orderInstanceId: instanceId,
                paymentMode,
                orderStatus: PaymentMode.CASH_ON_DELIVERY === paymentMode ? 
                    OrderStatusEnum.Pending: OrderStatusEnum.NOT_PROCESSED,
                shippingAddressId,
                customerId,
                paymentStatus: 'CAPTURED',
                product_count: order.orderItems.length,
                createdBy: 'CUSTOMER',
                deliveryCharge: order.deliveryCost,
                storeId: order.storeId,
            }
            const { id } = await this.orderRepository.create({ ...orderInstance });
            for (const orderItem of order.orderItems) {
                await createOrder(orderItem, id);
            }
        }

    }

    async getAllOrdersByCustomerIdWithPagination(parsedId: number,
        page: number, pageSize: number) {

        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        const orders_count = await this.orderRepository.count({
            where: {
                customerId: parsedId
            },
        });

        const orders = await this.orderRepository.findAll({
            where: {
                customerId: parsedId
            },
            attributes: ['createdAt', 'id',
                'paymentMode', 'shippingAddressId', 'storeId', 'deliveryId'],
            limit,
            offset,
        });

        return {
            total: orders_count,
            data: orders
        }
    }


    async getAllOrdersByCustomerId(parsedId: number) {

        const orders = await this.orderRepository.findAll({
            where: {
                customerId: parsedId
            },
            attributes: ['createdAt', 'id',
                'paymentMode', 'shippingAddressId', 'storeId', 'deliveryId'],
        });

        return {
            total: orders.length,
            data: orders
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


    async getAllOrdersBasedOnStatusWithPagination(customerId: number,
        page: number, pageSize: number, orderStatus: string[]) {

        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        const orders_count = await this.orderRepository.count({
            where: {
                customerId: customerId,
                orderStatus: {
                    [Op.in]: orderStatus
                },
            },
        });

        const orders = await this.orderRepository.findAll({
            where: {
                customerId: customerId,
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
            data: orders
        }
    }


    async getAllOrdersBasedOnStatus(customerId: number,  orderStatus:string[]) {

        const orders = await this.orderRepository.findAll({
            where: {
                customerId: customerId,
                orderStatus: {
                    [Op.in]: orderStatus
                },
            },
            attributes: ['createdAt', 'id',
                'paymentMode', 'shippingAddressId', 'storeId', 'deliveryId'],
        });

        return {
            total: orders.length,
            data: orders
        }
    }   

    // async checkProductAndInventory(orderDtos) {
    //     let totalAmount = 0
    //     let data = {};
    //     for (const orderDto of orderDtos) {
    //         const storeId = orderDto.storeId
    //         if (data.hasOwnProperty("storeId")) {
    //             data[storeId]['count']++;
    //         } else {
    //             data[storeId] = {
    //                 count: 1,
    //                 paymentAmount: 0,
    //                 discount: 0
    //             }
    //         }

    //         // Retrieve the product from the database
    //         const productId = orderDto.productId;
    //         const product = await this.productRepository.findByPk(productId);
    //         totalAmount += (product.price - product.discount);
    //         data[storeId]['paymentAmount'] += product.price;
    //         data[storeId]['discount'] += product.discount;

    //         // Check if the product exists
    //         if (!product) {
    //             throw new NotFoundException(ErrorMessages.PRODUCT_NOT_FOUND);
    //         }

    //         const variant = await this.attributesRepository.findOne({ where: { productId } })

    //         // Check if the product variant exists
    //         if (!variant) {
    //             throw new NotFoundException(ErrorMessages.PRODUCT_VARIANT_NOT_AVAILABLE);
    //         }

    //         const productInventory = await this.inventoryRepository.findOne({ where: { productId } });

    //         // Check if the product inventory exists
    //         if (!productInventory) {
    //             throw new NotFoundException(ErrorMessages.PRODUCT_OUT_OF_STOCK);
    //         } else if (productInventory.quantity - productInventory.quantitySold < orderDto.quantity) {
    //             throw new NotFoundException(ErrorMessages.PRODUCT_OUT_OF_STOCK);
    //         }
    //     }
    //     return { totalAmount, data };
    // }


    // async checkAndGetShippingAddress(id: string) {
    //     const address = await this.addressRepository.findByPk(id, {
    //         attributes: { exclude: ['id', 'userId'] }
    //     });
    //     if (!address) {
    //         throw new NotFoundException(ErrorMessages.ADDRESS_NOT_FOUND);
    //     }
    //     return address;
    // }


    // async verifyPayment(id: string, totalAmount: number) {
    //     const payment = await this.paymentRepository.findByPk(id, {
    //         attributes: {
    //             exclude: ['id', 'storeId', 'customerId']
    //         }
    //     });

    //     if (!payment) {
    //         throw new NotFoundException(ErrorMessages.PAYMENT_NOT_DONE);
    //     } else if (payment.amountPaid !== totalAmount) {
    //         throw new NotFoundException(ErrorMessages.PAYMENT_IS_PARTIALLY_DONE);
    //     }
    //     delete payment.amountPaid;
    //     return payment;
    // }


    // async getCustomerInfo(userId: string) {
    //     const user = await this.userRepository.findByPk(userId, {
    //         attributes: {
    //             exclude: ['id']
    //         }
    //     });
    //     return user;
    // }


    // async createOrder(payload: OrderBodyDto, instanceId: string) {
    //     const { orders, paymentId, paymentMode, shippingAddressId, customerId } = payload;

    //     let storeOrders = {}
    //     for (const order of orders) {
    //         const { storeId, ...orderData } = order;
    //         if (storeOrders.hasOwnProperty(order.storeId)) {
    //             storeOrders[storeId]['productCount']++;
    //             storeOrders[storeId]['orders'].push(orderData)
    //         } else {
    //             storeOrders[storeId]['productCount'] = 1;
    //             storeOrders[storeId]['customerId'] = customerId;
    //             storeOrders[storeId]['shippingAddressId'] = shippingAddressId;
    //             storeOrders[storeId]['PaymentId'] = paymentId;
    //             storeOrders[storeId]['storeId'] = storeId;
    //             storeOrders[storeId]['paymentMode'] = paymentMode;
    //             storeOrders[storeId]['paymentStatus'] = 'COMPLETED';
    //             storeOrders[storeId]['createdBy'] = 'CUSTOMER';
    //             storeOrders[storeId]['orders'] = [{ ...orderData }]
    //             storeOrders[storeId]['orderinstanceId'] = instanceId

    //         }
    //     }

    //     const createOrder = async (order: OrderDto, orderId: string) => {
    //         try {
    //             await this.orderItemRepository.create({ orderId, ...order });
    //         } catch (error) {
    //             console.error(`Error creating order`);
    //         }
    //     };

    //     for (const key in storeOrders) {
    //         const { id } = await this.orderRepository.create({ ...storeOrders[key] });
    //         for (const order of storeOrders[key]['orders']) {
    //             await createOrder(order, id);
    //         }
    //     }

    // }


    // async updateOrderStatus(id: string, status: string) {
    //     const order = await this.orderRepository.findByPk(id);

    //     if (!order) {
    //         throw new NotFoundException(ErrorMessages.ORDER_NOT_FOUND);
    //     }

    //     const productInventory = await this.inventoryRepository.findOne({
    //         where: { productId: order.productId }
    //     });

    //     switch (status) {
    //         case 'cancelled':
    //             if (order.status !== 'processing' && order.status !== 'pending') {
    //                 throw new BadRequestException(ErrorMessages.CANNOT_CANCEL_ORDER);
    //             }
    //             if (!productInventory.canCancel) {
    //                 throw new BadRequestException(ErrorMessages.CANNOT_CANCEL_ORDER_INVENTORY);
    //             }
    //             break;

    //         case 'return':
    //         case 'exchanged':
    //             if (order.status !== 'delivered') {
    //                 throw new BadRequestException(ErrorMessages.CANNOT_RETURN_AND_EXCHANGE_ORDER);
    //             }
    //             const fourteenDaysAgo = new Date();
    //             fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    //             if (moment(order.createdAt).isBefore(fourteenDaysAgo)) {
    //                 throw new BadRequestException(ErrorMessages.TIMEFRAME_VALIDATION_ERROR);
    //             }

    //             if (!productInventory.canExchange) {
    //                 throw new BadRequestException(ErrorMessages.CANNOT_EXCHANGE_ORDER_INVENTORY);
    //             }

    //             if (!productInventory.canReturn) {
    //                 throw new BadRequestException(ErrorMessages.CANNOT_RETURN_ORDER_INVENTORY);
    //             }
    //             break;
    //     }

    //     order.status = status;
    //     await order.save();

    //     return order;
    // }

}
