import { Body, Controller, Get, HttpStatus, Param, Post, Res, Query, Delete, Put } from '@nestjs/common';

import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateDModelDto } from './dto/createDModel.dto';
import { DModelService } from './d-model.service';
import { UpdateDModelDto } from './dto/updateDModel.dto';

@Controller('d-models')
export class DModelController {
    constructor(private dModelService: DModelService) {}

    @Get()
    async getModels(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const storages: any = await this.dModelService.getDModels(getQueryDto);
        return res.status(HttpStatus.OK).send(storages);
    }

    @Get(':id')
    async getModelById(@Param('id') id: any, @Res() res: any) {
        const action: any = await this.dModelService.getDModelById(id);
        return res.status(HttpStatus.OK).send(action);
    }

    @Get('/folder/:id')
    async getModelByFolder(@Param('id') id: any, @Res() res: any) {
        const action: any = await this.dModelService.getModelByFolder(id);
        return res.status(HttpStatus.OK).send(action);
    }

    @Post()
    async create(@Body() createDModeleDto: CreateDModelDto) {
        return this.dModelService.createModel(createDModeleDto);
    }

    @Put(':id')
    async updateFolder(@Param('id') id: any, @Body() updateDModelDto: UpdateDModelDto, @Res() res: any) {
        const newDmodel: any = await this.dModelService.updateDModel(id, updateDModelDto);
        return res.status(HttpStatus.OK).send(newDmodel);
    }

    @Delete(':id')
    async deleteModel(@Param('id') id: any) {
        return this.dModelService.deleteDModels(id);
    }
}
