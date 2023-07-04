import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { constants } from 'src/assets/constants';

@Module({
  providers: [
    {
      provide: constants.PRISMA_CLIENT,
      useValue: new PrismaClient(),
    },
  ],
  exports: [ constants.PRISMA_CLIENT ],
})
export class DatabaseModule { }
