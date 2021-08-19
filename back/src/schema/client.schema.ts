import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Folder } from './folder.schema';

// export type ClientDocument = Client & Document

@Schema()
export class Client extends Document  {

    @Prop({ required: true})
    firstname: string;

    @Prop({ required: true})
    lastname: string;

    @Prop({ required: false})
    idCardUrl: string;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Folder' }],  required: false})
    folders: Folder[];

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
