import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Folder, FolderSchema } from '../../schema/folder.schema';
import { FolderRepository } from '../../repositories/folder.repository';
import { ClientModule } from '../client/client.module';
import { UserModule } from '../user/user.module';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';

@Module({
    imports: [UserModule, ClientModule, MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }])],
    controllers: [FolderController],
    providers: [FolderService, FolderRepository],
    exports: [FolderService, FolderRepository],
})
export class FolderModule {}
