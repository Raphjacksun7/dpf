import { Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { Folder } from 'src/schema/folder.schema';
import { User } from 'src/schema/user.schema';
import { GetQueryDto } from '../../dto/getQueryDto';

import { UserRepository } from '../../repositories/user.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { CreatePasswordDto } from './dto/createPassword.dto';
import { DeleteUserFolderDto } from './dto/deleteUserFolder.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(createUserDto: CreateUserDto) {
        return await this.userRepository.createUser(createUserDto);
    }

    async getUserById(id: MongooseSchema.Types.ObjectId) {
        return await this.userRepository.getUserById(id);
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.getUserByEmail(email);
    }

    async getUsers(getQueryDto: GetQueryDto) {
        return await this.userRepository.get(getQueryDto);
    }

    async userAssignedFolder(id: MongooseSchema.Types.ObjectId): Promise<Folder[]> {
        const user: User = await this.userRepository.getUserById(id);

        return {
            ...user.assignedFolder,
        };
    }

    async createPassword(id: MongooseSchema.Types.ObjectId, createPasswordDto: CreatePasswordDto): Promise<User> {
        return await this.userRepository.createPassword(id, createPasswordDto);
    }

    async assignFolder(userId: MongooseSchema.Types.ObjectId, folderIds: any) {
        for (const folderId of folderIds) {
            await this.userRepository.updateMany({ _id: userId }, { $push: { assignedFolder: folderId } });
        }
        return await this.getUserById(userId);
    }

    async removeUserFolder(userId: MongooseSchema.Types.ObjectId, deleteUserFolder: DeleteUserFolderDto) {
        const { folderId } = deleteUserFolder;
        await this.userRepository.updateMany({ _id: userId }, { $pull: { assignedFolder: folderId } });
        return await this.getUserById(userId);
    }

    async updateUser(userId: MongooseSchema.Types.ObjectId, updateUser: UpdateUserDto) {
        return await this.userRepository.updateUser(userId, updateUser);
    }

    async deleteUser(id: MongooseSchema.Types.ObjectId) {
        return await this.userRepository.deleteUser(id);
    }
}
