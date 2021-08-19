import { Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';

import { ActionRepository } from '../../repositories/action.repository';
import { CreateActionDto } from './dto/createAction.dto';


@Injectable()
export class ActionService {
    constructor(private readonly actionRepository: ActionRepository) {}

    async createAction(createActionDto: CreateActionDto) {
        return await this.actionRepository.createAction(createActionDto);
    }

    async getActionById(id: MongooseSchema.Types.ObjectId) {
        return await this.actionRepository.getActionById(id);
    }

    async getActions(getQueryDto: GetQueryDto) {
        return await this.actionRepository.get(getQueryDto);
    }



}
