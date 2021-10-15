import { PartialType } from '@nestjs/mapped-types';

import { CreateActeDto } from './createActe.dto';

export class UpdateActeDto extends PartialType(CreateActeDto) {}
