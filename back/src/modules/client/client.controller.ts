import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from '../../dto/getQueryDto';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/createClient.dto';
import { DeleteClientFolderDto } from './dto/deleteClientFolder.dto';
import { UpdateClientDto } from './dto/updateClient.dto';

@Controller('clients')
export class ClientController {
    constructor(private clientService: ClientService) {}

    @Get()
    async getClients(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const users: any = await this.clientService.getClients(getQueryDto);
        return res.status(HttpStatus.OK).send(users);
    }

    @Get(':id')
    async getClientById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: any) {
        const user: any = await this.clientService.getClientById(id);
        return res.status(HttpStatus.OK).send(user);
    }

    @Get(':id/folders')
    async getClientFolders(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: any) {
        const folders: any = await this.clientService.getFolderByClientId(id);
        return res.status(HttpStatus.OK).send(folders);
    }

    @Post()
    async create(@Body() createClientDto: CreateClientDto, @Res() res: any) {
        const newClient = await this.clientService.createClient(createClientDto);
        return res.status(HttpStatus.OK).send(newClient);
    }

    @Put(':id')
    async update(@Param('id') id: MongooseSchema.Types.ObjectId, @Body() updateClientDto: UpdateClientDto) {
        return this.clientService.updateClient(id, updateClientDto);
    }

    @Put(':id/ressources')
    async updateRessource(@Param('id') id: MongooseSchema.Types.ObjectId, @Body() updateClientDto: UpdateClientDto) {
        return this.clientService.updateRessource(id, updateClientDto);
    }

    @Put(':id/folders/add')
    async addFolder(@Param('id') userId: MongooseSchema.Types.ObjectId, @Body() folderId: MongooseSchema.Types.ObjectId) {
        return this.clientService.addFolder(userId, folderId);
    }

    @Delete(':id')
    async delete(@Param('id') id: MongooseSchema.Types.ObjectId) {
        return this.clientService.deleteClient(id);
    }

    @Delete(':id/folders/remove')
    async removeFolder(@Param('id') userId: MongooseSchema.Types.ObjectId, @Body() deleteClientFolder: DeleteClientFolderDto) {
        return this.clientService.removeClientFolder(userId, deleteClientFolder);
    }
}
