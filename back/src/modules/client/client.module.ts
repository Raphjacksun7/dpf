import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Client, ClientSchema } from '../../schema/client.schema';
import { User, UserSchema } from '../../schema/user.schema';
import { ClientRepository } from '../../repositories/client.repository';
import { UserModule } from '../user/user.module';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
    imports: [
        UserModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    ],
    controllers: [ClientController],
    providers: [ClientService, ClientRepository],
    exports: [ClientService, ClientRepository],
})
export class ClientModule {}
