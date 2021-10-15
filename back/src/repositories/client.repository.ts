import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Schema as MongooseSchema, UpdateQuery } from 'mongoose';

import { GetQueryDto } from '../dto/getQueryDto';
import { ResponseDto } from '../dto/response.dto';
import { Client } from '../schema/client.schema';
import { CreateClientDto } from '../modules/client/dto/createClient.dto';
import { Folder } from 'src/schema/folder.schema';
import { UpdateClientDto } from 'src/modules/client/dto/updateClient.dto';

export class ClientRepository {
    constructor(
        @InjectModel(Client.name)
        private readonly clientModel: Model<Client>,
    ) {}

    async createClient(createClientDto: CreateClientDto) {
        const { firstname, lastname, associatedDocuments } = createClientDto;
        try {
            const client = new this.clientModel({
                firstname: firstname,
                lastname: lastname,
                associatedDocuments: [...associatedDocuments],
            });
            console.log(client);

            return await client.save();
        } catch (error) {
            throw new InternalServerErrorException('Trying to save new client but got error:', error);
        }
    }

    async getClients(query: GetQueryDto) {
        // Paginar resultado, I love spanish 😅
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let clients: Client[];

        try {
            if (limit === 0) {
                clients = await this.clientModel
                    .find()
                    .populate('client')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                clients = await this.clientModel
                    .find()
                    .populate('client')
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response: ResponseDto;

            if (clients.length > 0) {
                response = {
                    ok: true,
                    data: clients,
                    message: 'Get Clients Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No client found!',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException('Trying to fetch client list but got this error:', error);
        }
    }

    async getClientById(id: MongooseSchema.Types.ObjectId) {
        try {
            const client: any = await this.clientModel
                .findById(id)
                .populate('folders', null, Folder.name)
                .exec();

            if (!client) {
                throw new NotFoundException(`Client with ID: ${id} Not Found`);
            }
            return client;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateClient(id: MongooseSchema.Types.ObjectId, updateClient: UpdateClientDto): Promise<Client> {
        const { firstname, lastname } = updateClient;
        try {
            const client = await this.clientModel
                .findOneAndUpdate(
                    { _id: id },
                    { firstname, lastname, updatedAt: new Date() },
                    {
                        new: true,
                    },
                )
                .populate('folders', null, Folder.name)
                .exec();
            return client;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async addFolder(folderId: MongooseSchema.Types.ObjectId, clientId: MongooseSchema.Types.ObjectId) {
        return await this.clientModel.updateMany(folderId, clientId);
    }

    async updateRessource(id: MongooseSchema.Types.ObjectId, updateClient: UpdateClientDto): Promise<Client> {
        const { associatedDocuments } = updateClient;
        try {
            const client = await this.clientModel
                .findOneAndUpdate(
                    { _id: id },
                    { associatedDocuments, updatedAt: new Date() },
                    {
                        new: true,
                    },
                )
                .populate('folders', null, Folder.name)
                .exec();
            return client;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateMany(filter: FilterQuery<Client>, update: UpdateQuery<Client>) {
        return await this.clientModel.updateMany(filter, update);
    }

    async deleteClient(id: MongooseSchema.Types.ObjectId) {
        await this.clientModel.deleteOne({ _id: id });
    }
}
