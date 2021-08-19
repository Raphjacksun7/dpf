import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateFolderDto } from './dto/createFolder.dto';
import { UpdateFolderDto } from './dto/updateFolder.dto';
import { FolderService } from './folder.service';

@Controller('folders')
export class FolderController {
    constructor(private folderService: FolderService) {}

    @Get()
    async getfolders(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const storages: any = await this.folderService.getFolders(getQueryDto);
        return res.status(HttpStatus.OK).send(storages);
    }

    @Get(':id')
    async getfolderById(@Param('id') id: any, @Res() res: any) {
        console.log(id);

        const storage: any = await this.folderService.getFolderById(id);
        return res.status(HttpStatus.OK).send(storage);
    }

    @Post()
    async create(@Body() createFolderDto: CreateFolderDto, @Res() res: any) {
        const newfolder: any = await this.folderService.createFolder(createFolderDto);
        return res.status(HttpStatus.OK).send(newfolder);
    }

    @Put(':id')
    async updateFolder(@Param('id') id: any, @Body() updateFolderDto: UpdateFolderDto, @Res() res: any) {
        const newfolder: any = await this.folderService.updateFolder(id, updateFolderDto);
        return res.status(HttpStatus.OK).send(newfolder);
    }

    @Delete(':id')
    async delete(@Param('id') id: any, @Res() res: any) {
        const response: any = await this.folderService.deleteFolder(id);
        return res.status(HttpStatus.OK).send(response);
    }
}
