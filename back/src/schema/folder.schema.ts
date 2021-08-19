import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Client } from './client.schema';
import { User } from './user.schema';

export type FolderDocument = Folder & Document;

@Schema()
export class Folder {
    @Prop({ type: String })
    name: string;

    @Prop({ type: String ,  enum: ['VERIFICATION', 'SIGNATURE', 'VERI FINANCE', 'REVISION'] })
    status: string;

    @Prop({ type: String})
    service: string;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Client' }] })
    clients: Client[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
    users: User[];

    @Prop({ type: Date })
    updatedAt: Date;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
