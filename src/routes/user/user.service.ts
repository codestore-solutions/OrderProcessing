import { Injectable } from '@nestjs/common';
import { users } from 'src/assets/users';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    private readonly users: UserDto[] = users;

    getUserById(id: number): UserDto {
        return this.users.find(user => user.id === id);
    }

    getAllUsers(): UserDto[] {
        return this.users;
    }
}