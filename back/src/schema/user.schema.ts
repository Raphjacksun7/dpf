import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Action } from './action.schema';
import { Folder } from './folder.schema';

@Schema()
export class User extends Document {
    @Prop({ required: true})
    firstname: string;

    @Prop({ required: true})
    lastname: string;

    @Prop({ required: true, unique: true, lowercase: true })
    email: string;

    @Prop({ required: true, enum: ['ADMIN', 'GEST','FINA', 'DEV'] })
    role: string;

    @Prop({ required: true})
    password: string;
        
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Folder' }],  required: false})
    assignedFolder: Folder[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Action' }],  required: false})
    actions: Action[];

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
