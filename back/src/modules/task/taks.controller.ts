import { Body, Controller, Get, HttpStatus, Param, Post, Res, Query, Delete, Put } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.createTask(createTaskDto);
    }

    @Get(':id')
    async getTaskById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: any) {
        const task: any = await this.taskService.getTaskById(id);
        return res.status(HttpStatus.OK).send(task);
    }

    @Get('/owner/:id')
    async getTasksByOwner(@Param('id') id: any, @Res() res: any) {
        const tasks: any = await this.taskService.getTasksByOwner(id);
        return res.status(HttpStatus.OK).send(tasks);
    }

    @Get('/reciever/:id')
    async getTasksByReciever(@Param('id') id: any, @Res() res: any) {
        const tasks: any = await this.taskService.getTasksByReciever(id);
        return res.status(HttpStatus.OK).send(tasks);
    }

    @Get()
    async getTasks(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const storages: any = await this.taskService.getTasks(getQueryDto);
        return res.status(HttpStatus.OK).send(storages);
    }

    @Put(':id')
    async updateTask(@Param('id') id: any, @Body() updateActeDto: UpdateTaskDto, @Res() res: any) {
        const task: any = await this.taskService.updateTask(id, updateActeDto);
        return res.status(HttpStatus.OK).send(task);
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: any) {
        return this.taskService.deleteTask(id);
    }
}
