import { Body, Controller, Get, HttpStatus, Param, Post, Res, Query, Delete } from '@nestjs/common';

import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateActeDto } from './dto/createActe.dto';
import { ActeService } from './acte.service';

@Controller('actes')
export class ActeController {
    constructor(private acteService: ActeService) {}

    @Get()
    async getActes(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const storages: any = await this.acteService.getActes(getQueryDto);
        return res.status(HttpStatus.OK).send(storages);
    }

    @Get(':id')
    async getActeByUser(@Param('id') id: any, @Res() res: any) {
        const action: any = await this.acteService.getActeById(id);
        return res.status(HttpStatus.OK).send(action);
    }

    @Get('/folder/:id')
    async getActeByFolder(@Param('id') id: any, @Res() res: any) {
        const action: any = await this.acteService.getActeByFolder(id);
        return res.status(HttpStatus.OK).send(action);
    }

    @Post()
    async create(@Body() createActeDto: CreateActeDto) {
        return this.acteService.createActe(createActeDto);
    }

    @Delete(':id')
    async deleteActe(@Param('id') id: any) {
        return this.acteService.deleteActe(id);
    }
}
