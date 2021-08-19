import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from './dto/signInUser.dto';

import { UserRepository } from '../repositories/user.repository';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../schema/user.schema';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UserRepository, private jwtService: JwtService) {}

    async validateUserByPassword(loginAttempt: SignInUserDto) {
        const user = await this.usersRepository.getByEmailAndPass(loginAttempt);
        if (user) {
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }
    }

    async validateUserByJwt(payload: JwtPayload) {
        // This will be used when the user has already logged in and has a JWT
        const user = await this.usersRepository.getUserByEmail(payload.email);

        if (user) {
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }
    }

    createJwtPayload(user) {
        const payload: JwtPayload =  {
            sub: user.id, 
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email, 
            role: user.role
        };
        return from(this.jwtService.signAsync(payload)).pipe(
            map((access_token) => {
              return { access_token };
            }),
        );
    }

    verify(token) {
        const data = this.jwtService.decode(token);
        return data;
    }
    
}


