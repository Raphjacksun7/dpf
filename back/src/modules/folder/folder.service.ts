import { Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';

import { FolderRepository } from '../../repositories/folder.repository';
import { UserService } from '../user/user.service';
import { CreateFolderDto } from './dto/createFolder.dto';
import { DeleteClientFolderDto } from './dto/deleteClientFolder.dto';
import { DeleteFolderUserDto } from './dto/deleteFolderUser.dto';
import { UpdateFolderDto } from './dto/updateFolder.dto';

@Injectable()
export class FolderService {
    constructor(private folderRepository: FolderRepository) {}

    async createFolder(createFolderDto: CreateFolderDto) {
        return await this.folderRepository.createFolder(createFolderDto);
    }

    async getFolderById(FolderId: MongooseSchema.Types.ObjectId) {
        return await this.folderRepository.getFolderById(FolderId);
    }

    async getFolders(getQueryDto: GetQueryDto) {
        return await this.folderRepository.getFolders(getQueryDto);
    }

    async updateFolder(id, updateFolderDto: UpdateFolderDto) {
        return await this.folderRepository.updateFolder(id, updateFolderDto);
    }

    async addUserToFolder(folderId: MongooseSchema.Types.ObjectId, userIds: any) {
        for (const userId of userIds) {
            await this.folderRepository.updateMany({ _id: folderId }, { $push: { users: userId } });
        }
        return await this.getFolderById(folderId);
    }

    async removeUserToFolder(folderId: MongooseSchema.Types.ObjectId, deleteFolderUser: DeleteFolderUserDto) {
        const { userId } = deleteFolderUser;
        await this.folderRepository.updateMany({ _id: folderId }, { $pull: { users: userId } });
        return await this.getFolderById(folderId);
    }


    async addClientToFolder(folderId: MongooseSchema.Types.ObjectId, userIds: any) {
        for (const userId of userIds) {
            await this.folderRepository.updateMany({ _id: folderId }, { $push: { clients: userId } });
        }
        return await this.getFolderById(folderId);
    }

    async removeClientFolder(folderId: MongooseSchema.Types.ObjectId, deleteClientFolder: DeleteClientFolderDto) {
        const { clientId } = deleteClientFolder;
        await this.folderRepository.updateMany({ _id: folderId }, { $pull: { clients: clientId } });
        return await this.getFolderById(folderId);
    }


    async deleteFolder(id: MongooseSchema.Types.ObjectId) {
        return await this.folderRepository.deleteFolder(id);
    }

}
