import { ConflictException, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { DModel } from '../schema/d-model.schema';
import { GetQueryDto } from '../dto/getQueryDto';
import { CreateDModelDto } from 'src/modules/d-model/dto/createDModel.dto';
import { UpdateDModelDto } from 'src/modules/d-model/dto/updateDModel.dto';

export class DModelRepository {
    constructor(
        @InjectModel(DModel.name)
        private readonly docModel: Model<DModel>,
    ) {}

    /**
     * Fetches all dModels from database
     * @returns {Promise<DModel>} queried dModels data
     */

    async get(query: GetQueryDto) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let dModels: DModel[];

        try {
            if (limit === 0) {
                dModels = await this.docModel
                    .find()
                    .skip(from)
                    // .sort({ createdAt: -1 })
                    .sort({'_id': -1})
                    .exec();
            } else {
                dModels = await this.docModel
                    .find()
                    .skip(from)
                    .limit(limit)
                    // .sort({ createdAt: -1 })
                    .sort({'_id': -1})
                    .exec();
            }

            let response;

            if (dModels.length > 0) {
                response = {
                    ok: true,
                    data: dModels,
                    message: 'Get Document Model Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No Document Model found!',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    /**
     * Fetches a dModel from database by MongooseSchema ObjectId
     * @param {string} id
     * @returns {Promise<DModel>} queried dModel data
     */

    async getModelById(id: MongooseSchema.Types.ObjectId): Promise<DModel> {
        try {
            const dModel: any = await this.docModel.findById(id);
            if (!dModel) {
                throw new NotFoundException(`Document Model with ID: ${id} Not Found`);
            }
            return dModel;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getModelByFolder(id: MongooseSchema.Types.ObjectId): Promise<DModel> {
        try {
            const dModel: any = await this.docModel
                .where({ folder: id })
                .sort({ updatedAt: -1 })
                .exec();
            return dModel;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async createModel(createDModelDto: CreateDModelDto) {
        const { name, fileURI, folder, modelType } = createDModelDto;
        const newModel = new this.docModel({
            name: name,
            fileURI: fileURI,
            folder: folder,
            modelType: modelType,
        });
        try {
            return await newModel.save();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateDModel(id, updateDModelDto: UpdateDModelDto) {
        const { name, fileURI, modelType } = updateDModelDto;
        try {
            const dModel = await this.docModel
                .findOneAndUpdate(
                    { _id: id },
                    { name, fileURI, modelType, updatedAt: new Date() },
                    {
                        new: true,
                    },
                )
                .exec();
            return dModel;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteModel(id: MongooseSchema.Types.ObjectId) {
        try {
            const dModel = await this.docModel.findById(id);
            if (!dModel) {
                throw new NotFoundException(`DModel with ID: ${id} Not Found`);
            }
            dModel.remove();
            return { message: 'DModel has been delete' };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
