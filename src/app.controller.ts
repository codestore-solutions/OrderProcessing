import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('/testing')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Testing')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
