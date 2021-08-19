import { PartialType } from '@nestjs/mapped-types';

import { CreateFolderDto } from './createFolder.dto';

export class UpdateFolderDto extends PartialType(CreateFolderDto) {}
