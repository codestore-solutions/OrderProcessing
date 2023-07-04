import { Injectable } from '@nestjs/common';
import { users } from 'src/assets/users';
import { UserDto } from './dto/user.dto';
import { StoreDto } from 'src/assets/dtos/store.dto';
import { stores } from 'src/assets/stores';

@Injectable()
export class UserService {
    
    private readonly users: UserDto[] = users;
    private readonly stores: StoreDto[] = stores;

    getUserById(id: number): UserDto {
        return this.users.find(user => user.id === id);
    }

    getAllUsers(): UserDto[] {
        return this.users;
    }

    getUsersByRole(role: number): UserDto[] {
        return this.users.filter(user => user.role === role);
    }

    findByEmail(email: string): UserDto {
        return this.users.find(user => user.email === email);
    }

    getStoreById(id: number): StoreDto {
        return this.stores.find(store => store.id === id);
    }

    getAllStores(): StoreDto[] {
        return this.stores;
    }
}