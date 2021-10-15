import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteClientFolderDto {
    @IsString()
    @IsNotEmpty()
    clientId: string;
}
