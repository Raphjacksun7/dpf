import { Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';

import { TaskRepository } from '../../repositories/task.repository';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Injectable()
export class TaskService {
    constructor(private readonly taskRepository: TaskRepository) {}

    async createTask(createTaskDto: CreateTaskDto) {
        return await this.taskRepository.createTask(createTaskDto);
    }

    async getTaskById(id: MongooseSchema.Types.ObjectId) {
        return await this.taskRepository.getTaskById(id);
    }

    async getTasks(getQueryDto: GetQueryDto) {
        return await this.taskRepository.get(getQueryDto);
    }

    async getTasksByOwner(id: MongooseSchema.Types.ObjectId) {
        return await this.taskRepository.getTasksByOwner(id);
    }

    async getTasksByReciever(id: MongooseSchema.Types.ObjectId) {
        return await this.taskRepository.getTasksByReciever(id);
    }

    async updateTask(id, updateTaskDto: UpdateTaskDto) {
        return await this.taskRepository.updateTask(id, updateTaskDto);
    }

    async deleteTask(id: MongooseSchema.Types.ObjectId) {
        return await this.taskRepository.deleteTask(id);
    }
}
