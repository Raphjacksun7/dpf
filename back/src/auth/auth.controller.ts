import { Body, Controller, Post } from '@nestjs/common';
import { SignInUserDto } from './dto/signInUser.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private userService: AuthService) {}

    @Post()
    async signInUser(@Body() signInUserDto: SignInUserDto) {
        console.log(signInUserDto);
        return this.userService.validateUserByPassword(signInUserDto);
    }


}

