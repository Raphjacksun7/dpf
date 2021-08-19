import { Body, Controller, Get, HttpStatus, Param, Post, Res, Query, Put, Delete } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async getUsers(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const users: any = await this.userService.getUsers(getQueryDto);
        return res.status(HttpStatus.OK).send(users);
    }

    @Get(':id')
    async getUserById(@Param('id') id:any, @Res() res: any) {
        const user: any = await this.userService.getUserById(id);
        return res.status(HttpStatus.OK).send(user);
    }

    @Get(':id/folders')
    async getUserFolders(id: any, @Res() res: any) {
        const folders: any = await this.userService.userAssignedFolder(id);
        return res.status(HttpStatus.OK).send(folders);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Put(':id')
    async update(id: any, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Put(':id/folders/new')
    async addFolder(userId: any, @Body() folderId: any) {
        return this.userService.assignFolder(userId, folderId);
    }

    @Delete(':id')
    async delete(id: any) {
        return this.userService.deleteUser(id);
    }

    @Delete(':id/folders/remove')
    async removeFolder( userId:any, @Body() folderId: any) {
        return this.userService.removeUserFolder(userId, folderId);
    }
}
