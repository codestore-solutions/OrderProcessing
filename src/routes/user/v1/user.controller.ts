import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from '../user.service';
import { ApiExcludeEndpoint, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { StoreDto } from 'src/assets/dtos/store.dto';


@Controller('v1/users')
@ApiTags('Users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('listAllUsers')
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'List of users', type: UserDto, isArray: true })
    getAllUsers(): UserDto[] {
        return this.userService.getAllUsers();
    }


    @Get('getUserDetails/:id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiResponse({ status: 200, description: 'User details', type: UserDto })
    getUserById(@Param('id') id: number) {
        return this.userService.getUserById(id);
    }


    @Get('getUsersByRole')
    @ApiOperation({ summary: 'Get users by role' })
    @ApiQuery({ name: 'role', description: 'User role' })
    @ApiResponse({ status: 200, description: 'Users with the specified role', type: [UserDto] })
    getUsersByRole(@Query('role', ParseIntPipe) role: number) {
        return this.userService.getUsersByRole(role);
    }


    @ApiExcludeEndpoint()
    @Get('listAllStoresOfSeller')
    @ApiOperation({ summary: 'Get all stores' })
    @ApiResponse({ status: 200, description: 'List of stores', type: StoreDto, isArray: true })
    getAllStoresOfSeller(): StoreDto[] {
        return this.userService.getAllStores();
    }


    @ApiExcludeEndpoint()
    @Get('getStoreDetailsById/:id')
    @ApiOperation({ summary: 'Get store by store id or seller id' })
    @ApiParam({ name: 'id', description: 'Store Id / Selleer Id' })
    @ApiResponse({ status: 200, description: 'Store details', type: StoreDto })
    getStoreDetailsById(@Param('id') id: number) {
        return this.userService.getStoreById(id);
    }

}