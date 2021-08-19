import { ConflictException, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import * as bcrypt from "bcrypt";

import { User } from '../schema/user.schema';
import { CreateUserDto } from '../modules/user/dto/createUser.dto';
import { SignInUserDto } from '../auth/dto/signInUser.dto';
import { GetQueryDto } from '../dto/getQueryDto';
import { Action } from 'src/schema/action.schema';
import { CreateActionDto } from 'src/modules/action/dto/createAction.dto';


export class ActionRepository {

    constructor(@InjectModel(Action.name) private readonly actionModel: Model<Action>) {}

     /**
     * Fetches all users from database 
     * @returns {Promise<Action>} queried user data
     */

      async get(query: GetQueryDto) {

        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let actions: Action[];

        try {
            if (limit === 0) {
                actions = await this.actionModel
                    .find()
                    .populate('user')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                actions = await this.actionModel
                    .find()
                    .populate('user')
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (actions.length > 0) {
                response = {
                    ok: true,
                    data: actions,
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
     * Fetches a action from database by MongooseSchema ObjectId
     * @param {string} id
     * @returns {Promise<Action>} queried action data
     */

     async getActionById(id: MongooseSchema.Types.ObjectId): Promise<Action> {
        try {
            const action: any = await this.actionModel.findById(id);
            if (!action) {
                throw new NotFoundException(`Action with ID: ${id} Not Found`);
            }
            return action;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


    async  getActionByFolder(id: MongooseSchema.Types.ObjectId): Promise<Action> {
        try {
            const actions: any = await this.actionModel.where({folder: id});
            return actions;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }



    async createAction(createActionDto: CreateActionDto) {
        const { actionType, ressourceURI, status, sender, reciever } = createActionDto;
        const newAction = new this.actionModel({
            actionType: actionType,
            ressourceURI: ressourceURI,
            status: status,
            sender: sender,
            reciever: reciever,
        });
        try {
            return await newAction.save();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteAction(id: MongooseSchema.Types.ObjectId) {
        await this.actionModel.deleteOne({ id });
    }


}
