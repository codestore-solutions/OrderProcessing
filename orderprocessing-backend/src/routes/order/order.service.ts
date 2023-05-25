import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { constants } from '../../assets/constants';
import { OrderBodyDto, OrderDto } from './dto/create-order-details.dto';
import { UpdateOrderDto } from './dto/update-order-details.dto';
import { Product } from 'src/database/entities/product.entity';
import { Address } from 'src/database/entities/address.entity';
import { ProductInventory } from 'src/database/entities/product-inventory.entity';
import { ProductAttributes } from 'src/database/entities/product-attributes.entity';
import { ErrorMessages } from 'src/assets/errorMessages';
import { Payment } from 'src/database/entities/payment.entity';
import { User } from 'src/database/entities/user.entity';
import { Order } from 'src/database/entities/order.entity';



@Injectable()
export class OrdersService {

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


    async checkProductAndInventory(orderDtos: OrderDto[]) {
        let totalAmount = 0
        for (const orderDto of orderDtos) {
            // Retrieve the product from the database
            const productId = orderDto.productId;
            const product = await this.productRepository.findByPk(productId);
            totalAmount += product.price;

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
        return { totalAmount };
    }

    async checkShippingAddress(id: string) {
        const address = await this.addressRepository.findByPk(id);
        if (!address) {
            throw new NotFoundException(ErrorMessages.ADDRESS_NOT_FOUND);
        }
    }

    async verifyPayment(id: string, totalAmount: number) {

        const payment = await this.paymentRepository.findByPk(id);

        if (!payment) {
            throw new NotFoundException(ErrorMessages.PAYMENT_NOT_DONE);
        } else if (payment.amountPaid !== totalAmount) {
            throw new NotFoundException(ErrorMessages.PAYMENT_IS_PARTIALLY_DONE);
        }
    }

    async createOrder(payload: OrderBodyDto, cartId: string) {
        const { orders, paymentId, paymentMode, userId, shippingAddressId } = payload;

        for (const order of orders) {
            await this.orderRepository.create({
                userId,
                storeId: order.storeId,
                productId: order.productId,
                quantity: order.quantity,
                productAttributeId: order.specificationId,
                cartId,
                paymentId,
                shippingAddressId,
                status: 'pending',
                paymentMode,
            });
        }
    }

    async getAllOrdersByStoreId(storeId: string) {
        return this.orderRepository.findAll({
            where: { storeId },
            include: [
                {
                    model: Product,
                    include: [
                        { model: ProductAttributes },
                        { model: ProductInventory },
                    ],
                },
                { model: Payment },
                { model: User },
                { model: Address },
            ],
        });
    }


    async getAllOrdersByCartId(storeId: string, cartId: string) {
        return this.orderRepository.findAll({
            where: { storeId, cartId },
            include: [
                { model: Product, 
                    include: [
                        { model: ProductAttributes }, 
                        { model: ProductInventory }
                    ] 
                },
                { model: Payment },
                { model: User },
                { model: Address },
            ],
        });
    }

    async getOrderDetailByOrderId(orderId: string) {
        return this.orderRepository.findOne({
            where: { orderId },
            include: [
                { model: Product, 
                    include: [
                        { model: ProductAttributes }, 
                        { model: ProductInventory }
                    ] 
                },
                { model: Payment },
                { model: User },
                { model: Address },
            ],
        });
    }

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


    update(id: string, updateOrderDto: UpdateOrderDto) {
        return this.orderRepository.update(updateOrderDto, { where: { id } })
    }

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
