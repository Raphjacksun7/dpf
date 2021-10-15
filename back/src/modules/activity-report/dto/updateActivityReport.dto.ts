import { PartialType } from '@nestjs/mapped-types';

import { CreateActivityReportDto } from './createActivityReport.dto';

export class UpdateActivityReportDto extends PartialType(CreateActivityReportDto) {}
