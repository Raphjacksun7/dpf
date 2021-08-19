import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../../schema/user.schema';
import { UserRepository } from '../../repositories/user.repository';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [ActionController],
    providers: [ActionService, UserRepository],
    exports: [ActionService, UserRepository],
})
export class UserModule {}
