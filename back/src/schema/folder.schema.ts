import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Client } from './client.schema';
import { User } from './user.schema';

export type FolderDocument = Folder & Document;

@Schema()
export class Folder {
    @Prop({ type: String })
    name: string;

    @Prop({
        type: String,
        enum: [
            'À VERIFIER',
            'EN VERIFICATION',
            'À TRAITER',
            'EN TRAITEMENT',
            'REVISION',
            'V-FINANCE',
            'À SIGNER',
            'FINALISÉ',
            'ARCHIVÉ',
            'ANNULÉ',
        ],
    })
    status: string;

    @Prop({ type: String })
    service: string;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Client' }] })
    clients: Client[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
    users: User[];

    @Prop({ type: Boolean, default: false })
    is_cancelled: boolean;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
