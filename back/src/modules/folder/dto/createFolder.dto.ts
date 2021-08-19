import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFolderDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly status: string;

    @IsString()
    @IsNotEmpty()
    readonly service: string;

    @IsArray()
    readonly clients: any[];

    @IsArray()
    readonly users: any[];

    @IsString()
    @IsOptional()
    readonly updatedAt: Date;
}
