import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Schema as MongooseSchema, UpdateQuery } from 'mongoose';

import { GetQueryDto } from '../dto/getQueryDto';
import { Folder } from '../schema/folder.schema';
import { CreateFolderDto } from '../modules/folder/dto/createFolder.dto';
import { UpdateFolderDto } from '../modules/folder/dto/updateFolder.dto';
import { UserRepository } from './user.repository';
import { ClientRepository } from './client.repository';
import { User } from 'src/schema/user.schema';
import { Client } from 'src/schema/client.schema';

export class FolderRepository {
    constructor(
        @InjectModel(Folder.name)
        private readonly folderModel: Model<Folder>,
        private userRepository: UserRepository,
        private clientRepository: ClientRepository,
    ) {}

    async createFolder(createFolderDto: CreateFolderDto) {
        const { name, status, service, clients, users } = createFolderDto;
        const newFolder = new this.folderModel({
            name: name,
            status: status,
            service: service,
            clients: clients,
            users: users,
        });
        try {
            const createdFolder = await newFolder.save();
            await this.userRepository.updateMany({ _id: users }, { $push: { assignedFolder: createdFolder.id } });
            await this.clientRepository.updateMany({ _id: clients }, { $push: { folders: createdFolder.id } });

            return createdFolder;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateFolder(id, updateFolder: UpdateFolderDto) {
        const { service, clients, users } = updateFolder;
        const updateData = {
            service: service,
            updatedAt: new Date(),
        };

        try {
            const folder = await this.folderModel
                .findOneAndUpdate({ _id: id }, updateData, {
                    new: true,
                })
                .exec();
            return folder;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getFolders(query: GetQueryDto) {
        // Paginar resultado
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let folders: Folder[];

        try {
            if (limit === 0) {
                folders = await this.folderModel
                    .find()
                    .populate('users', null, User.name)
                    .populate('clients', null, Client.name)
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                folders = await this.folderModel
                    .find()
                    .populate('users', null, User.name)
                    .populate('clients', null, Client.name)
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (folders.length > 0) {
                response = {
                    ok: true,
                    data: folders,
                    message: 'Get Folders Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No  Folders',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getFolderById(id: MongooseSchema.Types.ObjectId) {
        try {
            const folder: any = await this.folderModel
                .findById(id)
                .populate('assignedFolder', null, Folder.name)
                .exec();

            if (!folder) {
                throw new NotFoundException(`Folder with ID: ${id} Not Found`);
            }
            return folder;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateMany(filter?: FilterQuery<Folder>, update?: UpdateQuery<Folder>) {
        return await this.folderModel.updateMany(filter, update);
    }

    async deleteFolder(id: MongooseSchema.Types.ObjectId) {
        try {
            const folder = await this.folderModel.findById(id);
            if (!folder) {
                throw new NotFoundException(`Folder with ID: ${id} Not Found`);
            }
            folder.remove();
            return { message: 'Folder has been delete' };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
