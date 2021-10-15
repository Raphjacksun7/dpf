import { IsDate, IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { Folder } from 'src/schema/folder.schema';

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    readonly firstname: string;

    @IsString()
    @IsNotEmpty()
    readonly lastname: string;

    @IsArray()
    readonly associatedDocuments: any[];

    @IsArray()
    readonly folders: Folder[];

    @IsOptional()
    @IsString()
    @IsDate()
    readonly updatedAt: Date;
}
