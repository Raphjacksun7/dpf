import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Action extends Document {

    @Prop({ required: true, enum: ['REVIEW', 'VALIDATION'] })
    actionType: string;

    @Prop({ type: String, required: true })
    ressourceURI: string;

    @Prop({ type: String, enum: ['ATTENTE', 'FAIRE'] })
    status: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    sender: User;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    reciever: User;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}

export const ActionSchema = SchemaFactory.createForClass(Action);
