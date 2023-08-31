import { HttpException, HttpStatus, Inject, Injectable, Logger, } from '@nestjs/common';
import { constants, } from '../../assets/constants';
import { PrismaClient } from '@prisma/client';
import { ErrorMessages } from 'src/assets/errorMessages';
import { DataManagementService } from 'src/https/microservices';
import { DataMappingService } from 'src/data-mapping/data-mapping.service';
import { FieldMapping } from 'src/data-mapping/field-mapping.interface';


@Injectable()
export class SellerService {

    private logger = new Logger(SellerService.name)
    constructor(@Inject(constants.PRISMA_CLIENT) private readonly prisma: PrismaClient,
        private dataManagementService: DataManagementService,
        private dataMappingService: DataMappingService) { }

    async getOrdersBySellerId(vendorId: number,
        page: number, pageSize: number, orderStatus: number[]) {
        try {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;

            const [orders, orders_count] = await Promise.all([
                this.prisma.order.findMany({
                    where: {
                        vendorId,
                        orderStatusId: {
                            in: orderStatus,
                        },
                    },
                    select: {
                        id: true,
                        vendorId: true,
                        orderStatusId: true,
                        deliveryAgentId: true,
                        customerId: true,
                        shippingAddressId: true
                    },
                    skip: offset,
                    take: limit,
                }),
                this.prisma.order.count({
                    where: {
                        vendorId,
                        orderStatusId: {
                            in: orderStatus,
                        },
                    },
                }),
            ]);

            return {
                totalOrders: orders_count,
                orders,
            };
        } catch (error) {
            this.logger.error('An error occurred:', error);
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: ErrorMessages.INTERNAL_SERVER_ERROR.message,
                success: false
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async getMappingDatafromServices(
        orderIdArray: number[], customerIdArray: number[],
        addressIdArray: number[]
    ) {
        try {

            // Promise.all to concurrently fetch data from multiple services
            const [orderData, customerData, addressData] = await Promise.all([
                // Fetch delivery agent data from delivery management service
                this.dataManagementService.getOrders(orderIdArray),
                // // Fetch customer data from customer service
                this.dataManagementService.getCustomers(customerIdArray),
                // Fetch address details from address service
                this.dataManagementService.getAddresses(addressIdArray),
            ]);

            // console.log("ADDRESS:", addressData?.data.data, addressIdArray)
            // console.log("CUSTOMER:", customerData, customerIdArray)

            // Return the fetched data
            return {
                orderData: orderData && orderData.data ? orderData.data.data : [],
                customers: customerData || [],
                addresses: addressData && addressData.data ? addressData.data.data : [],
            };

        } catch (error) {
            this.logger.error('An error occurred:', error);
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message ?? "Something went wrong",
                success: false
            }, HttpStatus.BAD_REQUEST);
        }
    }


    async getMappedData(
        customerArray: any[],
        addressArray: any[], orders: any[]
    ) {

        type FieldMappings<T, U> = {
            [K in keyof T]: FieldMapping<T, U>;
        };

        const fieldMappings: FieldMappings<any, any> = {
            customer: {
                idField: 'customerId',
                map: new Map(customerArray.map(customer => [customer.id, customer])),
                __all__: false,
                selectedFields: ['id', 'name', 'email'],
            },
            shippingAddress: {
                idField: 'shippingAddressId',
                map: new Map(addressArray.map(address => [address.id, address])),
                __all__: true,
                selectedFields: [],
            },
        };
        

        const data = this.dataMappingService.replaceIdsWithData(orders, fieldMappings);
        return data;
    }



    async getOrderItemDetailByOrderId(orderId: number) {
        // return await this.orderItemRepository.findByPk(orderId);
    }


    async getOrderById(orderId: number) {
        const order = await this.prisma.order.findUnique({
            where: {
                id: orderId,
            },
            select: {
                id: true,
                customerId: true,
                orderStatusId: true,
                shippingAddressId: true
            },
        });

        return order;
    }


    async findByStatus(status: number, storeId: number) {
        const orders = await this.prisma.order.findMany({
            where: {
                orderStatusId: status,
                vendorId: storeId,
            },
        });

        return orders;
    }


    async getOrderDetailsByOrderId(orderId: number) {
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
    }


    async getOrderDetailByOrderId(orderId: number) {
        const order = await this.prisma.order.findUnique({
            where: {
                id: orderId,
            },
            select: {
                orderStatus: true,
                vendorId: false,
                customerId: false,
            },
        });

        return order;
    }


    remove(id: string) {
        return `This action removes a #${id} booking`;
    }

}
