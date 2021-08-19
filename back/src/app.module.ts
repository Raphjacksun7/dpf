import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ClientModule } from './modules/client/client.module';
import { UserModule } from './modules/user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { FolderModule } from './modules/folder/folder.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { CloudinaryProvider } from './modules/cloudinary/cloudinary.provider';
import { DModelModule } from './modules/d-model/d-model.module';
import { ActeModule } from './modules/acte/acte.module';

@Module({
    imports: [
        ConfigModule,
        // MongoDB Connection
        MongooseModule.forRoot("mongodb://127.0.0.1:27017/digitactDb"),
        // MongooseModule.forRootAsync({
        //     inject: [ConfigService],
        //     useFactory: (configService: ConfigService) => configService.getMongoConfig() as MongooseModuleAsyncOptions,
        // }),
        ClientModule,
        FolderModule,
        ActeModule,
        UserModule,
        AuthModule,
        CloudinaryModule,
        DModelModule,
    ],
    controllers: [AppController, AuthController],
    providers: [AppService, CloudinaryProvider],
})
export class AppModule {}
