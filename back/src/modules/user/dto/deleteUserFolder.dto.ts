import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserFolderDto {
    @IsString()
    @IsNotEmpty()
    folderId: string;
}
