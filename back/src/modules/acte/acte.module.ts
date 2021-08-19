import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Acte, ActeSchema } from 'src/schema/acte.schema';
import { ActeRepository } from '../../repositories/acte.repository';
import { ActeController } from './acte.controller';
import { ActeService } from './acte.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Acte.name, schema: ActeSchema }])],
    controllers: [ActeController],
    providers: [ActeService, ActeRepository],
    exports: [ActeService, ActeRepository],
})
export class ActeModule {}
