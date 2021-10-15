import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as  MongooseSchema } from 'mongoose';
import { Folder } from './folder.schema';

@Schema()
export class DModel extends Document {
    @Prop({ required: true})
    name: string;

    @Prop({ required: true})
    fileURI: string;

    @Prop({ required: true, enum: ['ACTE', 'LETTRE', 'JUSTIFICATIF'] })
    modelType: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Folder',  required: true})
    folder: Folder;
 
    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}

export const DModelSchema = SchemaFactory.createForClass(DModel);
