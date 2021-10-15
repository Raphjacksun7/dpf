import { Body, Controller, Get, HttpStatus, Param, Post, Res, Query, Delete, Put } from '@nestjs/common';

import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateActivityReportDto } from './dto/createActivityReport.dto';
import { ActivityReportService } from './activity-report.service';
import { UpdateActivityReportDto } from './dto/updateActivityReport.dto';

@Controller('actes')
export class ActivityReportController {
    constructor(private activityReportService: ActivityReportService) {}

    @Get()
    async getActes(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const storages: any = await this.activityReportService.getActes(getQueryDto);
        return res.status(HttpStatus.OK).send(storages);
    }

    @Get(':id')
    async getActeByUser(@Param('id') id: any, @Res() res: any) {
        const acte: any = await this.activityReportService.getActeById(id);
        return res.status(HttpStatus.OK).send(acte);
    }

    @Get('/folder/:id')
    async getActeByFolder(@Param('id') id: any, @Res() res: any) {
        const acte: any = await this.activityReportService.getActeByFolder(id);
        return res.status(HttpStatus.OK).send(acte);
    }

    @Post()
    async create(@Body() createActeDto: CreateActivityReportDto) {
        return this.activityReportService.createActe(createActeDto);
    }

    @Put(':id')
    async updateFolder(@Param('id') id: any, @Body() updateActeDto: UpdateActivityReportDto, @Res() res: any) {
        const acte: any = await this.activityReportService.updateActe(id, updateActeDto);
        return res.status(HttpStatus.OK).send(acte);
    }

    @Delete(':id')
    async deleteActe(@Param('id') id: any) {
        return this.activityReportService.deleteActe(id);
    }
}
