import { Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../routes/user/user.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class AuthService implements OnModuleInit {
    userService: UserService;
    constructor(
        private moduleRef: ModuleRef,
        private jwtService: JwtService,
    ) {}

    onModuleInit() {
        this.userService = this.moduleRef.get(UserService, { strict: false });
    }

    async validateUser(email: string, password: string) {
        try {
            const user = this.userService.findByEmail(email);
            if(user && user.isActive) {
                if(password === user.password){
                    return user;
                }
                return null;
            }
        } catch(err) {
            console.log('Error: ', err);
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            data: {
                email: user.email,
                name: `${user.name}`,
                role: user.role,
                userId: user.id,
            }
        };
        console.log(user)

        const { password, ...userWithoutPassword } = user;
        return {
            access_token: this.jwtService.sign(payload),
            user: userWithoutPassword,
        }
    }

    decodeToken(token: string) {
        return this.jwtService.decode(token.trim());
    }
}
