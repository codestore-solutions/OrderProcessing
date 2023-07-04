import { Inject, Injectable, Logger, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';
import { ServiceBusClient, ServiceBusReceiver } from '@azure/service-bus';
import { ConfigService } from '@nestjs/config';
import { constants } from 'src/assets/constants';
import { PrismaClient } from '@prisma/client';
import { CreateOrderDto } from './dto/order.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';


@Injectable()
export class ServiceBusService implements OnModuleInit, OnApplicationShutdown {
    private serviceBusClient: ServiceBusClient;
    private receiver: ServiceBusReceiver;

    private logger = new Logger(ServiceBusService.name)

    constructor(
        private readonly configService: ConfigService,
        @Inject(constants.PRISMA_CLIENT) private readonly prisma: PrismaClient,) { }

    async onModuleInit() {
        const connectionString = this.configService.get('SERVICE_BUS_CONNECTION_STRING');
        const queueName = this.configService.get('SERVICE_BUS_QUEUE_NAME');

        this.serviceBusClient = new ServiceBusClient(connectionString);
        this.receiver = this.serviceBusClient.createReceiver(queueName);
        try {
            await this.startMessageReceiver();
        } catch (error) {
            console.log(error)
        }
    }

    private async createOrder(orderData: any) {
        try {
            await this.prisma.order.create({
                data: {
                    id: orderData.orderId,
                    vendorId: orderData.vendorId,
                    customerId: orderData.customerId,
                    orderStatusId: 1,
                    shippingAddressId: orderData.shippingAddressId
                },
            });
        } catch (error) {
            this.logger.error('An error occurred:', error);
        }
    }

    private async startMessageReceiver() {
        const processMessage = async (message: any) => {
            console.log('Received message:', message.body);

            // Validate the order data against the DTO
            const orderData = message.body;
            const createOrderDto = plainToClass(CreateOrderDto, orderData);
            const validationErrors = await validate(createOrderDto);

            if (validationErrors.length > 0) {
                console.error('Invalid order data:', validationErrors);
                await this.receiver.abandonMessage(message);
            } else {
                await this.createOrder(createOrderDto);
                await this.receiver.completeMessage(message);
            }
        };

        const processError = async (error: any) => {
            console.error('Error occurred while receiving message:', error);
        };

        this.receiver.subscribe({
            processMessage,
            processError,
        });
    }

    async closeConnection() {
        if (this.receiver) {
            await this.receiver.close();
        }
        if (this.serviceBusClient) {
            await this.serviceBusClient.close();
        }
    }

    async onApplicationShutdown(signal?: string) {
        this.logger.log('Closing connection to Service Bus...');
        await this.closeConnection();
        this.logger.log('Service Bus connection closed.');
    }
}
