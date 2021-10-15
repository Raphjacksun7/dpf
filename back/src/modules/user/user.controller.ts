import { Body, Controller, Get, HttpStatus, Param, Post, Res, Query, Put, Delete } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateUserDto } from './dto/createUser.dto';
import { CreatePasswordDto } from './dto/createPassword.dto';
import { DeleteUserFolderDto } from './dto/deleteUserFolder.dto';
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
    async getUserById(@Param('id') id: any, @Res() res: any) {
        const user: any = await this.userService.getUserById(id);
        return res.status(HttpStatus.OK).send(user);
    }

    @Get(':id/folders')
    async getUserFolders(@Param('id') id: any, @Res() res: any) {
        const folders: any = await this.userService.userAssignedFolder(id);
        return res.status(HttpStatus.OK).send(folders);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Put(':id')
    async update(@Param('id') id: MongooseSchema.Types.ObjectId, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Put(':id/create-password')
    async createPassword(@Param('id') id: MongooseSchema.Types.ObjectId, @Body() createPasswordDto: CreatePasswordDto) {
        return this.userService.createPassword(id, createPasswordDto);
    }

    @Put(':id/folders/add')
    async addFolder(@Param('id') userId: any, @Body() folderIds: any) {
        return this.userService.assignFolder(userId, folderIds);
    }

    @Delete(':id')
    async delete(@Param('id') id: any) {
        return this.userService.deleteUser(id);
    }

    @Delete(':id/folders/remove')
    async removeFolder(@Param('id') userId: any, @Body() deleteUserFolder: DeleteUserFolderDto) {
        return this.userService.removeUserFolder(userId, deleteUserFolder);
    }
}
