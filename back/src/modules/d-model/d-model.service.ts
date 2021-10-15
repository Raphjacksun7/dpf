import { Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { DModelRepository } from 'src/repositories/d-model.repository';
import { GetQueryDto } from '../../dto/getQueryDto';

import { CreateDModelDto } from './dto/createDModel.dto';
import { UpdateDModelDto } from './dto/updateDModel.dto';

@Injectable()
export class DModelService {
    constructor(private readonly dModelRepository: DModelRepository) {}

    async createModel(createDModelDto: CreateDModelDto) {
        return await this.dModelRepository.createModel(createDModelDto);
    }

    async getDModelById(id: MongooseSchema.Types.ObjectId) {
        return await this.dModelRepository.getModelById(id);
    }

    async getModelByFolder(id: MongooseSchema.Types.ObjectId) {
        return await this.dModelRepository.getModelByFolder(id);
    }

    async getDModels(getQueryDto: GetQueryDto) {
        return await this.dModelRepository.get(getQueryDto);
    }

    async updateDModel(id, updateDModelDto: UpdateDModelDto) {
        return await this.dModelRepository.updateDModel(id, updateDModelDto);
    }

    async deleteDModels(id: MongooseSchema.Types.ObjectId) {
        return await this.dModelRepository.deleteModel(id);
    }

}
