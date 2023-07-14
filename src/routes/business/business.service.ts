import {
    HttpException, HttpStatus, Inject,
    Injectable, Logger
} from '@nestjs/common';
import { constants } from '../../assets/constants';
import { PrismaClient } from '@prisma/client';
import { ErrorMessages } from 'src/assets/errorMessages';
import { DataManagementService } from 'src/https/microservices';
import { DataMappingService } from 'src/data-mapping/data-mapping.service';
import { FieldMapping } from 'src/data-mapping/field-mapping.interface';


@Injectable()
export class BusinessService {

    private logger = new Logger(BusinessService.name)
    constructor(
        @Inject(constants.PRISMA_CLIENT) private readonly prisma: PrismaClient,
        private dataManagementService: DataManagementService,
        private dataMappingService: DataMappingService) { }

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
            this.logger.error('An error occurred:', error);
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: ErrorMessages.INTERNAL_SERVER_ERROR.message,
                success: false
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getMappingDatafromServices(
        orderIdArray: number[], deliveryAgentIdArray: number[], vendorIdArray: number[],
        customerIdArray: number[], addressIdArray: number[]
    ) {
        try {

            // Promise.all to concurrently fetch data from multiple services
            const [orderData, deliveryAgentData,
                customerData, vendorData, addressData] = await Promise.all([
                    // Fetch delivery agent data from delivery management service
                    this.dataManagementService.getOrders(orderIdArray),
                    // Fetch delivery agent data from delivery management service
                    this.dataManagementService.getDeliveryAgents(deliveryAgentIdArray),
                    // // Fetch customer data from customer service
                    this.dataManagementService.getCustomers(customerIdArray),
                    // Fetch store data from vendor management service
                    this.dataManagementService.getVendors(vendorIdArray),
                    // Fetch address details from address service
                    this.dataManagementService.getAddresses(addressIdArray),
                ]);



            // console.log("ADDRESS:", addressData?.data.data, addressIdArray)
            // console.log("CUSTOMER:", customerData, customerIdArray)
            // console.log("DELIVERY:", deliveryAgentData?.data?.data, deliveryAgentIdArray)
            // console.log("VENDORS:", vendorData?.data?.data, vendorIdArray)

            // Return the fetched data
            return {
                orderData: orderData && orderData.data ? orderData.data.data : [],
                deliveryAgents: deliveryAgentData &&
                    deliveryAgentData.data ? deliveryAgentData.data.data : [],
                customers: customerData || [],
                vendors: vendorData && vendorData.data ? vendorData.data.data : [],
                addresses: addressData && addressData.data ? addressData.data.data : [],
            };

        } catch (error) {
            this.logger.error('An error occurred:', error);
            throw new HttpException({
                statusCode: HttpStatus.SERVICE_UNAVAILABLE,
                message: ErrorMessages.SERVICE_UNAVAILABLE.message,
                success: false
            }, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }


    async getMappedData(
        deliveryAgentArray: any[],
        customerArray: any[], vendorArray: any[],
        addressArray: any[], orders: any[]
    ) {

        type FieldMappings<T, U> = {
            [K in keyof T]: FieldMapping<T, U>;
        };

        const fieldMappings: FieldMappings<any, any> = {
            vendor: {
                idField: 'vendorId',
                map: new Map(vendorArray.map(vendor => [vendor.id, vendor])),
                __all__: true,
                selectedFields: ['first_name', 'last_name', 'business', 'id'],
            },
            customer: {
                idField: 'customerId',
                map: new Map(customerArray.map(customer => [customer.id, customer])),
                __all__: false,
                selectedFields: ['id', 'name', 'email'],
            },
            deliveryAgent: {
                idField: 'deliveryAgentId',
                map: new Map(deliveryAgentArray.map(delivery => [delivery.deliveryAgentId, delivery])),
                __all__: true,
                selectedFields: [],
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


    async getAllOrdersByStoreIdsWithPagination(parsedStoreIds: number[],
        page: number, pageSize: number, orderStatus: number[]) {
        try {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;

            const [orders, orders_count] = await Promise.all([
                this.prisma.order.findMany({
                    where: {
                        vendorId: {
                            in: parsedStoreIds,
                        },
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
                        vendorId: {
                            in: parsedStoreIds,
                        },
                        orderStatusId: {
                            in: orderStatus,
                        },
                    },
                }),
            ]);

            return {
                total: orders_count,
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


    async getAllOrdersByStoreIds(parsedStoreIds: number[], orderStatus: number[]) {
        try {
            const orders = await this.prisma.order.findMany({
                where: {
                    vendorId: {
                        in: parsedStoreIds,
                    },
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
                list: orders,
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

    async getOrderDetailsByOrderId(orderId: number) {
        try {
            const order = await this.prisma.order.findUnique({
                where: {
                    id: orderId,
                },
                select: {
                    id: true,
                    vendorId: true,
                    customerId: true,
                    deliveryAgentId: true,
                    orderStatusId: true,
                },
            });

            return order;
        } catch (error) {
            this.logger.error('An error occurred:', error);
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: ErrorMessages.INTERNAL_SERVER_ERROR.message,
                success: false
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
                deliveryAgentId: true,
                vendorId: true,
                shippingAddressId: true
            },
        });

        return order;
    }

}

