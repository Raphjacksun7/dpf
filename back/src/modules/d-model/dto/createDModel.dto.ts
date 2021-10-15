import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDModelDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly fileURI: string;

    @IsString()
    @IsNotEmpty()
    readonly modelType: string;

    @IsString()
    readonly folder: string;

    @IsOptional()
    @IsString()
    readonly updatedAt: Date;
}
