import { HttpException, HttpStatus, Inject, Injectable, Logger, } from '@nestjs/common';
import { constants } from '../../assets/constants';
import { ErrorMessages } from 'src/assets/errorMessages';
import { PrismaClient } from '@prisma/client';
import { FieldMapping } from 'src/data-mapping/field-mapping.interface';
import { DataManagementService } from 'src/https/microservices';
import { DataMappingService } from 'src/data-mapping/data-mapping.service';


@Injectable()
export class CustomerService {

    private logger = new Logger(CustomerService.name)
    constructor(
        @Inject(constants.PRISMA_CLIENT) private readonly prisma: PrismaClient,
        private dataManagementService: DataManagementService,
        private dataMappingService: DataMappingService) { }


    async getOrdersByCustomerId(customerId: number, page: number, pageSize: number) {
        try {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;

            const [orders, total] = await Promise.all([
                this.prisma.order.findMany({
                    where: {
                        customerId: customerId,
                    },
                    select: {
                        id: true,
                        vendorId: true,
                        orderStatusId: true,
                        deliveryAgentId: true,
                        shippingAddressId: true
                    },
                    skip: offset,
                    take: limit,
                }),
                this.prisma.order.count({
                    where: {
                        customerId: customerId,
                    },
                }),
            ]);

            return {
                totalOrders: total,
                orders,
            };
        } catch (error) {
            // Handle any errors or exceptions
            console.error(error);
            throw error;
        }
    }


    async getOrdersByCustomerIdAndStatus(customerId: number,
        page: number, pageSize: number, orderStatus: number[]) {
        try {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;

            const [orders, ordersCount] = await Promise.all([
                this.prisma.order.findMany({
                    where: {
                        customerId,
                        orderStatusId: {
                            in: orderStatus,
                        },
                    },
                    select: {
                        id: true,
                        vendorId: true,
                        orderStatusId: true,
                        deliveryAgentId: true,
                        shippingAddressId: true
                    },
                    skip: offset,
                    take: limit,
                }),
                this.prisma.order.count({
                    where: {
                        customerId,
                        orderStatusId: {
                            in: orderStatus,
                        },
                    },
                }),
            ]);

            return {
                total: ordersCount,
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
        orderIdArray: number[], deliveryAgentIdArray: number[],
        vendorIdArray: number[], addressIdArray: number[]
    ) {
        try {

            // Promise.all to concurrently fetch data from multiple services
            const [orderData, deliveryAgentData,
                vendorData, addressData] = await Promise.all([
                    // Fetch delivery agent data from delivery management service
                    this.dataManagementService.getOrders(orderIdArray),
                    // Fetch delivery agent data from delivery management service
                    this.dataManagementService.getDeliveryAgents(deliveryAgentIdArray),
                    // Fetch store data from vendor management service
                    this.dataManagementService.getVendors(vendorIdArray),
                    // Fetch address details from address service
                    this.dataManagementService.getAddresses(addressIdArray),
                ]);

            // console.log("ADDRESS:", addressData?.data.data, addressIdArray)
            // console.log("DELIVERY:", deliveryAgentData?.data?.data, deliveryAgentIdArray)
            // console.log("VENDORS:", vendorData?.data?.data, vendorIdArray)

            // Return the fetched data
            return {
                orderData: orderData && orderData.data ? orderData.data.data : [],
                deliveryAgents: deliveryAgentData &&
                    deliveryAgentData.data ? deliveryAgentData.data.data : [],
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
        vendorArray: any[],
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
            deliveryAgent: {
                idField: 'deliveryAgentId',
                map: new Map(deliveryAgentArray.map(delivery => [delivery.agentId, delivery])),
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

}
