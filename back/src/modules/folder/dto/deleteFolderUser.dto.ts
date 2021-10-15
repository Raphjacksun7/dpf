import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteFolderUserDto {
    @IsString()
    @IsNotEmpty()
    userId: string;
}
