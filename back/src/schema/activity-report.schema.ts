import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Folder } from './folder.schema';

@Schema()
export class ActivityReport extends Document {
    @Prop({ required: true})
    name: string;

    @Prop({ required: true})
    duration: string;

    @Prop({ required: true})
    date: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Folder',  required: true})
    folder: Folder;
 
    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}

export const ActivityReportSchema = SchemaFactory.createForClass(ActivityReport);
