import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { constants } from 'src/assets/constants';
import { ErrorMessages } from 'src/assets/errorMessages';
import { DataMappingService } from 'src/data-mapping/data-mapping.service';
import { FieldMapping } from 'src/data-mapping/field-mapping.interface';
import { DataManagementService } from 'src/https/microservices';


@Injectable()
export class DeliveryService {

    private logger = new Logger(DeliveryService.name)
    constructor(@Inject(constants.PRISMA_CLIENT) private readonly prisma: PrismaClient,
        private dataManagementService: DataManagementService,
        private dataMappingService: DataMappingService) { }


    async getOrders(deliveryAgentId: number,
        page: number, pageSize: number, orderStatus: number[]) {
        try {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;

            const [orders, orders_count] = await Promise.all([
                this.prisma.order.findMany({
                    where: {
                        deliveryAgentId,
                        orderStatusId: {
                            in: orderStatus,
                        },
                    },
                    select: {
                        id: true,
                        vendorId: true,
                        orderStatusId: true,
                        customerId: true,
                        shippingAddressId: true
                    },
                    skip: offset,
                    take: limit,
                }),
                this.prisma.order.count({
                    where: {
                        deliveryAgentId,
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
        orderIdArray: number[], vendorIdArray: number[],
        customerIdArray: number[], addressIdArray: number[]
    ) {
        try {

            // Promise.all to concurrently fetch data from multiple services
            const [orderData, customerData, vendorData, addressData] = await Promise.all([
                // Fetch delivery agent data from delivery management service
                this.dataManagementService.getOrders(orderIdArray),
                // // Fetch customer data from customer service
                this.dataManagementService.getCustomers(customerIdArray),
                // Fetch store data from vendor management service
                this.dataManagementService.getVendors(vendorIdArray),
                // Fetch address details from address service
                this.dataManagementService.getAddresses(addressIdArray),
            ]);

            // console.log("ADDRESS:", addressData?.data.data, addressIdArray)
            // console.log("CUSTOMER:", customerData, customerIdArray)

            // Return the fetched data
            return {
                orderData: orderData && orderData.data ? orderData.data.data : [],
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
