import { PartialType } from '@nestjs/mapped-types';

import { CreateDModelDto } from './createDModel.dto';

export class UpdateDModelDto extends PartialType(CreateDModelDto) {}
