import { Inject, Injectable } from '@nestjs/common';
import { constants, order_status } from 'src/assets/constants';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class SeedService {
    constructor(@Inject(constants.PRISMA_CLIENT) private readonly prisma: PrismaClient) { }

    async seedOrderStatus() {
        const count = await this.prisma.orderStatus.count();
        if (count === 0) {
            await this.prisma.orderStatus.createMany({
                data: order_status
            });
        }
    }
}
