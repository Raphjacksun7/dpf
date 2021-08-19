import { Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';

import { FolderRepository } from '../../repositories/folder.repository';
import { UserService } from '../user/user.service';
import { CreateFolderDto } from './dto/createFolder.dto';
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

    async deleteFolder(id: MongooseSchema.Types.ObjectId) {
        return await this.folderRepository.deleteFolder(id);
    }

}
