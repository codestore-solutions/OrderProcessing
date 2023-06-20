import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { ApiBody, ApiExcludeEndpoint, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { loginRequestBody, loginResponse } from './routes/user/dto/user.dto';
import { AuthService } from './auth/auth.service';

@ApiTags('Testing')
@Controller('/test')
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly appService: AppService) {}

  @Get()
  @ApiExcludeEndpoint()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiExcludeEndpoint()
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ description: 'When user login, an access token and user details will be provided in the response' })
  @ApiBody({ type: loginRequestBody })
  @Post('auth/login')
  @ApiOkResponse({ type: loginResponse })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
