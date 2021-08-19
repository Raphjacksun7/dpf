import { Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { ActeRepository } from 'src/repositories/acte.repository';
import { GetQueryDto } from '../../dto/getQueryDto';

import { CreateActeDto } from './dto/createActe.dto';


@Injectable()
export class ActeService {
    constructor(private readonly acteRepository: ActeRepository) {}


    async createActe(createActeDto: CreateActeDto) {
        return await this.acteRepository.createActe(createActeDto);
    }

    async getActeById(id: MongooseSchema.Types.ObjectId) {
        return await this.acteRepository.getActeById(id);
    }

    async getActeByFolder(id: MongooseSchema.Types.ObjectId) {
        return await this.acteRepository.getActeByFolder(id);
    }

    async getActes(getQueryDto: GetQueryDto) {
        return await this.acteRepository.get(getQueryDto);
    }

    async deleteActe(id: MongooseSchema.Types.ObjectId) {
        return await this.acteRepository.deleteActe(id);
    }

}
