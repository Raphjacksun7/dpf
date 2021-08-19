import { ConflictException, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Schema as MongooseSchema, UpdateQuery } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../schema/user.schema';
import { CreateUserDto } from '../modules/user/dto/createUser.dto';
import { SignInUserDto } from '../auth/dto/signInUser.dto';
import { GetQueryDto } from '../dto/getQueryDto';
import { Folder } from 'src/schema/folder.schema';
import { UpdateUserDto } from 'src/modules/user/dto/updateUser.dto';

export class UserRepository {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) // private folderRepository: FolderRepository,
    {}

    /**
     * Fetches all users from database
     * @returns {Promise<User>} queried user data
     */

    async get(query: GetQueryDto) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let users: User[];

        try {
            if (limit === 0) {
                users = await this.userModel
                    .find()
                    .populate('assignedFolder', null, Folder.name)
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                users = await this.userModel
                    .find()
                    .populate('assignedFolder', null, Folder.name)
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (users.length > 0) {
                response = {
                    ok: true,
                    data: users,
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
     * Fetches a user from database by MongooseSchema ObjectId
     * @param {string} id
     * @returns {Promise<User>} queried user data
     */

    async getUserById(id: MongooseSchema.Types.ObjectId): Promise<User> {
        try {
            const user: any = await this.userModel
                .findById(id)
                .populate('assignedFolder', null, Folder.name)
                .exec();

            if (!user) {
                throw new NotFoundException(`User with ID: ${id} Not Found`);
            }
            return user;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    /**
     * Fetches a user from database by username
     * @param {string} email
     * @returns {Promise<User>} queried user data
     */

    async getUserByEmail(email: string): Promise<User> {
        try {
            return await this.userModel.findOne({ email }).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    /**
     * Fetches a user by their email and hashed password
     * @param {string} email
     * @param {string} password
     * @returns {Promise<User>} queried user data
     */
    async getByEmailAndPass(signInUserDto: SignInUserDto): Promise<User> {
        const { email, password } = signInUserDto;
        try {
            const user = await this.userModel.findOne({ email });
            if (user && (await bcrypt.compare(password, user.password))) {
                return user;
            } else {
                throw new UnauthorizedException('Please check your login credential');
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async createUser(createUserDto: CreateUserDto) {
        const { firstname, lastname, email, password, role } = createUserDto;
        const userExists: any = await this.getUserByEmail(email);
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        if (userExists == null) {
            const newUser = new this.userModel({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: hashedPassword,
                role: role,
            });

            try {
                console.log(newUser);

                return await newUser.save();
            } catch (error) {
                throw new InternalServerErrorException('Trying to save new user but got error:', error);
            }
        } else {
            throw new ConflictException('The email you provide already exists in the database');
        }
    }

    async updateUser(id: MongooseSchema.Types.ObjectId, updateUser: UpdateUserDto): Promise<User> {
        const { firstname, lastname, email, password, role  } = updateUser;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const updateData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword,
            role: role,
            updatedAt: new Date()
        };

        try {
            const user = await this.userModel
                .findOneAndUpdate({ _id: id }, updateData, {
                    new: true,
                })
                .exec();
            return user;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateMany(filter: FilterQuery<User>, update: UpdateQuery<User>) {
        return await this.userModel.updateMany(filter, update);
    }

    async assignFolder(folderId: MongooseSchema.Types.ObjectId, userId: MongooseSchema.Types.ObjectId) {
        return await this.userModel.updateMany(folderId, userId);
    }

    async deleteUser(id: MongooseSchema.Types.ObjectId) {
        await this.userModel.deleteOne({ id });
    }
    
}
