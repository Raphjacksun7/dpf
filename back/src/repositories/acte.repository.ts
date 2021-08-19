import { ConflictException, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import * as bcrypt from "bcrypt";

import { User } from '../schema/user.schema';
import { CreateUserDto } from '../modules/user/dto/createUser.dto';
import { SignInUserDto } from '../auth/dto/signInUser.dto';
import { GetQueryDto } from '../dto/getQueryDto';
import { Acte } from 'src/schema/acte.schema';
import { CreateActeDto } from 'src/modules/acte/dto/createActe.dto';


export class ActeRepository {

    constructor(@InjectModel(Acte.name) private readonly acteModel: Model<Acte>) {}

    /**
     * Fetches all users from database 
     * @returns {Promise<Acte>} queried user data
     */

    async get(query: GetQueryDto) {

        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let actes: Acte[];

        try {
            if (limit === 0) {
                actes = await this.acteModel
                    .find()
                    .populate('user')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                actes = await this.acteModel
                    .find()
                    .populate('user')
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (actes.length > 0) {
                response = {
                    ok: true,
                    data: actes,
                    message: 'Get Users Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No users found!',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


    /**
     * Fetches a acte from database by MongooseSchema ObjectId
     * @param {string} id
     * @returns {Promise<Acte>} queried acte data
     */

     async getActeById(id: MongooseSchema.Types.ObjectId): Promise<Acte> {
        try {
            const acte: any = await this.acteModel.findById(id);
            if (!acte) {
                throw new NotFoundException(`Acte with ID: ${id} Not Found`);
            }
            return acte;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


    async  getActeByFolder(id: MongooseSchema.Types.ObjectId): Promise<Acte> {
        try {
            const actes: any = await this.acteModel.where({folder: id});
            return actes;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }



    async createActe(createActeDto: CreateActeDto) {
        const { acteType, fileURI, folder } = createActeDto;
        const newActe = new this.acteModel({
            acteType: acteType,
            fileURI: fileURI,
            folder: folder,
        });
        try {
            return await newActe.save();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteActe(id: MongooseSchema.Types.ObjectId) {
        await this.acteModel.deleteOne({ id });
    }


}
