import { ConflictException, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../dto/getQueryDto';
import { Task } from 'src/schema/task.schema';
import { CreateTaskDto } from 'src/modules/task/dto/createTask.dto';
import { User } from 'src/schema/user.schema';
import { UpdateTaskDto } from 'src/modules/task/dto/updateTask.dto';

export class TaskRepository {
    constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) {}

    /**
     * Fetches all users from database
     * @returns {Promise<Task>} queried user data
     */

    async get(query: GetQueryDto) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let tasks: Task[];

        try {
            if (limit === 0) {
                tasks = await this.taskModel
                    .find()
                    .populate('user')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                tasks = await this.taskModel
                    .find()
                    .populate('user')
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (tasks.length > 0) {
                response = {
                    ok: true,
                    data: tasks,
                    message: 'Get Tasks Ok!',
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
     * Fetches a task from database by MongooseSchema ObjectId
     * @param {string} id
     * @returns {Promise<Task>} queried task data
     */

    async getTaskById(id: MongooseSchema.Types.ObjectId): Promise<Task> {
        try {
            const task = await this.taskModel.findById(id);
            if (!task) {
                throw new NotFoundException(`Task with ID: ${id} Not Found`);
            }
            return task;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getTasksByOwner(id: MongooseSchema.Types.ObjectId): Promise<Task> {
        try {
            const tasks: any = await this.taskModel
                .where({ sender: id })
                .populate('reciever', null, User.name)
                .sort({ createdAt: -1 })
                .exec();
            return tasks;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getTasksByReciever(id: MongooseSchema.Types.ObjectId): Promise<Task> {
        try {
            const tasks: any = await this.taskModel
                .where({ reciever: id })
                .populate('sender', null, User.name)
                .sort({ createdAt: -1 })
                .exec();
            return tasks;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async createTask(createTaskDto: CreateTaskDto) {
        const { taskType, ressourceId, status, motif, sender, reciever } = createTaskDto;
        const newTask = new this.taskModel({
            taskType: taskType,
            ressourceId: ressourceId,
            status: status,
            motif: motif,
            sender: sender,
            reciever: reciever,
        });
        try {
            return await newTask.save();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateTask(id, updateTaskDto: UpdateTaskDto) {
        const { motif, ressourceId, status, taskType } = updateTaskDto;
        try {
            const task = await this.taskModel
                .findOneAndUpdate(
                    { _id: id },
                    { motif, ressourceId, status, taskType, updatedAt: new Date() },
                    {
                        new: true,
                    },
                )
                .exec();
            return task;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteTask(id: MongooseSchema.Types.ObjectId) {
        await this.taskModel.deleteOne({ id });
    }
}
