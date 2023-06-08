import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../user.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';


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
    getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

}