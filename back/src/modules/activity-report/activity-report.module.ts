import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Acte, ActeSchema } from 'src/schema/acte.schema';
import { ActeRepository } from '../../repositories/acte.repository';
import { ActivityReportController } from './activity-report.controller';
import { ActivityReportService } from './activity-report.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Acte.name, schema: ActeSchema }])],
    controllers: [ActivityReportController],
    providers: [ActivityReportService, ActeRepository],
    exports: [ActivityReportService, ActeRepository],
})
export class ActeModule {}
