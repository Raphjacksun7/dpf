import { Body, Controller, Get, HttpStatus, Param, Post, Res, Query } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateActionDto } from './dto/createAction.dto';
import { ActionService } from './action.service';

@Controller('action')
export class ActionController {
    constructor(private actionService: ActionService) {}

    @Post()
    async create(@Body() createActionDto: CreateActionDto) {
        return this.actionService.createAction(createActionDto);
    }

    @Get(':id')
    async getActionById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: any) {
        const action: any = await this.actionService.getActionById(id);
        return res.status(HttpStatus.OK).send(action);
    }

    @Get()
    async getactions(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const storages: any = await this.actionService.getActions(getQueryDto);
        return res.status(HttpStatus.OK).send(storages);
    }
}
