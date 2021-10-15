import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteClientFolderDto {
    @IsString()
    @IsNotEmpty()
    folderId: string;
}
