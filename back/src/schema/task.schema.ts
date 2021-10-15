import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Task extends Document {
    @Prop({ required: true, enum: ['REVISION', 'VALIDATION'] })
    taskType: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
    ressourceId: string;

    @Prop({ enum: ['ATTENTE', 'FAIRE'], required: true })
    status: string;

    @Prop({ type: String })
    motif: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    sender: User;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    reciever: User;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
