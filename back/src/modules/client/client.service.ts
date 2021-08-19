import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { Client } from 'src/schema/client.schema';
import { Folder } from 'src/schema/folder.schema';

import { GetQueryDto } from '../../dto/getQueryDto';
import { ClientRepository } from '../../repositories/client.repository';
import { UserService } from '../user/user.service';
import { CreateClientDto } from './dto/createClient.dto';
import { UpdateClientDto } from './dto/updateClient.dto';

@Injectable()
export class ClientService {
    constructor(private readonly clientRepository: ClientRepository) {}

    async createClient(createClientDto: CreateClientDto) {
        return await this.clientRepository.createClient(createClientDto);
    }

    async getClients(getQueryDto: GetQueryDto) {
        return await this.clientRepository.getClients(getQueryDto);
    }

    async getClientById(id: MongooseSchema.Types.ObjectId) {
        return await this.clientRepository.getClientById(id);
    }


    async getFolderByClientId(id: MongooseSchema.Types.ObjectId): Promise<Folder[]> {
        const client: Client = await this.clientRepository.getClientById(id);
        
        return {
            ...client.folders,
        }
    }


    async addFolder(clientId: MongooseSchema.Types.ObjectId, folderId: MongooseSchema.Types.ObjectId) {
        return await this.clientRepository.updateMany({_id: clientId},{ $push: { folders: folderId }});
        
    }

    async removeClientFolder(clientId: MongooseSchema.Types.ObjectId, folderId: MongooseSchema.Types.ObjectId) {
        return await this.clientRepository.updateMany({_id: clientId},{ $pull: { folders: folderId }});
    }

    async updateClient(id: MongooseSchema.Types.ObjectId, updateClient: UpdateClientDto) {
        return await this.clientRepository.updateClient(id,updateClient);
    }

    async deleteClient(id: MongooseSchema.Types.ObjectId) {
        await this.clientRepository.deleteClient(id);
    }
}
