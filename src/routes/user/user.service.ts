import { Injectable } from '@nestjs/common';
import { users } from 'src/assets/users';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    private readonly users: UserDto[] = users;

    getUserById(id: string): UserDto {
        return this.users.find(user => user.id === id);
    }

    getAllUsers(): UserDto[] {
        return this.users;
    }

    findByEmail(email: string): UserDto {
        return this.users.find(user => user.email === email);
    }
}