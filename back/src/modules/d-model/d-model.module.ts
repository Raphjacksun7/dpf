import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DModel, DModelSchema } from '../../schema/d-model.schema';
import { DModelRepository } from '../../repositories/d-model.repository';
import { DModelController } from './d-model.controller';
import { DModelService } from './d-model.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: DModel.name, schema: DModelSchema }])],
    controllers: [DModelController],
    providers: [DModelService, DModelRepository],
    exports: [DModelService, DModelRepository],
})
export class DModelModule {}
